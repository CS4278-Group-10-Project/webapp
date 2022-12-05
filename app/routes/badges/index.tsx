import { Link, Box, Button, Typography } from "@mui/material";
// import { getProfessorStudents } from "~/models/user.server";
// import { json, LoaderArgs, redirect } from "@remix-run/node";
// import { getFullProfessorUser } from "~/session.server";
// import { UserType, User, Course } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

// export async function loader({ request }: LoaderArgs) {
//   const user = await getFullProfessorUser(request);
//   if (!user) {
//     return redirect("/login");
//   }

//   const students = await getProfessorStudents(user.id);

//   console.log({ students });

//   if (user.accountType === UserType.STUDENT) return redirect("/dashboard");
//   return json({ user, students });
// }

export default function Badges() {
  // const { user, students } = useLoaderData();

  return (
    <main
      className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex"
      style={{ padding: "0 20px" }}
    >
    
    <Box
        style={{
          flexDirection: "column",
          display: "flex",
        }}
        gap={2}
    >
        <h1>Select Your Badge Action Below</h1>
        <Link href="/badges/create" className="text-white underline">
          <Button variant="contained">
            Create Badge
          </Button>
        </Link>

        <Link href="/badges/assign" className="text-white underline">
          <Button variant="contained">
            Assign Badge to Student
          </Button>
        </Link>

    </Box>

    </main>
  );
}
