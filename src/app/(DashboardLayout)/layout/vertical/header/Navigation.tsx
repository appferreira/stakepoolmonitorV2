import { useState } from "react";
import { Box, Menu, Typography, Button, Divider, Grid } from "@mui/material";
import Link from "next/link";
import { IconChevronDown, IconHelp } from "@tabler/icons-react";
import AppLinks from "./AppLinks";
import QuickLinks from "./QuickLinks";

const AppDD = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        href="/"
        component={Link}
      >
        Dashboard
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        href="/validators"
        component={Link}
      >
        Validators
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        href="/delegators"
        component={Link}
      >
        Delegators
      </Button>
    </>
  );
};

export default AppDD;
