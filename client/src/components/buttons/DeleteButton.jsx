
// import { useEffect, useState } from "react";
import {
  IconButton,
} from "@mui/material";
// import axios from 'axios';
import { Delete } from "@mui/icons-material";

export default function DeleteButton({ 
  // isOpen, 
  // onClose, 
  entityName,   // e.g. "course", "user", "enrollment"
  id,
  // data,         // current record to edit
  // fields,       // array of { name, label, type }
  endpoint,     // `/api/courses`, `/api/users`, `/api/enrollments`
  // onSave        // callback after successful update
  // fetch, // refresh function
}) {
  console.log("Delete", entityName, "called");
  const handleDelete = async (id) => {
    console.log("handleDelete", entityName, id, `${endpoint}/${id}`,)
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    const data = await res.json();
    console.log("handleDelete returning data", data);
    // setIsDeleteOpen(false);
    // fetch();
  };

  return (
    <IconButton color="error" onClick={() => handleDelete(id)}>
      <Delete />
    </IconButton>
  );

}