export const formatTodoForAi = (board: Board) => {
  const todo = Array.from(board.columns.entries());
  const flatArray = todo.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TypedColumn]: Todo[] });

  const flatArrayCount = Object.entries(flatArray).reduce(
    (map, [key, value]) => {
      map[key as TypedColumn] = value.length;
      return map;
    },
    {} as { [key in TypedColumn]: Number }
  );

  return flatArrayCount;
};
