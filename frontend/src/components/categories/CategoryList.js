import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function CategoryList(props) {
  return (
    <Box className="kategorie_lista">
      <h2>Kategorie przychodów</h2>
      {props.loading ? (
        <CircularProgress color="success" />
      ) : (
        props.categoryList
          .filter((category) => category.przychod === true)
          .sort((a, b) => a.nazwa.localeCompare(b.nazwa))
          .map((category) => (
            <Box key={category.id} className="kategorie_lista_element">
              {category.nazwa}
              <button onClick={() => props.handleDelete(category.id)}>Usuń</button>
            </Box>
          ))
      )}
      <h2>Kategorie wydatków</h2>
      {props.loading ? (
        <CircularProgress color="success" />
      ) : (
        props.categoryList
          .filter((category) => category.przychod === false)
          .sort((a, b) => a.nazwa.localeCompare(b.nazwa))
          .map((category) => (
            <Box key={category.id} className="kategorie_lista_element">
              {category.nazwa}
              <button onClick={() => props.handleDelete(category.id)}>Usuń</button>
            </Box>
          ))
      )}
    </Box>
  );
}

export default CategoryList;
