import { GridColDef } from '@mui/x-data-grid';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import "./add.scss"

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Add = (props: Props) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className='add'>
            <div className="modal">
                <IconButton className='closeButton' onClick={() => props.setOpen(false)}>
                    <CloseIcon color="action" />
                </IconButton>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter(item => item.field !== "id")
                        .map(column => (
                            <div className="item" key={column.field}>
                                {column.type === "custom" ? (
                                    <>
                                        <label>{column.headerName}</label>
                                        <textarea name="taskDesc" id="taskDesc" cols={87} rows={20}></textarea>
                                    </>
                                ) : (
                                    <>
                                        <label>{column.headerName}</label>
                                        <input type={column.type} placeholder={column.field} />
                                    </>
                                )}
                            </div>
                        ))}
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>

    )
}

export default Add
