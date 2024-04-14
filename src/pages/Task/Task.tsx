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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"; // Import useHistory
import State from "../../enums/State";
import Priority from "../../enums/Priority";
import "./task.scss"
import TaskType from "../../types/TaskType";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { start } from "repl";

const Task = () => {
  const { projectId, userStoryId } = useParams<{ projectId: string, userStoryId: string }>();
  let userStory = localStorageWorker.getById(projectId?.toString());
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [error, setError] = useState(false);
  const taskId = searchParams.get('taskId');
  const [TaskData, setTaskData] = useState<TaskType>({
    id: 0,
    description: '',
    name: '',
    projectName: userStory.projectName,
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
    if (taskId) {
      const taskDetails: TaskType = localStorageWorker.getById(taskId);
      if (taskDetails != null) {
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
        }))

      }
    }
  }, [taskId]);
  const navigate = useNavigate();


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
      id: Date.now(),
      description: TaskData.description,
      name: TaskData.name,
      startDate: undefined,
      endDate: undefined,
      workHours: TaskData.workHours,
      assigner: TaskData.assigner,
      priority: TaskData.priority,
      projectName: TaskData.projectName,
      state: TaskData.state,
      userStoryId: userStoryId || '',
      projectId: projectId || '',
      type: 'task'
    };

    let startDate = TaskData.startDate;

    if(taskId !== null){
      newTask.description = TaskData.description;
      newTask.id = TaskData.id;
      newTask.name = TaskData.name;
      newTask.projectName = TaskData.projectName;
      newTask.workHours = TaskData.workHours;
      newTask.assigner = TaskData.assigner;
      newTask.priority=TaskData.priority;
      newTask.state = TaskData.state;
      newTask.userStoryId = TaskData.userStoryId;
      newTask.projectId = TaskData.projectId;
      newTask.type = TaskData.type;
    }
    if (TaskData.state === State.Doing && TaskData.assigner === "") {
      setError(true);
      return;
    }
    if (newTask.state == State.Doing) {
      newTask.startDate = Date.now();
      newTask.startDateDate = new Date(newTask.startDate)
    }
    if (newTask.state == State.Done) {
      if(startDate !== undefined){
        newTask.startDateDate = new Date(startDate)
      }
      newTask.endDateDate = new Date(Date.now())
    }
    if (projectId != undefined && userStoryId != undefined) {
      localStorageWorker.add(newTask.id.toString(), newTask);
    }
    navigate(`/projects/${projectId}/userstory/${userStoryId}/tasklist`);
  };
  const handleOnChangeSelect = (e: SelectChangeEvent) => {
    setTaskData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const users = [
    {
      value: "patryk b",
      label: "patryk b",
    },
    {
      value: "test",
      label: "test",
    },
  ];
  console.log(TaskData)
  return (
    <div className="task">
      <div className="title">
        {taskId === null ? <h1>Create task</h1> : <h1>Edit task</h1>}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField name="description" id="outlined-description" value={TaskData.description} className="description" label="Task description"
          InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleInputChange} />
        <TextField name="name" id="outlined-name" label="Task name" variant="outlined" InputLabelProps={{ shrink: true }} value={TaskData.name} onChange={handleInputChange} />
        <TextField
          name="workHours"
          id="outlined-work-hours"
          value={TaskData.workHours}
          label="work hours"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-select-user"
          select
          label="Select asigner"
          defaultValue=""
          value={TaskData.assigner}
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
            <InputLabel id="select-label">PRIORITY</InputLabel>
            <Select labelId="select-label" id="select" name="priority" value={TaskData.priority} onChange={handleOnChangeSelect}>
              {Object.values(Priority).map((state) => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">STATE</InputLabel>
            <Select labelId="select-label" id="select" name="state" value={TaskData.state} onChange={handleOnChangeSelect}>
              {Object.values(State).map((state) => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <button type="submit">
          CREATE
        </button>
      </form>
    </div>
  );
};

export default Task;
