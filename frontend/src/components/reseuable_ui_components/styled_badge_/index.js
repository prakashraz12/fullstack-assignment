import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";


export default function CustomizedBadges({ label, badgeContent, icon }) {
  return (
    <IconButton size="large" aria-label={label} color="inherit">
          <Badge badgeContent={4} color="error">
            {icon}
          </Badge>
        </IconButton>
  );
}
