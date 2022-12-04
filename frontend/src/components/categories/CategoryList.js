import Box from "@mui/material/Box";

function CategoryList(props) {
  return (
    <Box className="kategorie_lista">
      {props.categoryList
        .sort((a, b) => a.nazwa.localeCompare(b.nazwa))
        .map((category) => (
          <Box key={category.id} className="kategorie_lista_element">
            {category.nazwa}
            <button onClick={() => props.handleDelete(category.id)}>Usuń</button>
          </Box>
        ))}
    </Box>
  );
}

export default CategoryList;
