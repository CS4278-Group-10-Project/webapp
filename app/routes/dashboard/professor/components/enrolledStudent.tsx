import React from "react";

import {
  Avatar,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function EnrolledStudent({ studentList }: any) {
  return (
    <Stack spacing={3} className="mt-0 mb-2 pt-5 pl-5">
      <h2 className="text-2xl font-bold leading-tight text-black">
        Enrolled Students
      </h2>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <TableContainer style={{ width: "100%", maxHeight: 500 }}>
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
                    <Avatar
                      alt="profile-pic"
                      src={student.profile_pic}
                    ></Avatar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
