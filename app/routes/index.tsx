import { UserType } from ".prisma/client";
import { Button, Container, Grid, Paper } from "@mui/material";
import { Form, Link } from "@remix-run/react";
import { logout } from "~/session.server";
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
              <Paper
                sx={{
                  opacity: 0.8,
                  padding: 2,
                }}
              >
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="text-block uppercase drop-shadow-md">
                    VUSN
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl font-bold text-black sm:max-w-3xl">
                  Platform for VUSN students to maintain their progress
                </p>

                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  {user ? (
                    <Grid container>
                      <Grid item xs={6}>
                        <center>
                          <Link to="/dashboard">
                            <Button variant="contained">
                              Go to {user.firstName} profile
                            </Button>
                          </Link>
                        </center>
                      </Grid>

                      <Grid item xs={6}>
                        <center>
                          <Form action="/logout" method="post">
                            <Button variant="contained" type="submit">
                              Logout
                            </Button>
                          </Form>
                        </center>
                      </Grid>
                    </Grid>
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
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
