import SchoolIcon from "@mui/icons-material/School";
import { Button, Box, AppBar, Toolbar, Typography, } from "@mui/material";

export default function NavBar ({ user, onLogout }) {
      if (!user) {
    return <p>Please log in.</p>;
  }
  return (

  <AppBar position="static" color="primary">
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <a href="/dashboard">
        <SchoolIcon sx={{ fontSize: 60, color: "white", m: 1, }} />
        </a>
        <Typography variant="h6">Welcome, {user.name}!</Typography>
        <Button
        variant="outlined"
        color="inherit"
        onClick={onLogout}
        sx={{
            borderColor: "white",
            "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
            },
        }}
        >
            Logout
        </Button>
    </Toolbar>
</AppBar>);
}