import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Button } from "@mui/material";

import { Form } from "@remix-run/react";

export default function LogHours() {
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(new Date().getTime() - 24 * 60 * 60 * 1000)
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [comment, setComment] = useState("");

  return (
    <Form method="post" action="/dashboard/logHours">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} pt={2}>
          <DateTimePicker
            label="Start time"
            value={startTime}
            onChange={(newValue) => setStartTime(newValue)}
            renderInput={(params) => (
              <TextField name="start_time" {...params} />
            )}
          />

          <DateTimePicker
            label="End time"
            value={endTime}
            onChange={(newValue) => setEndTime(newValue)}
            renderInput={(params) => <TextField name="end_time" {...params} />}
          />

          <TextField
            placeholder="Comments about the session"
            multiline
            rows={2}
            maxRows={4}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </LocalizationProvider>
    </Form>
  );
}
