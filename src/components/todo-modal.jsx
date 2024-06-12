import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const TodoModal = (props) => {
  const { todos, setTodos, task } = props;
  const [form, setForm] = useState({
    task: task ? todos[task.status]?.elements[task.index]?.title || "" : "",
    status: task ? task.status : "open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [...todos];
    if (task && todos[task.status]?.elements[task.index]) {
      newTodos[task.status].elements[task.index].title = form.task;
    } else {
      newTodos
        .find((item) => item.status === form.status)
        .elements.push({ title: form.task });
    }
    setTodos(newTodos);
    props.toggle();
  };

  const handleCancel = () => {
    setForm({ task: "", status: "open" });
    props.toggle();
  };

  return (
    <Modal isOpen={props.open} toggle={props.toggle}>
      <ModalHeader>
        <h1 className="text-center">Add task</h1>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} id="submit">
          <input
            type="text"
            placeholder="Task"
            name="task"
            value={form.task}
            className="form-control my-2"
            onChange={handleChange}
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="form-control my-2"
          >
            <option value="open">open</option>
            <option value="pending">pending</option>
            <option value="inprogress">in progress</option>
            <option value="complete">complete</option>
          </select>
        </form>
      </ModalBody>
      <ModalFooter>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
        <button onClick={handleCancel} className="btn btn-secondary">
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default TodoModal;
