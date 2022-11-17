import { Form, Link } from "@remix-run/react";
import * as React from "react";
import {DateTimePicker, DatePicker} from '@mui/x-date-pickers';
import { Box, Button, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export default function LogHours() {
  const [startTime, setStartTime] = React.useState<Date | null>(new Date());
  const [endTime, setEndTime] = React.useState<Date | null>(new Date());

  return (
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
        <Box>Start Time: </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker   
            renderInput={(props) => <TextField {...props} />}
            value={startTime}
            onChange={setStartTime}/>
        </LocalizationProvider>
        
        <Box>End Time: </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker 
            renderInput={(props) => <TextField {...props} />}
            value={endTime}
            onChange={setEndTime}/>
        </LocalizationProvider>

          <label className="flex w-full flex-col gap-1">
            <Box>Comments: </Box>
            <textarea
              name="body"
              rows={8}
              className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"                
            />
          </label>

          <Button
            type="submit"
            className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Submit
          </Button>

      </Form>

  );
}