'use client'

import { Input } from "~/app/components/ui/input";
import { Button } from "~/app/components/ui/button";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

export default function HomePage() {

  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const lauremIpsom = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const { data } = useQuery({
      queryKey: ['getAnswer', question],
      queryFn: async () => {
          try {
              return question + ' ' + lauremIpsom;
          } catch (error) {
          }
      },
      enabled: !!question,
      placeholderData: keepPreviousData
  });

  return (
    <main className="relative flex w-full flex-1 flex-col ">
      <div className="absolute bottom-10 w-full pr-2">
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col text-center">
          <div className="flex items-center gap-2 p-5 bg-secondary rounded">
            <Input
              className="grow"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  setQuestion(input);
                }
              }}
            />
            <Button
              className="w-fit"
              onClick={() => input.trim() && setQuestion(input)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="scrollbar scrollbar-w-2 scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600 h-[100dvh] overflow-y-auto pb-[140px]">
          <div className="mx-auto flex w-full max-w-3xl flex-col space-y-12 p-4 pb-8">
            <div className="flex justify-end">
              <div className="group relative inline-block max-w-[80%] break-words rounded bg-secondary p-4 text-left">
                {question}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="group relative w-full max-w-full break-words">
                <div className="prose prose-neutral prose-invert max-w-none prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0">
                  <p>{data}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </main>
  );
}
