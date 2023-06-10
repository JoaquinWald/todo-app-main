import { useDispatch, useSelector } from 'react-redux';
import { ListItems } from './components/ListItems';
import { TodoAdd } from './components/TodoAdd';
import { activeTodos, addTodo, allTodos, clearAllCompletedTodos, completeTodos, setLocalStorage, setNewOrder } from './store/slices/todoSlice';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';

import bgDesktopDark from '../images/bg-desktop-dark.jpg';
import bgDesktopLight from '../images/bg-desktop-light.jpg';
import bgMobileDark from '../images/bg-mobile-dark.jpg';
import bgMobileLight from '../images/bg-mobile-light.jpg';

import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';


export const TodoApp = () => {

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





  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >

      <header className='relative'>
        <div className={`${anchoPantalla >= 768 ? 'block' : 'flex justify-center'}`}>

          <picture className='relative grid'>

            <source media='(min-width: 768px)' srcSet={bgImageDesktop} />
            <img className='h-48 w-screen object-cover bg-cover m-0' src={bgImageMobile} alt="background image" />

            <div className='absolute w-[90%] sm:w-[70%] lg:w-[50%] grid grid-cols-[minmax(50%,_1fr)_minmax(50%,_2fr)] justify-items-center justify-self-center mt-14'>
              <h1 className="justify-self-start text-3xl tracking-more font-bold text-gray-100">
                TODO
              </h1>
              <span
                onClick={onThemeSwitch}
                className='justify-self-end object-contain cursor-pointer'
              >
                <ThemeSwitcher />
              </span>
            </div>

          </picture>

        </div>
      </header>

      <main className='-mt-24 dark:bg-slate-950'>

        {/* Input */}
        <section className='flex justify-center mt-4'>
          <TodoAdd onNewTodo={handleNewTodo} />
        </section>

        {/* list items */}
        <SortableContext
          items={viewTodos}
          strategy={verticalListSortingStrategy}
        >

          <section className='flex flex-col justify-center items-center mx-auto mt-4 min-w-[90%] max-w-[90%] sm:min-w-[70%] sm:max-w-[70%] lg:min-w-[50%] lg:max-w-[50%]'>

            {
              viewTodos.map((todo) => (
                <ListItems key={todo.id} {...todo} theme={theme} />
              ))
            }

          </section>

        </SortableContext>

        {/* items left and clear */}
        <section className={dinamicClass}>
          <article className='flex p-3 px-5 justify-between min-w-[90%] sm:min-w-[70%] lg:min-w-[50%] bg-white rounded-md dark:bg-slate-800'>
            <p className='text-slate-400'>
              {numTodosUncompleted} items left
            </p>
            <button
              onClick={handleClearCompleted}
              className='text-slate-400'>
              Clear Completed
            </button>
          </article>
        </section>

        {/* select all, active or completed */}
        <section className='flex justify-center'>
          <article className='flex p-3 px-5 justify-around mt-3 min-w-[90%] sm:min-w-[70%] lg:min-w-[50%] bg-white rounded-md dark:bg-slate-800 dark:text-slate-300'>
            <button
              onClick={handleAllTodos}
              className={onColorClassAll}
            >
              All
            </button>

            <button
              onClick={handleActiveTodos}
              className={onColorClassAct}
            >
              Active
            </button>

            <button
              onClick={handleCompletedTodos}
              className={onColorClassCompleted}
            >
              Completed
            </button>
          </article>
        </section>

      </main>


      <footer className='flex justify-center pt-10 text-slate-400 dark:bg-slate-950 dark:text-slate-500'>
        <p>
          Drag and drop to reorder list
        </p>
      </footer>
    </DndContext>
  )
}
