import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState(null);

  console.log("users",users);
  console.log("selectedUserID", selectedUserID);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:9000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleEditUser = async (id) => {
    console.log("edit user id", id);
    const res = await fetch(`http://localhost:9000/api/users/${id}`);
    const data = await res.json();
    console.log("returning data", data);
  }

  const handleDeleteUser = async (id) => {
    console.log("delete user id", id)
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`http://localhost:9000/api/users/${id}`, { method: "DELETE" });
    console.log(res);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Users
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Role</TableCell>
              <TableCell sx={{ color: "white" }}>Major</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.major}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => {
                    console.log("edit button clicked", user.id);
                    setSelectedUserID(user.id);
                    handleEditUser(user.id);
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => 
                    {
                      console.log("delete button clicked", user.id);
                      setSelectedUserID(user.id);
                      handleDeleteUser(user.id);
                    }
                    }>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {users.length === 0 && (
        <Box textAlign="center" mt={3}>
          <Typography>No users available.</Typography>
        </Box>
      )}
    </Container>
  );
}
