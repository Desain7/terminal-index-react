import React, { useEffect, useState } from "react";

interface BilibiliBoxProps {
  bvid: string;
}

function BilibiliBox(props: BilibiliBoxProps) {
  const { bvid } = props;
  const [videoPath, setVideoPath] = useState("");
  useEffect(() => {
    setVideoPath(`https://player.bilibili.com/player.html?bvid=${bvid}`);
  }, [bvid]);
  return (
    <div>
      <iframe
        frameBorder="no"
        marginWidth="0"
        marginheight="0"
        src={videoPath}
      />
    </div>
  );
}

export default BilibiliBox;
