import { getFullStudentUser, getUser, getUserId } from "~/session.server";
import { UserType } from ".prisma/client";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getAllCourses } from "~/models/course.server";
import CourseCard from "~/routes/dashboard/components/courseCard";
import { Box, Button, Grid } from "@mui/material";
import { enroll } from "~/models/enroll.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getFullStudentUser(request);
  if (!user) {
    return redirect("/login");
  }

  if (user.accountType === UserType.PROFESSOR) {
    return redirect("/dashboard/professor");
  }

  const courses = await getAllCourses(request);

  return json(courses);
}

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const courseId = formData.get("courseId");
  const action = formData.get("actionType");

  return await enroll({
    userId: userId,
    courseId: courseId as string,
    unenroll: action === "unenroll",
  });
}

function EnrollCourseContent({ course }: { course: any }) {
  return (
    <Form method="post">
      <input type="hidden" name="courseId" value={course.id} />

      <input
        type="hidden"
        name="actionType"
        value={course.enrolled ? "unenroll" : "enroll"}
      />
      <Box>
        <CourseCard course={course} isProfessor={false} />

        {course.completed ? (
          <Button
            disabled
            variant="contained"
            className="mt-2 w-full transform rounded-md bg-gray-500 px-4 py-2 text-sm font-medium uppercase text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            Already Completed
          </Button>
        ) : course.enrolled ? (
          <Button
            type="submit"
            variant="contained"
            className="mt-2 w-full transform rounded-md bg-gray-500 px-4 py-2 text-sm font-medium uppercase text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            Unenroll
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            className="mt-2 w-full transform rounded-md bg-blue-500 px-4 py-2 text-sm font-medium uppercase text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Enroll
          </Button>
        )}
      </Box>
    </Form>
  );
}

export default function EnrollStudents() {
  const courses = useLoaderData();

  return (
    <main
      className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex"
      style={{ padding: "0 20px" }}
    >
      <Grid container spacing={1} mt={3}>
        {courses.map((course: any, key: any) => (
          <Grid item xs={6} md={2} key={key}>
            <EnrollCourseContent course={course} key={key} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
