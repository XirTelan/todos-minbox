import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Todo } from "@/types";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "../ui/button";

type TodoItemProps = {
  todo: Todo;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onClick, onDelete }: TodoItemProps) {
  return (
    <li
      key={todo.id}
      className="flex group items-center text-2xl gap-1 not-last:border-b "
    >
      <Checkbox
        checked={todo.isCompleted}
        onClick={() => onClick(todo.id)}
        className="h-6 w-6 me-4"
      />
      <span
        className={cn([
          "flex grow",
          todo.isCompleted && " line-through text-secondary-foreground/60",
        ])}
      >
        {todo.text}
      </span>
      <Button
        onClick={() => onDelete(todo.id)}
        size={"icon"}
        variant={"destructive"}
        className="  opacity-0 group-hover:opacity-100 "
      >
        <X />
      </Button>
    </li>
  );
}
