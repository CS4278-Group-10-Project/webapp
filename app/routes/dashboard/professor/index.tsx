import CourseList from "../components/courseList";
import Sidebar from "../components/sidebar";
import Overview from "./components/overview";
import UserInfo from "../components/userinfo";
import EnrolledStudent from "./components/enrolledStudent";
import { Box } from "@mui/material";

function ProfessorDashboardContent() {
  const students = [
    {
      first_name: "Ujjwal",
      email: "student1@vanderbilt.edu",
      last_name: "Agzamkhodjaev",
      id: 1,
      profile_pic: "https://i.pravatar.cc/300",
    },
    {
      first_name: "Ilya",
      email: "student2@vanderbilt.edu",
      last_name: "Jain",
      id: 2,
      profile_pic: "https://i.pravatar.cc/300",
    },
    {
      first_name: "Saydolimkhon",
      email: "student3@vanderbilt.edu",
      last_name: "Singh",
      id: 3,
      profile_pic: "https://i.pravatar.cc/300",
    },
    {
      first_name: "Adan Vanderbilt",
      email: "student4@vanderbilt.edu",
      last_name: "Vanderbilt",
      id: 4,
      profile_pic: "https://i.pravatar.cc/300",
    },
    {
      first_name: "Austin 1",
      email: "student5@vanderbilt.edu",
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
      <Sidebar UserInfo={UserInfo} List={Overview} />
      <ProfessorDashboardContent />
    </main>
  );
}