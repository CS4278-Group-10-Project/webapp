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
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import LogHours from "./logHours";
import ProfessorCourse from "./professorCourse";

export default function CourseCard({
  course,
  isProfessor,
}: {
  course: Course;
  isProfessor?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          onClick={() => navigate(`/course/${course.id}`)}
          component="img"
          image="https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.jpg?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0="
          alt="Course Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {course.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>View</Button>
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
    </Box>
  );
}
