import Sidebar from "./components/sidebar";

export default function Dashboard() {
  return (
    <main className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex">
      <Sidebar />
      {/* STUDENT DASHBOARD CONTENT STARTS */}
      <div>
        <h2 className="mt-0 mb-2 pt-5 pl-5 text-2xl font-bold leading-tight text-black">
          CURRENT COURSES
        </h2>
        <div className="flex flex-wrap gap-10 overflow-x-scroll pl-5">
          <div className="relative h-32 w-48 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #1
            </span>
          </div>
          <div className="relative h-32 w-48 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #2
            </span>
          </div>
          <div className="relative h-32 w-48 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #3
            </span>
          </div>
          <div className="relative h-32 w-48 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #4
            </span>
          </div>
        </div>

        <h2 className="mt-0 mb-2 pt-5 pl-5 text-2xl font-bold leading-tight text-black">
          COMPLETED COURSES
        </h2>
        <div className="flex w-fit flex-wrap gap-10 overflow-x-scroll pl-5">
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #1
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #2
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #3
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #4
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #5
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #6
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #7
            </span>
          </div>
          <div className="relative h-32 w-32 rounded-lg bg-gray-300 shadow">
            <span className="text-1xl flex h-full w-full items-center justify-center font-medium">
              Course #8
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
