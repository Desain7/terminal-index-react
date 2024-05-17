<template>
  <div class="code-box">
    <div v-if="snippetList.length > 0" class="code-content">
      <a-collapse v-model:activeKey="activeKey" :bordered="false">
        <a-collapse-panel
          v-for="item in snippetList"
          :key="item.id"
          :header="item.name"
        >
          <highlightjs :language="item.language" :code="item.code" />
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div v-else-if="!isLogin" class="tip no-login">请先登录！</div>
    <div v-else class="tip empty">暂无代码片段</div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from 'vue'
import { useCodeStore } from './codeStore'
interface CodeBoxProps {
  name: string
}

const props = withDefaults(defineProps<CodeBoxProps>(), {})
const { name } = toRefs(props)

const codeStore = useCodeStore()
const { getSnippet, isLogin } = codeStore
let codeName = name.value ? name.value : ''
getSnippet(codeName)

const snippetList = computed(() => codeStore.snippetList)

const activeKey = ref('1')
const text = '123'
</script>

<style lang="less" scoped>
.code-box {
  max-height: 75vh;
  width: 60%;
  overflow: auto;
  background-color: #fff;
  border-radius: 20px;
  .code-content {
    padding: 2%;
  }
  .tip {
    margin-left: 5%;
    color: black;
  }
}
</style>
