<template>
  <a-card style="width: 60%">
    <template #title>
      <a-input
        v-model:value="snippetInfo.name"
        placeholder="请输入代码片段名称"
      />
    </template>
    <template #extra>
      <a-select
        v-model:value="snippetInfo.language"
        style="width: 200px"
        :options="options"
      ></a-select>
      <a-button v-if="inputType === 1" type="primary">修改</a-button>
      <a-button v-else type="primary" @click="addSnippet(snippetInfo)"
        >保存</a-button
      >
    </template>
    <codemirror
      v-model="snippetInfo.code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
    />
  </a-card>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { useCodeStore } from './codeStore'
import CodeSnippetType = Code.CodeSnippetType

const { inputType, addSnippet } = useCodeStore()

const snippetInfo: CodeSnippetType = reactive({
  name: '',
  code: '',
  language: ''
})
const options = ref([
  {
    value: 'Html',
    label: 'Html'
  },
  {
    value: 'CSS',
    label: 'CSS'
  },
  {
    value: 'Javascript',
    label: 'Javascript'
  }
])

const code = ref(`console.log('Hello, world!')`)
const extensions = [javascript(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.view
}

// Status is available at all times via Codemirror EditorView
// const getCodemirrorStates = () => {
//   const state = view.value.state
//   const ranges = state.selection.ranges
//   const selected = ranges.reduce(
//     (r: any, range: any) => r + range.to - range.from,
//     0
//   )
//   const cursor = ranges[0].anchor
//   const length = state.doc.length
//   const lines = state.doc.lines
//   // more state info ...
//   // return ...
// }
</script>

<style lang="less" scoped>
// :deep(.ant-card) {
//   width: 90%;
// }
</style>
