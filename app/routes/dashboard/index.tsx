import CourseList from "./components/courseList";
import Sidebar from "./components/sidebar";
import CompetencyList from "./components/competencyList";
import UserInfo from "./components/userinfo";
import { getFullStudentUser, getUser, getUserId } from "~/session.server";
import { UserType } from ".prisma/client";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

function DashboardContent({ user }: { user: UserType }) {
  const { enrolledCourses, competencies } = useLoaderData();

  return (
    <div>
      <CourseList
        title={"Current Courses"}
        courses={[
          "Nursing 101",
          "Introduction to CPR",
          "Nursing 102",
          "Data Analytics in Nursing",
        ]}
      />

      <CourseList
        title={"Completed Courses"}
        courses={["Nursing 100", "Data Visualization"]}
      />
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

  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar UserInfo={UserInfo} List={CompetencyList} />
      <DashboardContent user={user} />
    </main>
  );
}
