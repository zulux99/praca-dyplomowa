import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function DashBoard() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
        }}>
        <Box className="box"></Box>
        <Box className="box"></Box>
        <Box className="box"></Box>
        <Box className="box"></Box>
      </Container>
    </>
  );
}
