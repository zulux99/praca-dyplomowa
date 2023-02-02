import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchForm(props) {
  return (
    <>
      <form>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            className="input"
            inputFormat="DD/MM/YYYY"
            value={props.startDate}
            onChange={(newValue) => {
              props.setStartDate(newValue.$y + "-" + parseInt(newValue.$M + 1) + "-" + newValue.$D);
            }}
            renderInput={(params) => <TextField color="success" {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            className="input"
            inputFormat="DD/MM/YYYY"
            value={props.endDate}
            onChange={(newValue) => {
              props.setEndDate(newValue.$y + "-" + parseInt(newValue.$M + 1) + "-" + newValue.$D);
            }}
            renderInput={(params) => <TextField color="success" {...params} />}
          />
        </LocalizationProvider>
        <Autocomplete
          className="input"
          options={props.categoryList}
          getOptionLabel={(option) => option.nazwa}
          value={props.category}
          onChange={(e, newValue) => props.setCategory(newValue)}
          inputValue={props.inputValue}
          onInputChange={(e, newInputValue) => props.setInputValue(newInputValue)}
          renderInput={(params) => <TextField color="success" {...params} label="Kategoria" />}
          sx={{
            width: "100%",
          }}
        />
        <Button type="submit" variant="contained" color="success">
          Szukaj
        </Button>
      </form>
    </>
  );
}
