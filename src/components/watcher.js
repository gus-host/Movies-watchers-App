import Button from "./helpers/button.js";
import Liked from "./helpers/liked.js";
import Cancel from "./helpers/cancel.js";
import Star from "./helpers/stars.js";

function Watcher({
  watcher,
  movies,
  handleLiking,
  handleSetActiveStatus,
  handleSetSelectedformWatcher,
  handleDeleteWatcher,
  selectedWatcher,
  setSelectedWatcher,
}) {
  const [movie] = [
    ...movies.filter((movie) => watcher.movie_title === movie.title),
  ];

  const isOpen = watcher === selectedWatcher;
  // const [selectedWatcher, setSelectedWatcher] = useState(null);

  const handleToggle = function (watcher) {
    setSelectedWatcher(isOpen ? null : watcher);
  };

  return (
    <div style={{ marginBottom: "18px" }} className="watcher">
      <div className="watcher-preview">
        <img style={{ borderRadius: "50%" }} src={watcher.image} alt="name" />
        <div>
          <h3
            style={{ textTransform: "capitalize", fontSize: "16px" }}
            className="name"
          >
            {watcher.name}
          </h3>
          <p
            style={{
              textTransform: "capitalize",
              fontSize: "12px",
              color: `${
                watcher.status === "not watching"
                  ? "gold"
                  : watcher.status === "watching"
                  ? "green"
                  : "red"
              }`,
            }}
            className="status"
          >
            {watcher.status}
          </p>
          {watcher.status !== "watched" && (
            <span style={{ position: "absolute", top: "40%", right: "0%" }}>
              <Button
                onClick={() => {
                  handleSetActiveStatus(
                    watcher.status === "not watching"
                      ? "not watching"
                      : "watching"
                  );
                  handleSetSelectedformWatcher(watcher);
                }}
                fontSize={"8px"}
              >
                {watcher.status === "not watching" ? "Start watching" : "Exit"}
              </Button>
            </span>
          )}
          <span className="cancel">
            <Cancel onClick={() => handleDeleteWatcher(watcher)} />
          </span>

          {watcher.status === "watched" && (
            <span style={{ position: "absolute", top: "0%", right: "5%" }}>
              <Liked
                onClick={() => handleLiking(watcher)}
                fill={`${watcher.liked ? "green" : ""}`}
                color={`${watcher.liked ? "green" : ""}`}
                cursor={`pointer`}
              />
            </span>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="watcher-details watching">
          <h4>Quote:</h4>
          <p style={{ marginBottom: "12px" }}>{watcher.quote}</p>
          <h4>Status:</h4>
          <p
            style={{
              marginBottom: "12px",
              color: `${
                watcher.status === "not watching"
                  ? "gold"
                  : watcher.status === "watching"
                  ? "green"
                  : "red"
              }`,
            }}
          >
            {watcher.status}
          </p>

          {watcher.status !== "not watching" && (
            <div className="movie-details" style={{ marginBottom: "20px" }}>
              {" "}
              <img
                style={{
                  display: "block",
                  maxWidth: "200px",
                  width: "100%",
                  margin: "0 auto",
                }}
                src={watcher.movie_image}
                alt={watcher.movie_title}
              />
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Title:</h5>{" "}
                  <span style={{ fontSize: "12px" }}>{movie.title}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Year:</h5>
                  <span style={{ fontSize: "12px" }}>{movie.Year}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Rated:</h5>
                  <span style={{ fontSize: "12px" }}>{movie.Rated}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Released:</h5>
                  <span style={{ fontSize: "12px" }}>{movie.Released}</span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5> Runtime:</h5>
                  <span style={{ fontSize: "12px" }}>{movie.Runtime}</span>
                </div>

                <h5>Plot:</h5>
                <p>{movie.Plot}</p>
              </div>
            </div>
          )}
          {watcher.status === "watched" && (
            <>
              <h4>Rating:</h4>

              <div style={{ marginBottom: "12px", display: "flex" }}>
                {[1, 2, 3, 4, 5].map((el, i) => (
                  <Star
                    fill={`${i < watcher.rating ? "gold" : "#fff"}`}
                    key={i}
                  />
                ))}
              </div>
              <h4>Comment:</h4>
              <p style={{ marginBottom: "12px" }}>{watcher.comment}</p>
              <h4>Next movie to watch</h4>
              <p style={{ marginBottom: "12px" }}>{watcher.next_movie}</p>
              <h4>Liked:</h4>
              <Liked
                fill={`${watcher.liked ? "green" : ""}`}
                color={`${watcher.liked ? "green" : ""}`}
              />
            </>
          )}
          {watcher.status !== "watched" && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              {" "}
              <Button
                onClick={() => {
                  handleSetActiveStatus(
                    watcher.status === "not watching"
                      ? "register"
                      : "not watching"
                  );
                  handleSetSelectedformWatcher(watcher, true);
                }}
              >
                update
              </Button>
            </div>
          )}
        </div>
      )}
      <p
        style={{
          fontSize: "10px",
          opacity: "0.8",
          marginTop: "10px",
          cursor: "pointer",
          display: "inline-block",
        }}
        className="show-details"
        onClick={() => handleToggle(watcher)}
      >
        {selectedWatcher ? "hide" : "Show"} details &rarr;
      </p>
    </div>
  );
}

export default Watcher;
