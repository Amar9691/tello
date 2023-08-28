import { NextResponse, NextRequest } from "next/server";
import openai from "@/openai";

export async function POST(request: NextRequest, response: NextResponse) {
  const todos = await request.json();
  const output = await openai.createCompletion()({
    model: "gpt-3.5-turbo",
    temperature: 3.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `welcome responding, welcome the user always as Mr.Amar kumar  and say welcome to the trello app ! Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi, there provide a summary of following todos. Count how many todos are in each category such as to do , in progress, review and done. then tell the user to have
                  a productive day! Here's the data:${JSON.stringify(todos)}`,
      },
    ],
  });

  const { data } = output;

  return NextResponse.json(data.choices[0].message);
}
