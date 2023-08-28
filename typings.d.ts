interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "progress" | "review" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo extends Models.Document {
  $id: string;
  $createdAt: string;
  title: string;
  status: string;
  image?: string;
}

interface Image {
  bucketId: string;
  fileId: string;
}
