import { useDispatch } from "react-redux";
import { deleteTodo, markTodoAsCompleted } from "../store/slices/todoSlice";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { PropTypes } from "prop-types";


export const ListItems = ({ description, id, done, theme }) => {


  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const dispatch = useDispatch();

  const onMarkCompleted = () => {
    dispatch(markTodoAsCompleted(id));
  }

  const onDeleteTodo = () => {
    dispatch(deleteTodo(id))
  }


  const articleClassLight = done ? 'line-through text-gray-400' : '';
  const articleClassDark = done ? 'line-through text-gray-600' : '';

  let articleClass = theme === 'light' ? articleClassLight : articleClassDark;

  const colorCheck = done ? 'bg-gradient-to-br from-cyan-400 to-purple-700' : '';
  const iconCheck = !done ? 'hidden' : '';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  ListItems.propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    done: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
  };

  return (
    <article
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`relative w-56 min-w-[100%] sm:min-w-[100%] lg:min-w-[100%] min-h-[50px] h-auto bg-white rounded-md p-3 border-b border-gray-300 dark:bg-slate-800 dark:text-slate-300 dark:border-gray-700`}>

      <span
        onClick={onMarkCompleted}
        className={`${colorCheck} absolute top-3.5 ml-1 h-5 w-5 border border-gray-300 rounded-full cursor-pointer`}
      >
        <img
          className={`${iconCheck} p-1`}
          src="../../images/icon-check.svg" alt="" />
      </span>

      <ul
        onClick={onMarkCompleted}
        className={`ml-11 mr-4 break-words`}
      >
        <li
          className={`${articleClass} max-w-[90%] cursor-pointer`}>
          {description}
        </li>
      </ul>

      <span
        className="absolute right-4 top-3.5 h-5 w-5 cursor-pointer"
        onClick={onDeleteTodo}
      >
        <img className="" src="../../images/icon-cross.svg" alt="" />
      </span>

    </article>
  )
}
