import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useEffect, useState } from "react";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { Link, useParams } from "react-router-dom";
import Add from "../../components/add/Add";
import AddIcon from "@mui/icons-material/Add";
import { Button, Icon, IconButton, SelectChangeEvent } from "@mui/material";
import userStoryType from "../../types/userStoryType";
import Priority from "../../enums/Priority";
import State from "../../enums/State";
import userType from "../../types/userType";
import "./userStory.scss"
import React from "react";


const Tasks = () => {
  let { id } = useParams();
  let tempUser = new userType("patryk", "b","123");
  let project = localStorageWorker.getById(id?.toString());
  const [selectedRowTask, setSelectedRowTask] = useState<string | null>(null);
  const [priority, setPriority] = useState("");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const storedData = localStorageWorker.getById(id);
  const userStories = storedData.userStories;

  const [rowsTask, setRowsTask] = useState(userStories || []);

  const [userStoryData, setUserStoryData] = useState<userStoryType>({
    id: 0,
    name: "",
    description: "",
    priority: Priority.Low,
    state: State.ToDo,
    createdBy: tempUser,
    projectName: project.projectName,
    type: 'userStory'
  });

  const handleOnChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    if (name === "priority") {
      setPriority(value as Priority);
    } else if (name === "state") {
      setState(value as State);
    }
  };
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setUserStoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserStoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (newUserStory: userStoryType) => {
    if (id !== undefined) {
      let project = localStorageWorker.getById(id.toString());

      if (!Array.isArray(project.userStories)) {
        project.userStories = [];
      }
      newUserStory["id"] = Math.random();
      project.userStories.push(newUserStory);

      localStorage.setItem(id.toString(), JSON.stringify(project));

      setRowsTask([...project.userStories]);
    }
  };

  const handleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
    if (rowSelectionModel.length === 1) {
      setSelectedRowTask(rowSelectionModel[0].toString());
    } else {
      setSelectedRowTask(null);
    }
  };

  const handleDelete = () => {
    if (selectedRowTask != null) {
      if (id != undefined) {
        let project = localStorageWorker.getById(id.toString());
        if (project.userStories) {
          const index = project.userStories.findIndex(
            (x: { id: number }) => x.id === Number(selectedRowTask)
          );
          if (index !== -1) {
            project.userStories.splice(index, 1);
            localStorage.setItem(id.toString(), JSON.stringify(project));
            setRowsTask([...project.userStories]);
          }
        }
        setSelectedRowTask(null);
      }
    }
  };

  const columns: GridColDef<(typeof rowsTask)[number]>[] = [
    {
      field: "name",
      headerName: "User story Name",
      type: "string",
      width: 250,
      editable: false,
    },
    {
      field: "description",
      headerName: "User story Description",
      type: "custom",
      width: 250,
      editable: false,
    },
    {
      field: "priority",
      headerName: "User story priority",
      description: "priority",
      type: "singleSelect",
      width: 250,
      editable: false,
    },
    {
      field: "state",
      headerName: "User story state",
      type: "singleSelect",
      description: "state",
      width: 250,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link className="link" to={`/app/projects/${id}/userstory/${params.row.id}/tasklist`}>
              Go to task
            </Link>
            <div>
              <Link className="link" to={`/app/projects/${id}/userstory/${params.row.id}/createtask`}>
                Create Task
              </Link>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="taskList">
      <div className="buttons">
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
        <Link to={`app/projects/${id}/backlog`}>
          <Button variant="contained" color="secondary">
            BACKLOG
          </Button>
        </Link>
      </div>
      {open && (
        <Add
          handleTextAreaChange={handleTextAreaChange}
          slug="task"
          columns={columns}
          setOpen={setOpen}
          handleOnChangeInput={handleOnChangeInput}
          handleSubmit={handleSubmit}
          priority={Priority.Low}
          state={State.ToDo}
          handleOnChangeSelect={handleOnChangeSelect}
        />
      )}
      <DataTable
        columns={columns}
        rows={rowsTask}
        handleRowClick={handleRowClick}
        handleDelete={handleDelete}
        selectedRow={selectedRowTask}
      />
    </div>
  );
};

export default Tasks;
