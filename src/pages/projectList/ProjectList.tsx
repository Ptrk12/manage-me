import React, { useState, useEffect } from 'react';
import { localStorageWorker } from '../../storage/localStorageWorker';
import "./projectList.scss";
import { Link } from 'react-router-dom';
import { GridColDef, GridRowSelectionModel, DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DataTable from '../../components/dataTable/DataTable';

const ProjectList = () => {
  const items = localStorageWorker.getAllItems();
  const projects = items.filter(x=>x.type==="project");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [rows, setRows] = useState(projects);
  useEffect(() => {
    setRows(projects);
  }, [selectedRow]);

  const handleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
    if (rowSelectionModel.length === 1) {
      setSelectedRow(rowSelectionModel[0].toString())
    } else {
      setSelectedRow(null);
    }
  }

  const handleSetProjectActive = (projectId: string) => {
    const allItems = localStorageWorker.getAllItems();
    for (let i = 0; i < allItems.length; i++) {
      let item = localStorageWorker.getById(allItems[i].id.toString())
      item.isActive = false;
      localStorage.setItem(allItems[i].id.toString(),JSON.stringify(item));
    }
    let foundProject = localStorageWorker.getById(projectId);
    foundProject.isActive = true;
    localStorage.setItem(projectId,JSON.stringify(foundProject))
  }

  const handleDelete = () => {
    if (selectedRow != null) {
      localStorageWorker.delete(selectedRow);
      setSelectedRow(null);
    }
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'projectId',
      headerName: 'Project Id',
      width: 250,
      editable: false,
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      width: 250,
      editable: false,
    },
    {
      field: 'projectDescription',
      headerName: 'Project Description',
      width: 250,
      editable: false,
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 250,
      type: 'boolean',
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        return <div className='action'>
          <Link className='link' to={`/app/projects/${params.row.id}`}>
            GO INTO
          </Link>
          <IconButton onClick={() => handleSetProjectActive(params.row.id.toString())}>
            <CheckIcon></CheckIcon>
          </IconButton>
        </div>
      }
    }
  ];

  return (
    <div>
      <h3>Projects list</h3>
      <DataTable columns ={columns} rows={rows} handleRowClick={handleRowClick} handleDelete={handleDelete} selectedRow={selectedRow} />
  </div>
  );
}

export default ProjectList;
