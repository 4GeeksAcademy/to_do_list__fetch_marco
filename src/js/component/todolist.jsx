import React, { useState } from "react";

const TodoList = () => {
    const [username, setUsername] = useState("");
    const [todoList, setTodoList] = useState([]);

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
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Please enter your desired username"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        setUsername(e.target.value);
                        fetchTodoList(e.target.value); // Fetch todo list directly after updating username
                    }
                }}
            />
            <button onClick={deleteUser}>Delete User</button>
            {/* <ul>
            {todoList.todos.map((todo) => (
                <li key={todo.id}>
                {todo.label} - {todo.is_done ? "Done" : "Not Done"}
                </li>
            ))}
            </ul> */}
        </div>
    );
};

export default TodoList;