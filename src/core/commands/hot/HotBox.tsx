import React, { useEffect, useState } from "react";
import { getHotSongList } from "./hotApi";

function HotBox() {
  const [songList, setSongList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res: any = await getHotSongList();
      if (res?.code === 0) {
        const songs = res.data;
        setSongList(songs.slice(0, 10));
      } else {
        // message.error("加载失败");
      }
    }
    getList();
  }, []);
  return (
    <div>
      {songList.map((song, index) => {
        return (
          <div key={index}>
            <a
              href={`https://music.163.com/#/song?id=${song?.id}`}
              target="_blank"
            >
              {song?.al?.name}
            </a>
            <img src={song?.al?.picUrl} height={25} alt={song?.al?.name} />
          </div>
        );
      })}
    </div>
  );
}

export default HotBox;
