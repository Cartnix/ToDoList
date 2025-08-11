import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import useThemeToogle from '../utils/themeToggle';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    try {
      const StoredTodo = localStorage.getItem('todos');
      return StoredTodo ? JSON.parse(StoredTodo) : [];
    } catch (e) {
      console.error('Ошибка чтения данных из localStorage при инициализации:', e);
      return [];
    }
  });

  const [theme, toggleTheme] = useThemeToogle();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = useCallback(() => {
    if (!title.trim()) {
      message.error('Пожалуйста, введите заголовок задачи!');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      date,
      complete: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setDesc('');
    setDate('');
    message.success('Задача успешно добавлена!');

  }, [title, desc, date])

  const handleDelete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    message.info('Задача удалена.');
  })

  const toggleComplete = useCallback((id) => {
    setTodos(prevTodos => {
      const newTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      );
      const toggledTodo = newTodos.find(todo => todo.id === id);
      message.success(`Задача ${toggledTodo.complete ? 'отмечена как выполненная' : 'отмечена как невыполненная'}.`);
      return newTodos;
    });
  })

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        title,
        setTitle,
        desc,
        setDesc,
        date,
        setDate,
        handleAdd,
        handleDelete,
        toggleComplete,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
