import { PropTypes } from "prop-types";


export const AllActiveCompleted = ({ handleAllTodos, onColorClassAll, handleActiveTodos, onColorClassAct, handleCompletedTodos, onColorClassCompleted }) => {

  AllActiveCompleted.propTypes = {
    handleAllTodos: PropTypes.func.isRequired,
    onColorClassAll: PropTypes.string.isRequired,
    handleActiveTodos: PropTypes.func.isRequired,
    onColorClassAct: PropTypes.string.isRequired,
    handleCompletedTodos: PropTypes.func.isRequired,
    onColorClassCompleted: PropTypes.string.isRequired,
  }


  return (
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
  )
}

