import {
  Box,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Badge, User, UserType } from "@prisma/client";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getBadges } from "~/models/badge.server";
import { getFullStudentUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getFullStudentUser(request);
  if (!user) {
    return redirect("/login");
  }
  const badges = await getBadges(user as User & { badgesEarned: Badge[] });

  return json({
    badges,
    isProfessor: user.accountType === UserType.PROFESSOR,
  });
}

function BadgeCard({
  badge,
  isProfessor,
}: {
  badge: Badge;
  isProfessor: boolean;
}) {
  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <CardMedia
            image={badge.pictureUrl} // require image
            title={badge.name}
            sx={{ height: 200, width: 200 }}
          />
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {badge.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {badge.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function Badges() {
  const { badges, isProfessor } = useLoaderData();
  return (
    <main
      className="sm:items-top sm:justify-left relative bg-white sm:flex"
      style={{ padding: "0 20px" }}
    >
      <Grid container spacing={2} mt={2}>
        {isProfessor && (
          <Grid xs={12} ml={2}>
            <Link to="/badges/create">
              <Button variant="contained">Create a new badge</Button>
            </Link>
          </Grid>
        )}
        {badges.length > 0 ? (
          badges.map((badge) => (
            <BadgeCard badge={badge} isProfessor={isProfessor} />
          ))
        ) : (
          <Grid xs={12}>
            {/* center the text */}
            <Typography variant="h5" align="center">
              No badges yet!
            </Typography>
          </Grid>
        )}
      </Grid>
    </main>
  );
}
