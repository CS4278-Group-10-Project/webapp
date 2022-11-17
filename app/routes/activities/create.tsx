import { Form } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { useSubmit } from "@remix-run/react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { getUserId } from "~/session.server";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const userId = await getUserId(request);

  console.log("fuck", JSON.stringify(formData));
  return json({});
}

const competencies = [
  {
    id: 1,
    name: "Communication",
  },
  {
    id: 2,
    name: "Collaboration",
  },

  {
    id: 3,
    name: "Creativity",
  },
  {
    id: 4,
    name: "Critical Thinking",
  },
];

export default function CreateActivity() {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [chosenCompetencies, setChosenCompetencies] = useState(null);

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
          onSubmit={({ currentTarget }) => {
            console.log("submit", currentTarget);

            const formData = new FormData(currentTarget);
            formData.set("competencies", JSON.stringify(chosenCompetencies));
            console.log({ formData });
            // submit(formData, { method: "post", replace: true });
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
            Create an Activity
          </Typography>
          <Box sx={{ fontStyle: "italic" }}>Activity Name: </Box>

          <TextField
            style={{ width: "100%" }}
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            required
            name="name"
          />

          <Box sx={{ fontStyle: "italic" }}>Description: </Box>

          <TextareaAutosize
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            name="description"
            minRows={8}
            className="w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
            required
          />
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.name === value.name}
            multiple
            id="tags-standard"
            options={competencies}
            getOptionLabel={(option) => option.name}
            value={chosenCompetencies ?? []}
            onChange={(e: any, value: any) => {
              setChosenCompetencies(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Competencies"
                placeholder="Competency"
                onChange={(e) => {
                  console.log("caj", e);
                }}
              />
            )}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Paper>
    </Box>
  );
}
