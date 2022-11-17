import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import type { Course } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useState } from "react";
import LogHours from "./logHours";
import ProfessorCourse from "./professorCourse";

function ViewCourseModal({
  course,
  open,
  setOpen,
}: {
  course: Course;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{course.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {course.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CourseCard({
  course,
  isProfessor,
}: {
  course: Course;
  isProfessor?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  return (
    <Box p={2} style={{ maxWidth: "400px" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            <Link to={`/courses/${course.id}`}>{course.name}</Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {course.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setViewModal(true)}>View</Button>
          {!isProfessor && (
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Log Hours
            </Button>
          )}
        </CardActions>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{course.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isProfessor ? (
              <ProfessorCourse course={course} />
            ) : (
              <LogHours course={course} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ViewCourseModal
        course={course}
        open={viewModal}
        setOpen={setViewModal}
      />
    </Box>
  );
}
