import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addTodo } from "@/store/slices/todosSlice";

export default function Todos() {
  const todos = useAppSelector((state) => state.todosSlice.todos);
  const dispatch = useAppDispatch();
  return (
    <div>
      Todos
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(addTodo(e.currentTarget.value));
          }
        }}
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
