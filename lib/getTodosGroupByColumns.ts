import { database } from "@/appwrite";
export const fetchBoardByColumn = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_DB_ID!,
    process.env.NEXT_PUBLIC_TODO_COLLETION_ID!
  );

  const todos = data.documents;
  const Column = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  const columnTypes: TypedColumn[] = ["todo", "progress", "review", "done"];

  for (const columnType of columnTypes) {
    if (!Column.get(columnType)) {
      Column.set(columnType, { id: columnType, todos: [] });
    }
  }

  const sortedColumn = new Map(
    Array.from(Column.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumn,
  };

  return board;
};
