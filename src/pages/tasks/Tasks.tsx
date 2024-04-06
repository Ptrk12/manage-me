
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable'
import { useState } from 'react';
import { localStorageWorker } from '../../storage/localStorageWorker';
import { useParams } from 'react-router-dom';
import Add from '../../components/add/Add';
import AddIcon from '@mui/icons-material/Add';
import { Icon, IconButton, SelectChangeEvent } from '@mui/material';
import userStoryType from '../../types/userStoryType';
import Priority from '../../enums/Priority';
import State from '../../enums/State';
import userType from '../../types/userType';

const Tasks = () => {

  let tempUser = new userType('patryk','b')

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [priority, setPriority] = useState('');
  const [state, setState] = useState('');
  const[open,setOpen] = useState(false);
  const [rows, setRows] = useState(localStorageWorker.getAllItems());
  const [userStoryData, setUserStoryData] = useState<userStoryType>({
    id: 0, 
    name: '', 
    description: '',
    priority: Priority.Low,
    state: State.ToDo,
    createdBy: tempUser
});

const handleOnChangeSelect = (event: SelectChangeEvent) => {
  const { name, value } = event.target;
  if (name === 'priority') {
    setPriority(value as Priority);
  } else if (name === 'state') {
    setState(value as State);
  }
};
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(value)
    setUserStoryData(prevData=>({
      ...prevData,
      [name]:value
      
    }))
}

const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.preventDefault();
  const { name, value } = e.target;
  setUserStoryData(prevData=>({
    ...prevData,
    [name]:value
  }))
}

const handleSubmit = (newUserStory: userStoryType) => {
  localStorageWorker.add(newUserStory.id.toString(), newUserStory);
  // Optionally, you can update the state or perform any other necessary actions
};

const handleRowClick = (rowSelectionModel: GridRowSelectionModel) => {
  if (rowSelectionModel.length === 1) {
    setSelectedRow(rowSelectionModel[0].toString())
  } else {
    setSelectedRow(null);
  }
}

const handleDelete = () => {
  if (selectedRow != null) {
    localStorageWorker.delete(selectedRow);
    setSelectedRow(null);
  }
};

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'name',
      headerName: 'Task Name',
      type:"string",
      width: 250,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Task Description',
      type:"custom",
      width: 250,
      editable: false,
    },
    {
      field: 'priority',
      headerName: 'Task priority',
      description:'priority',
      type:'singleSelect',
      width: 250,
      editable: false,
    },
    {
      field: 'state',
      headerName: 'Task state',
      type:'singleSelect',
      description:'state',
      width: 250,
      editable: false,
    }
  ];
  const params = useParams();
  console.log(userStoryData)
  return (
    <div className='taskList'>
    <IconButton onClick={()=>setOpen(true)}>
      <AddIcon />
    </IconButton>
    {open && <Add handleTextAreaChange={handleTextAreaChange} slug="task" columns={columns} 
    setOpen={setOpen} handleOnChangeInput={handleOnChangeInput} handleSubmit={handleSubmit} 
    priority={Priority.Low} state={State.ToDo}
    handleOnChangeSelect={handleOnChangeSelect}
    />}
    <DataTable columns={columns} rows={rows} handleRowClick={handleRowClick} handleDelete={handleDelete} 
    selectedRow={selectedRow}/>
  </div>
  )
}

export default Tasks
