import { Form, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { useSubmit } from "@remix-run/react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { getUserId } from "~/session.server";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createActivity } from "~/models/activities.server";
import { getAllProfessors } from "~/models/user.server";
import { getAllPrograms } from "~/models/program.server";
import { createCourse } from "~/models/course.server";
import { Program } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const professors = await getAllProfessors();
  const programs = await getAllPrograms();

  return json({ professors, programs });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const courseCode = formData.get("courseCode");
  const name = formData.get("name");
  const description = formData.get("description");
  const professor = JSON.parse(formData.get("professors") as string);
  const programs = JSON.parse(formData.get("programs") as string);
  const hoursNeeded = formData.get("hoursNeeded");

  console.log("programs", programs);

  await createCourse({
    name: name as string,
    description: description as string,
    courseCode: courseCode as string,
    professorId: professor as string,
    programs,
    hoursNeeded: Boolean(hoursNeeded) as boolean,
  });

  return redirect("/courses");
}

export default function CreateActivity() {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [chosenProfessor, setChosenProfessor] = useState("");
  const [chosenProgram, setChosenProgram] = useState(null);
  const [hoursNeeded, setHoursNeeded] = useState(false);
  const { professors, programs } = useLoaderData();
  const submit = useSubmit();
  return (
    <Box className="h-full bg-gray-100" style={{ padding: "3%" }}>
      <Paper
        style={{
          margin: "auto",
          padding: "5%",
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "80%",
            margin: "auto",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            formData.append("professors", JSON.stringify(chosenProfessor));
            formData.append("programs", JSON.stringify(chosenProgram));
            submit(formData, { method: "post", replace: true });
          }}
          method="post"
          encType="multipart/form-data"
        >
          <Typography
            margin="auto"
            variant="h4"
            component="h4"
            fontFamily="Roboto"
          >
            Create a Course
          </Typography>
          <Box sx={{ fontStyle: "italic" }}>Course Code: </Box>

          <TextField
            style={{ width: "100%" }}
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
            name="courseCode"
          />
          <Box sx={{ fontStyle: "italic" }}>Course Name: </Box>

          <TextField
            style={{ width: "100%" }}
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            name="name"
          />

          <Box sx={{ fontStyle: "italic" }}>Description: </Box>

          <TextareaAutosize
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            name="description"
            minRows={8}
            className="w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
            required
          />
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            id="tags-standard"
            options={programs}
            getOptionLabel={(option) => option.name}
            onChange={(e: any, value: any) => {
              setChosenProgram(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Program"
                placeholder="Program"
              />
            )}
          />

          <Autocomplete
            isOptionEqualToValue={(option, value) => option.id === value.id}
            id="tags-standard"
            options={professors}
            getOptionLabel={(option) =>
              option.firstName +
              " " +
              option.lastName +
              " (" +
              option.email +
              ")"
            }
            onChange={(e: any, value: any) => {
              setChosenProfessor(value.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Professor"
                placeholder="Professor"
              />
            )}
          />

          <FormControl>
            <Box sx={{ fontStyle: "italic" }}>Hours Needed: </Box>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="hoursNeeded"
              value={hoursNeeded}
              onChange={() => setHoursNeeded(!hoursNeeded)}
            >
              <Grid container>
                <Grid item xs={1}>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Paper>
    </Box>
  );
}
