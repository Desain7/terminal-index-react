import myAxios from '../../../plugins/myAxios'

export const getCodeSnippet = async (name: string) => {
  return await myAxios.post('/getCode', { name })
}

export const addCodeSnippet = async (
  name: string,
  code: string,
  language: string
) => {
  return await myAxios.post('/addCode', { name, code, language })
}
