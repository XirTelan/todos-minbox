import TodoItem from "@/components/TodoItem/TodoItem";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { changeState, deleteTodo } from "@/store/slices/todosSlice";
import { Categories } from "@/types";

type TodosListProps = {
  selectedCategory: Categories;
};

export default function TodosList({ selectedCategory }: TodosListProps) {
  const todos = useAppSelector((state) => state.todosSlice.todos);
  const dispatch = useAppDispatch();

  const filtered = todos.filter((todo) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "active" && !todo.isCompleted) return true;
    if (selectedCategory === "completed" && todo.isCompleted) return true;
    return false;
  });

  const handleAdd = (id: string) => {
    dispatch(changeState(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <ul className=" space-y-2">
      {filtered.length === 0 && (
        <div className=" text-center ">You tasks is empty</div>
      )}
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onClick={handleAdd}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
