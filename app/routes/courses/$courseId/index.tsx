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
    <Box className="h-full bg-gray-100" style={{ padding: "3%" }}>
      <Paper
        style={{
          margin: "auto",
          padding: "5%",
        }}
      >
        <Typography
          margin="auto"
          variant="h4"
          component="h4"
          fontFamily="Roboto"
        >
          Name: {course.name}
        </Typography>
        <Typography
          margin="auto"
          variant="h6"
          component="h4"
          fontFamily="Roboto"
        >
          Description: {course.description}
        </Typography>
        <Typography
          margin="auto"
          variant="h6"
          component="h4"
          fontFamily="Roboto"
        >
          Course Code: {course.courseCode}
        </Typography>
        <Typography
          margin="auto"
          variant="h6"
          component="h4"
          fontFamily="Roboto"
        >
          Hours Needed :{" "}
          {course.hoursNeeded ??
            "This course isn't satisfied with logged in hours"}
        </Typography>
      </Paper>
    </Box>
  );
}
