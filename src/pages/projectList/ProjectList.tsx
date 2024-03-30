import React, { useState, useEffect } from 'react';
import { localStorageWorker } from '../../storage/localStorageWorker';
import "./projectList.scss";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { GridColDef, GridRowSelectionModel, DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';

const ProjectList = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [rows, setRows] = useState(localStorageWorker.getAllItems());

  useEffect(() => {
    setRows(localStorageWorker.getAllItems());
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
          <Link to={`/projects/${params.row.id}`}>
            VIEW
          </Link>
          <IconButton onClick={() => handleSetProjectActive(params.row.id.toString())}>
            <CheckIcon></CheckIcon>
          </IconButton>
        </div>
      }
    }
  ];

  return (
    <div className='projectList'>
    {selectedRow !== null && (
      <form onClick={handleDelete} className='deleteForm'>
        <Button variant="outlined" type='submit'>
          Delete
        </Button>
      </form>
    )}
    <DataGrid
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 }
        }
      }}
      className='dataGrid'
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      onRowSelectionModelChange={handleRowClick}
      disableMultipleRowSelection
      disableColumnFilter
      disableDensitySelector
      disableColumnSelector
    />
  </div>
  );
}

export default ProjectList;
