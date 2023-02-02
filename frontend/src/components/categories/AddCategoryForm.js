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
    AddCategory(props.user, categoryName, props.isIncome).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się dodać kategorii");
      } else {
        setCategoryName("");
        props.setCategoryList([...props.categoryList, response]);
        toast.success("Dodano kategorię");
        // if props open exists, close modal
        if (props.open) {
          props.setOpen(false);
        }
      }
    });
    e.target.reset();
  };

  return (
    <>
      <Box className="kategorie_dodaj">
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          Dodaj kategorię
        </h2>
        <form onSubmit={handleSubmit}>
          <TextField
            className="input"
            autoComplete="off"
            type="text"
            color="success"
            label="Nazwa kategorii"
            required
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button type="submit" variant="contained" color="success" size="large">
            Dodaj
          </Button>
        </form>
      </Box>
    </>
  );
}

export default AddCategoryForm;
