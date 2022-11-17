import CourseList from "./components/courseList";
import Sidebar from "./components/sidebar";
import CompetencyList from "./components/competencyList";
import UserInfo from "./components/userinfo";
import { getFullStudentUser, getUser, getUserId } from "~/session.server";
import { Course, HoursLog, User, UserType } from ".prisma/client";
import { ActionArgs, json, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BadgeList from "./components/badgeList";
import { deleteLoggedHours } from "~/models/deleteLoggedHours.server";

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

      {hoursCompleted.length > 0 ? (
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
                  Description
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
                    <Form method="post">
                      <input type="hidden" name="hourId" value={hour.id} />
                      <Button size="small" type="submit">
                        Delete
                      </Button>
                    </Form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography ml={3}>No hours logged</Typography>
      )}
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
      <HoursLoggedTable hoursCompleted={hoursCompleted} />
      <CourseList title={"Completed Courses"} courses={completedCourses} />
      <BadgeList />
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

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const hourId = formData.get("hourId");
  await deleteLoggedHours({
    id: hourId as string,
  });
  return redirect(`/dashboard`);
}

export default function Dashboard() {
  const user = useLoaderData();
  console.log({ user });
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
