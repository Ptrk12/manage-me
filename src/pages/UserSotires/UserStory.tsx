import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import { useEffect, useState } from "react";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { Link, useParams } from "react-router-dom";
import Add from "../../components/add/Add";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, SelectChangeEvent } from "@mui/material"; // Removed unused imports
import userStoryType from "../../types/userStoryType";
import Priority from "../../enums/Priority";
import State from "../../enums/State";
import "./userStory.scss"; // Corrected the import path
import React from "react";


const Tasks = () => {
  const { id } = useParams();
  const [selectedRowTask, setSelectedRowTask] = useState<string | null>(null);
  const [priority, setPriority] = useState("");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [rowsTask, setRowsTask] = useState<userStoryType[]>([]);
  const [userStoryData, setUserStoryData] = useState<userStoryType>({
    id: 0,
    name: "",
    description: "",
    priority: Priority.Low,
    state: State.ToDo,
    projectName: "",
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

  const fetchData = async () => {
    if (id != undefined) {
      console.log("Fetching project with ID:", id);
      const storedData = await localStorageWorker.getById(id.toString());
      if (storedData) {
        const userStories = storedData.userStories || [];
        setRowsTask(userStories);
        setUserStoryData((prevData) => ({
          ...prevData,
          projectName: storedData.projectName || "",
        }));
      } else {
        console.log("No project found with ID:", id);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (newUserStory: userStoryType) => {
    if (id !== undefined) {
      const project = await localStorageWorker.getById(id.toString());
      if (project != null) {
        if (!Array.isArray(project?.userStories)) {
          project.userStories = [];
        }
        newUserStory.id = Math.random();
        project.userStories.push(newUserStory);

        localStorageWorker.updateById(id.toString(), project);
        setRowsTask([...(project.userStories || [])]);
      }
    }
  };


  const handleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
    if (rowSelectionModel.length === 1) {
      setSelectedRowTask(rowSelectionModel[0].toString());
    } else {
      setSelectedRowTask(null);
    }
  };

  const handleDelete = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    if (selectedRowTask !== null && id !== undefined) {
      try {
        const project = await localStorageWorker.getById(id.toString());
        if (project && project.userStories) {

          const updatedUserStories = project.userStories.filter(x => x.id != selectedRowTask)
          project.userStories = updatedUserStories;
          await localStorageWorker.updateById(id.toString(), project);

          fetchData();
        } else {
          console.log("No project or user stories found");
        }
      } catch (error) {
        console.error("Error deleting user story:", error);
      }
    } else {
      console.log("Invalid selectedRowTask or id");
    }
  };


  const columns: GridColDef<userStoryType>[] = [
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
      renderCell: (params) => (
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
      ),
    },
  ];

  return (
    <div className="taskList">
      <div className="title">
        User story list
      </div>
      <div className="buttons">
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
        <Link to={`/app/projects/${id}/backlog`}>
          <Button variant="contained" color="secondary">
            BACKLOG
          </Button>
        </Link>
      </div>
      {open && (
        <Add
          handleTextAreaChange={handleTextAreaChange}
          slug="user story"
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
