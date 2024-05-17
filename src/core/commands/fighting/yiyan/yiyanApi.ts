import myAxios from '../../../../plugins/myAxios'

/**
 * 一言
 */
export const yiyan = async () => {
  return await myAxios.post('/yiyan')
}
