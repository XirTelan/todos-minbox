type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
};

interface TodosSlice {
  todos: Todo[];
}
