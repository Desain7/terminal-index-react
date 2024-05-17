import { CommandType } from "../../../command";
import { changeBackgroundAction } from "@/store/modules/config";
import myAxios from "@/plugins/myAxios";

/**
 * 切换终端背景
 */
const backgroundCommand: CommandType = {
  func: "background",
  name: "切换终端背景",
  alias: ["bg"],
  params: [
    {
      key: "url",
      desc: "图片地址（不填则随机）",
      required: false,
    },
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options;
    let url = _[0];
    if (_.length > 0) {
      url = _[0];
    }
    if (!url) {
      // 随机获取壁纸
      const res = await myAxios.post("/background/get/random");
      changeBackgroundAction(res.data);
    }
    changeBackgroundAction(url);
  },
};

export default backgroundCommand;
