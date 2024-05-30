import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import State from "../../enums/State";
import Priority from "../../enums/Priority";
import "./task.scss";
import TaskType from "../../types/TaskType";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { NotificationService } from "../../storage/NotificationsService";
import { DocumentData } from "firebase/firestore";

const Task = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get('taskId');
  const { projectId, userStoryId } = useParams<{ projectId: string, userStoryId: string }>();
  const [userStory, setUserStory] = useState<DocumentData | null>(null);
  const [taskDetails, setTaskDetails] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchUserStory = async () => {
    if (projectId) {
      const userStoryDb = await localStorageWorker.getById(projectId.toString());
      setUserStory(userStoryDb);
      return userStoryDb;
    }
  };

  const fetchTaskDetails = async () => {
    if (taskId) {
      const taskDetailsDb = await localStorageWorker.getById(taskId.toString());
      setTaskDetails(taskDetailsDb);
      return taskDetailsDb;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserStory();
      await fetchTaskDetails();
    };
    fetchData();
  }, [projectId, taskId]);

  const [taskData, setTaskData] = useState<TaskType>({
    id: 0,
    description: '',
    name: '',
    projectName: '',
    startDate: 0,
    workHours: 0,
    assigner: '',
    priority: Priority.Low,
    state: State.ToDo,
    userStoryId: userStoryId || '',
    projectId: projectId || '',
    type: 'task'
  });

  useEffect(() => {
    if (taskDetails) {
      setTaskData(prevData => ({
        ...prevData,
        description: taskDetails.description,
        id: taskDetails.id,
        name: taskDetails.name,
        projectName: taskDetails.projectName,
        startDate: taskDetails.startDate,
        workHours: taskDetails.workHours,
        assigner: taskDetails.assigner,
        priority: taskDetails.priority,
        state: taskDetails.state,
        userStoryId: taskDetails.userStoryId,
        projectId: taskDetails.projectId,
        type: taskDetails.type
      }));
    }
  }, [taskDetails]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    const newValue = name === 'workHours' ? parseInt(value as string, 10) : value;
    setError(false);

    setTaskData(prevData => ({
      ...prevData,
      [name as string]: newValue
    }));
  };

  const handleAssignerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTaskData(prevData => ({
      ...prevData,
      assigner: event.target.value as string
    }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask: TaskType = {
      ...taskData,
      id: taskId ? taskData.id : Date.now(),
    };

    if (taskData.state === State.Doing && !taskData.assigner) {
      setError(true);
      return;
    }
    let startDate = taskData.startDate;

    if (newTask.state === State.Doing) {
      newTask.startDate = Date.now();
      newTask.startDateDate = new Date(newTask.startDate)
    }
    if (newTask.state == State.Done) {
      if(startDate !== undefined){
        newTask.startDateDate = new Date(Date.now())
      }
      newTask.endDateDate = new Date(Date.now())
    }


    if (projectId && userStoryId) {
      const notificationService = new NotificationService();
      const newNotification = {
        id: 1,
        message: `New task created: ${newTask.name} for project ${newTask.projectName}`,
        read: false,
        type: 'notification'
      };
      if(taskId === null){
        console.log("NULLLLL");
        notificationService.send(newNotification);
        localStorageWorker.add(newTask.id.toString(), newTask);
        navigate(`/app/projects/${projectId}/userstory/${userStoryId}/tasklist`);
        window.location.reload();
      }else{
        console.log("NOT NULL")
        localStorageWorker.updateById(newTask.id.toString(),newTask);
        navigate(`/app/projects/${projectId}/userstory/${userStoryId}/tasklist`);
      }

    }

  };

  const handleOnChangeSelect = (e: SelectChangeEvent) => {
    setTaskData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const users = [
    { value: "patryk b", label: "patryk b" },
    { value: "test", label: "test" },
  ];

  return (
    <div className="task">
      <div className="title">
        {taskId === null ? <h1>Create task</h1> : <h1>Edit task</h1>}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField name="description" id="outlined-description" value={taskData.description} className="description" label="Task description"
          InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleInputChange} />
        <TextField name="name" id="outlined-name" label="Task name" variant="outlined" InputLabelProps={{ shrink: true }} value={taskData.name} onChange={handleInputChange} />
        <TextField
          name="workHours"
          id="outlined-work-hours"
          value={taskData.workHours}
          label="Work hours"
          type="number"
          InputLabelProps={{ shrink: true }}
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-select-user"
          select
          label="Select assigner"
          defaultValue=""
          value={taskData.assigner}
          InputLabelProps={{ shrink: true }}
          onChange={handleAssignerChange}
          error={error}
          helperText={error ? "Assigner must be selected when the state is 'Doing'" : ""}
        >
          {users.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-priority-label">Priority</InputLabel>
            <Select labelId="select-priority-label" id="select-priority" name="priority" value={taskData.priority} onChange={handleOnChangeSelect}>
              {Object.values(Priority).map((priority) => (
                <MenuItem value={priority} key={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-state-label">State</InputLabel>
            <Select labelId="select-state-label" id="select-state" name="state" value={taskData.state} onChange={handleOnChangeSelect}>
              {Object.values(State).map((state) => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <button type="submit">
          {taskId === null ? "Create" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Task;
