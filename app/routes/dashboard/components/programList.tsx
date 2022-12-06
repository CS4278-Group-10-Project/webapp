import { Box, Typography } from "@mui/material";
import type { Program } from "@prisma/client";
import ProgramCard from "./programCard";

export default function ProgramList({
  title,
  programs,
}: {
  title: string;
  programs: Program[];
}) {
  return (
    <>
      <h4 className="mt-0 mb-2 pt-5 pl-5 text-2xl font-bold leading-tight text-black">
        {title}
      </h4>

      {programs.length > 0 ? (
        <Box className="flex flex-wrap gap-10 overflow-x-scroll pl-5">
          {programs.map((program, key) => (
            <ProgramCard program={program} key={key} />
          ))}
        </Box>
      ) : (
        <Typography ml={3}>No programs found</Typography>
      )}
    </>
  );
}
