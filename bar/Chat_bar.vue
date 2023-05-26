<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <div class="new-chat">
          <svg
            t="1684219909021"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3402"
            width="20"
            height="20"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
              fill="#ffffff"
              p-id="3403"
            ></path>
          </svg>
          <span>New chat</span>
        </div>
      </el-aside>
      <el-container>
        <el-main>main</el-main>
        <el-footer>
          <div class="input-box">
            <el-input
              v-model="textarea"
              :autosize="{ minRows: 1, maxRows: 8 }"
              resize="none"
              type="textarea"
              placeholder="Send a message."
              class="el-textarea-input"
            />
            <div class="send">
              <span>
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4 mr-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
            </div>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import {
  ElContainer,
  ElAside,
  ElMain,
  ElFooter,
  ElInput,
  ElButton,
  ElRow,
  ElCol,
  ElMenu,
  ElMenuItem,
  ElIcon,
  ElPopconfirm,
} from "element-plus";
import { onBeforeMount, ref } from "vue";

const textarea = ref("");
</script>

<style scoped>
.el-aside {
  width: 23vw;
  height: 100vh;
  padding: 0.5rem;
  background-color: #202123;
  color: #ffffff;
}
.el-main {
  width: auto;
  height: 90vh;
  padding: 0;
  /* padding:20px 0px 20px 0px; */
}
.el-footer {
  display: flex;
  width: auto;
  height: 10vh;
  padding: 0;
}





.input-box {
  position: fixed;
  right: calc(100% / 2 - 43%);
  bottom: 40px;
  width: 60%;
  padding: 0.3rem 0.5rem;
  box-shadow: 0px 0px 5px 1px #ccc;
  height: fit-content;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}
:deep(.el-textarea__inner) {
  box-shadow: none;
  border: none;
}
:deep(.el-textarea__inner):hover {
  border: none;
  box-shadow: none;
}
.el-textarea-input {
  flex: 1;
}
.send span {
  display: inline-block;
  margin-bottom: 2px;
  --color: rgb(186,186,181);
  border-radius: 4px;
  padding: 4px 4px 1px 4px;
  color: var(--color);
  cursor: pointer;
}
.send span:hover {
  --color: rgb(142,142,160);
  background: #e5e5e5; 
}

.newButton {
  color: #ffffff;
  align-items: center;
}

.centered-menu-item {
  text-align: center;
}
.new-chat {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 5px;
}
.new-chat svg {
  color: white;
}
.new-chat:hover {
  background: hsla(240, 9%, 59%, 0.1);
}
</style>
