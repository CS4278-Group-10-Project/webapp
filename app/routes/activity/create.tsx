import { Form } from "@remix-run/react";
import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
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

  const name = formData.get("name");
  const description = formData.get("description");
  console.log({ name, description, userId });

  return redirect(`/dashboard`);
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
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");

  return (
    <Box className="h-full bg-gray-100" style={{ padding: "5%" }}>
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
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
            required
            name="name"
          />

          <Box sx={{ fontStyle: "italic" }}>Description: </Box>

          <TextareaAutosize
            value={badgeDescription}
            onChange={(e) => setBadgeDescription(e.target.value)}
            name="description"
            minRows={8}
            className="w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
            required
          />
          <Autocomplete
            isOptionEqualToValue={(option, value) => option.name === value.name}
            multiple
            id="tags-standard"
            name="competencies"
            options={competencies}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Competencies"
                placeholder="Competency"
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
