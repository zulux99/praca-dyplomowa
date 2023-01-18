import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { GetAllCategories } from "../categories/GetAllCategoriesRequest";
import ByCategory from "./ByCategory";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import ByTime from "./ByTime";

export default function Charts() {
  const user = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState(null);
  const [tab, setTab] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    GetAllCategories({
      user,
      url: "/api/categories/",
    }).then((response) => {
      if (response === -1) {
        console.log("Nie udało się pobrać kategorii");
      } else {
        setCategories(response);
        setLoadingCategories(false);
      }
    });
  }, [user]);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(e, newValue) => {
          setTab(newValue);
        }}
        centered>
        <Tab label="Według kategorii" />
        <Tab label="Według czasu" />
      </Tabs>
      <SwipeableViews
        disabled
        index={tab}
        onChangeIndex={(index) => {
          setTab(index);
        }}>
        <Box>
          <ByCategory user={user} categories={categories} loadingCategories={loadingCategories} tab={tab} />
        </Box>
        <Box>
          <ByTime
            tab={tab}
            user={user}
            categories={categories}
            chosenCategory={chosenCategory}
            setChosenCategory={setChosenCategory}
            loadingCategories={loadingCategories}
          />
        </Box>
      </SwipeableViews>
    </>
  );
}
