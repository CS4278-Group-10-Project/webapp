import { prisma } from "~/db.server";
import {
  createCompetency,
  deleteCompetency,
} from "./models/competencies.server";

import { safeRedirect, validateEmail, DEFAULT_REDIRECT } from "./utils";

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail(undefined)).toBe(false);
  expect(validateEmail(null)).toBe(false);
  expect(validateEmail("")).toBe(false);
  expect(validateEmail("not-an-email")).toBe(false);
  expect(validateEmail("n@")).toBe(false);
});

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toBe(true);
});

// write a test for the safeRedirect function
test("safeRedirect returns default redirect for invalid input", () => {
  expect(safeRedirect(undefined)).toBe(DEFAULT_REDIRECT);
  expect(safeRedirect(null)).toBe(DEFAULT_REDIRECT);
  expect(safeRedirect("")).toBe(DEFAULT_REDIRECT);
  expect(safeRedirect("not-a-url")).toBe(DEFAULT_REDIRECT);
  expect(safeRedirect("//not-a-url")).toBe(DEFAULT_REDIRECT);
});

// write a test to check if createCompetency returns a competency
test("createCompetency returns a competency", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  expect(competency).toBeTruthy();
  expect(competency.name).toBe("test");
  expect(competency.description).toBe("test_description");
});

// write a test to check if deleteCompetency deletes a competency
test("deleteCompetency deletes a competency", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  await deleteCompetency({ id: competency.id });
  const deletedCompetency = await prisma.competency.findUnique({
    where: { id: competency.id },
  });
  expect(deletedCompetency).toBeNull();
});
