


// src/Components/RegisterList.js
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, IconButton, TextField, InputAdornment
} from '@mui/material';
import { Edit, Delete, Save, Cancel, Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from '../axios';

const RegisterList = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const roleId = parseInt(localStorage.getItem("RoleId"), 10); // 1 = Student, 2 = Teacher
  const loggedInUserId = parseInt(localStorage.getItem("Id"), 10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('Register/GetAll', {
          params: { pageNumber: 1, pageSize: 100 }
        });

        let result = Array.isArray(res.data.register) ? res.data.register : [];

        if (roleId === 1) {
          result = result.filter(u => u.id === loggedInUserId);
        }

        setUsers(result);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [roleId, loggedInUserId]);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedUser({ ...users[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedUser(null);
  };

  const handleSave = () => {
    axiosInstance.put(`Register/Update/${editedUser.id}`, editedUser)
      .then(() => {
        const updated = [...users];
        updated[editingIndex] = editedUser;
        setUsers(updated);
        setEditingIndex(null);
        setEditedUser(null);
      })
      .catch(err => console.error("Update failed", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axiosInstance.delete(`Register/Delete/${id}`)
        .then(() => {
          setUsers(prev => prev.filter(u => u.id !== id));
        })
        .catch(err => console.error("Delete failed", err));
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const getRoleName = (rid) => (rid === 1 ? "Student" : "Teacher");

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Registered Users</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Pincode</TableCell>
              {roleId === 2 && <TableCell>Password</TableCell>}
              <TableCell>Role</TableCell>
              {roleId === 2 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingIndex === index
                    ? <TextField name="userName" value={editedUser.userName} onChange={handleChange} />
                    : user.userName}
                </TableCell>
                <TableCell>
                  {editingIndex === index
                    ? <TextField name="emailAddress" value={editedUser.emailAddress} onChange={handleChange} />
                    : user.emailAddress}
                </TableCell>
                <TableCell>
                  {editingIndex === index
                    ? <TextField name="mobile" value={editedUser.mobile} onChange={handleChange} />
                    : user.mobile}
                </TableCell>
                <TableCell>
                  {editingIndex === index
                    ? <TextField name="address" value={editedUser.address} onChange={handleChange} />
                    : user.address}
                </TableCell>
                <TableCell>
                  {editingIndex === index
                    ? <TextField name="pincode" value={editedUser.pincode} onChange={handleChange} />
                    : user.pincode}
                </TableCell>

                {roleId === 2 && (
                  <TableCell>
                    {editingIndex === index ? (
                      <TextField
                        name="password"
                        value={editedUser.password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    ) : (
                      <TextField
                        value={user.password}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  </TableCell>
                )}

                <TableCell>{getRoleName(user.roleId)}</TableCell>

                {roleId === 2 && (
                  <TableCell>
                    {editingIndex === index ? (
                      <>
                        <IconButton onClick={handleSave}><Save /></IconButton>
                        <IconButton onClick={handleCancel}><Cancel /></IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(index)}><Edit /></IconButton>
                        <IconButton onClick={() => handleDelete(user.id)}><Delete /></IconButton>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default RegisterList;
