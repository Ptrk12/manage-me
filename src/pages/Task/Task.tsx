import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import State from "../../enums/State";
import Priority from "../../enums/Priority";
import "./task.scss"
import TaskType from "../../types/TaskType";
import { localStorageWorker } from "../../storage/localStorageWorker";

const Task = () => {
  let { id } = useParams();
  let userStory = localStorageWorker.getById(id?.toString());
  
  const [TaskData, setTaskData] = useState<TaskType>({
    id: 0, 
    data: '', 
    name: '',
    projectName:userStory.projectName,
    startDate:0,
    workHours: 0,
    assigner: '',
    priority: Priority.Low,
    userStoryId: id || ''

});

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setTaskData(prevData => ({
      ...prevData,
      [name]: value
  }));
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const newTask = {
      id: Date.now(), 
      data: TaskData.data,
      name: TaskData.name + id?.toString(),
      startDate: Date.now(),
      workHours:TaskData.workHours,
      assigner:TaskData.assigner,
      priority:TaskData.priority,
  };
  localStorageWorker.add(newTask.id.toString(), newTask);
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

  return (
    <div className="task">
      <form>
        <TextField id="outlined-basic" className="data" label="Task data" variant="outlined" />
        <TextField id="outlined-basic" label="Task name" variant="outlined" />
        <TextField
          id="outlined-number"
          label="work hours"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="outlined-select-user"
          select
          label="Select asigner"
          defaultValue=""
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
            <Select labelId="select-label" id="select" name="priority" value="">
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
            <Select labelId="select-label" id="select" name="state" value="">
              {Object.values(State).map((state) => (
                <MenuItem value={state} key={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Link className="link" to={`/projects/${id}`}>
          CREATE
        </Link>
      </form>
    </div>
  );
};

export default Task;
