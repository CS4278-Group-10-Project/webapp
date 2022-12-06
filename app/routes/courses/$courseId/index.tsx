import { Form, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { getUser } from "~/session.server";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getCourseById } from "~/models/course.server";

export async function loader({ request, params }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const course = await getCourseById({ id: params.courseId || "" });
  if (!course) return redirect("/dashboard");

  console.log("course", course);

  return json({ course });
}

export default function Course() {
  const { course } = useLoaderData();
  return (
    <Box className="h-full bg-gray-100" style={{ padding: "3%"}}>
      <Paper elevation={3}
        style={{
          margin: "auto",
          padding: "5%",
        }}
      >
        <Typography
          margin="auto"
          variant="overline"
        >
          Course Details
        </Typography>

        <Typography
          margin="auto"
          variant="h4"
          component="h4"
        >
          {course.name}
        </Typography>
        <Typography
          margin="auto"
          component="h4"
          variant="overline"
        >
          Course Code: {course.courseCode}
        </Typography>

        <Typography
          margin="auto"
          component="h4"
          variant="overline"
        >
          Hours Needed :{" "}
          {course.hoursNeeded ??
            "This course does not require logging hours."}
        </Typography>

        <Typography
          margin="auto"
          component="h4"
          variant="h6"
        >
          {course.description}
        </Typography>

      </Paper>
    </Box>
  );
}
