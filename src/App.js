import { useState } from "react";
import movies from "./data/movies.js";
import initialWatchers from "./data/initialWatchers.js";
import Modal from "./components/modal.js";
import WatcherList from "./components/watcherList.js";
import Button from "./components/helpers/button.js";
import Liked from "./components/helpers/liked.js";
import Star from "./components/helpers/stars.js";

export default function App() {
  const [watchers, setWatchers] = useState(initialWatchers);
  const [ratings, setRatings] = useState(-1);
  const [activeStatus, setActiveStatus] = useState("");
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [comment, setComment] = useState("");
  const [nextMovie, setNextMovie] = useState("");
  const [selectMovieTitle, setSelectMovieTitle] = useState(
    "Guardians of the Galaxy Vol. 2"
  );
  const [selectedformWatcher, setSelectedformWatcher] = useState(null);
  const numLiked = watchers.filter((watcher) => watcher.liked).length;

  const handleLiking = function (watcher) {
    setWatchers((watchers) =>
      watchers.map((watch) =>
        watch.id === watcher.id ? { ...watch, liked: !watcher.liked } : watch
      )
    );
  };

  const handleSetRating = function (i) {
    setRatings(i);
  };
  const handleSetActiveStatus = function (status) {
    setActiveStatus(status);
  };

  const handleSetSelectedformWatcher = function (watcher, update) {
    watcher.update = update ? update : false;
    setSelectedformWatcher(watcher);
  };

  const handleAddWatcher = function () {
    setActiveStatus("register");
  };
  const handleCloseModal = function (e) {
    e.preventDefault();
    setActiveStatus("");
    setSelectedformWatcher(null);
    setSelectMovieTitle("Guardians of the Galaxy Vol. 2");
  };

  const handleFormAction = function (
    e,
    activeStatus,
    selectMovieTitle,
    comment,
    nextMovie,
    ratings
  ) {
    e.preventDefault();
    if (activeStatus === "register") {
      if (!name || !quote) return;
      const id = crypto.randomUUID();
      const newWatcher = {
        name: `${name}`,
        image: `https://i.pravatar.cc/48?u=${id}`,
        status: "not watching",
        quote: `${quote}`,
        comment: "",
        rating: null,
        movie_title: "",
        next_movie: "",
        liked: false,
        id,
      };

      selectedformWatcher?.update
        ? setWatchers((watcher) =>
            watcher.map((watch) =>
              watch.id === selectedformWatcher.id
                ? {
                    ...watch,
                    name: name,
                    quote: quote,
                  }
                : watch
            )
          )
        : setWatchers((watch) => [newWatcher, ...watch]);
      setName("");
      setQuote("");
      setSelectedformWatcher(null);
      setActiveStatus("");
    }

    if (activeStatus === "not watching") {
      setWatchers((watcher) =>
        watcher.map((watch) =>
          watch.id === selectedformWatcher.id
            ? {
                ...watch,
                movie_title: selectMovieTitle,
                movie_image: `${
                  selectMovieTitle === "Guardians of the Galaxy Vol. 2"
                    ? "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"
                    : selectMovieTitle === "Inception"
                    ? "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
                    : "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg"
                }`,
                status: "watching",
              }
            : watch
        )
      );

      setActiveStatus("");
      setSelectMovieTitle("Guardians of the Galaxy Vol. 2");
    }
    if (activeStatus === "watching") {
      if (!comment || !nextMovie) return;

      setWatchers((watcher) =>
        watcher.map((watch) =>
          watch.id === selectedformWatcher.id
            ? {
                ...watch,
                comment: comment,
                next_movie: nextMovie,
                rating: ratings + 1,
                status: "watched",
              }
            : watch
        )
      );

      setActiveStatus("");
      setComment("");
      setNextMovie("");
      setRatings(-1);
    }
  };

  const handleDeleteWatcher = function (watcher) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this watcher?"
    );
    if (confirmed)
      setWatchers((watchers) =>
        watchers.filter((watch) => watch.id !== watcher.id)
      );
  };

  return (
    <div style={{ position: "relative" }} className="app">
      <div
        className="watcher-heading-box"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="main-heading"> Watchers</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Liked
            fill={`${numLiked > 0 ? "green" : ""}`}
            color={`${numLiked > 0 ? "green" : ""}`}
          />
          <span style={{ marginRight: "5px" }}>{numLiked}</span>
          <Button onClick={handleAddWatcher}>Add Watcher</Button>
        </div>
      </div>
      <div className="main watchers-lists">
        <WatcherList
          watchers={watchers}
          movies={movies}
          handleLiking={handleLiking}
          handleSetActiveStatus={handleSetActiveStatus}
          handleSetSelectedformWatcher={handleSetSelectedformWatcher}
          handleDeleteWatcher={handleDeleteWatcher}
        />
      </div>

      {activeStatus && (
        <>
          <div
            onClick={() => setActiveStatus("")}
            className="overlay"
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "100vh",
              width: "100%",
              background: "#00000079",
              zIndex: "1",
              padding: "40px 20px",
            }}
          ></div>
          <Modal onClick={() => setActiveStatus((status) => status)}>
            <h2
              style={{
                fontSize: "20px",
                textTransform: "capitalize",
                marginBottom: "16px",
                fontWeight: "600",
              }}
            >
              {activeStatus === "register" && "Want to join the watchlist?"}
              {activeStatus === "not watching" &&
                `Choose movie to watch ${selectedformWatcher.name}`}
              {activeStatus === "watching" &&
                `Please leave a comment ${selectedformWatcher.name}`}
            </h2>

            <form className="add-watcher-form">
              {activeStatus === "register" && (
                <>
                  <label>Your name: * </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  ></input>
                  <label>Your quote: * </label>
                  <textarea
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    rows="2"
                    cols=""
                  ></textarea>
                </>
              )}
              {activeStatus === "not watching" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <label>Movie name:</label>
                  <select
                    value={selectMovieTitle}
                    onChange={(e) => setSelectMovieTitle(e.target.value)}
                  >
                    <option value={"Guardians of the Galaxy Vol. 2"}>
                      Guardians of the Galaxy Vol. 2
                    </option>
                    <option value={"Inception"}>Inception</option>
                    <option value={"Interstellar"}>Interstellar</option>
                  </select>
                </div>
              )}
              {activeStatus === "watching" && (
                <>
                  <label>Your comment: *</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ marginBottom: "25px" }}
                    rows="10"
                    cols=""
                  ></textarea>
                  <label>Next movie(you like to watch next): * </label>
                  <input
                    value={nextMovie}
                    onChange={(e) => setNextMovie(e.target.value)}
                    type="text"
                  ></input>
                  <label>Rate this movie: * </label>
                  <div
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((el, i) => (
                      <Star
                        fill={`${i <= ratings ? "gold" : "#fff"}`}
                        key={i}
                        onClick={() => handleSetRating(i)}
                        cursor={"pointer"}
                      />
                    ))}
                    <span
                      style={{
                        marginLeft: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      onClick={() => setRatings(-1)}
                    >
                      reset
                    </span>
                  </div>
                </>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
              >
                <Button
                  bg={"#fff"}
                  color={"#0f0f0f"}
                  border={"1px solid #0f0f0f"}
                  marginRight={"8px"}
                  onClick={(e) => handleCloseModal(e)}
                >
                  cancel
                </Button>
                <Button
                  onClick={(e) =>
                    handleFormAction(
                      e,
                      activeStatus,
                      selectMovieTitle,
                      comment,
                      nextMovie,
                      ratings
                    )
                  }
                >
                  {activeStatus === "register" && "join"}
                  {activeStatus === "not watching" && "start watching"}
                  {activeStatus === "watching" && "Exit"}
                </Button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </div>
  );
}
