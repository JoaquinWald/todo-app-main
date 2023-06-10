import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { activeTodos, addTodo, allTodos, clearAllCompletedTodos, completeTodos, setLocalStorage, setNewOrder } from "../store/slices/todoSlice";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

import bgDesktopDark from '../images/bg-desktop-dark.jpg';
import bgDesktopLight from '../images/bg-desktop-light.jpg';
import bgMobileDark from '../images/bg-mobile-dark.jpg';
import bgMobileLight from '../images/bg-mobile-light.jpg';

export const useTodo = () => {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const anchoPantalla = window.innerWidth;

  const { todos = [], viewTodos = [] } = useSelector(state => state.todos);

  const todosDone = todos.filter(todo => !todo.done);
  const numTodosUncompleted = todosDone.length;

  const dispatch = useDispatch();

  const handleNewTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleClearCompleted = () => {
    dispatch(clearAllCompletedTodos(todos))
  };


  const [isActiveAll, setIsActiveAll] = useState(false);
  const [isActiveAct, setIsActiveAct] = useState(false);
  const [isActiveCompleted, setIsActiveCompleted] = useState(false);

  const handleAllTodos = () => {
    dispatch(allTodos(todos));

    setIsActiveAll(!isActiveAll);
    setIsActiveAct(false);
    setIsActiveCompleted(false);
  };

  const handleActiveTodos = () => {
    dispatch(activeTodos(todos));

    setIsActiveAll(false);
    setIsActiveAct(!isActiveAct);
    setIsActiveCompleted(false);
  };

  const handleCompletedTodos = () => {
    dispatch(completeTodos(todos));

    setIsActiveAll(false);
    setIsActiveAct(false);
    setIsActiveCompleted(!isActiveCompleted);
  };

  const onColorClassAll = isActiveAll ? 'font-bold bg-gradient-to-br text-transparent bg-clip-text from-cyan-400 to-purple-700' : '';
  const onColorClassAct = isActiveAct ? 'font-bold bg-gradient-to-br text-transparent bg-clip-text from-cyan-400 to-purple-700' : '';
  const onColorClassCompleted = isActiveCompleted ? 'font-bold bg-gradient-to-br text-transparent bg-clip-text from-cyan-400 to-purple-700' : '';

  const dinamicClass = viewTodos.length >= 1 ? 'flex justify-center' : 'flex justify-center mt-10';


  const [theme, setTheme] = useState('light');

  const onThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const bgImageDesktop = theme === 'light' ? bgDesktopLight : bgDesktopDark;
  const bgImageMobile = theme === 'light' ? bgMobileLight : bgMobileDark;

  const handleDragEnd = (e) => {
    const { active, over } = e;

    const oldIndex = viewTodos.findIndex(person => person.id === active.id);
    const newIndex = viewTodos.findIndex(person => person.id === over.id);

    const newOrder = arrayMove(viewTodos, oldIndex, newIndex);

    dispatch(setNewOrder(newOrder));
  }


  useEffect(() => {
    let data = localStorage.getItem('todos');
    if (data) {
      dispatch(setLocalStorage(JSON.parse(data)));
    }
  }, [dispatch]);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(viewTodos));
  }, [viewTodos]);

  return {
    sensors,
    anchoPantalla,
    todos,
    viewTodos,
    numTodosUncompleted,
    dispatch,
    handleNewTodo,
    handleClearCompleted,
    handleAllTodos,
    handleActiveTodos,
    handleCompletedTodos,
    onColorClassAll,
    onColorClassAct,
    onColorClassCompleted,
    dinamicClass,
    onThemeSwitch,
    bgImageDesktop,
    bgImageMobile,
    handleDragEnd,
    theme
  }
}
