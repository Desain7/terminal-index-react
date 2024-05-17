import React, { useEffect, useState } from "react";
import { getSingleMusic } from "./musicApi";

interface MusicBoxProps {
  name: string;
}

function MusicBox(props: MusicBoxProps) {
  const { name } = props;
  const [musicPath, setMusicPath] = useState<string>("");
  const [errorHint, setErrorHint] = useState<string>("");
  useEffect(() => {
    // 搜索音乐，返回 ID
    async function getMusic() {
      const res: any = await getSingleMusic(name);
      if (res?.code === 0) {
        const music = res.data;
        setMusicPath(
          `//music.163.com/outchain/player?type=2&id=${music.id}&auto=1&height=66`
        );
      } else {
        setErrorHint("未找到音乐");
      }
    }
  }, []);
  return (
    <div>
      {musicPath && (
        <iframe
          frameBorder="no"
          marginWidth="0"
          marginheight="0"
          width="330"
          height="86"
          src={musicPath}
        />
      )}
      {errorHint && <div>{errorHint}</div>}
    </div>
  );
}

export default MusicBox;
