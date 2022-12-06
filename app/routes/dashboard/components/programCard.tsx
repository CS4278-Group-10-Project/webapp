import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  Typography,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import type { Program } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { deleteProgram, editProgram } from "~/models/program.server";
import { getUser, getUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
}

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const action = formData.get("action");
  const id = formData.get("programId");

  if (action === "delete") {
    await deleteProgram({ id: Number(id) });
    return redirect("/dashboard");
  } else if (action === "edit") {
    const name = formData.get("name");
    const description = formData.get("description");

    await editProgram({
      id: Number(id),
      name: name as string,
      description: description as string,
    });

    return redirect("/dashboard/admin");
  }

  return redirect("/dashboard/admin");
}

function EditProgramDialog({
  program,
  open,
  setModalOpen,
}: {
  program: Program;
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
      <DialogTitle id="alert-dialog-title">Edit Competency</DialogTitle>
      <Form method="post" action="/dashboard/components/programCard">
        <DialogContent>
          <input type="hidden" name="programId" value={program.id} />
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={program.name}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            defaultValue={program.description}
          />
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

function ViewProgramModal({
  program,
  open,
  setOpen,
}: {
  program: Program;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{program.name}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {program.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ProgramCard({ program }: { program: Program }) {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return (
    <Box p={2} style={{ maxWidth: "400px" }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {program.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {program.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setViewModal(true)}>View</Button>
          <Button onClick={() => setEditModal(true)}>Edit</Button>
        </CardActions>
      </Card>
      <ViewProgramModal
        program={program}
        open={viewModal}
        setOpen={setViewModal}
      />
      <EditProgramDialog
        program={program}
        open={editModal}
        setModalOpen={setEditModal}
      />
    </Box>
  );
}
