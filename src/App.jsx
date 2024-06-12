import { useState } from "react";
import TodoModal from "./components/todo-modal";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState({});
  const [todos, setTodos] = useState([
    { id: 1, status: "open", elements: [{ title: "task-1" }] },
    { id: 2, status: "pending", elements: [{ title: "task-2" }] },
    { id: 3, status: "inprogress", elements: [{ title: "task-3" }] },
    { id: 4, status: "complete", elements: [{ title: "task-4" }] },
  ]);

  const openModal = () => {
    setModal(true);
  };

  const deleteTask = (status, index) => {
    const newTodos = [...todos];
    newTodos.find((item) => item.status === status).elements.splice(index, 1);
    setTodos(newTodos);
  };

  const editTask = (status, index) => {
    setTask({ status, index });
    setModal(true);
  };

  const closeModal = () => {
    setTask({});
    setModal(false);
  };

  return (
    <div className="container">
      <TodoModal
        open={modal}
        toggle={closeModal}
        todos={todos}
        setTodos={setTodos}
        task={task}
      />
      <div className="row mt-4">
        {todos.map((item) => (
          <div key={item.id} className={`col-md-3 card status-${item.status}`}>
            <div className="card mb-4 ">
              <div className="card-header">
                <h1 className="text-center">{item.status}</h1>
              </div>
              <div className="card-body">
                {item.elements.map((el, index) => (
                  <div
                    key={index}
                    className="d-flex gap-2 align-items-center justify-content-center"
                  >
                    <p>{el.title}</p>
                    <button
                      className="btn btn-info"
                      onClick={() => editTask(item.status, index)}
                    >
                      edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(item.status, index)}
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <button className="btn btn-success" onClick={openModal}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
