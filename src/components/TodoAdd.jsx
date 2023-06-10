import { useForm } from "../hooks/useForm";
import { PropTypes } from "prop-types";


export const TodoAdd = ({ onNewTodo }) => {

  TodoAdd.propTypes = {
    onNewTodo: PropTypes.func.isRequired,
  }

  const { description, onInputChange, onResetForm } = useForm({ description: '' });

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (description.length <= 1) return;

    const newTodo = {
      id: new Date().getTime() * 3,
      description: description,
      done: false
    }

    onNewTodo && onNewTodo(newTodo);

    onResetForm();

  }


  return (
    <form
      onSubmit={onFormSubmit}
      className='relative flex justify-center w-56 min-w-[90%] sm:min-w-[70%] lg:min-w-[50%]'
    >
      <input
        className='p-3 pl-14 rounded-md w-full bg-white dark:bg-slate-800 dark:text-slate-300 dark:placeholder:text-slate-600'
        type="text"
        placeholder="Create a new todo..."
        name="description"
        value={description}
        onChange={onInputChange}
      />
      <button
        className='hover:bg-red-500 absolute left-4 top-3.5 h-5 w-5 border border-gray-300 rounded-full cursor-pointer'
        type='submit'
      >
        <img src="" alt="" />
      </button>
    </form>
  )
}
