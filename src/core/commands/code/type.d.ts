declare namespace Code {
  /**
   * 代码片段类型
   */
  interface CodeSnippetType {
    id?: int
    name: string
    code: string
    createdTime?: date
    updatedTime?: Date
    language: string
    userId?: int
  }
}
