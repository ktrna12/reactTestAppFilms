import React, { useContext, useEffect, useState } from "react";
import { FilmStoreContext } from "../App.jsx";
import { Box, Button, Card, Stack, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";
import { observer } from "mobx-react";
import Film from "./Film.jsx";
import SimilarFilm from "./SimilarFilm.jsx";

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const filmStore = useContext(FilmStoreContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([
        ...comments,
        { user: "Анонимный пользователь", text: comment },
      ]);
      setComment("");
    }
  };

  const loc = location.pathname.split("/");
  const id = loc[2];

  if (!id) {
    navigate("/");
  }

  const filmById = filmStore.getFilmById(id);
  if (!filmById) {
    navigate("/");
  }
  const similar = filmStore.getData("", filmById.category);
  const similarFilter = similar.filter((item) => item.id !== filmById.id);

  return (
    <>
      <Box>
        <Card className={"movie-info"}>
          {filmById && (
            <>
              <img
                src={`../images/${filmById.poster}`}
                alt={"poster"}
                height="350px"
              />
              <div className={"card-text"} style={{ height: "120px" }}>
                {filmById.title}
              </div>
              <div className={"card-text"}>{filmById.category}</div>
              <div className={"card-text"}>{filmById.rate}</div>
              <div className={"card-text"} style={{ width: "1000px" }}>
                {filmById.info}
              </div>
              <Stack flexDirection={"row"}>
                <Button variant={"contained"} onClick={handleFavourite}>
                  {isFavourite ? "В избранном" : "В избранное"}
                </Button>
                {isFavourite ? (
                  <Star fontSize={"large"}></Star>
                ) : (
                  <StarBorder fontSize={"large"}></StarBorder>
                )}
              </Stack>
            </>
          )}
        </Card>
        <Box mt={2}>
          <TextField
            label="Добавить комментарий"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            style={{ marginBottom: "8px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            style={{ display: "block", margin: "auto", marginTop: "8px" }}
          >
            Отправить
          </Button>
        </Box>
        {comments.length > 0 && (
          <div>
            <h3>Комментарии:</h3>
            {comments.map((comment, index) => (
              <div key={index}>
                <strong>{comment.user}: </strong>
                {comment.text}
              </div>
            ))}
          </div>
        )}
        {similarFilter.length ? (
          <>
            <h2>Похожие фильмы:</h2>
            <div style={{ flexDirection: "row", display: "flex" }}>
              {similarFilter.map((item, index) => (
                <SimilarFilm key={index} film={item} />
              ))}
            </div>
          </>
        ) : (
          <h2>Похожих фильмов нет</h2>
        )}
      </Box>
    </>
  );
};

export default Info;
