import "./backlogTable.scss";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import TaskType from "../../types/TaskType";
import State from "../../enums/State";
import { useState } from "react";
import React from "react";
import { localStorageWorker } from "../../storage/localStorageWorker";

const BacklogTable = (props: { props: TaskType[] }) => {
  const tasks = props.props;
  let { projectId } = useParams();
  const [state, setState] = useState(State.ToDo);
  const toDoTasks = tasks.filter((x) => x.state === State.ToDo);
  const doingTasks = tasks.filter((x) => x.state === State.Doing);
  const doneTasks = tasks.filter((x) => x.state === State.Done);

  const handleChange = (event: SelectChangeEvent, taskId: number) => {
    event.preventDefault();
    const taskToUpdate = tasks.find((x: TaskType) => x.id === taskId);
    const newState = event.target.value as State; 
    setState(newState);

    if (taskToUpdate != undefined) {
      let startDate = taskToUpdate.startDate;
      taskToUpdate.state = newState; 
      if (taskToUpdate.state === State.Doing) {
        taskToUpdate.startDate = Date.now();
        taskToUpdate.startDateDate = new Date(taskToUpdate.startDate).toString()
      }
      if (taskToUpdate.state == State.Done) {
        if(startDate === undefined || startDate == null){
          taskToUpdate.startDateDate = new Date(Date.now()).toString()
        }
        taskToUpdate.endDateDate = new Date(Date.now()).toString();
      }
      localStorageWorker.updateById(taskId.toString(), taskToUpdate);
 
    }
  };
  

  return (
    <div className="backlogTable">
      <div className="toDo">
        <div className="title">
          <h3 className="colorTitle">ToDo</h3>
          {toDoTasks.map((task) => (
            <div className="item" key={task.id}>
              <div className="info">
                <div className="name">
                  <b>Task name:</b> {task.name}
                </div>
                <div className="desc">
                  <b>Description:</b> {task.description}
                </div>
                <div className="state">
                  <b>State:</b> {task.state}
                </div>
              </div>
              <div className="assigner">
                <b>Assigner:</b> {task.assigner}
              </div>
              <div className="button">
                <InputLabel id="simple-select-label">State</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={task.state}
                  label="Age"
                  onChange={(event) => handleChange(event, task.id)}
                >
                  <MenuItem value={State.ToDo}>ToDo</MenuItem>
                  <MenuItem value={State.Doing}>Doing</MenuItem>
                  <MenuItem value={State.Done}>Done</MenuItem>
                </Select>
                <Link
                  to={`/app/projects/${projectId}/userstory/${task.userStoryId}/createtask?taskId=${task.id}`}
                >
                  <Button variant="outlined">Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="doing">
        <div className="title">
          <h3 className="colorTitle">Doing</h3>
          {doingTasks.map((task) => (
            <div className="item" key={task.id}>
              <div className="info">
                <div className="name">
                  <b>Task name:</b> {task.name}
                </div>
                <div className="desc">
                  <b>Description:</b> {task.description}
                </div>
                <div className="state">
                  <b>State:</b> {task.state}
                </div>
              </div>
              <div className="assigner">
                <b>Assigner:</b> {task.assigner}
              </div>
              <div className="button">
                <InputLabel id="simple-select-label">State</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={task.state}
                  label="Age"
                  onChange={(event) => handleChange(event, task.id)}
                >
                  <MenuItem value={State.ToDo}>ToDo</MenuItem>
                  <MenuItem value={State.Doing}>Doing</MenuItem>
                  <MenuItem value={State.Done}>Done</MenuItem>
                </Select>
                <Link
                  to={`/app/projects/${projectId}/userstory/${task.userStoryId}/createtask?taskId=${task.id}`}
                >
                  <Button variant="outlined">Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="done">
        <div className="title">
          <h3 className="colorTitle">Done</h3>
          {doneTasks.map((task) => (
            <div className="item" key={task.id}>
              <div className="info">
                <div className="name">
                  <b>Task name:</b> {task.name}
                </div>
                <div className="desc">
                  <b>Description:</b> {task.description}
                </div>
                <div className="state">
                  <b>State:</b> {task.state}
                </div>
              </div>
              <div className="assigner">
                <b>Assigner:</b> {task.assigner}
              </div>
              <div className="button">
                <InputLabel id="simple-select-label">State</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={task.state}
                  label="Age"
                  onChange={(event) => handleChange(event, task.id)}
                >
                  <MenuItem value={State.ToDo}>ToDo</MenuItem>
                  <MenuItem value={State.Doing}>Doing</MenuItem>
                  <MenuItem value={State.Done}>Done</MenuItem>
                </Select>
                <Link
                  to={`/app/projects/${projectId}/userstory/${task.userStoryId}/createtask?taskId=${task.id}`}
                >
                  <Button variant="outlined">Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BacklogTable;
