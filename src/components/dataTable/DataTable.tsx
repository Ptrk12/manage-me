import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import React from 'react'
import "./dataTable.scss"

type Props = {
    columns:GridColDef[],
    rows:object[];
    handleRowClick: (rowSelectionModel: GridRowSelectionModel) => void;
    selectedRow: string|null;
    handleDelete: () => void;
}

const DataTable = (props:Props) => {
    return (
        <div className='projectList'>
        {props.selectedRow !== null && (
          <form onClick={props.handleDelete} className='deleteForm'>
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
          rows={props.rows}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={props.handleRowClick}
          disableMultipleRowSelection
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
      );
    }


export default DataTable
