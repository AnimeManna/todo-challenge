import React, { Component } from "react";
import TodoList from "./components/todo/TodoList";
import "./App.scss";
import "./button.scss";
import { addTodo } from "./todoActions";
import { connect } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dayjs from "dayjs";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: "",
      dueDate: null,
    };
    this.textInputChange = this.textInputChange.bind(this);
    this.dateInputChange = this.dateInputChange.bind(this);
  }

  textInputChange = (e) => {
    this.setState({ ...this.state, newTodo: e.target.value });
  };

  dateInputChange = (e) => {
    this.setState({ ...this.tate, dueDate: e.target.value });
  };

  addNewTodo = () => {
    this.props.onAddNewTodo(this.state.newTodo, this.dueDate);
  };

  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="header__title">Todo App</h1>
        </header>
        <div className="progress">
          <CircularProgressbar
            value={this.props.completedTodos.length}
            maxValue={this.props.todos.length}
            styles={buildStyles({
              pathColor: "blue",
              trailColor: "rgb(0, 184, 92)",
            })}
          />
        </div>
        <div className="add-todo">
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.textInputChange}
          ></input>
          <div className="add-todo__date-picker">
            <label className="add-todo__date-picker__label">Due date</label>
            <input
              type="date"
              className="add-todo__date-picker__input"
              onChange={this.dateInputChange}
            />
          </div>
          <button
            className={"btn--default add-todo__button"}
            onClick={this.addNewTodo}
          >
            Add
          </button>
        </div>
        <TodoList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos ?? [],
  completedTodos: (state.todos ?? []).filter((item) => item.isComplete),
});

const mapDispatchToProps = (dispatch) => ({
  onAddNewTodo: (text, dueDate) => dispatch(addTodo(text, dueDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
