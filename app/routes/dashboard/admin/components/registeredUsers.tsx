import React, { useState } from "react";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import Gravatar from "react-gravatar";
import { Form, Link } from "@remix-run/react";
import { Program, User, UserType } from "@prisma/client";
import { ActionArgs, redirect } from "@remix-run/node";
import { getUserId } from "~/session.server";
import { deleteUserByEmail, updateUser } from "~/models/user.server";

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const action = formData.get("action");
  const id = formData.get("userId");
  const email = formData.get("email");

  if (action === "delete") {
    await deleteUserByEmail(String(email));
    return redirect("/dashboard/admin");
  } else if (action === "edit") {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const bio = formData.get("bio");
    const programId = formData.get("program");
    const accountType = formData.get("accountType");

    await updateUser({
      id: id as string,
      email: email as string,
      firstName: firstName as string,
      lastName: lastName as string,
      bio: bio as string,
      programId: Number(programId),
      accountType: UserType[accountType as UserType],
    });
    return redirect("/dashboard/admin");
  }
}

function EditUserModal({
  user,
  programs,
  open,
  setModalOpen,
}: {
  user: User;
  programs: Program[];
  open: boolean;
  setModalOpen: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Modify User</DialogTitle>
      <Form method="post" action="/dashboard/admin/components/registeredUsers">
        <DialogContent>
          <input type="hidden" name="userId" value={user.id} />
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            defaultValue={user.firstName}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            defaultValue={user.lastName}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="text"
            fullWidth
            defaultValue={user.email}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            defaultValue={user.bio}
          />
          <Select
            defaultValue={user.programId}
            margin="dense"
            id="program-select"
            fullWidth
            label="Program"
            name="programId"
          >
            {programs.map((program) => (
              <MenuItem value={program.id} key={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            defaultValue={user.accountType}
            margin="dense"
            fullWidth
            label="Account Type"
            name="accountType"
          >
            <MenuItem value={UserType.STUDENT}>Student</MenuItem>
            <MenuItem value={UserType.PROFESSOR}>Professor</MenuItem>
            <MenuItem value={UserType.ADMIN}>Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} autoFocus>
            Close
          </Button>
          <Button type="submit" name="action" value="edit" autoFocus>
            Save
          </Button>
          <Button type="submit" name="action" value="delete">
            Delete
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}

export default function RegisteredUsers({
  users,
  programs,
}: {
  users: User[];
  programs: Program[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);

  return (
    <Container>
      <Box mt={2}>
        <h2 className="text-2xl font-bold leading-tight text-black">
          Registered Users
        </h2>
      </Box>

      <TableContainer style={{}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                First Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Last Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Profile Pic
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Role
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user: any, index) => (
              <TableRow key={user.email}>
                <TableCell align="right">
                  <Link to={`/user/${user.id}`}>{user.firstName}</Link>
                </TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  <Gravatar alt="profile-pic" email={user.email}></Gravatar>
                </TableCell>
                <TableCell align="right">{user.accountType}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedUser(user);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserModal
        user={selectedUser}
        programs={programs}
        open={modalOpen}
        setModalOpen={setModalOpen}
      />
    </Container>
  );
}
