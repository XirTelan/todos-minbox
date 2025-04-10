import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import TodosActions from "../containers/TodosActions";
import { Categories } from "@/types";
import TodoInput from "../containers/TodoInput/TodoInput";
import TodosList from "@/containers/TodoList.tsx/TodosList";

export default function Todos() {
  const [selectedCategory, setSelectedCategory] = useState<Categories>("all");

  return (
    <Card>
      <CardHeader className="border-b">
        <TodoInput />
      </CardHeader>
      <CardContent>
        <TodosList selectedCategory={selectedCategory} />
      </CardContent>
      <CardFooter className="border-t">
        <TodosActions
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </CardFooter>
    </Card>
  );
}
