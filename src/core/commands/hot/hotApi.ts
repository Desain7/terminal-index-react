import myAxios from "@/plugins/myAxios";

/**
 * 获取音乐热榜
 */
export const getHotSongList = async () => {
  return await myAxios.post("/music/list/hot", {});
};
