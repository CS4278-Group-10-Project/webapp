import { Box } from "@mui/material";
import { Course } from "@prisma/client";

export default function ProfessorCourse({ course }: { course: Course }) {
  return <Box>{course.name}</Box>;
}
