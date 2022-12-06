import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import loginBackground from "../loginBackground.jpg";

export default function StartingPage() {
  return (
    <Box
      className="zdjecie"
      sx={{
        backgroundImage: `url(${loginBackground})`,
      }}>
      <Typography variant="h1">e-Budget</Typography>
      <Typography variant="h2">Pieniądze pod kontrolą</Typography>
      <Typography variant="h3">Zarejestruj się już dziś, aby mieć kontrolę nad swoimi finansami</Typography>
    </Box>
  );
}
