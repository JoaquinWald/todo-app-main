import { TodoAdd } from "./TodoAdd";
import { PropTypes } from "prop-types";


export const Input = ({ handleNewTodo }) => {

  Input.propTypes = {
    handleNewTodo: PropTypes.func.isRequired,
  }

  return (
    <section className='flex justify-center mt-4'>
      <TodoAdd onNewTodo={handleNewTodo} />
    </section>
  )
}
