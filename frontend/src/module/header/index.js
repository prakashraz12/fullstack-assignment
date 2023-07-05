import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Grid, Stack, TextField, useMediaQuery } from "@mui/material";
import CustomizedBadges from "../../components/reseuable_ui_components/styled_badge_";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MuiDialog from "../../components/reseuable_ui_components/mui_dialog";
import SearchContainer from "./search_container";
import SearchBar from "../search_bar";

const Header = () => {
  // mui dialog
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar >
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={1} md={3}>
            <Typography variant="h4" fontWeight={"bold"}>
              {isSmallScreen ? "P." : "Padentey"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <SearchBar/>
            <MuiDialog
              open={open}
              handleClose={handleCloseDialog}
              CustomContent={<SearchContainer />}
            />
          </Grid>
          <Grid item xs={5} md={3}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CustomizedBadges
                icon={<ShoppingCartIcon />}
                badgeContent={2}
                label={"cart"}
              />
              <CustomizedBadges
                icon={<FavoriteIcon />}
                badgeContent={2}
                label={"fav"}
              />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 35, height: 35 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
