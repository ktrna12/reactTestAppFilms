import { useContext, useState } from "react";
import { FilmStore } from "../store/film.store.js";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { genre } from "../film.js";
import Film from "./Film.jsx";
import Info from "./FilmsInfo.jsx";
import { observer } from "mobx-react";
import { FilmStoreContext } from "../App.jsx";

function FilmList() {
  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const filmStore = useContext(FilmStoreContext);
  const handleCloseInfo = () => {
    setSelectedFilmId(null);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <Box>
          <FormControl>
            <TextField
              id="input-with-icon-textfield"
              label="Поиск по названию"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={(input) => setName(input.target.value)}
              variant="outlined"
              sx={{ width: "600px" }}
            />
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Фильтрация по жанру
            </InputLabel>
            <Select
              sx={{ width: "600px", color: "grey" }}
              id="demo-simple-select"
              label="Фильтрация по жанру"
              select={true}
              onChange={(input) => setGenres(input.target.value)}
              defaultValue={""}
              variant="outlined"
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value={genre.HORROR}>{genre.HORROR}</MenuItem>
              <MenuItem value={genre.DRAMA}>{genre.DRAMA}</MenuItem>
              <MenuItem value={genre.MELODRAMA}>{genre.MELODRAMA}</MenuItem>
              <MenuItem value={genre.TRILLER}>{genre.TRILLER}</MenuItem>
              <MenuItem value={genre.FANTAZY}>{genre.FANTAZY}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack
          sx={{
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "20px",
            padding: "20px",
          }}
        >
          {filmStore.getData(name, genres).map((item, index) => (
            <Film key={index} film={item} />
          ))}
        </Stack>
      </Box>
    </>
  );
}

export default observer(FilmList);
