import { Box, Card, List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import TextInput from "../../../components/reusable_hoc_components/text_input";

const SearchContainer = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <TextInput />
      <Card>
        <List>
          <ListItemButton>
            <ListItemText primary="galliuo" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="galliuo" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="galliuo" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="galliuo" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="galliuo" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="galliuo" />
          </ListItemButton>
        </List>
      </Card>
    </Box>
  );
};

export default SearchContainer;
