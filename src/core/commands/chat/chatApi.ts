import myAxios from '../../../plugins/myAxios'

/**
 * 对话内容
 * @param body
 */
export const chat = async (message: string) => {
  if (!message) {
    return null
  }
  return await myAxios.post('/chat', { message })
}
