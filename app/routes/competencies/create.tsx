import { Form } from "@remix-run/react";
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
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { UserType } from "@prisma/client";
import { createCompetency } from "~/models/competencies.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  if (user.accountType === UserType.STUDENT) {
    return redirect("/dashboard");
  }

  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const name = formData.get("name");
  const description = formData.get("description");

  await createCompetency({
    name: name as string,
    description: description as string,
  });

  return redirect(`/dashboard/professor`);
}

export default function CreateCompetency() {
  const [competencyName, setCompetencyName] = useState("");
  const [competencyDescription, setCompetencyDescription] = useState("");

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
            value={competencyName}
            onChange={(e) => setCompetencyName(e.target.value)}
            required
            name="name"
          />

          <Box sx={{ fontStyle: "italic" }}>Description: </Box>

          <TextareaAutosize
            value={competencyDescription}
            onChange={(e) => setCompetencyDescription(e.target.value)}
            name="description"
            minRows={8}
            className="w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
            required
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Paper>
    </Box>
  );
}
