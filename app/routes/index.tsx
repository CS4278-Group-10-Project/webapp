import { Link } from "@remix-run/react";
import { Paper } from "@mui/material";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      <div className="relative h-full">
        <div className="mx-auto w-full">
          <div className="sm:overflow-hidden">
            <img
              className="absolute inset-0 w-full object-cover"
              src="https://news.vanderbilt.edu/files/20211129_Informatics3_840x600.jpeg"
              alt="VUSN landing page background"
            />
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="text-block uppercase drop-shadow-md">
                  VUSN
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl font-bold text-black sm:max-w-3xl">
                Gamified platform for VUSN students to maintain their progress
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/register"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
