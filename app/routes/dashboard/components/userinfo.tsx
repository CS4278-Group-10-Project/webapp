import { Box } from "@mui/material";
import { Program, User, UserType, Badge, Course } from "@prisma/client";
import Gravatar from "react-gravatar";

type UserInfoType = User & {
  program: Program & {
    courses: Course[];
  };
  completedCourses: Course[];
  badgesEarned: Badge[];
};

const calculateProgression = (user: UserInfoType) => {
  const programCourses = user.program.courses ?? [];
  const completedCourses = user.completedCourses;
  const overlap = programCourses.filter((course) =>
    completedCourses.some((completedCourse) => completedCourse.id === course.id)
  );
  return (
    (overlap.length /
      (programCourses.length == 0 ? 1 : programCourses.length)) *
    100
  );
};

const ProgramInfo = ({ user }: { user: UserInfoType }) => {
  const percent = calculateProgression(user);
  return (
    <Box className="columns-2 gap-5 overflow-y-auto">
      <p className="text-1xl mt-0 mb-2 font-light text-white">
        Professor in <></>
        {user.program.name}
      </p>

      {user.accountType === UserType.STUDENT ? (
        <p className="text-1xl mt-0 mb-2 font-light text-white">
          {percent}% Graduation Requirements Met
        </p>
      ) : (
        <p className="text-1xl mt-0 mb-2 font-light text-white">
          {user.program.description}
        </p>
      )}
    </Box>
  );
};

export default function UserInfo({ user }: { user: UserInfoType }) {
  console.log({
    user,
  });
  return (
    <Box>
      <h1 className="mt-2 mb-2 text-2xl font-bold leading-tight text-white">
        {user.firstName} {user.lastName}
      </h1>

      {/* centered div */}
      <Box className="flex flex-col items-center">
        <Gravatar email={user.email} size={200} />
      </Box>

      <hr className="w-50 my-4 mx-auto h-1 border-0 bg-white dark:bg-gray-700 md:my-10"></hr>
      <ProgramInfo user={user} />
      <hr className="w-50 my-4 mx-auto h-1 border-0 bg-white dark:bg-gray-700 md:my-10"></hr>

      {user.badgesEarned &&
        user.badgesEarned.map((badge: Badge) => (
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <img
                src={badge.pictureUrl}
                alt={badge.name}
                className="h-10 w-10 rounded-full"
              />
              <p className="text-1xl mt-0 mb-2 font-light text-white">
                {badge.name}
              </p>
            </div>
            <p className="text-1xl mt-0 mb-2 font-light text-white">
              {badge.description}
            </p>
          </div>
        ))}
    </Box>
  );
}
