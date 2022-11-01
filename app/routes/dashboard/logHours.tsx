import { ActionArgs, redirect } from "@remix-run/node";
import { logHours } from "~/models/loghours.server";
import { getUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  console.log("action");
  const formData = await request.formData();
  const userId = await getUserId(request);

  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const comment = formData.get("comment");
  const courseId = formData.get("courseId") as string;
  console.log({ userId, start_time, end_time, comment, courseId });

  await logHours({
    start: new Date(start_time as string),
    end: new Date(end_time as string),
    comment: comment as string,
    courseId,
    userId: userId as string,
  });

  return redirect(`/dashboard`);
}
