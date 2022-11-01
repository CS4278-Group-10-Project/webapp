import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Form } from "@remix-run/react";
import { useOptionalUser } from "./utils";
import { Button, Link } from "@mui/material";

export default function Header() {
  const user = useOptionalUser();
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#2E3B55" }}
        component="nav"
      >
        <Toolbar>
          <Link href="/" style={{ flexGrow: "1" }} className="xs-none sm-block">
            <Typography variant="h6" component="div">
              VUSN
            </Typography>
          </Link>
          {user ? (
            <>
              <Box
                sx={{ display: { xs: "none", sm: "block" } }}
                marginRight={2}
              >
                <Link href="/dashboard/enrollCourses">Course List</Link>
              </Box>
              <Box
                sx={{ display: { xs: "none", sm: "block" } }}
                marginRight={2}
              >
                <Link href="/dashboard">Dashboard</Link>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Form action="/logout" method="post">
                  <Button
                    type="submit"
                    style={{ color: "white", textTransform: "none" }}
                  >
                    <Typography
                      style={{ color: "#1976d2", textDecoration: "underline" }}
                    >
                      Logout
                    </Typography>
                  </Button>
                </Form>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ display: { xs: "none", sm: "block" } }}
                marginRight={2}
              >
                <Link href="/Register">Register</Link>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Link href="/login">Login</Link>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
