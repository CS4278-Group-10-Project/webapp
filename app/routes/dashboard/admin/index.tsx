import ProgramList from "../components/programList";
import Sidebar from "../components/sidebar";
import Overview from "./components/overview";
import UserInfo from "../components/userinfo";

import { Box } from "@mui/material";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getFullProfessorUser } from "~/session.server";
import type { Program } from "@prisma/client";
import { UserType } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/models/user.server";
import { getAllPrograms } from "~/models/program.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getFullProfessorUser(request);
  if (!user) {
    return redirect("/login");
  }

  if (user.accountType === UserType.PROFESSOR) {
    return redirect("/dashboard/professor");
  } else if (user.accountType === UserType.STUDENT) {
    return redirect("/dashboard");
  }

  const users = await getAllUsers();
  const programs = await getAllPrograms();

  return json({ user, users, programs });
}

function ProfessorDashboardContent({ programs }: { programs: Program[] }) {
  return (
    <Box
      style={{
        flexDirection: "column",
      }}
      gap={5}
    >
      <ProgramList title={"Current Programs"} programs={programs} />
    </Box>
  );
}

export default function ProfessorDashboard() {
  const { user, users, programs } = useLoaderData();
  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar userInfo={<UserInfo user={user} />} list={<Overview />} />
      <ProfessorDashboardContent programs={programs} />
    </main>
  );
}
