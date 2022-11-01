import CourseList from "./components/courseList";
import Sidebar from "./components/sidebar";
import CompetencyList from "./components/competencyList";
import UserInfo from "./components/userinfo";
import { getFullStudentUser, getUser, getUserId } from "~/session.server";
import { Course, HoursLog, User, UserType } from ".prisma/client";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function HoursLoggedTable({
  hoursCompleted,
}: {
  hoursCompleted: (HoursLog & { course: Course })[];
}) {
  return (
    <Box mt={2}>
      <h2 className="mt-0 mb-2 pt-5 pl-5 text-2xl font-bold leading-tight text-black">
        Hours Logged
      </h2>

      <TableContainer
        style={{
          maxHeight: "300px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Course name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Start Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                End Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Comment
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {hoursCompleted.map((hour: any) => (
              <TableRow key={hour.id}>
                <TableCell align="right">{hour.course.name}</TableCell>
                <TableCell align="right">
                  {new Date(hour.start).toDateString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(hour.end).toDateString()}
                </TableCell>
                <TableCell align="right">
                  {hour.comment ? hour.comment : "No comment"}
                </TableCell>

                <TableCell align="right">
                  <Form method="post" action={`/api/hours/${hour.id}`}>
                    <input type="hidden" name="action" value="delete" />
                    <button type="submit">Delete</button>
                  </Form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function DashboardContent({
  user,
}: {
  user: User & {
    enrolledCourses: Course[];
    completedCourses: Course[];
    hoursCompleted: (HoursLog & {
      course: Course;
    })[];
  };
}) {
  const { enrolledCourses, completedCourses, hoursCompleted } = user;

  return (
    <div>
      <CourseList title={"Current Courses"} courses={enrolledCourses} />
      <CourseList title={"Completed Courses"} courses={completedCourses} />
      <HoursLoggedTable hoursCompleted={hoursCompleted} />
    </div>
  );
}

export async function loader({ request }: LoaderArgs) {
  const user = await getFullStudentUser(request);
  if (!user) {
    return redirect("/login");
  }

  if (user.accountType === UserType.PROFESSOR)
    return redirect("/dashboard/professor");
  return json(user);
}

export default function Dashboard() {
  const user = useLoaderData();
  const competencies = (user.completedCourses ?? [])
    .map((course: any) => course.competencies)
    .filter((comp: any[]) => comp.length > 0);

  console.log({ user });

  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar
        userInfo={<UserInfo user={user} />}
        list={<CompetencyList competencies={competencies} />}
      />
      <DashboardContent user={user} />
    </main>
  );
}
