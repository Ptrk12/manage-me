import React from 'react'
import BacklogTable from '../../components/backlogTable/BacklogTable'
import TaskType from '../../types/TaskType'
import Priority from '../../enums/Priority'
import State from '../../enums/State'


const test:TaskType ={
  id:1,
  name:"Task1",
  description:"description",
  projectName:"Project 1",
  workHours:2,
  userStoryId:"12",
  projectId:"12",
  priority: Priority.High,
  state: State.ToDo,
  assigner:"Patryk",
  type:"task"
}

const Backlog = () => {
  return (
    <div>
      <BacklogTable props={test} />
    </div>
  )
}

export default Backlog
