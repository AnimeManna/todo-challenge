import dayjs from "dayjs";

const KEY = "todo-data";
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
const svc = {
  getTodos: () => {
    const data = localStorage.getItem(KEY);
    if (!data) {
      return Promise.resolve([]);
    }
    const parsed = JSON.parse(data);
    return Promise.resolve(parsed);
  },

  updateTodo: async (todo) => {
    const todos = (await svc.getTodos()).map((item) =>
      item.id === todo.id ? todo : item
    );
    localStorage.setItem(KEY, JSON.stringify(todos));
    return Promise.resolve(todo);
  },

  addTodo: async (text, dueDate) => {
    const todos = await svc.getTodos();
    const nextId = Number(new Date());
    const todo = {
      id: nextId,
      text,
      isComplete: false,
      dueDate: dayjs(dueDate),
    };
    localStorage.setItem(KEY, JSON.stringify([...todos, todo]));
    return Promise.resolve(todo);
  },

  updateTextTodo: async (text, id) => {
    const todos = (await svc.getTodos()).map((item) =>
      item.id === id ? { ...item, text } : item
    );
    localStorage.setItem(KEY, JSON.stringify(todos));
    return Promise.resolve(text, id);
  },

  initialize: () => {
    if (!!localStorage.getItem(KEY)) return;
    const firstId = Number(new Date());
    let counter = 0;
    const todos = [
      {
        id: firstId,
        text: "Run the todo app",
        isComplete: true,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Implement addNewTodo in App.js",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Fix the bug where text changes to a todo item are lost on browser refresh",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Match the provided design",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Add a chart for complete and incomplete todo items",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Replace the Edit/Save/Complete buttons with icons",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Add a due date to each todo",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Sort the todo list by due date",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Make all of the tests pass",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
      {
        id: ++counter + firstId,
        text: "Refactor anything in this app to your liking",
        isComplete: false,
        dueDate: randomDate(new Date(2012, 0, 1), new Date()),
      },
    ];
    localStorage.setItem(KEY, JSON.stringify(todos));
  },
};

export default svc;
