import { Link, Box, Typography } from "@mui/material";

export default function Competencies() {

  return (
    <main
      className="sm:items-top sm:justify-left relative h-full min-h-screen items-stretch bg-white sm:flex"
      style={{ padding: "0 20px" }}
    >
    
    <Box
        style={{
          flexDirection: "column",
          display: "flex",
        }}
        gap={2}
    >
        <h1>Select Your Badge Action Below</h1>
        <Link href="/badges/create" className="text-white underline">
            Create Badge
        </Link>

        <Link href="/badges/assign" className="text-white underline">
          Assign Badge to Student
        </Link>

    </Box>

    </main>
  );
}
