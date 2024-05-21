import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import "./project.scss";
import ProjectList from '../projectList/ProjectList';
import { localStorageWorker } from '../../storage/localStorageWorker';
import TaskType from '../../types/TaskType';

interface ProjectType {
    id: number;
    projectId: string;
    projectName: string;
    projectDescription: string;
    type: string;
    userStories: TaskType[]; 
  }

const Project: React.FC = () => {
    const [projectData, setProjectData] = useState<ProjectType>({
        id: 0, 
        projectId: '', 
        projectName: '',
        projectDescription: '',
        type:'project',
        userStories:[]
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProjectData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newProject = {
            id: Date.now(), 
            projectId: projectData.projectId,
            projectName: projectData.projectName,
            projectDescription: projectData.projectDescription,
            type:projectData.type,
            userStories:projectData.userStories
        };
        try {
            await localStorageWorker.add(newProject.id.toString(), newProject);
            console.log('Project added successfully');
            
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (error) {
            console.error('Error adding project: ', error);
        }

        setProjectData({
            id: 0,
            projectId: '',
            projectName: '',
            projectDescription: '',
            type:'',
            userStories:[]
        });
    };
    return (
        <div className='projects'>
            <div className='form'>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <TextField
                        className='projectId'
                        required
                        id="outlined-required"
                        label="Project ID"
                        variant='filled'
                        color='secondary'
                        value={projectData.projectId}
                        onChange={handleInputChange}
                        name="projectId"
                    />
                    <TextField
                        className='project_name'
                        required
                        id="outlined-required"
                        label="Project Name"
                        variant='filled'
                        color='secondary'
                        value={projectData.projectName}
                        onChange={handleInputChange}
                        name="projectName"
                    />
                    <TextField
                        className='project_description'
                        required
                        id="outlined-required"
                        label="Description"
                        variant='filled'
                        color='secondary'
                        value={projectData.projectDescription}
                        onChange={handleInputChange}
                        name="projectDescription"
                    />
                    <Button type='submit' variant="outlined">Submit</Button>
                </form>
            </div>
            <div className='project_list'>
            <ProjectList />
            </div>
        </div>
    );
};

export default Project;
