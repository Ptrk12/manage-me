import React from "react";
import BacklogTable from "../../components/backlogTable/BacklogTable";
import TaskType from "../../types/TaskType";
import Priority from "../../enums/Priority";
import State from "../../enums/State";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { useParams } from "react-router-dom";


const Backlog = () => {
  let { projectId } = useParams();

  const data = localStorageWorker.getAllItems();
  let tasks = data.filter((x:TaskType) => x.type === "task" && x.projectId === projectId?.toString());

  return (
    <div>
      <BacklogTable props={tasks} />
    </div>
  );
};

export default Backlog;
