import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Register() {
  return (
    <>
      <div>
        <form>
          <label>
            <input type="text" name="username" placeholder="Nazwa użytkownika" />
            <input type="password" name="password" placeholder="Hasło" />
            <input type="email" name="email" placeholder="Adres email" />
            <input type="text" name="description" placeholder="Napisz nam coś o sobie..." />
          </label>
          <Button variant="text">Halo</Button>
          <Typography variant="h4">Witoj przybyszu, czy aby na pewno chcesz założyć konto?</Typography>
        </form>
      </div>
    </>
  );
}
export default Register;
