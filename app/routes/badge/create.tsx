import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { Box, Button, TextareaAutosize, TextField } from "@mui/material";

export default function LogHours() {
  const [badgeName, setBadgeName] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //api request...
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "80%",
        margin: "auto",
      }}
    >
      <Box sx={{ fontStyle: "italic" }}>Badge Name: </Box>

      <TextField
        style={{ width: "100%" }}
        value={badgeName}
        onChange={(e) => setBadgeName(e.target.value)}
        required
      />

      <label className="flex w-full flex-col gap-1">
        <Box sx={{ fontStyle: "italic" }}>Description: </Box>

        <TextareaAutosize
          value={badgeDescription}
          onChange={(e) => setBadgeDescription(e.target.value)}
          name="body"
          minRows={8}
          className="w-full flex-1 rounded-md border-2 py-2 px-3 text-lg leading-6"
          required
        />
      </label>

      <Box sx={{ fontStyle: "italic" }}>Select a picture for the badge</Box>

      <input type="file" required />

      <Button
        type="submit"
        className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
      >
        Submit
      </Button>
    </Form>
  );
}
