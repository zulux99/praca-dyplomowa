import Box from "@mui/material/Box";

export default function Expenses() {
  return (
    <>
      <Box className="box">
        <p>W tym miejscu będzie wykres wydatków, ale nie wiem jak go zrobić, więc na razie jest tylko tekst</p>
      </Box>
      <Box className="box">{/* <AddExpenseForm /> */}</Box>
      <Box className="box">
        <h2>Ostatnie wydatki</h2>

        <p>W tym miejscu będą wyświetlane ostatnie wydatki</p>
      </Box>
    </>
  );
}
