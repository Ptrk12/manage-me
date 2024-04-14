import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./add.scss";
import Priority from "../../enums/Priority";
import State from "../../enums/State";
import userStoryType from '../../types/userStoryType';
import userType from "../../types/userType";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { useParams } from "react-router-dom";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (newUserStory: userStoryType) => void;
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  handleOnChangeSelect?: (e: SelectChangeEvent) => void;
  selectValues?: string[];
  priority: Priority;
  state: State;
};


const Add = (props: Props) => {
    let { id } = useParams();
    let project = localStorageWorker.getById(id?.toString());
  const { slug, columns, setOpen, handleSubmit } = props;
  const [userStoryData, setUserStoryData] = useState<userStoryType>({
    id: 0,
    name: '',
    description: '',
    priority: Priority.Low,
    state: State.ToDo,
    createdBy: new userType('patryk','b'),
    projectName:project.projectName,
    projectId:id,
    type:'userStory'
  });

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserStoryData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserStoryData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleOnChangeSelect = (e: SelectChangeEvent) => {
    setUserStoryData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(userStoryData);
    setOpen(false);
  };

  return (
    <div className="add">
      <div className="modal">
        <IconButton
          className="closeButton"
          onClick={() => setOpen(false)}
        >
          <CloseIcon color="action" />
        </IconButton>
        <h1>Add new {slug}</h1>
        <form onSubmit={onSubmit}>
          {columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <div className="item" key={column.field}>
                {column.type === "custom" ? (
                  <>
                    <label>{column.headerName}</label>
                    <textarea
                      name={column.field} 
                      onChange={handleTextAreaChange}
                      cols={87}
                      rows={10}
                    ></textarea>
                  </>
                ) : column.type === "string" ? (
                  <>
                    <label>{column.headerName}</label>
                    <input
                      type="text"
                      name={column.field} 
                      onChange={handleOnChangeInput}
                      placeholder={column.field}
                    />
                  </>
                ) : column.description === "priority" ? (
                  <>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="select-label">
                          {column.field}
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          id="select"
                          name={column.field} 
                          value={userStoryData.priority}
                          onChange={handleOnChangeSelect}
                        >
                          {Object.values(Priority).map((priority) => (
                            <MenuItem value={priority} key={priority}>{priority}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </>
                ) : column.description === "state" ? (
                  <>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="select-label">
                          {column.field}
                        </InputLabel>
                        <Select
                          labelId="select-label"
                          id="select"
                          name={column.field} 
                          value={userStoryData.state}
                          onChange={handleOnChangeSelect}
                        >
                          {Object.values(State).map((state) => (
                            <MenuItem value={state} key={state}>{state}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </>
                ) : null}
              </div>
            ))}
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
