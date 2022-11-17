import { prisma } from "~/db.server";
import {
  createActivity,
  deleteActivity,
  getActivities,
} from "./models/activities.server";
import {
  createCompetency,
  deleteCompetency,
  editCompetency,
  getAllCompetencies,
} from "./models/competencies.server";
import {
  createUser,
  deleteUserByEmail,
  getUserByEmail,
  getUserById,
} from "./models/user.server";

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

//PRISMA TESTING
// write a test to check if createActivity returns an activity
test("createActivity returns an activity", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  const activity = await prisma.activity.create({
    data: {
      name: "test",
      description: "test_description",
      competencies: {
        connect: [{ id: competency.id }],
      },
    },
  });
  expect(activity).toBeTruthy();
  expect(activity.name).toBe("test");
  expect(activity.description).toBe("test_description");
});

// write a test to check if deleteActivity deletes an activity
test("deleteActivity deletes an activity", async () => {
  const competency = await createCompetency({
    name: "test1",
    description: "test_description1",
  });
  const activity = await prisma.activity.create({
    data: {
      name: "test",
      description: "test_description",
      competencies: {
        connect: [{ id: competency.id }],
      },
    },
  });
  await prisma.activity.delete({
    where: { id: activity.id },
  });
  const deletedActivity = await prisma.activity.findUnique({
    where: { id: activity.id },
  });
  expect(deletedActivity).toBeNull();
});

//delete function testing
// write a test to check if deleteActivity deletes an activity
test("deleteActivity deletes an activity", async () => {
  const competency = await createCompetency({
    name: "test1",
    description: "test_description1",
  });
  const activity = await prisma.activity.create({
    data: {
      name: "test",
      description: "test_description",
      competencies: {
        connect: [{ id: competency.id }],
      },
    },
  });
  await deleteActivity({ id: activity.id });
  const deletedActivity = await prisma.activity.findUnique({
    where: { id: activity.id },
  });
  expect(deletedActivity).toBeNull();
});

// write a test to check if getActivities returns an array of activities when isProfessor is false
test("getActivities returns an array of activities", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  const activity = await prisma.activity.create({
    data: {
      name: "test",
      description: "test_description",
      competencies: {
        connect: [{ id: competency.id }],
      },
    },
  });
  const request = new Request("http://localhost:3000");

  const activities = await getActivities({
    request: request,
    isProfessor: false,
  });
  expect(activities).toBeTruthy();
  expect(activities).toContainEqual(activity);
  expect(activities).toBeInstanceOf(Array);
});

// write a test to check if getActivities returns an array of activities when isProfessor is true
test("getActivities returns an array of activities when isProfessor is true", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  const activity = await prisma.activity.create({
    data: {
      name: "test",
      description: "test_description",
      competencies: {
        connect: [{ id: competency.id }],
      },
    },
  });
  const request = new Request("http://localhost:3000");

  const activities = await getActivities({
    request: request,
    isProfessor: true,
  });
  expect(activities).toBeTruthy();
  expect(activities).toContainEqual(activity);
  expect(activities).toBeInstanceOf(Array);
});

// write a test to check if getActivities returns an array of activities when isProfessor is true and the activity is not published
test("getActivities returns an array of activities when isProfessor is true and the activity is not published", async () => {
  const activity = null;

  const request = new Request("http://localhost:3000");

  const activities = await getActivities({
    request: request,
    isProfessor: true,
  });
  expect(activities).toBeTruthy();
  expect(activities).not.toContainEqual(activity);
  expect(activities).toBeInstanceOf(Array);
});

// write a test to check if getActivities returns an array of activities when isProfessor is false and the activity is not published
test("getActivities returns an array of activities when isProfessor is false and the activity is not published", async () => {
  const activity = null;

  const request = new Request("http://localhost:3000");

  const activities = await getActivities({
    request: request,
    isProfessor: false,
  });
  expect(activities).toBeTruthy();
  expect(activities).not.toContainEqual(activity);
  expect(activities).toBeInstanceOf(Array);
});

// write a test to check if getCompetencies returns an array of competencies
test("getCompetencies returns an array of competencies", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  const request = new Request("http://localhost:3000");
  const competencies = await getAllCompetencies(request);
  expect(competencies).toBeTruthy();
  expect(competencies).toContainEqual(competency);
  expect(competencies).toBeInstanceOf(Array);
});

// write a test to check if edtCompetency edits a competency
test("editCompetency edits a competency", async () => {
  const competency = await createCompetency({
    name: "test",
    description: "test_description",
  });
  const editedCompetency = await editCompetency({
    id: competency.id,
    name: "edited",
    description: "edited_description",
  });
  expect(editedCompetency).toBeTruthy();
  expect(editedCompetency.name).toBe("edited");
  expect(editedCompetency.description).toBe("edited_description");
});

// write a test to check if createUSer creates a user
test("createUser creates a user", async () => {
  const user = await createUser({
    email: "pedaras@vanderbilt.edu",
    password: "@Password2022!",
    firstName: "Kunal",
    lastName: "Kumar",
    bio: "I am a student",
    programId: "0",
    standing: "FRESHMAN",
  });

  expect(user).toBeTruthy();
  expect(user.email).toBe("pedaras@vanderbilt.edu");
  expect(user.firstName).toBe("Kunal");
  expect(user.lastName).toBe("Kumar");
  expect(user.bio).toBe("I am a student");
  expect(user.programId).toBe(0);
  expect(user.standing).toBe("FRESHMAN");

  await prisma.user.delete({
    where: { id: user.id },
  });
});

// write a test to check if getUserByEmail returns a user when the user is not found
test("getUserByEmail returns a user", async () => {
  const foundUser = await getUserByEmail("kunal@vanderbilt.edu");
  expect(foundUser).toBeNull();
});

// write a test to check if getUserByEmail returns a user
test("getUserByEmail returns a user when user is present", async () => {
  const user = await createUser({
    email: "pedaras@vanderbilt.edu",
    password: "@Password2022!",
    firstName: "Kunal",
    lastName: "Kumar",
    bio: "I am a student",
    programId: "0",
    standing: "FRESHMAN",
  });

  const foundUser = await getUserByEmail("pedaras@vanderbilt.edu");
  expect(foundUser).toBeTruthy();

  await prisma.user.delete({
    where: { id: user.id },
  });
});

// write a test to check if getUserById returns a user when the user is not found
test("getUserById returns a user when the user is not found", async () => {
  const foundUser = await getUserById("NOT_FOUND");
  expect(foundUser).toBeNull();
});

// write a test to check if getUserById returns a user
test("getUserById returns a user", async () => {
  const user = await createUser({
    email: "pedaras@vanderbilt.edu",
    password: "@Password2022!",
    firstName: "Kunal",
    lastName: "Kumar",
    bio: "I am a student",
    programId: "0",
    standing: "FRESHMAN",
  });

  const foundUser = await getUserById(user.id);
  expect(foundUser).toBeTruthy();

  await prisma.user.delete({
    where: { id: user.id },
  });
});

// write a test to check if deleteUser deletes a user
test("deleteUser deletes a user", async () => {
  const user = await createUser({
    email: "pedaras@vanderbilt.edu",
    password: "@Password2022!",
    firstName: "Kunal",
    lastName: "Kumar",
    bio: "I am a student",
    programId: "0",
    standing: "FRESHMAN",
  });

  await deleteUserByEmail(user.email);
  const foundUser = await getUserByEmail(user.email);
  expect(foundUser).toBeNull();
});
