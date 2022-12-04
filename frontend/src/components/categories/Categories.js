import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import { GetAllCategories } from "./GetAllCategoriesRequest";
import { ToastContainer, toast } from "react-toastify";
import AddCategoryForm from "./AddCategoryForm";
import CategoryList from "./CategoryList";
import { DeleteCategory } from "./DeleteCategoryRequest";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function Categories() {
  const user = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    GetAllCategories(user).then((response) => {
      if (response === -1) {
        toast.error("Nie udało się pobrać kategorii");
      } else {
        setCategoryList(response);
        console.log(response);
      }
    });
  }, []);

  const handleDelete = (id) => {
    confirmAlert({
      title: "Potwierdź usunięcie",
      message:
        "Czy na pewno chcesz usunąć tę kategorię? Kategoria zostanie usunięta z wszystkich rekordów, w których została użyta.",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            DeleteCategory(user, id).then((response) => {
              if (response === -1) {
                toast.error("Nie udało się usunąć kategorii");
              } else {
                setCategoryList(categoryList.filter((category) => category.id !== id));
                toast.success("Usunięto kategorię");
              }
            });
          },
        },
        {
          label: "Nie",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Box>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <h1>Lista kategorii</h1>
      <CategoryList categoryList={categoryList} handleDelete={handleDelete} />
      <AddCategoryForm categoryList={categoryList} setCategoryList={setCategoryList} user={user} />
    </Box>
  );
}

export default Categories;
