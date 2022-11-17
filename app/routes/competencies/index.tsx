import { getFullStudentUser, getUserId } from "~/session.server";
import { UserType } from ".prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  deleteCompetency,
  editCompetency,
  getAllCompetencies,
} from "~/models/competencies.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getFullStudentUser(request);
  if (!user) {
    return redirect("/login");
  }
  const competencies = await getAllCompetencies();

  return json({
    competencies: competencies,
    isProfessor: user.accountType === UserType.PROFESSOR,
  });
}

export async function action({ request }: ActionArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const action = formData.get("action");
  const id = formData.get("competencyId");

  if (action === "delete") {
    await deleteCompetency({ id: id as string });
    return redirect("/competencies");
  } else if (action === "edit") {
    const name = formData.get("name");
    const description = formData.get("description");

    console.log(name, description);

    await editCompetency({
      id: id as string,
      name: name as string,
      description: description as string,
    });

    return redirect("/competencies");
  }
}

function ViewCompetencyDialog({
  competency,
  open,
  setModalOpen,
}: {
  competency: any;
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
      <DialogTitle id="alert-dialog-title">{competency.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {competency.description}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditCompetencyDialog({
  competency,
  open,
  setModalOpen,
}: {
  competency: any;
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
      <Form method="post">
        <DialogContent>
          <input type="hidden" name="competencyId" value={competency.id} />
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={competency.name}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            defaultValue={competency.description}
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

function CompetencyCard({
  competency,
  isProfessor,
}: {
  competency: any;
  isProfessor: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            noWrap
            onClick={() => setModalOpen(true)}
          >
            {competency.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {competency.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setModalOpen(true)}>View</Button>
          {isProfessor && (
            <Button onClick={() => setEditModalOpen(true)}>Edit</Button>
          )}
        </CardActions>
      </Card>
      <ViewCompetencyDialog
        competency={competency}
        open={modalOpen}
        setModalOpen={setModalOpen}
      />
      <EditCompetencyDialog
        competency={competency}
        open={editModalOpen}
        setModalOpen={setEditModalOpen}
      />
    </Box>
  );
}

export default function Competencies() {
  const { competencies, isProfessor } = useLoaderData();

  return (
    <main
      className="sm:items-top sm:justify-left relative bg-white sm:flex"
      style={{ padding: "0 20px" }}
    >
      <Grid container mt={3} rowSpacing={2} columnSpacing={1}>
        {isProfessor && (
          <Grid xs={12} ml={2}>
            <Link to="/competencies/create">
              <Button variant="contained">Add Competency</Button>
            </Link>
          </Grid>
        )}
        {competencies.map((competency: any, key: any) => (
          <Grid item xs={3} key={key}>
            <CompetencyCard competency={competency} isProfessor={isProfessor} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
