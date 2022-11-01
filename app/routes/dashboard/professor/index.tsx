import CourseList from "../components/courseList";
import Sidebar from "../components/sidebar";
import Overview from "./components/overview";
import UserInfo from "../components/userinfo";
import EnrolledStudent from "./components/enrolledStudent";
import { Box } from "@mui/material";
import { LoaderArgs, redirect } from "@remix-run/node";
const students = [
  {
    first_name: "Ujjwal",
    email: "ujjwal.jain@vanderbilt.edu",
    last_name: "Agzamkhodjaev",
    id: 1,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Ilya",
    email: "ilya.ermakov@vanderbilt.edu",
    last_name: "Jain",
    id: 2,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Saydolimkhon",
    email: "kunal.kaushik@vanderbilt.edu",
    last_name: "Singh",
    id: 3,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Adan Vanderbilt",
    email: "udit.malik@vanderbilt.edu",
    last_name: "Vanderbilt",
    id: 4,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Austin 1",
    email: "student@vanderbilt.edu",
    last_name: "Agzamkhodjaev",
    id: 5,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Adin 2",
    email: "student6@vanderbilt.edu",
    last_name: "Agzamkhodjaev",
    id: 6,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Jack 3",
    email: "student7@vanderbilt.edu",
    last_name: "Agzamkhodjaev",
    id: 7,
    profile_pic: "https://i.pravatar.cc/300",
  },
  {
    first_name: "Jack 3",
    email: "student8@vanderbilt.edu",
    last_name: "Agzamkhodjaev",
    id: 8,
    profile_pic: "https://i.pravatar.cc/300",
  },
];

export async function loader({ request }: LoaderArgs) {
  const user = await getFullStudentUser(request);
  if (!user) {
    return redirect("/login");
  }

  if (user.accountType === UserType.STUDENT) return redirect("/dashboard");
  return json(user);
}

function ProfessorDashboardContent() {
  return (
    <Box
      style={{
        flexDirection: "column",
      }}
      gap={5}
    >
      <CourseList
        title={"Current Courses"}
        courses={["Introduction to Nursing", "CPR Practicum", "Nursing "]}
      />

      <EnrolledStudent studentList={students} />
    </Box>
  );
}

export default function ProfessorDashboard() {
  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar userInfo={UserInfo} List={Overview} />
      <ProfessorDashboardContent />
    </main>
  );
}
