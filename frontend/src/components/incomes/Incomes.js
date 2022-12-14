import { useState } from "react";
import AddIncomeForm from "./AddIncomeForm";
import Box from "@mui/material/Box";
import IncomesChart from "./IncomesChart";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";

export default function Incomes() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* <Box className="tabs">
        <Tabs value={activeTab} variant="scrollable" centered fullWidth>
          <Tab label="Lista" onClick={() => setActiveTab(0)} />
          <Tab label="Dodaj przychód" onClick={() => setActiveTab(1)} />
          <Tab label="Wykres" onClick={() => setActiveTab(2)} />
        </Tabs>
      </Box>
      <SwipeableViews
        containerStyle={{
          transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
        }}
        index={activeTab}
        onChangeIndex={(index) => setActiveTab(index)}>
        <Box className="box">
          <p>W tym miejscu będą wyświetlane ostatnie przychody</p>
        </Box>
        <Box className="box">
          <AddIncomeForm />
        </Box>
        <Box className="box">
          <IncomesChart />
        </Box>
      </SwipeableViews> */}

      <Box className="box">
        <IncomesChart />
      </Box>
      <Box className="box">
        <AddIncomeForm />
      </Box>
      <Box className="box">
        <h2>Ostatnie przychody</h2>
        <p>W tym miejscu będą wyświetlane ostatnie przychody</p>
      </Box>
    </>
  );
}
