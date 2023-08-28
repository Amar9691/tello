"use client";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Logo from "@/public/next.svg";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { fetchSuggestion } from "@/lib/fetchSuggestion";
export default function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");
  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(true);
    };
  }, [board]);
  return (
    <header>
      <div className="flex flex-col items-center md:flex-row p-5 justify-between bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter 3xl opacity-50 -z-50" />
        <Image
          src={Logo}
          alt="trello clone"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
          priority
        />
        <div className="flex w-full space-x-2 flex-1 justify-end">
          <form className="flex p-2 items-center bg-white rounded-md space-x-5 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 pl-1" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="outline-none flex-1 p-2"
            />
            <button
              hidden
              className="bg-blue-300 text-white font-semibold hover:bg-blue-700 px-4 py-2"
            >
              Search
            </button>
          </form>
          <Avatar color="#005501" round name="Amar kumar" size={50} />
        </div>
      </div>
      <div className="flex items-center px-5 md:py-5 justify-center">
        <p
          className="flex p-5 items-center text-sm font-light
            pr-5 shadow-xl rounded-xl w-fit
            bg-white italic max-w-3xl
            text-[#0055D1]
           "
        >
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your tasks for the day..."}
        </p>
      </div>
    </header>
  );
}
