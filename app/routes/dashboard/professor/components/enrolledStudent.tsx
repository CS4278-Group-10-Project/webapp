import React from "react";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Gravatar from "react-gravatar";

export default function EnrolledStudent({ studentList }: any) {
  return (
    <Container>
      <h2 className="text-2xl font-bold leading-tight text-black">
        Enrolled Students
      </h2>

      <TableContainer style={{}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
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
                <TableCell component="th" scope="student">
                  {student.id}
                </TableCell>
                <TableCell align="right">{student.first_name}</TableCell>
                <TableCell align="right">{student.last_name}</TableCell>
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
