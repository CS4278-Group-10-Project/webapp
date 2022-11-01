import { Box } from "@mui/material";
import { Program, User, UserType } from "@prisma/client";
import Gravatar from "react-gravatar";

export default function UserInfo({
  user,
}: {
  user: User & { program: Program };
}) {
  return (
    <Box>
      <h1 className="fon.t-bold mt-0 mb-2 text-2xl leading-tight text-white">
        {user.firstName} {user.lastName}
      </h1>

      <Gravatar email={user.email} size={200} />

      <div className="columns-2 gap-5 overflow-y-auto">
        <p className="text-1xl mt-0 mb-2 font-light text-white">
          {user.program.name}
        </p>
        <p className="text-1xl mt-0 mb-2 font-light text-white">
          25% Graduation Requirements Met
        </p>
      </div>
      <hr className="w-50 my-4 mx-auto h-1 border-0 bg-white dark:bg-gray-700 md:my-10"></hr>
    </Box>
  );
}
