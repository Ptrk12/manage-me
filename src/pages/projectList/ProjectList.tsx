import React, { useState, useEffect, useCallback } from 'react';
import { localStorageWorker } from '../../storage/localStorageWorker'; 
import "./projectList.scss";
import { Link } from 'react-router-dom';
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable';

const ProjectList = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    const items = await localStorageWorker.getAll();
    const projects = items.filter(x => x.type === "project");
    setProjects(projects);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
    if (rowSelectionModel.length === 1) {
      setSelectedRow(rowSelectionModel[0].toString());
    } else {
      setSelectedRow(null);
    }
  };

  const handleDelete = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    if (selectedRow != null) {
      try {
        await localStorageWorker.delete(selectedRow);
        await fetchProjects(); 
        setSelectedRow(null);
      } catch (error) {
        console.error('Error deleting project: ', error);
      }
    }
  };

  const columns: GridColDef<(typeof projects)[number]>[] = [
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
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        return (
          <div className='action'>
            <Link className='link' to={`/app/projects/${params.row.id}`}>
              GO INTO
            </Link>
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <h3>Projects list</h3>
      <DataTable 
        columns={columns} 
        rows={projects} 
        handleRowClick={handleRowClick} 
        handleDelete={handleDelete} 
        selectedRow={selectedRow} 
      />
    </div>
  );
};

export default ProjectList;
