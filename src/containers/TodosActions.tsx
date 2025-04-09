import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { clearCompletedTodos } from "@/store/slices/todosSlice";
import { Categories } from "@/types";
import { toast } from "sonner";

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
  onChange: (value: Categories) => void;
}) {
  const slice = useAppSelector((state) => state.todosSlice);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const id = e.currentTarget.dataset.id ?? "all";
    onChange(id as Categories);
  };

  const handleDelete = () => {
    dispatch(clearCompletedTodos());
    toast("All completed task cleared");
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
      <Button variant={"destructive"} onClick={handleDelete}>
        Clear Completed
      </Button>
    </div>
  );
}
