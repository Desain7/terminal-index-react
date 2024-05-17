import { defineStore } from 'pinia'
import { getCodeSnippet, addCodeSnippet } from './codeApi'
import { message } from 'ant-design-vue'
import CodeSnippetType = Code.CodeSnippetType

export const useCodeStore = defineStore('code', {
  state: () => ({
    // 输入的代码片段
    codeSnippet: '',
    // 本次输入类型：0.保存 1.修改
    inputType: 0,
    // 代码片段列表
    snippetList: [] as CodeSnippetType[],
    isLogin: false
  }),
  getters: {},
  // 持久化
  persist: {
    key: 'code-store',
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log('load codeStore data start')
    },
    afterRestore: (context) => {
      console.log('load codeStore data end')
    }
  },
  actions: {
    getSnippet: async function (name: string) {
      try {
        const res = await getCodeSnippet(name)
        this.snippetList = res.data
        this.isLogin = true
      } catch (err) {
        this.isLogin = false
      }
    },
    addSnippet: async function (snippetInfo: CodeSnippetType) {
      const { name, code, language } = snippetInfo
      console.log(snippetInfo)
      const { data: res } = await addCodeSnippet(name, code, language)
      if (res.status == 200) {
        message.success('This is a success message')
      }
    }
  }
})
