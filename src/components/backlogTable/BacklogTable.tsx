import React from 'react'
import "./backlogTable.scss"
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import TaskType from '../../types/TaskType'


const BacklogTable = (props:{props:TaskType}) => {
  return (
    <div className='backlogTable'>
      <div className="toDo">
        <div className="title">
          <h3 className='colorTitle'>
            ToDo
          </h3>
          <div className='item'>
            <div className="info">
              <div className="name">
                <b>Task name:</b> TASK1
              </div>
              <div className="desc">
                <b>Description:</b> TASK DESC
              </div>
              <div className="state">
                <b>State:</b> ToDo
              </div>
            </div>
            <div className="assigner">
              <b>Assigner:</b> Patryk
            </div>
            <div className="button">
              <Link to={"s"}>
                <Button variant="outlined">Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="doing">
        <div className="title">
          <h3 className='colorTitle'>
            Doing
          </h3>
        </div>
      </div>
      <div className="done">
        <div className="title">
          <h3 className='colorTitle'>
            Done
          </h3>
        </div>
      </div>
    </div>
  )
}

export default BacklogTable
