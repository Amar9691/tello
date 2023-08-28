import { formatTodoForAi } from "./formatTodoForAi";
export const fetchSuggestion = async (board: Board) => {
  const todo = await formatTodoForAi(board);
  const res = await fetch("api/generateSummary", {
    method: "POST",
    headers: { "content-type": "Application/json" },
    body: JSON.stringify({ todo }),
  });
  const gptData = await res.json();
  const { content } = gptData;
  return content;
};
