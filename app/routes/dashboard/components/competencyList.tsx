import { Box } from "@mui/material";
import { Competency } from "@prisma/client";

export default function CompetencyList({
  competencies,
}: {
  competencies: Competency[];
}) {
  console.log({ competencies });
  return (
    <Box>
      <h1 className="text-1xl mt-0 mb-2 font-medium leading-tight text-white">
        COMPETENCIES
      </h1>
      <ul className="space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-100 hover:text-black dark:text-white dark:hover:bg-gray-700"
          >
            <span className="ml-3 inline-flex h-3 w-3 items-center justify-center bg-blue-200 p-3 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-200">
              ✓
            </span>
            <span className="ml-3 flex-1 whitespace-nowrap">Patient care</span>
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
            <span className="ml-3 flex-1 whitespace-nowrap">Pharmacology</span>
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
    </Box>
  );
}
