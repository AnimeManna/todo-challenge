import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { TodoListModel } from "../../TodoModel";
import { connect } from "react-redux";
import { completeTodo, getTodos, updateTextTodo } from "../../todoActions";
import dayjs from "dayjs";

const TodoList = ({
  todos,
  getTodos,
  onTodoTextChange,
  onTodoCompleteChange,
}) => {
  const [filtered, setFiltered] = useState(false);

  const filterByOnChange = () => {
    setFiltered(!filtered);
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const renderTodoList = (todos) => {
    return todos
      .filter(filterTodos)
      .sort((a, b) => (dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? 1 : -1))
      .map(mapTodoObjectToComponent);
  };

  const filterTodos = (todo) => (filtered ? !todo.isComplete : true);

  const mapTodoObjectToComponent = (todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      onTextChange={onTodoTextChange}
      onCompleteChange={onTodoCompleteChange}
    />
  );

  return <div className="todo-list">{renderTodoList(todos)}</div>;
};

TodoList.propTypes = TodoListModel;

const mapStateToProps = (state) => ({
  todos: state.todos ?? [],
});

const mapDispatchToProps = (dispatch) => ({
  onTodoTextChange: (text, id) => dispatch(updateTextTodo(text, id)),
  onTodoCompleteChange: (todo) => dispatch(completeTodo(todo)),
  getTodos: () => dispatch(getTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
