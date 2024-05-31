import React, { useEffect, useState } from 'react';
import { localStorageWorker } from '../../storage/localStorageWorker';
import { Link, useParams } from 'react-router-dom';
import DataTable from '../../components/dataTable/DataTable';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import projectType from '../../types/projectType';
import userStoryType from '../../types/userStoryType';

const TaskList = () => {
  const [items, setItems] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false); 
  const { projectId, userStoryId } = useParams<{ projectId: string, userStoryId: string }>();

  const fetchItems = async () => {
    let items = await localStorageWorker.getAll();
    items = items.filter(item => !Array.isArray(item));
    setItems(items);
  };

  useEffect(() => {
    fetchItems();
  }, [refresh]); 

  useEffect(() => {
    const handleStorageChange = () => {
      setRefresh(prev => !prev);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);



  let project: projectType = items.find((x: projectType) => x.id.toString() === projectId);
  let userStoryInfo: userStoryType | undefined;
  if (project) {
    const userStories = project.userStories;
    if (userStories !== undefined) {
      userStoryInfo = userStories.find((x: userStoryType) => x.id.toString() === userStoryId);
    }
  }

  let tasks = items.filter(x => x.type === 'task' && x.projectId === projectId && x.userStoryId === userStoryId);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [rows, setRows] = useState(tasks);

  useEffect(() => {
    setRows(tasks);
  }, [selectedRow, tasks]);


  const handleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
    if (rowSelectionModel.length === 1) {
      setSelectedRow(rowSelectionModel[0].toString());
    } else {
      setSelectedRow(null);
    }
  };

  const handleDelete = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (selectedRow != null) {
      if (e) {
        e.preventDefault();
      }
      await localStorageWorker.delete(selectedRow);
      setSelectedRow(null);
      setRefresh(prev => !prev); 
    }
  };
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'name',
      headerName: 'Task Name',
      width: 250,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Task description',
      width: 250,
      editable: false,
    },
    {
      field: 'assigner',
      headerName: 'Assigner',
      width: 130,
      editable: false,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 130,
      editable: false,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 100,
      editable: false,
    },
    {
      field: 'startDateDate',
      headerName: 'Start date',
      width: 220,
      editable: false,
    },
    {
      field: 'endDateDate',
      headerName: 'End date',
      width: 220,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        if (selectedRow === params.row.id.toString()) {
          return (
            <div className='action'>
              <Link className='link' to={`/app/projects/${projectId}/userstory/${userStoryId}/createtask?taskId=${selectedRow}`}>
                Details
              </Link>
            </div>
          );
        } else {
          return null;
        }
      }
    }
  ];

  return (
    <div className='taskList'>
      <h3>Tasks list for user story: {userStoryInfo?.name}</h3>
      <DataTable columns={columns} rows={rows} handleRowClick={handleRowClick} handleDelete={handleDelete} selectedRow={selectedRow} />
    </div>
  );
};

export default TaskList;
