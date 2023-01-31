import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import CategoryList from "./CategoryList";
import AddCategoryForm from "./AddCategoryForm";
import { toast } from "react-toastify";
import { DeleteCategory } from "../categories/DeleteCategoryRequest";
import { useConfirm } from "material-ui-confirm";
import { GetAllCategories } from "./GetAllCategoriesRequest";

export default function Categories() {
  const user = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);
  const confirm = useConfirm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllCategories({
      url: "/api/categories/",
      user: user,
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać kategorii");
      } else {
        setCategoryList(response);
        setLoading(false);
      }
    });
  }, [user]);

  const handleDelete = (id) => {
    confirm({
      title: "Potwierdź usunięcie",
      description:
        "Czy na pewno chcesz usunąć tę kategorię? Usunięcie kategorii spowoduje usunięcie wszystkich transakcji z nią powiązanych.",
      confirmationText: "Usuń",
      cancellationText: "Anuluj",
      confirmationButtonProps: {
        color: "success",
      },
      cancellationButtonProps: {
        color: "success",
      },
    }).then(() => {
      DeleteCategory(user, id).then((response) => {
        if (response === -1) {
          toast.error("Nie udało się usunąć kategorii");
        } else {
          setCategoryList(categoryList.filter((category) => category.id !== id));
          toast.success("Usunięto kategorię");
        }
      });
    });
  };

  return (
    <>
      <Box className="box">
        <CategoryList
          categoryList={categoryList}
          handleDelete={handleDelete}
          loading={loading}
          setLoading={setLoading}
        />
        <AddCategoryForm categoryList={categoryList} setCategoryList={setCategoryList} user={user} />
      </Box>
    </>
  );
}
