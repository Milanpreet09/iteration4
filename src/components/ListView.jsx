import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const ListView = () => {
  const { lists, deleteList, setCurrentListId } = useContext(TaskContext);

  return (
    <div>
      <h2>Lists</h2>
      {lists.length === 0 ? (
        <p>No lists available. Add a new list!</p>
      ) : (
        <ul>
          {lists.map((list) => (
            <li key={list.id}>
              <h3>{list.name}</h3>
              <button onClick={() => setCurrentListId(list.id)}>View</button>
              <button onClick={() => deleteList(list.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListView;
