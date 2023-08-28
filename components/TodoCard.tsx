"use client";

import { XCircleIcon } from "@heroicons/react/20/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useState, useEffect } from "react";
import getUrl from "@/lib/getUrl";
import Image from "next/image";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  id: string;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export const TodoCard = ({
  id,
  todo,
  index,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };

      fetchImage();
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      className="bg-white p-4 rounded-md space-y-2 drop-shadow-md"
      ref={innerRef}
    >
      <div className="flex justify-between items-center">
        <p>{todo.title}</p>
        <button
          onClick={() => {
            deleteTask(index, todo, id);
          }}
          className="text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {imageUrl && (
        <div className="h-full w-full rounded-md">
          <Image
            src={imageUrl}
            alt="task image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};
