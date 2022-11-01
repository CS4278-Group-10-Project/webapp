import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ToastContainer, toast } from "react-toastify";

import { Button } from "@mui/material";

import { Form } from "@remix-run/react";
import { Course } from "@prisma/client";

export default function LogHours({ course }: { course: Course }) {
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(new Date().getTime() - 24 * 60 * 60 * 1000)
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [comment, setComment] = useState("");

  return (
    <Form
      method="post"
      action="/dashboard/logHours"
      onSubmit={() => {
        toast.info(`Successfully logged!`);
      }}
    >
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

          {/* hidden input with courseId */}
          <input type="hidden" name="courseId" value={course.id} />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </LocalizationProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Form>
  );
}
