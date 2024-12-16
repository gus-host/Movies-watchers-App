import Watcher from "./watcher.js";

function WatcherList({
  watchers,
  movies,
  handleLiking,
  handleSetActiveStatus,
  handleSetSelectedformWatcher,
  handleDeleteWatcher,
}) {
  return (
    <>
      {watchers.map((watcher) => (
        <Watcher
          watcher={watcher}
          handleLiking={handleLiking}
          handleSetActiveStatus={handleSetActiveStatus}
          movies={movies}
          handleSetSelectedformWatcher={handleSetSelectedformWatcher}
          handleDeleteWatcher={handleDeleteWatcher}
          key={watcher.id}
        />
      ))}
    </>
  );
}
export default WatcherList;
