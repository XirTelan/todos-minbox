import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { clearCompletedTodos } from "@/store/slices/todosSlice";
import { Categories } from "@/types";

const CATEGORIES: {
  id: Categories;
  label: string;
}[] = [
  { id: "all", label: " All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export default function TodosActions({
  selected,
  onChange,
}: {
  selected: Categories;
  onChange: (id: string) => void;
}) {
  const slice = useAppSelector((state) => state.todosSlice);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("WTFFFF", e.currentTarget.dataset.id);
    const id = e.currentTarget.dataset.id ?? "all";
    onChange(id);
  };

  return (
    <div className="flex grow justify-between items-center">
      <span>{`${slice.active} active task left`}</span>
      <div className="flex gap-2">
        {CATEGORIES.map(({ id, label }) => (
          <Button
            data-id={id}
            key={id}
            onClick={handleChange}
            variant={selected === id ? "default" : "ghost"}
            className="  box-border "
          >
            {label}
          </Button>
        ))}
      </div>
      <Button
        variant={"destructive"}
        onClick={() => dispatch(clearCompletedTodos())}
      >
        Clear Completed
      </Button>
    </div>
  );
}
