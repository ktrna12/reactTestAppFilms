import { useNavigate } from "react-router-dom";

const SimilarFilm = ({ film }) => {
  const { poster, title, category, rate, id } = film;
  const navigate = useNavigate(); // Использование хука useNavigate для навигации
  console.log(film);
  const handleClick = () => {
    console.log("asdasd");
    navigate(`/film/${id}`); // Переход на страницу фильма с указанием ID
  };

  return (
    <div className={"movie-container"}>
      <img src={`../images/${poster}`} alt={"poster"} height="350px" />
      <div className={"card-text"} style={{ height: "120px" }}>
        {title}
      </div>
      <div className={"card-text"}>{category}</div>
      <div className={"card-text"}>{rate}</div>
      <div>
        <button onClick={handleClick} style={{ color: "white" }}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default SimilarFilm;
