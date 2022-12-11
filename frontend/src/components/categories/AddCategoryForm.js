import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AddCategory } from "./AddCategoryRequest";
import { toast } from "react-toastify";

function AddCategoryForm(props) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    AddCategory(props.user, categoryName).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się dodać kategorii");
      } else {
        setCategoryName("");
        props.setCategoryList([...props.categoryList, response]);
        toast.success("Dodano kategorię");
      }
    });
    e.target.reset();
  };

  return (
    <Box className="kategorie_dodaj">
      <form onSubmit={handleSubmit}>
        <TextField type="text" label="Nazwa kategorii" onChange={(e) => setCategoryName(e.target.value)}></TextField>
        <Button type="submit" variant="contained" color="success">
          Dodaj
        </Button>
      </form>
    </Box>
  );
}

export default AddCategoryForm;
