import React, { Component } from 'react';
import uniqid from 'uniqid';

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: {
        text: '',
        id: uniqid(),
        isEditing: false,
      },
      tasks: [],
    };
  }

  handleAddChange = (e) => {
    this.setState(
      (prevState, props) => ({
        task: {
          text: e.target.value,
          id: this.state.task.id,
          isEditing: false,
        },
      }),
      () => {
        console.log('asdf');
        console.log('asdf');
      }
    );
  };

  handleEditChange = (e, thisTask) => {
    //find the correct task first!
    let theIndex = this.state.tasks.findIndex(
      (tasksTask) => tasksTask === thisTask
    );

    let changedTask = thisTask;
    changedTask.text = e.target.value;

    let newTasksArray2 = this.state.tasks;
    newTasksArray2[theIndex] = changedTask;

    this.setState({ tasks: newTasksArray2 }, () => {
      console.log('lol', this.state.tasks);
    });
  };

  handleDelete = (e, thisTask) => {
    //create a new array to pass to state without that one
    let newTasksArray = this.state.tasks.filter(
      (item) => item.id !== thisTask.id
    );
    this.setState((prevState) => ({
      tasks: newTasksArray,
    }));
    console.log(this.state);
  };

  // Click on Edit button
  handleEdit = (e, thisTask) => {
    //which index? -matches task
    let theIndex = this.state.tasks.findIndex(
      (tasksTask) => tasksTask === thisTask
    );

    let changedTask = thisTask;
    changedTask.isEditing = true;

    let newTasksArray2 = this.state.tasks;
    newTasksArray2[theIndex].isEditing = true;

    this.setState((prevState) => ({
      tasks: newTasksArray2,
    }));
  };

  onSubmitTask = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: '',
        id: uniqid(),
        isEditing: false,
      },
    }));
  };

  //change this task's isEditing to be false now, since we're done editing
  onSubmitEdit = (e, thisTask) => {
    e.preventDefault();

    console.log('onsubmitedit');
    let theIndex = this.state.tasks.findIndex(
      (tasksTask) => tasksTask === thisTask
    );

    let newTasksArray2 = this.state.tasks;
    newTasksArray2[theIndex].isEditing = false;

    this.setState({
      tasks: newTasksArray2,
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleAddChange}
            value={task.text}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.isEditing ? (
                <EditTemplate
                  task={task}
                  handleEditChange={(e) => this.handleEditChange(e, task)}
                  handleOnSubmitEdit={(e) => this.onSubmitEdit(e, task)}
                />
              ) : (
                <ViewTemplate
                  task={task}
                  editHandler={(e) => this.handleEdit(e, task)}
                  deleteHandler={(e) => this.handleDelete(e, task)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

function ViewTemplate({ task, editHandler, deleteHandler }) {
  return (
    <div>
      {task.text} <button onClick={(e) => editHandler(e, task)}>edit</button>
      <button id={task.id} onClick={(e) => deleteHandler(e, task)}>
        Delete
      </button>
    </div>
  );
}

function EditTemplate({ task, handleEditChange, handleOnSubmitEdit }) {
  return (
    <div>
      <form onSubmit={(e) => handleOnSubmitEdit(e, task)}>
        {/* <label htmlFor="taskEditInput">Enter task</label> */}
        <input
          onChange={(e) => handleEditChange(e, task)}
          value={task.text}
          type="text"
          id="taskEditInput"
        />
      </form>
    </div>
  );
}
