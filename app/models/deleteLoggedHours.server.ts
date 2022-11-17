import type { HoursLog } from "@prisma/client";
import { prisma } from "~/db.server";

export async function deleteLoggedHours({ id }: { id: HoursLog["id"] }) {
  return await prisma.hoursLog.delete({
    where: {
      id,
    },
  });
}
