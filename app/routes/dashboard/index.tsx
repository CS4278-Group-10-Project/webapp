import CourseList from "./components/courseList";
import Sidebar from "./components/sidebar";
import CompetencyList from "./components/competencyList";
import UserInfo from "./components/userinfo";
import { getFullStudentUser, getUser, getUserId } from "~/session.server";
import { Course, User, UserType } from ".prisma/client";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

function DashboardContent({
  user,
}: {
  user: User & { enrolledCourses: Course[]; completedCourses: Course[] };
}) {
  const { enrolledCourses, completedCourses } = user;

  return (
    <div>
      <CourseList title={"Current Courses"} courses={enrolledCourses} />
      <CourseList title={"Completed Courses"} courses={completedCourses} />
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
