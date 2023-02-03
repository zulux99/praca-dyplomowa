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
      <Box className="box" sx={{}}>
        <Tabs
          value={tab}
          onChange={(e, newValue) => {
            setTab(newValue);
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: "green",
            },
          }}
          sx={{
            marginBottom: "32px",
            ".MuiTabs-flexContainer": {
              justifyContent: "center",
            },
          }}>
          <Tab
            label={
              <span
                style={{
                  color: tab === 0 ? "green" : "black",
                }}>
                Według kategorii
              </span>
            }
          />
          <Tab
            label={
              <span
                style={{
                  color: tab === 1 ? "green" : "black",
                }}>
                Według czasu
              </span>
            }
          />
        </Tabs>
        <SwipeableViews
          disabled
          index={tab}
          onChangeIndex={(index) => {
            setTab(index);
          }}>
          <Box
            sx={{
              paddingTop: "8px",
            }}>
            <ByCategory user={user} categories={categories} loadingCategories={loadingCategories} tab={tab} />
          </Box>
          <Box
            sx={{
              paddingTop: "8px",
            }}>
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
      </Box>
    </>
  );
}
