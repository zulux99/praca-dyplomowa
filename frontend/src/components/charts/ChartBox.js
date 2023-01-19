import { isMobile } from "react-device-detect";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Title } from "chart.js";
Chart.register(BarController, BarElement, LinearScale, CategoryScale, Title, ChartDataLabels);

export default function ChartBox(props) {
  return (
    <Box
      className="box"
      sx={{
        display: props.transactions.length > 0 ? "flex" : props.submitted ? "flex" : "none",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      {props.tab === 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Tabs
            value={props.interval}
            onChange={(event, newValue) => {
              props.setInterval(newValue);
            }}
            aria-label="Wybierz przedział czasu"
            centered>
            <Tab label="Miesiąc" />
            <Tab label="Rok" />
          </Tabs>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "success.main",
            }}>
            Przedział czasowy
          </Typography>
          <span>{props.showedDate && props.showedDate}</span>
          {props.interval === 0 && (
            <span>
              <IconButton
                onClick={() => {
                  props.setArrowValueForMonth(props.arrowValueForMonth - 1);
                }}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  props.setArrowValueForMonth(props.arrowValueForMonth + 1);
                }}>
                <NavigateNextIcon />
              </IconButton>
            </span>
          )}
          {props.interval === 1 && (
            <span>
              <IconButton
                onClick={() => {
                  props.setArrowValueForYear(props.arrowValueForYear - 1);
                }}>
                <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  props.setArrowValueForYear(props.arrowValueForYear + 1);
                }}>
                <NavigateNextIcon />
              </IconButton>
            </span>
          )}
        </Box>
      )}
      {props.loadingChart ? (
        <CircularProgress color="success" />
      ) : props.transactions.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            {props.tab === 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "success.main",
                  }}>
                  Przedział czasowy
                </Typography>
                <span>
                  {props.showedDate && props.showedDate}
                  {props.showedDateFrom && props.showedDateTo && (
                    <>
                      {new Date(props.showedDateFrom).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" - "}
                      {new Date(props.showedDateTo).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </>
                  )}
                </span>
                {props.interval === 0 && (
                  <span>
                    <IconButton
                      onClick={() => {
                        props.setArrowValueForMonth(props.arrowValueForMonth - 1);
                      }}>
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        props.setArrowValueForMonth(props.arrowValueForMonth + 1);
                      }}>
                      <NavigateNextIcon />
                    </IconButton>
                  </span>
                )}
                {props.interval === 1 && (
                  <span>
                    <IconButton
                      onClick={() => {
                        props.setArrowValueForYear(props.arrowValueForYear - 1);
                      }}>
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        props.setArrowValueForYear(props.arrowValueForYear + 1);
                      }}>
                      <NavigateNextIcon />
                    </IconButton>
                  </span>
                )}
              </Box>
            )}
            {props.isAnyIncome && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "success.main",
                  }}>
                  Przychody łącznie
                </Typography>
                <span>
                  {props.transactions
                    .filter((transaction) => transaction.przychod)
                    .reduce((sum, transaction) => sum + parseFloat(transaction.kwota), 0)
                    .toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    })}
                </span>
              </Box>
            )}
            {props.isAnyExpense && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "success.main",
                  }}>
                  Wydatki łącznie
                </Typography>
                <span>
                  {props.transactions
                    .filter((transaction) => !transaction.przychod)
                    .reduce((sum, transaction) => sum + parseFloat(transaction.kwota), 0)
                    .toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    })}
                </span>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
            }}>
            <Bar
              data={{
                labels: props.labels,
                datasets: props.datasets,
              }}
              height={
                isMobile
                  ? props.labels.length > 0
                    ? props.labels.length > 10
                      ? props.labels.length * 30
                      : props.labels.length * 50
                    : 0
                  : 300
              }
              options={{
                maintainAspectRatio: false,
                indexAxis: isMobile ? "y" : "x",
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </Box>
        </Box>
      ) : (
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "success.main", textAlign: "center" }}>
          Brak transakcji
        </Typography>
      )}
    </Box>
  );
}
