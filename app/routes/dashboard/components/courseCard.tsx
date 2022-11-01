import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Course } from "@prisma/client";
import { useState } from "react";
import LogHours from "./logHours";

export default function CourseCard({ course }: { course: Course }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box
        className="relative h-32 w-48 cursor-pointer rounded-lg bg-gray-300 shadow"
        onClick={() => setModalOpen(true)}
      >
        <Box className="text-1xl flex h-full w-full items-center justify-center font-medium">
          {course.name}
        </Box>
      </Box>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Course name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LogHours />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
