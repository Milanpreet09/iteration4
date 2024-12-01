import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const AddForm = () => {
  const { addList } = useContext(TaskContext);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addList(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New List</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List Name"
        required
      />
      <button type="submit">Add List</button>
    </form>
  );
};

export default AddForm;
