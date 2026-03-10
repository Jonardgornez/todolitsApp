# React Todo App – Improvements for Scalability and Performance

This guide shows simple improvements to make a React Todo app **cleaner, scalable, and faster** when the project grows.

---

# 1. Use Objects Instead of Strings for Tasks

## Problem

Tasks are stored as simple strings.

```js
["Task 1", "Task 2"];
```

This makes it harder to add new features later.

Examples of features that become difficult:

- mark as completed
- add priority
- add due date

---

## Better Structure

Use objects.

```javascript
[
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: false },
];
```

---

## Example Implementation

### Add Task

```javascript
const handleSubmit = () => {
  if (task.trim() === "") return;

  const newTask = {
    id: Date.now(),
    name: task,
    completed: false,
  };

  setTasks([...tasks, newTask]);
  setTask("");
};
```

---

# 2. Avoid Using Index as React Key

## Problem

Using array index as key.

```jsx
tasks.map((task, index) => <TodoLists key={index} />);
```

This can cause rendering problems when items are deleted or reordered.

---

## Better Solution

Use the task id.

```jsx
tasks.map((task) => <TodoLists key={task.id} task={task} />);
```

---

# 3. Reduce Prop Drilling

## Problem

Too many props passed through components.

Example:

```jsx
<TodoLists
  name={task}
  index={index}
  tasks={tasks}
  setTasks={setTasks}
  setShowModal={setShowModal}
  setId={setId}
  setUpdateName={setUpdateName}
/>
```

When apps grow this becomes messy.

---

## Solution: Use React Context

### Create Context

```javascript
import { createContext } from "react";

export const TaskContext = createContext();
```

---

### Provide Context

```javascript
<TaskContext.Provider value={{ tasks, setTasks }}>
  <TodoLists />
</TaskContext.Provider>
```

---

### Use Context

```javascript
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const { tasks, setTasks } = useContext(TaskContext);
```

This removes the need to pass props through many components.

---

# 4. Use useReducer for Complex State

If state becomes large, `useReducer` is cleaner than many `useState`.

---

## Example Reducer

```javascript
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, name: action.payload.name }
          : task,
      );

    default:
      return state;
  }
};
```

---

## Using useReducer

```javascript
const [tasks, dispatch] = useReducer(reducer, []);
```

---

## Dispatch Example

```javascript
dispatch({
  type: "ADD_TASK",
  payload: {
    id: Date.now(),
    name: task,
  },
});
```

---

# 5. Memoize Components to Prevent Unnecessary Re-render

If there are many tasks, React will re-render everything.

Use `React.memo`.

---

## Example

```javascript
import React from "react";

const TodoLists = ({ task }) => {
  return <li>{task.name}</li>;
};

export default React.memo(TodoLists);
```

Now the component only re-renders when props change.

---

# 6. Improve Folder Structure

A scalable project structure looks like this:

```
src
 ├ components
 │   ├ Button.jsx
 │   ├ Modal.jsx
 │   ├ TodoForm.jsx
 │   └ TodoLists.jsx
 │
 ├ context
 │   └ TaskContext.js
 │
 ├ hooks
 │   └ useTasks.js
 │
 ├ utils
 │   └ helpers.js
 │
 ├ App.jsx
 └ main.jsx
```

This makes large projects easier to maintain.

---

# 7. Use Custom Hooks

Move logic out of components.

---

## Example Hook

```javascript
import { useState } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (name) => {
    setTasks((prev) => [...prev, { id: Date.now(), name }]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, deleteTask };
};
```

---

# 8. Lazy Load Heavy Components

For larger apps.

---

## Example

```javascript
import React, { lazy, Suspense } from "react";

const Modal = lazy(() => import("./components/Modal"));

<Suspense fallback={<div>Loading...</div>}>
  <Modal />
</Suspense>;
```

This loads the component only when needed.

---

# 9. Clean Naming

Use clear names.

Bad:

```javascript
showMdal;
```

Better:

```javascript
showModal;
```

Clean naming makes code easier to understand.

---

# 10. Keep Components Small

Try to keep components under **150–200 lines**.

If a component grows too large, split it into smaller components.

---

# Summary

Important improvements:

1. Use **objects with id** for tasks
2. Do **not use index as key**
3. Reduce **prop drilling**
4. Use **useReducer for complex state**
5. Use **React.memo for list components**
6. Improve **folder structure**
7. Use **custom hooks**
8. Use **lazy loading when needed**

Following these practices helps your React apps stay:

- scalable
- maintainable
- performant

---

End of guide.
