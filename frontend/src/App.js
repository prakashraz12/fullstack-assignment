import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import UserRouter from "./routes/user_router";
import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./utils/mui_theme_provider";
import Register from "./views/auth/register";
function App() {
  const mode = "light"
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
   <ThemeProvider theme={theme}>
     <Routes>
      <Route path="/" element={<UserRouter/>} >
        <Route index element={<Home/>}/>
      </Route>
      <Route path="/auth/register" element={<Register/>}/>
    </Routes>
   </ThemeProvider>
  );
}

export default App;
