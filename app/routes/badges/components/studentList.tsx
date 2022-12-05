import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function StudentList({ selectedStudent }: any) {

  // // dummy data
  // const student = [
  //   { name: "Ujjwal Agzamkhodjaev", email: "student1@vanderbilt.edu" },
  //   { name: "Ilya Jain", email: "student2@vanderbilt.edu" },
  //   { name: "Saydolimkhon Singh", email: "student3@vanderbilt.edu" },
  //   { name: "Austin Vanderbilt", email: "student4@vanderbilt.edu" },
  // ];

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.firstName === value.firstName
                                                  && option.lastName === value.lastName}
        multiple
        onChange={(event, newValue) => {
          selectedStudent(newValue);
        }}
        id="tags-standard"
        options={selectedStudent}
        getOptionLabel={(option) => option.firstName + " " + option.lastName}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Student"
            placeholder="Student"
          />
        )}
      />
    </Stack>
  );
}
