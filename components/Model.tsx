"use client";
import { FormEvent, Fragment, HtmlHTMLAttributes, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModelStore } from "@/store/ModelStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadio from "./TaskTypeRadio";
import { useRef } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/20/solid";
const MyDialog = () => {
  const [isOpen, closeModel] = useModelStore((state) => [
    state.isOpen,
    state.closeModel,
  ]);
  const [addTask, newTaskInput, setNewTaskInput, image, setImage, newTaskType] =
    useBoardStore((state) => [
      state.addTask,
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.newTaskType,
    ]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModel();
  };
  const imagePickerRef = useRef<HTMLInputElement>(null);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={closeModel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a Task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    type="text"
                    placeholder="Enter a task here"
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>
                <TaskTypeRadio />
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 foucs-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="task image"
                      width={200}
                      height={100}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale-0 transition-all duration-150 cursor-not-allowed"
                      onClick={() => {
                        //  setImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) {
                        return;
                      }
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="p-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MyDialog;
