import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Box from "@mui/material/Box";
import CategoryList from "./CategoryList";
import AddCategoryForm from "./AddCategoryForm";
import { toast } from "react-toastify";
import { DeleteCategory } from "../categories/DeleteCategoryRequest";
import { useConfirm } from "material-ui-confirm";
import { GetAllCategories } from "./GetAllCategoriesRequest";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Categories() {
  const user = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);
  const confirm = useConfirm();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(false);

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

  const handleDelete = (thisCategory) => {
    let upperCaseCategoryName = thisCategory.nazwa.toUpperCase();
    confirm({
      title: "Potwierdź usunięcie",
      description: `Czy na pewno chcesz usunąć kategorię ${upperCaseCategoryName}? Usunięcie kategorii spowoduje usunięcie wszystkich transakcji z nią powiązanych.`,
      confirmationText: "Usuń",
      cancellationText: "Anuluj",
      confirmationButtonProps: {
        color: "success",
      },
      cancellationButtonProps: {
        color: "success",
      },
    })
      .then(() => {
        DeleteCategory(user, thisCategory.id).then((response) => {
          if (response === -1) {
            toast.error("Nie udało się usunąć kategorii");
          } else {
            setCategoryList(categoryList.filter((category) => category.id !== thisCategory.id));
            toast.success("Usunięto kategorię");
          }
        });
      })
      .catch(() => {});
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        className="box"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Button
          className="button"
          variant="contained"
          color="success"
          onClick={() => setOpen(true)}
          sx={{ mt: 3 }}
          size="large"
          aria-label="Dodaj kategorię">
          Dodaj kategorię
        </Button>
        {!loading && categoryList.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: "32px",
              mb: "32px",
              textAlign: "center",
            }}>
            <Typography variant="h4" color="success">
              Nie masz żadnych kategorii
            </Typography>
            <Typography variant="h6" color="success" sx={{ mt: "16px" }}>
              Dodaj kategorię, aby móc śledzić swoje wydatki
            </Typography>
            <Box component="span" sx={{ mt: "32px", p: "0 32px" }}>
              Kategorie pozwolą Ci na lepsze zarządzanie swoimi wydatkami i łatwiejsze rozliczanie się z wydanych
              pieniędzy. Dzięki nim możesz grupować swoje wydatki i łatwo sprawdzać, na co wydajesz najwięcej pieniędzy.
            </Box>
          </Box>
        )}
        <CategoryList
          user={user}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          handleDelete={handleDelete}
          loading={loading}
          setLoading={setLoading}
        />
        <Modal className="modal" open={open} onClose={closeModal} aria-labelledby="Dodaj wydatek">
          <Fade in={open}>
            <Box className="modal-box">
              <AddCategoryForm
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                user={user}
                open={open}
                setOpen={setOpen}
                checkbox={true}
                isIncome={isIncome}
                setIsIncome={setIsIncome}
              />
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}
