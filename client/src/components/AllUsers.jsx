import { useEffect, useState } from "react";
import {
  Button,
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
import EditModal from "./modals/EditModal";
import AddUserModal from "./modals/AddUserModal";

export default function AllUsers() {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/users`
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(false);

  const userFields = [
    { name: "name", label: "User Name" },
    { name: "email", label: "Email" },
    { name: "role", label: "Role" },
    { name: "major", label: "Major" }, // TODO expand to dropdown
  ];

  const majors = ["Computer Science", "Math", "Biology", "History"];

  console.log("users",users);
  console.log("selectedUser", selectedUser);

  const fetchUsers = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();
    setUsers(data);
  };

  const handleDeleteUser = async (id) => {
    console.log("delete user id", id)
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    console.log(res);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Manage Users
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenUserModal(true)}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              {/* <TableCell sx={{ color: "white" }}>ID</TableCell> */}
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
                {/* <TableCell>{user.id}</TableCell>TODO replace with row numbers */}
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.major}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => {
                    console.log("edit button clicked", user);
                    setSelectedUser(user);
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => 
                    {
                      console.log("delete button clicked", user.id);
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

      {selectedUser && (
        <EditModal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          entityName="user"
          data={selectedUser}
          fields={userFields}
          endpoint={endpoint}
          onSave={()=>{fetchUsers()}}
        />
      )}

      <AddUserModal
        isOpen={openUserModal}
        endpoint={endpoint}
        onClose={() => setOpenUserModal(false)}
        onSave={fetchUsers}
        majors={majors}
      />
    </Container>
  );
}
