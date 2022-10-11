import { Box } from "@mui/material";

export default function UserInfo() {
  return (
    <Box>
      {" "}
      <h1 className="fon.t-bold mt-0 mb-2 text-2xl leading-tight text-white">
        Cornelia Vanderbilt
      </h1>
      <div className="columns-2 gap-5 overflow-y-auto">
        <p className="text-1xl mt-0 mb-2 font-light text-white">
          25% Graduation Requirements Met
        </p>
      </div>
      <hr className="w-50 my-4 mx-auto h-1 border-0 bg-white dark:bg-gray-700 md:my-10"></hr>
      ;
    </Box>
  );
}
