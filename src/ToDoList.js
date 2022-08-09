import React from 'react'
import Todo from './ToDo';

// loop over array, for each todo, return a todo component
// key = {todo} makes for unique key name. Now React can update
// todos withour rerendering the whole list
export default function TodoList({ todos, toggleTodo }) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        })
    )
}
