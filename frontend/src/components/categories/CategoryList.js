import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import CategoryListByType from "./CategoryListByType";

function CategoryList(props) {
  const [categoryEditing, setCategoryEditing] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const updateCategory = async (category) => {
    if (newCategoryName === "") {
      toast.error("Nazwa kategorii nie może być pusta");
      return;
    }
    if (props.categoryList.find((category) => category.nazwa === newCategoryName && category.id !== categoryEditing)) {
      toast.error("Kategoria o takiej nazwie już istnieje");
      return;
    }
    try {
      const response = await axios.put(
        `/api/categories/${category.id}/`,
        JSON.stringify({ user: props.user.user.user_id, nazwa: newCategoryName, przychod: category.przychod }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.user.authTokens.access}`,
          },
        }
      );
      // remove category from list and add updated one
      props.setCategoryList(
        props.categoryList
          .filter((category) => category.id !== response.data.id)
          .concat(response.data)
          .sort((a, b) => a.nazwa.localeCompare(b.nazwa))
      );
      setCategoryEditing(null);
      setNewCategoryName("");
      toast.success("Zmieniono nazwę kategorii");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        mb: 3,
      }}>
      {!props.loading && props.categoryList.length > 0 && <h2>Kategorie przychodów</h2>}
      {props.loading ? (
        <CircularProgress color="success" />
      ) : (
        props.categoryList
          .filter((category) => category.przychod)
          .sort((a, b) => a.nazwa.localeCompare(b.nazwa))
          .sort((a, b) => a.przychod - b.przychod)
          .map((category, index) => (
            <CategoryListByType
              key={category.id}
              index={index}
              category={category}
              categoryEditing={categoryEditing}
              setCategoryEditing={setCategoryEditing}
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              updateCategory={updateCategory}
              handleDelete={props.handleDelete}
            />
          ))
      )}
      {!props.loading && props.categoryList.length > 0 && <h2>Kategorie wydatków</h2>}
      {props.loading ? (
        <CircularProgress color="success" />
      ) : (
        props.categoryList
          .filter((category) => category.przychod === false)
          .sort((a, b) => a.nazwa.localeCompare(b.nazwa))
          .map((category, index) => (
            <CategoryListByType
              key={category.id}
              index={index}
              category={category}
              categoryEditing={categoryEditing}
              setCategoryEditing={setCategoryEditing}
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              updateCategory={updateCategory}
              handleDelete={props.handleDelete}
            />
          ))
      )}
    </Box>
  );
}

export default CategoryList;
