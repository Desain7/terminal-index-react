import myAxios from '../../../plugins/myAxios'

/**
 * 获取热搜
 */
export const getNews = async () => {
  return await myAxios.post('/news', {})
}
