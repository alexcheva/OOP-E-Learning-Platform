
import { useState } from "react";
import {
  IconButton,
} from "@mui/material";
// import axios from 'axios';
import { Edit } from "@mui/icons-material";
import EditModal from "../modals/EditModal";

export default function EditButton({ 
  isOpen, 
  onClose, 
  entityName,   // e.g. "course", "user", "enrollment"
  id,
  data,         // current record to edit
  fields,       // array of { name, label, type }
  endpoint,     // `/api/courses`, `/api/users`, `/api/enrollments`
  onSave,        // callback after successful update
  fetchData, // refresh function
}) {
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = async (id) => {
    console.log("edit button clicked", entityName, id );
    console.log("handleEdit", `${endpoint}/${id}`,)
    console.log(isOpen, 
  onClose, 
  entityName,   // e.g. "course", "user", "enrollment"
  id,
  data,         // current record to edit
  fields,       // array of { name, label, type }
  endpoint)
    // const res = await fetch(`${endpoint}/${id}`, { method: "PUT" });
    // const data = await res.json();
    // console.log("handleEdit returning data", data);
    // setIsEditOpen(false);
    // fetchData();
    setSelected(id);
    setOpenModal(true);
  };

  return (
      <>
    <IconButton color="error" onClick={() => {handleEdit(id)}}>
      <Edit />
    </IconButton>
        {setSelected && (
        <EditModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false)
          console.log("modal closed")}}
        entityName={entityName}
        data={data}
        fields={fields}
        endpoint={endpoint}
        onSave={onSave}
        />
        )}
        </>
  );

}