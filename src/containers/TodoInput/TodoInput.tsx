import { Input } from "@/components/ui/input";
import { addTodo } from "@/store/slices/todosSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (text === "") {
        setError("Cant be empty");
        return;
      }
      dispatch(addTodo(text));
      setText("");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");

    setText(e.target.value);
  };

  return (
    <>
      <div className="h-10">
        <Input
          value={text}
          aria-invalid={!!error}
          placeholder="What needs to be done?"
          onChange={onChange}
          onKeyDown={onKeySubmit}
        />
        {error && (
          <span className="mt-1  text-destructive text-sm">{error}</span>
        )}
      </div>
    </>
  );
}
