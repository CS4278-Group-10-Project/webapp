import CourseList from "../components/courseList";
import Sidebar from "../components/sidebar";
import Overview from "./components/overview";
import UserInfo from "../components/userinfo";
import EnrolledStudent from "./components/enrolledStudent";
import { Box } from "@mui/material";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { getFullProfessorUser } from "~/session.server";
import { UserType, User, Course } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { getProfessorStudents } from "~/models/user.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getFullProfessorUser(request);
  if (!user) {
    return redirect("/login");
  }

  const students = await getProfessorStudents(user.id);

  console.log({ students });

  if (user.accountType === UserType.STUDENT) return redirect("/dashboard");
  return json({ user, students });
}

function ProfessorDashboardContent({
  user,
  students,
}: {
  user: User & {
    coursesTaught: Course[];
  };
  students: User[];
}) {
  return (
    <Box
      style={{
        flexDirection: "column",
      }}
      gap={5}
    >
      <CourseList
        title={"Current Courses Taught"}
        courses={user.coursesTaught}
        isProfessor={true}
      />

      <EnrolledStudent studentList={students} />
    </Box>
  );
}

export default function ProfessorDashboard() {
  const { user, students } = useLoaderData();
  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar userInfo={<UserInfo user={user} />} list={<Overview />} />
      <ProfessorDashboardContent user={user} students={students} />
    </main>
  );
}
