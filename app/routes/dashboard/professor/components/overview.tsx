import { Link, Box, Typography } from "@mui/material";

export default function Overview() {
  return (
    <Box>
      <Typography
        variant="h6"
        component="h6"
        className="text-1xl mt-0 mb-2 font-medium leading-tight text-white"
      >
        Overview
      </Typography>
      <Box
        style={{
          flexDirection: "column",
          display: "flex",
        }}
        gap={2}
      >
        <Link
          href="http://brightspace.vanderbilt.edu"
          className="underlined text-white"
        >
          Brightspace
        </Link>
        <Link href="/badge/create" className="text-white underline">
          Create Badge
        </Link>
        <Link href="/badge/assign" className="text-white underline">
          Assign Badge to Student
        </Link>
      </Box>
    </Box>
  );
}
