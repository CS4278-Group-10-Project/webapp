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
      </ul>
    </Box>
  );
}
