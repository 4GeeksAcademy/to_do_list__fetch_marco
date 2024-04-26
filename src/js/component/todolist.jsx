import React, { useState } from "react";

const TodoList = () => {
    const [username, setUsername] = useState("")
    const [todoList, setTodoList] = useState([])
    const [newTodo, setNewTodo] = useState("")

    const createUser = () => {
        if (username !== "") {
            fetch(`https://playground.4geeks.com/todo/users/${username}`, {
                method: "POST",
                // body: JSON.stringify(username),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } 
                throw Error(response.status + "! Something went wrong");
            })
            .then(data => {
                fetchTodoList(username); 
            })
            .catch(err => {
                console.log("Error", err);
            });
        } else {
            alert("Username cannot be empty")
        }
    }

    const fetchTodoList = (username) => {
        console.log("Fetch To Do List for", username);

        if (username !== "") {
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
        } else {
            alert("Username cannot be empty")
        }
    };

    const addTodo = () => {
        console.log("Add this new task to the list", newTodo);

        if (username === "") {
            alert("Please enter a username first")
            return;
        }

        if (newTodo !== "") {
            fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
                method: "POST",
                body: JSON.stringify({
                    label: newTodo,
                    is_done: false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } 
                throw Error(response.status + "! Something went wrong");
            })
            .then(data => {
                fetchTodoList(username); 
                setNewTodo(""); 
            })
            .catch(err => {
                console.log("Error", err);
            });
        } else {
            alert("New todo cannot be empty")
        }
    }

    const deleteTodo = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.status + "! Something went wrong");
            }
        })
        .then(data => {
            fetchTodoList(username);
        })
        .catch(err => {
            console.log("Error", err);
        });
    };

    const deleteUser = () => {
        console.log("Delete this user", username);

        if (username !== "") {
        fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
        }
        }).then(response => {
            if (!response.ok) {
                throw Error(response.status + "! Something went wrong");
            }
        }).then(() => {
            setUsername("");
            setTodoList([])
            setNewTodo("")
            alert("User deleted succesfully")
        }).catch(err => {
            console.log("Error", err);
        });
        } else {
            alert("Empty user cannot be deleted")
        }  
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {username ? <h2>{`${username}'s To Do List`}</h2> : <h2>My To Do List</h2>}
            <div>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Please enter your desired username"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        // setUsername(e.target.value);
                        fetchTodoList(e.target.value); 
                        createUser(e.target.value);
                    }
                    
                }}
                style={{ width: '265px' }}
            />
            
            </div>
            <div>
                <input
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Add a task"
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            addTodo();
                        }
                    }}
                />
                <button onClick={addTodo}>Add task</button> 
            </div>
            <ul>
            {todoList !== undefined && todoList.map(todo => (
                <li key={todo.id}>
                    {todo.label}
                    <i 
                    className="fas fa-trash-alt" 
                    style={{ cursor: "pointer" }}
                    onClick={()=> deleteTodo(todo.id)}></i>
                </li>
            ))}
            </ul>
            <button onClick={deleteUser}>Delete User & Tasks</button>
        </div>
    );
};

export default TodoList;