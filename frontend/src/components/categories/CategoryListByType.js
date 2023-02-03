import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";

export default function CategoryListByType(props) {
  return (
    <Box
      key={props.key}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "8px 16px",
        backgroundColor: props.index % 2 === 0 ? "#e0e0e0" : "#f5f5f5",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "600px",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "75%",
          }}>
          {props.categoryEditing === props.category.id && (
            <TextField
              defaultValue={props.category.nazwa}
              variant="standard"
              onChange={(e) => {
                props.setNewCategoryName(e.target.value);
              }}
              color="success"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  props.updateCategory(props.category);
                  e.target.blur();
                }
              }}
            />
          )}
          {props.categoryEditing !== props.category.id && (
            <InputLabel className="konto_nazwa" sx={{}}>
              {props.category.nazwa + " "}
            </InputLabel>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "25%",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
          <IconButton
            onClick={() => {
              props.setCategoryEditing(props.category.id);
              props.setNewCategoryName(props.category.nazwa);
            }}
            sx={props.categoryEditing == props.category.id ? { display: "none" } : { display: "block" }}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton
            onClick={() => props.updateCategory(props.category)}
            sx={props.categoryEditing == props.category.id ? { display: "block" } : { display: "none" }}>
            <Check color="success" />
          </IconButton>
          <IconButton
            onClick={() => props.setCategoryEditing(null)}
            sx={props.categoryEditing == props.category.id ? { display: "block" } : { display: "none" }}>
            <Close color="error" />
          </IconButton>
          <IconButton onClick={() => props.handleDelete(props.category)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
