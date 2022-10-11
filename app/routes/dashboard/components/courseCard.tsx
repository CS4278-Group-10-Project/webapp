import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

export default function CourseCard({ course }: { course: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box
        className="relative h-32 w-48 cursor-pointer rounded-lg bg-gray-300 shadow"
        onClick={() => setModalOpen(true)}
      >
        <Box className="text-1xl flex h-full w-full items-center justify-center font-medium">
          {course}
        </Box>
      </Box>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Disagree</Button>
          <Button onClick={() => setModalOpen(false)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
