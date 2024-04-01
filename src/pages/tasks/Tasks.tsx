
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable'
import { useState } from 'react';
import { localStorageWorker } from '../../storage/localStorageWorker';
import { useParams } from 'react-router-dom';
import Add from '../../components/add/Add';
import AddIcon from '@mui/icons-material/Add';
import { Icon, IconButton } from '@mui/material';

const Tasks = () => {

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const[open,setOpen] = useState(false);
  const [rows, setRows] = useState(localStorageWorker.getAllItems());

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'taskName',
      headerName: 'Task Name',
      type:"string",
      width: 250,
      editable: false,
    },
    {
      field: 'taskDescription',
      headerName: 'Task Description',
      type:"custom",
      width: 250,
      editable: false,
    }
  ];
  const params = useParams();
  
  return (
    <div className='taskList'>
      <IconButton onClick={()=>setOpen(true)}>
        <AddIcon />
      </IconButton>
      {open && <Add slug="task" columns={columns} setOpen={setOpen}/>}
      ASDASDASD
      {/* <DataTable /> */}
    </div>
  )
}

export default Tasks
