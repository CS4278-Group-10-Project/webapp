
export default function Dashboard() {
    return  <main className="sm:items-top sm:justify-left relative min-h-screen items-stretch bg-white sm:flex">
    {/* ----- SIDEBAR START ----- */}
    <aside className="min-h-full w-80" aria-label="Sidebar">
      {/* student name */}
      <div className="overflow-y-auto bg-black py-4 px-3 dark:bg-gray-800">
        <h1 className="mt-0 mb-2 text-2xl font-bold leading-tight text-white">
          Cornelia Vanderbilt
        </h1>
        {/* two columns below name */}
        <div className="columns-2 gap-5 overflow-y-auto">
          <p className="text-1xl mt-0 mb-2 font-light text-white">
            25% Graduation Requirements Met
          </p>
        </div>
        {/* horizontal bar */}
        <hr className="w-50 my-4 mx-auto h-1 border-0 bg-white dark:bg-gray-700 md:my-10"></hr>

        <h1 className="text-1xl mt-0 mb-2 font-medium leading-tight text-white">
          COMPETENCIES
        </h1>
        {/* list of competencies */}
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                ✓
              </span>
              <span className="ml-3 flex-1 whitespace-nowrap">
                Patient care
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                ✓
              </span>
              <span className="ml-3 flex-1 whitespace-nowrap">Ethics</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                ✓
              </span>
              <span className="ml-3 flex-1 whitespace-nowrap">
                Pharmacology
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                ✓
              </span>
              <span className="ml-3 flex-1 whitespace-nowrap">
                Systems Thinking
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                {" "}
              </span>
              <span className="ml-3 flex-1 whitespace-nowrap">Python</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <input
                id="checkbox-6"
                type="checkbox"
                value=""
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              ></input>
              <label
                htmlFor="checkbox-6"
                className="ml-3 flex-1 whitespace-nowrap"
              >
                Music
              </label>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
            >
              <input
                id="checkbox-7"
                type="checkbox"
                value=""
                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              ></input>
              <label
                htmlFor="checkbox-7"
                className="ml-3 flex-1 whitespace-nowrap"
              >
                Technical Writing
              </label>
            </a>
          </li>
        </ul>
        {/* update button */}
        <div className="pt-10">
          <button
            type="button"
            className="mr-2 mb-2 bg-[#4D6C76] px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Update
          </button>
        </div>
      </div>
    </aside>
    {/* ----- SIDEBAR END ----- */}

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
}