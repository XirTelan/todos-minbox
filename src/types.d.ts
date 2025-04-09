export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export interface TodosSlice {
  todos: Todo[];
  active: number;
}

export type Categories = "all" | "completed" | "active";
