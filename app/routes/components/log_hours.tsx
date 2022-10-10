import { Form, Link } from "@remix-run/react";
import * as React from "react";
import {DateTimePicker} from '@mui/x-date-pickers';
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function LogHours() {
  
  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  const [startTime, setStartTime] = React.useState<Date | null>(new Date());
  const [endTime, setEndTime] = React.useState<Date | null>(new Date());

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex h-full min-h-screen flex-col">
       <header className="flex bg-slate-500 items-center justify-between p-4 text-white">
        <h1 className="text-3xl">
          <Link to=".">LOG HOURS</Link>
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
          margin: "auto"

        }}
      >
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Course: </span>
            <select 
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose" 
              name="courses" 
              id="courses"
              style={{width: "50%"}}

              required
            >
              {arr.map((element) => {
                return <option key={element} value={element}>{element}</option>;
              })}
            </select>
          </label>
        </div>
        <span>Start Time: </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker   
            renderInput={(props) => <TextField {...props} />}
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}/>
        </LocalizationProvider>
        
        <span>End Time: </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker 
            renderInput={(props) => <TextField {...props} />}
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}/>
        </LocalizationProvider>

        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Task: </span>
            <select 
              className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose" 
              name="courses" 
              id="courses"
              style={{width: "50%"}}
              required={false}
            >
              {arr.map((element) => {
                return <option key={element} value={element}>{element}</option>;
              })}
            </select>
          </label>
        </div>
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Comments: </span>
            <textarea
              ref={commentRef}
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