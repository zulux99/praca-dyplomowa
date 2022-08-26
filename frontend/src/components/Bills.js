import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";

function Bills() {
  return (
    <>
      <div>
        <p>Tutaj są twoje rachunki</p>
      </div>
      <Container align="center">
        <form>
          <TextField type="text" variant="outlined" label="Nazwa rachunku" fullWidth id="nazwa" margin="normal" />
          <Button variant="contained" type="submit">
            Dodaj rachunek
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Bills;
