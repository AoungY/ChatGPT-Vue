<template>
  <el-header>
    <button class="bt1" @click="drawerAside = true">
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <h1 v-if="activeIndex != -1">{{ chatHistory[activeIndex].title }}</h1>
    <h1 v-show="activeIndex == -1">New Chat</h1>
    <button class="bt2" @click="newChat()">
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </el-header>
</template>

<script setup>
import { inject } from "vue";
//<start>获取父组件变量/方法
const chatHistory = inject("chatHistory");
const activeIndex = inject("activeIndex");
const newChat = inject("newChat");
const drawerAside = inject("drawerAside");
//<end>获取父组件变量/方法
</script>

<style scoped>
.el-header {
  display: flex;
  background-color: rgb(52, 53, 65);
  padding-top: 0.25rem;
  padding-left: 0.75rem;
  color: rgb(217, 217, 227);
  border-color: hsla(0, 0%, 100%, 0.2);
  border-bottom-width: 1px;
  height: 42.67px;
  width: auto;

  top: 0;
  position: sticky;
}

.el-header h1 {
  font-weight: 400;
  font-size: 1rem;
  line-height: 1rem;
  text-align: center;
  flex: 1 1 0%;
  max-width: calc(100% - 30px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1rem;
  margin-top: 0.65em;
}

.el-header .svg {
  height: 1.5rem;
  width: 1.5rem;
  display: block;
}

.bt1,
.bt2 {
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  text-transform: none;
  color: #d9d9e3;
}

.bt1 {
  border-radius: 0.375rem;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  margin-top: -0.125rem !important;
  margin-left: -0.125rem !important;
}

.bt2 {
  padding: 0;
  /* padding-left: 0.75rem; */
  /* padding-right: 0.75rem; */
}
</style>
