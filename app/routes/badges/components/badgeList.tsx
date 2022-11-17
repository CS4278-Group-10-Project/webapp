import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function BadgeList({ selectedBadge }: any) {
  const badges = [
    { name: "Badge 1", description: "Description 1" },
    { name: "Badge 2", description: "Description 2" },
    { name: "Badge 3", description: "Description 3" },
    { name: "Badge 4", description: "Description 4" },
    { name: "Badge 5", description: "Description 5" },
    { name: "Badge 6", description: "Description 6" },
  ];

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.name === value.name}
        multiple
        onChange={(event, newValue) => {
          selectedBadge(newValue);
        }}
        id="tags-standard"
        options={badges}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Badge"
            placeholder="Badge"
          />
        )}
      />
    </Stack>
  );
}
