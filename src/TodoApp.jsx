import { DndContext, closestCenter, } from "@dnd-kit/core";


import { Header } from './components/Header';
import { Input } from './components/Input';
import { List } from './components/List';
import { ItemsLeftClearCompleted } from './components/ItemsLeftClearCompleted';
import { AllActiveCompleted } from './components/AllActiveCompleted';
import { Footer } from './components/Footer';
import { useTodo } from './hooks/useTodo';


export const TodoApp = () => {

  const {
    sensors,
    anchoPantalla,
    viewTodos = [],
    numTodosUncompleted,
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
  } = useTodo();


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >

      <Header
        anchoPantalla={anchoPantalla}
        bgImageDesktop={bgImageDesktop}
        bgImageMobile={bgImageMobile}
        onThemeSwitch={onThemeSwitch}
      />

      <main className='-mt-24 dark:bg-slate-950'>

        <Input handleNewTodo={handleNewTodo} />

        <List viewTodos={viewTodos} theme={theme} />

        <ItemsLeftClearCompleted
          numTodosUncompleted={numTodosUncompleted}
          handleClearCompleted={handleClearCompleted}
          dinamicClass={dinamicClass} />

        <AllActiveCompleted
          handleAllTodos={handleAllTodos}
          onColorClassAll={onColorClassAll}
          handleActiveTodos={handleActiveTodos}
          onColorClassAct={onColorClassAct}
          handleCompletedTodos={handleCompletedTodos}
          onColorClassCompleted={onColorClassCompleted} />

      </main>

      <Footer />

    </DndContext>
  )
}
