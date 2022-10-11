import CourseList from "./components/courseList";
import Sidebar from "./components/sidebar";

function DashboardContent() {
  return (
    <div>
      <CourseList
        title={"Current Courses"}
        courses={[
          "Vikash Singh",
          "Saydolim Natural",
          "Ujjwal Nenatural",
          "Ilyas Johnson",
        ]}
      />

      <CourseList
        title={"Completed Courses"}
        courses={["Tatar Ozbakov", "Cigarretes in Balenciaga"]}
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar />
      <DashboardContent />
    </main>
  );
}
