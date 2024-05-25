import { CommandType } from "../../../command";
// import { useUserStore } from '../userStore'
import { LOCAL_USER } from "../userConstant";

/**
 * 用户注销命令
 */
const logoutCommand: CommandType = {
  func: "logout",
  name: "用户注销",
  options: [],
  async action(options, terminal) {
    // const res: any = await userLogout()
    // const { setLoginUser, cleanLocalJWT } = useUserStore()
    // setLoginUser(LOCAL_USER)
    // cleanLocalJWT()

    terminal.writeTextSuccessResult("已退出登录");
  },
};

export default logoutCommand;
