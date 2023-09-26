import React, { useState } from "react";
import { TodoModel } from "../../TodoModel";
import PropTypes from "prop-types";
import "./todo.scss";
import { BiEdit, BiCheckCircle } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import dayjs from "dayjs";

const Todo = (props) => {
  const [editing, setStateEditing] = useState(false);
  const [editingText, setStateEditText] = useState(props.todo.text);

  const toggleComplete = () => {
    props.onCompleteChange({
      ...props.todo,
      isComplete: !props.todo.isComplete,
    });
  };

  const toggleEditText = () => {
    setStateEditing(!editing);
  };

  const saveText = () => {
    if (!editing) return;
    props.onTextChange(editingText, props.todo.id);
    toggleEditText();
  };

  const onChangeEditText = (event) => {
    setStateEditText(event.target.value);
  };

  const displayText = () => {
    if (editing) {
      return (
        <input
          onChange={onChangeEditText}
          value={editingText}
          className="todo-item__info"
        />
      );
    } else {
      return <p className="todo-item__info">{props.todo.text}</p>;
    }
  };

  const getClassName = () => {
    const { isComplete } = props.todo;
    return `todo-item ${isComplete ? "complete" : "incomplete"}`;
  };

  console.log(props);

  return (
    <div className={getClassName()}>
      <input
        defaultChecked={props.todo.isComplete}
        onChange={toggleComplete}
        type="checkbox"
      />
      {displayText()}
      {props.todo.dueDate && dayjs(props.todo.dueDate).format("DD.MM.YYYY")}
      <div className="todo-item__actions">
        {editing ? (
          <div>
            <button onClick={saveText} className={"btn--default btn--base"}>
              <BiCheckCircle size={20} />
            </button>
            <button onClick={saveText} className={"btn--default btn--base"}>
              <MdOutlineCancel size={20} />
            </button>
          </div>
        ) : (
          <button onClick={toggleEditText} className={"btn--default btn--base"}>
            <BiEdit size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape(TodoModel),
  onTextChange: PropTypes.func,
  onCompleteChange: PropTypes.func,
};

export default Todo;
