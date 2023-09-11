import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {AddItemForm} from "./AddItemForm";
import React from "react";


export const Header = () => {
  return (
     <AppBar position="static">
       <Toolbar>
         <IconButton
            // size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{mr: 2}}
         >
           <MenuIcon/>

         </IconButton>
         <Typography variant="h6">
           TodoList
         </Typography>
         <Button color="inherit">Login</Button>
       </Toolbar>
     </AppBar>
  );
};

