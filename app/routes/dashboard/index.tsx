import CourseList from "./components/courseList";
import Sidebar from "./components/sidebar";

function DashboardContent() {
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

export default function Dashboard() {
  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar />
      <DashboardContent />
    </main>
  );
}
