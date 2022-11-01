import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import { getUserId } from "~/session.server";
import {
  ActionArgs,
  json,
  LoaderArgs,
  NodeOnDiskFile,
  redirect,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { createBadge } from "~/models/badge.server";

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

  const badge = await createBadge({
    name,
    description,
    pictureUrl: "public/uploads/images-1667291147511.jpeg",
    userId,
  });
  return redirect(`/dashboard`);
}

export default function CreateBadge() {
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");

  return (
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
  );
}
