import Box from "@mui/material/Box";

export default function Expenses() {
  return (
    <>
      <Box className="box">
        <p>W tym miejscu będzie wykres wydatków</p>
      </Box>
      <Box className="box">{/* <AddExpenseForm /> */}W tym miejscu będzie formularz dodawania wydatku</Box>
      <Box className="box">
        <h2>Wydatki</h2>
        <p>W tym miejscu będą wyświetlane ostatnie wydatki</p>
      </Box>
    </>
  );
}
