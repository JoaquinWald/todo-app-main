import { PropTypes } from "prop-types";


export const ItemsLeftClearCompleted = ({ numTodosUncompleted, handleClearCompleted, dinamicClass }) => {

  ItemsLeftClearCompleted.propTypes = {
    numTodosUncompleted: PropTypes.number.isRequired,
    handleClearCompleted: PropTypes.func.isRequired,
    dinamicClass: PropTypes.string.isRequired,
  }

  return (
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
  )
}
