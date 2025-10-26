// components/EditButton_new.jsx
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButton({ item, onEdit }) {
  return (
    <IconButton color="primary" onClick={() => onEdit(item)}>
      <EditIcon />
    </IconButton>
  );
}
