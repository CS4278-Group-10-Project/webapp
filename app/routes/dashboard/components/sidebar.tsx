import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar({ userInfo, list }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Box
        className="h-full cursor-pointer overflow-y-auto bg-black p-2 dark:bg-gray-800"
        onClick={() => {
          setDrawerOpen(true);
        }}
      >
        <MenuIcon color="primary" />
      </Box>

      <Drawer
        className="min-h-full w-80"
        aria-label="Sidebar"
        open={drawerOpen}
        onBackdropClick={() => setDrawerOpen(false)}
      >
        <div className="h-full overflow-y-auto bg-black py-4 px-3 dark:bg-gray-800">
          {userInfo}
          {list}
        </div>
      </Drawer>
    </>
  );
}
