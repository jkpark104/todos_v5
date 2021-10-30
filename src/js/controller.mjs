import axios from 'axios';
import todos from './model.mjs';
import render from './view.mjs';
// import ajax from './utils/xhr.js';
// import ajax from './utils/1.promise.js';
// import ajax from './utils/2.fetch.js';
import ajax from './utils/3.axios.js';

// DOM Nodes
const $newTodo = document.querySelector('.new-todo');
const $toggleAll = document.querySelector('.toggle-all');
const $todoList = document.querySelector('.todo-list');
const $filters = document.querySelector('.filters');
const $clearCompleted = document.querySelector('.clear-completed');

// state function
const changeStateWith = newTodos => {
  todos.setTodos(newTodos);
  render(todos.state, todos.currentFilter);
};

const changeFilterWith = newFilter => {
  todos.setFilter(newFilter);
  render(todos.state, todos.currentFilter);
};

const fetchTodos = async () => {
  // ajax.get('/todos').then(todos => {
  //   changeStateWith(todos);
  // });
  // --------------------
  try {
    const { data: newTodos } = await axios.get('/todos');
    changeStateWith(newTodos);
  } catch (e) {
    console.error(e);
  }

  // GET /todos/1 -> ID가 1번인 데이터 get

  // changeStateWith([
  //   { id: 3, content: 'JavaScript', completed: false },
  //   { id: 2, content: 'CSS', completed: true },
  //   { id: 1, content: 'HTML', completed: false }
  // ]);
};

const generateTodoId = () =>
  Math.max(...todos.state.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  // changeStateWith([
  //   { id: generateTodoId(), content, completed: false },
  //   ...todos.state
  // ]);
  // POST /todos { id: generateTodoId(), content, completed: false }
  ajax
    .post('/todos', { id: generateTodoId(), content, completed: false })
    .then(todos => {
      changeStateWith(todos);
    });
  // -----------------
  // try {
  //   const { data: newTodos } = await axios.post('/todos', {
  //     id: generateTodoId(),
  //     content,
  //     completed: false
  //   });
  //   changeStateWith(newTodos);
  // } catch (e) {
  //   console.error(e);
  // }
};

const toggleTodoCompleted = id => {
  // changeStateWith(
  //   todos.state.map(todo =>
  //     todo.id === +id ? { ...todo, completed: !todo.completed } : todo
  //   )
  // );

  // find 요소 반환, filter 배열 반환
  // PATCH /todos/${id}
  const { completed } = todos.state.find(todo => todo.id === +id);

  ajax.patch(`/todos/${id}`, { completed: !completed }).then(todos => {
    changeStateWith(todos);
  });
};

const toggleAllTodosCompleted = completed => {
  // changeStateWith(todos.state.map(todo => ({ ...todo, completed })));
  // PATCH /todos { completed }
  ajax.patch('/todos', { completed }).then(todos => {
    changeStateWith(todos);
  });
};

const updateTodoContent = (id, content) => {
  // changeStateWith(
  //   todos.state.map(todo => (todo.id === +id ? { ...todo, content } : todo))
  // );
  // PATCH /todos/:id { content }

  ajax.patch(`/todos/${id}`, { content }).then(todos => {
    changeStateWith(todos);
  });
};

const removeTodo = id => {
  // changeStateWith(todos.state.filter(todo => todo.id !== +id));
  // DELETE/todos/id

  ajax.delete(`/todos/${id}`).then(todos => {
    changeStateWith(todos);
  });
};

const removeAllCompletedTodos = () => {
  // changeStateWith(todos.state.filter(todo => !todo.completed));

  // DELETE /todos/completed
  // queryString으로 날리는게 좋음

  ajax.delete('/todos/completed').then(todos => {
    changeStateWith(todos);
  });
};

// Event bindings
window.addEventListener('DOMContentLoaded', fetchTodos);

$newTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;

  const content = $newTodo.value.trim();
  if (content) addTodo(content);

  $newTodo.value = '';
};

$todoList.onchange = e => {
  if (!e.target.classList.contains('toggle')) return;

  const { id } = e.target.closest('li').dataset; // 요소가 추가돼도 코드를 안 바꿔도 됨
  toggleTodoCompleted(id);
};

$toggleAll.onchange = () => {
  toggleAllTodosCompleted($toggleAll.checked);
};

$todoList.ondblclick = e => {
  if (!e.target.matches('.view > label')) return;
  e.target.closest('li').classList.add('editing');
};

$todoList.onkeyup = e => {
  if (e.key !== 'Enter') return;
  updateTodoContent(e.target.parentNode.dataset.id, e.target.value);
};

$todoList.onclick = e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
};

$filters.onclick = e => {
  if (!e.target.matches('.filters > li > a')) return;

  [...$filters.querySelectorAll('a')].forEach($a => {
    $a.classList.toggle('selected', $a === e.target);
  });

  changeFilterWith(e.target.id);
};

$clearCompleted.onclick = removeAllCompletedTodos;
