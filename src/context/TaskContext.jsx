import React, { createContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("taskLists");
    return savedLists ? JSON.parse(savedLists) : [];
  });
  const [currentListId, setCurrentListId] = useState(null);

  useEffect(() => {
    localStorage.setItem("taskLists", JSON.stringify(lists));
  }, [lists]);

  const addList = (name) => {
    setLists([...lists, { id: Date.now(), name, items: [] }]);
  };

  const deleteList = (id) => {
    setLists(lists.filter((list) => list.id !== id));
    if (currentListId === id) setCurrentListId(null);
  };

  const addItem = (listId, task, priority) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, items: [...list.items, { id: Date.now(), task, priority, completed: false }] }
          : list
      )
    );
  };

  const deleteItem = (listId, itemId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  };

  const toggleComplete = (listId, itemId) => {
    setLists(
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : list
      )
    );
  };

  return (
    <TaskContext.Provider value={{ lists, addList, deleteList, currentListId, setCurrentListId, addItem, deleteItem, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
