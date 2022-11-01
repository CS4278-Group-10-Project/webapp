import React from "react";

import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Gravatar from "react-gravatar";
import { Link } from "@remix-run/react";

export default function EnrolledStudent({ studentList }: any) {
  return (
    <Container>
      <Box mt={2}>
        <h2 className="text-2xl font-bold leading-tight text-black">
          Enrolled Students
        </h2>
      </Box>

      <TableContainer style={{}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                First Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Last Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Profile Pic
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {studentList.map((student: any) => (
              <TableRow key={student.email}>
                <TableCell align="right">
                  <Link to={`/student/${student.id}`}>{student.firstName}</Link>
                </TableCell>
                <TableCell align="right">{student.lastName}</TableCell>
                <TableCell align="right">{student.email}</TableCell>
                <TableCell align="right">
                  <Gravatar alt="profile-pic" email={student.email}></Gravatar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
