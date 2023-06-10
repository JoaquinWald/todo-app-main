import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ListItems } from "./ListItems";
import { PropTypes } from "prop-types";


export const List = ({ viewTodos, theme }) => {

  List.propTypes = {
    viewTodos: PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired,
  }

  return (
    <SortableContext items={viewTodos} strategy={verticalListSortingStrategy}>
      <section className='flex flex-col justify-center items-center mx-auto mt-4 min-w-[90%] max-w-[90%] sm:min-w-[70%] sm:max-w-[70%] lg:min-w-[50%] lg:max-w-[50%]'>
        {
          viewTodos.map((todo) => (
            <ListItems key={todo.id} {...todo} theme={theme} />
          ))
        }
      </section>
    </SortableContext>
  )
}
