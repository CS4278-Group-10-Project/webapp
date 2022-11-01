import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Program, StudentStanding } from "@prisma/client";
import {
  ActionArgs,
  json,
  LoaderArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useRef, useEffect } from "react";
import { getAllPrograms } from "~/models/program.server";
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { capitalize, safeRedirect, validateEmail } from "~/utils";
import { ToastContainer, toast } from "react-toastify";

export const meta: MetaFunction = () => {
  return {
    title: "Register",
  };
};

export async function loader({ request }: LoaderArgs) {
  // if logged in redirect
  const userId = await getUserId(request);
  if (userId) return redirect("/");

  const programs = await getAllPrograms();
  return json(programs);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const programId = formData.get("programId");
  const standing = formData.get("standing");
  const bio = formData.get("bio");

  if (!firstName || !lastName || !programId || !standing) {
    return json(
      {
        errors: {
          firstName: !firstName ? "First name is required." : null,
          lastName: !lastName ? "Last name is required." : null,
          programId: !programId ? "Program is required." : null,
          standing: !standing ? "Standing is required." : null,
          bio: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser({
    email,
    password,
    firstName,
    lastName,
    programId,
    standing,
    bio,
  });

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        VUSN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function ProgramSelect({ programs }: { programs: Program[] }) {
  console.log({ programs });
  return (
    <FormControl fullWidth required>
      <InputLabel htmlFor="program-select">Program</InputLabel>
      <Select
        defaultValue=""
        id="program-select"
        label="Program"
        name="programId"
      >
        {programs.map((program) => (
          <MenuItem value={program.id} key={program.id}>
            {program.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function StandingSelect() {
  return (
    <FormControl required>
      <FormLabel id="standing-select">Your placement in VUSN</FormLabel>
      <RadioGroup
        row
        aria-labelledby="standing-select"
        name="standing"
        defaultValue={StudentStanding.FRESHMAN}
      >
        {Object.values(StudentStanding).map((standing) => (
          <FormControlLabel
            value={standing}
            control={<Radio />}
            label={capitalize(standing)}
            labelPlacement="bottom"
            key={standing}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default function Register() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();
  const programs = useLoaderData();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  useEffect(() => {
    if (actionData?.errors) {
      toast.warn(`${Object.values(actionData.errors).join(" ")}`);
    }
  }, [actionData]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form method="post" className="space-y-6" noValidate>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // type="email"
                  autoComplete="email"
                  ref={emailRef}
                />
              </Grid>

              <Grid item xs={12}>
                <ProgramSelect programs={programs} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  ref={passwordRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="bio"
                  label="Bio (optional)"
                  id="bio"
                  multiline
                  rows={2}
                  autoComplete="bio"
                />
              </Grid>

              <Grid item xs={12} mt={2}>
                <StandingSelect />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Log in</Link>
              </Grid>
            </Grid>
          </Box>
          <input type="hidden" name="redirectTo" value={redirectTo} />
        </Form>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
}
