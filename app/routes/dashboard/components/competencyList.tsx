import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Competency } from "@prisma/client";
import FolderIcon from "@mui/icons-material/Folder";
import { Link } from "@remix-run/react";

export default function CompetencyList({
  competencies,
}: {
  competencies: Competency[];
}) {
  return (
    <Box>
      <h1 className="text-1xl mt-0 mb-2 font-medium leading-tight text-white">
        COMPETENCIES
      </h1>
      {competencies.length > 0 ? (
        competencies.map((competency) => (
          <List
            key={competency.id}
            sx={{
              color: "white",
            }}
          >
            <ListItem>
              <ListItemIcon>
                <FolderIcon style={{ color: "white" }} />
              </ListItemIcon>
              <Link to="/competencies">
                <ListItemText primary={competency.name} />
                <ListItemText primary={competency.description} />
              </Link>
            </ListItem>
          </List>
        ))
      ) : (
        <p className="text-1xl mt-0 mb-2 font-light text-white">
          No competencies earned yet
        </p>
      )}
    </Box>
  );
}
