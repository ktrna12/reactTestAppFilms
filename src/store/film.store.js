import { makeAutoObservable } from "mobx";
import film from "../film.js";

export class FilmStore {
  data = film;

  constructor() {
    makeAutoObservable(this);
  }

  getData(name, genre) {
    if (!name && !genre) {
      return this.data;
    }
    if (!name && genre) {
      return this.data.filter((film) => film.category === genre);
    }

    if (name && !genre) {
      return this.data.filter((film) =>
        film.title.toLowerCase().includes(name.toLowerCase()),
      );
    }
    return this.data.filter(
      (film) =>
        film.title.toLowerCase().includes(name.toLowerCase()) &&
        film.category === genre,
    );
  }

  getFilmById(id) {
    return this.data.find((item) => item.id === id);
  }
}
