import { useState } from "react";
import Watcher from "./watcher.js";

function WatcherList({
  watchers,
  movies,
  handleLiking,
  handleSetActiveStatus,
  handleSetSelectedformWatcher,
  handleDeleteWatcher,
}) {
  const [selectedWatcher, setSelectedWatcher] = useState(null);

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
          selectedWatcher={selectedWatcher}
          setSelectedWatcher={setSelectedWatcher}
          key={watcher.id}
        />
      ))}
    </>
  );
}
export default WatcherList;
