import React, { useState } from 'react';
import "./TodoList.css"
const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const addTodo = () => {
    if (newItem && newDueDate) {
      setTodoList([...todoList, { item: newItem, duedate: newDueDate, done: false }]);
      setNewItem('');
      setNewDueDate('');
    } else {
      alert('Please provide valid inputs.');
    }
  };

  const editTodo = (index, newItem, newDueDate) => {
    const updatedList = [...todoList];
    updatedList[index].item = newItem;
    updatedList[index].duedate = newDueDate;
    setTodoList(updatedList);
  };

  const deleteTodo = (index) => {
    const updatedList = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedList);
  };

  const markAsDone = (index) => {
    const updatedList = [...todoList];
    updatedList[index].done = !updatedList[index].done;
    setTodoList(updatedList);
  };

  const pendingTasks = todoList.filter((todo) => !todo.done).length;
  const completedTasks = todoList.filter((todo) => todo.done).length;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter todo item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <p>Total Tasks: {todoList.length}</p>
        <p>Tasks Completed: {completedTasks}</p>
        <p>Tasks Pending: {pendingTasks}</p>
        {todoList.map((todo, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={todo.done || false}
              onChange={() => markAsDone(index)}
            />
            <span>{todo.item}</span>
            <span>{todo.duedate}</span>
            <button onClick={() => editTodo(index, prompt('Enter new todo item:'), prompt("Enter a date in the format YYYY-MM-DD:"))}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
