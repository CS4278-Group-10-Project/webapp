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
