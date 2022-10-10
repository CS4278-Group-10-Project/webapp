import { Form, Link } from "@remix-run/react";
import * as React from "react";

export default function AddTask() {

  const taskInputRef = React.useRef<HTMLInputElement>(null);
  const detailsInputRef = React.useRef<HTMLTextAreaElement>(null);
  
  return (
    <div className="flex h-full min-h-screen flex-col">
       <header className="flex bg-slate-500 items-center justify-between p-4 text-white">
        <h1 className="text-3xl">
          <Link to=".">ADD TASK</Link>
        </h1>
        <div className="flex">
          <Form action="/index" method="post">
            <button
              type="submit"
              className="rounded py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Cancel
            </button>
          </Form>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </div>
      </header>
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "80%",
          margin: "5% auto",

        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Task: </span>
            <input
              ref={taskInputRef}
              name="title"
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            />
          </label>
        </div>
        
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Comments: </span>
            <textarea
              ref={detailsInputRef}
              name="body"
              rows={8}
              className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"                
            />
          </label>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
   
  );
}