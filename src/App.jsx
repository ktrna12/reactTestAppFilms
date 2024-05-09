import { createContext, useState } from "react";
import "./App.css";
import Film from "./components/Film.jsx";
import { FilmStore } from "./store/film.store.js";
import { observer } from "mobx-react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { genre } from "./film.js";
import Info from "./components/FilmsInfo.jsx";
import { Route, Routes } from "react-router-dom";
import FilmList from "./components/FilmList.jsx";
import FilmsInfo from "./components/FilmsInfo.jsx";

const store = new FilmStore();
export const FilmStoreContext = createContext(store);

function App() {
  return (
    <FilmStoreContext.Provider value={store}>
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path="/film/:id" element={<FilmsInfo />} />
      </Routes>
    </FilmStoreContext.Provider>
  );
}

export default App;
