import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import StudentList from "./components/studentList";
import BadgeList from "./components/badgeList";
import { Form } from "@remix-run/react";

export default function LogHours() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);

  const selectedStudent = (studentArray: any) => {
    setSelectedStudents(studentArray);
  };

  const selectedBadge = (badgeArray: any) => {
    setSelectedBadges(badgeArray);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //api request...
    console.log(selectedStudents, selectedBadges);
  };

  return (
    <Box className="h-full bg-gray-100" style={{ padding: "5%" }}>
      <Paper
        style={{
          margin: "auto",
          padding: "5%",
        }}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 50,
            width: "60%",
            margin: "auto",
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            margin="auto"
            variant="h4"
            component="h4"
            fontFamily="Roboto"
          >
            Select Badges for students
          </Typography>

          <Box margin="auto">
            <StudentList selectedStudent={selectedStudent} />
          </Box>
          <Box margin="auto">
            <BadgeList selectedBadge={selectedBadge} />
          </Box>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Paper>
    </Box>
  );
}
