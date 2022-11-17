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
import { getFullProfessorUser, getUserId } from "~/session.server";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createBadge } from "~/models/badge.server";
import { UserType } from "@prisma/client";

export async function loader({ request }: LoaderArgs) {
  const user = await getFullProfessorUser(request);
  if (!user) {
    return redirect("/login");
  }
  if (user.accountType === UserType.STUDENT) return redirect("/dashboard");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const userId = await getUserId(request);

  const name = formData.get("name");
  const description = formData.get("description");
  console.log({ name, description, userId });

  const badge = await createBadge({
    name,
    description,
    pictureUrl:
      "https://i.picsum.photos/id/1022/200/200.jpg?hmac=MjK2sur6luq2UfxMPWBFBuPyvZYyYLYvQH9kCmEGJRY",
    userId,
  });
  return redirect(`/dashboard`);
}

export default function CreateBadge() {
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");

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
            Create a Badge
          </Typography>
          <Box sx={{ fontStyle: "italic" }}>Badge Name: </Box>

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

          <Box sx={{ fontStyle: "italic" }}>Select a picture for the badge</Box>

          <input
            type="file"
            // name="picture"
            required
            accept="image/png, image/jpeg"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Paper>
    </Box>
  );
}
