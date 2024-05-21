import React, { useState, useEffect } from "react";
import BacklogTable from "../../components/backlogTable/BacklogTable";
import TaskType from "../../types/TaskType";
import { localStorageWorker } from "../../storage/localStorageWorker";
import { useParams } from "react-router-dom";

const Backlog = () => {
  let { projectId } = useParams();
  const [data, setData] = useState<TaskType[]>([]); // Initialize as an empty array

  const fetchData = async () => {
    if (projectId) {
      const dataDb = await localStorageWorker.getAll();
      setData(dataDb as TaskType[]); 
      return dataDb;
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]); 

  let tasks = data.filter((x: TaskType) => x.type === "task" && x.projectId === projectId?.toString());

  return (
    <div>
      <BacklogTable props={tasks} />
    </div>
  );
};

export default Backlog;
