import { getFullStudentUser, getUser, getUserId } from "~/session.server";
import { UserType } from ".prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { toast, ToastContainer } from "react-toastify";
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
  deleteActivity,
  editActivity,
  getActivities,
} from "~/models/activities.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
  const activities = await getActivities({
    request: request,
    isProfessor: user.accountType === UserType.PROFESSOR,
  });

  return json({
    activities: activities,
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
  const id = formData.get("activityId");

  if (action === "delete") {
    await deleteActivity({ id: id as string });
    return redirect("/activities");
  } else if (action === "edit") {
    const name = formData.get("name");
    const description = formData.get("description");

    await editActivity({
      id: id as string,
      name: name as string,
      description: description as string,
    });
    return redirect("/activities");
  }
}

function ViewActivityDialog({
  activity,
  open,
  setModalOpen,
  isProfessor,
}: {
  activity: any;
  open: boolean;
  setModalOpen: (open: boolean) => void;
  isProfessor: boolean;
}) {
  return (
    <Dialog
      style={{ minWidth: "400px" }}
      open={open}
      onClose={() => setModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{activity.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
      </DialogContent>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {isProfessor && (
            <Typography variant="body2" color="text.secondary">
              Created By: {activity.userId}
            </Typography>
          )}
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

function EditActivityDialog({
  activity,
  open,
  setModalOpen,
}: {
  activity: any;
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
      <Form method="post" onSubmit={() => toast.info("Editing Activity!")}>
        <DialogContent>
          <input type="hidden" name="activityId" value={activity.id} />
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={activity.name}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            defaultValue={activity.description}
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

function ActivityCard({
  activity,
  isProfessor,
}: {
  activity: any;
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
            {activity.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {activity.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setModalOpen(true)}>View</Button>
          {!isProfessor && (
            <Button onClick={() => setEditModalOpen(true)}>Edit</Button>
          )}
        </CardActions>
      </Card>
      <ViewActivityDialog
        activity={activity}
        open={modalOpen}
        setModalOpen={setModalOpen}
        isProfessor={isProfessor}
      />
      <EditActivityDialog
        activity={activity}
        open={editModalOpen}
        setModalOpen={setEditModalOpen}
      />
    </Box>
  );
}

export default function Activities() {
  const { activities, isProfessor } = useLoaderData();

  return (
    <main
      className="sm:items-top sm:justify-left relative bg-white sm:flex"
      style={{ padding: "0 20px" }}
    >
      <Grid container spacing={1} mt={3}>
        {!isProfessor && (
          <Grid xs={12} ml={2}>
            <Link to="/activities/create">
              <Button variant="contained">Create an activity</Button>
            </Link>
          </Grid>
        )}
        {activities.map((activity: any, key: any) => (
          <Grid item xs={3} key={key}>
            <ActivityCard activity={activity} isProfessor={isProfessor} />
          </Grid>
        ))}
      </Grid>

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}
