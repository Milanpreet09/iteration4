import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Task Manager</h1>
      <Link to="/">Home</Link>
      <Link to="/add">Add List</Link>
    </nav>
  );
};

export default Navbar;
