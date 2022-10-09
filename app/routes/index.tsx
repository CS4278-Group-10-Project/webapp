export default function Index() {

  return (
    <main className="relative min-h-screen items-stretch bg-white sm:flex sm:items-top sm:justify-left">

      {/* ----- SIDEBAR START ----- */}
      <aside className="w-80 min-h-full" aria-label="Sidebar">
        {/* student name */}
        <div className="overflow-y-auto py-4 px-3 bg-black dark:bg-gray-800">
          <h1 className="font-bold leading-tight text-white text-2xl mt-0 mb-2">
            Cornelia Vanderbilt
          </h1>
          {/* two columns below name */}
          <div className="overflow-y-auto columns-2 gap-5" >
            <img src={require('app/portrait.jpeg')} className="w-auto h-30" />
            <p className="font-light text-1xl mt-0 mb-2 text-white">25% Graduation Requirements Met</p>
          </div>
          {/* horizontal bar */}
          <hr className="my-4 mx-auto w-50 h-1 bg-white border-0 md:my-10 dark:bg-gray-700"></hr>

          <h1 className="font-medium leading-tight text-1xl mt-0 mb-2 text-white">
            COMPETENCIES
          </h1>
          {/* list of competencies */}
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">✓</span>
                <span className="flex-1 ml-3 whitespace-nowrap">Patient care</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">✓</span>
                <span className="flex-1 ml-3 whitespace-nowrap">Ethics</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">✓</span>
                <span className="flex-1 ml-3 whitespace-nowrap">Pharmacology</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">✓</span>
                <span className="flex-1 ml-3 whitespace-nowrap">Systems Thinking</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200"> </span>
                <span className="flex-1 ml-3 whitespace-nowrap">Python</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <input id="checkbox-6" type="checkbox" value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </input>
                <label for="checkbox-6" className="flex-1 ml-3 whitespace-nowrap">Music</label>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700">
                <input id="checkbox-7" type="checkbox" value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </input>
                <label htmlFor="checkbox-7" className="flex-1 ml-3 whitespace-nowrap">Technical Writing</label>
              </a>
            </li>
          </ul>
          {/* update button */}
          <div className="pt-10">
            <button type="button" className="text-white bg-[#4D6C76] hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Update
            </button>
          </div>

        </div>
      </aside>
      {/* ----- SIDEBAR END ----- */}


      {/* STUDENT DASHBOARD CONTENT STARTS */}
      <div>
        <h2 className="font-bold leading-tight text-black text-2xl mt-0 mb-2 pt-5 pl-5">
          CURRENT COURSES
        </h2>
        <div className="overflow-x-scroll flex gap-10 pl-5 flex-wrap">
          <div className="relative bg-gray-300 w-48 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #1</span>
          </div>
          <div className="relative bg-gray-300 w-48 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #2</span>
          </div>
          <div className="relative bg-gray-300 w-48 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #3</span>
          </div>
          <div className="relative bg-gray-300 w-48 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #4</span>
          </div>
        </div>

        <h2 className="font-bold leading-tight text-black text-2xl mt-0 mb-2 pt-5 pl-5">
          COMPLETED COURSES
        </h2>
        <div className="overflow-x-scroll flex gap-10 pl-5 flex-wrap w-fit">
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #1</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #2</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #3</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #4</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #5</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #6</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #7</span>
          </div>
          <div className="relative bg-gray-300 w-32 h-32 rounded-lg shadow">
            <span className="w-full h-full flex justify-center items-center text-1xl font-medium">Course #8</span>
          </div>
        </div>
      </div>
    </main>
  );
}


{/* <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg> */ }