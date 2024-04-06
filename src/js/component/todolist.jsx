import React, { useState } from "react";

const TodoList = () => {
    const [username, setUsername] = useState("")
    const [todoList, setTodoList] = useState([])
    const [newTodo, setNewTodo] = useState("")

    const deleteUser = () => {
        console.log("Delete this user", username);
    };

    const fetchTodoList = (username) => {
        console.log("Fetch To Do List for", username);

        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } 
            throw Error(response.status + "! Something went wrong");
        })
        .then(data => {
            setTodoList(data.todos);
            console.log(data.todos);
        })
        .catch(err => {
            console.log("Error", err);
        });
    };

    return (
        <div>
            <div>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Please enter your desired username"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        setUsername(e.target.value);
                        fetchTodoList(e.target.value); 
                    }
                }}
            />
            <button onClick={deleteUser}>Delete User</button>
            </div>

            <div>

            </div>
         
            <ul>
            {todoList !== undefined && todoList.map((todo) => (
                <li key={todo.id}>
                    {todo.label}
                </li>
            ))}
            </ul>
        </div>
    );
};

export default TodoList;