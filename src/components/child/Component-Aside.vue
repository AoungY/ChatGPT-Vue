<template>
  <el-scrollbar class="el-aside-scrollbar">
    <el-aside>
      <div class="new-chat" @click="newChat()">
        <svg
          t="1684219909021"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3402"
          width="18"
          height="18"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <path
            d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
            fill="#ffffff"
            p-id="3403"
          ></path>
        </svg>
        <!-- <span style="font-size:1.29rem">+</span> -->
        <span>New chat</span>
      </div>

      <div class="chat-history">
        <el-menu
          v-for="(item, index) in chatHistory"
          :key="index"
          :default-active="activeIndex"
          text-color="#ffffff"
          background-color="#202123"
          active-text-color="#ffffff"
        >
          <el-menu-item
            :index="index.toString()"
            :id="index"
            @mousedown="getChatInfo(index)"
            v-on:blur="editTitle = -1"
          >
            <div class="titleBox">
              <el-icon v-show="deleteTitle === index" size="1.125rem"><Delete /></el-icon>
              <el-icon v-show="deleteTitle != index" size="1.125rem"
                ><ChatSquare
              /></el-icon>

              <span v-show="editTitle != index" class="message-title">{{
                item.title
              }}</span>
              <div v-show="editTitle == index">
                <input
                  :value="item.title"
                  class="edit-title"
                  v-on:focus="console.log('input 聚焦了！')"
                  v-on:blur="handleBlur"
                  ref="inputFocus"
                  @keydown.enter="
                    setTitle(index);
                    handleBlur();
                  "
                />
              </div>
            </div>

            <div v-show="deleteTitle === index" class="edit" style="gap: 0rem">
              <div @click="messageDelete(index)">
                <el-icon class="bt3" size="16px"><Check /></el-icon>
              </div>
              <div @click="deleteTitle = -1">
                <el-icon class="bt4" size="16px"><Close /></el-icon>
              </div>
            </div>

            <div v-show="editTitle === index" class="edit" style="gap: 0rem">
              <div @mousedown="setTitle(index)">
                <el-icon class="bt3" size="16px"><Check /></el-icon>
              </div>
              <div @click="handleBlur()">
                <el-icon class="bt4" size="16px"><Close /></el-icon>
              </div>
            </div>

            <div
              v-show="
                editTitle != index &&
                deleteTitle != index &&
                activeIndex === index.toString()
              "
              class="edit"
            >
              <div><EditOutlined class="bt3" @click="editButton(index)" /></div>
              <div @click="deleteButton(index)">
                <el-icon class="bt4" size="16px"><Delete /></el-icon>
              </div>
            </div>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="tools">
        <div @mousedown="CLearnConversations">
          <el-icon v-if="deleteTitle !== 99999" size="1.125rem"><Delete /></el-icon>
          <el-icon v-else class="bt3" size="16px"><Check /></el-icon>

          <span v-if="deleteTitle !== 99999">Clear conversations</span>
          <span v-else>Confirm clear conversations</span>
        </div>
      </div>
    </el-aside>
  </el-scrollbar>
</template>

<script setup>
import { ChatSquare, Delete, Check, Close } from "@element-plus/icons-vue";
import { EditOutlined } from "@ant-design/icons-vue";
import { ref, inject, nextTick } from "vue";
//<start>获取父组件变量/方法
const history = inject("history");
const structure = inject("structure");
const updataShowdata = inject("updataShowdata");
const chatHistory = inject("chatHistory");
const activeIndex = inject("activeIndex");
const newChat = inject("newChat");
const drawerAside = inject("drawerAside");
const abortController = inject("abortController"); //终止fetch
const streamData = inject("streamData"); //是否正在接收流式数据
const scrollbarRef = inject("scrollbarRef"); // main的滚动条ref
const deleteTitle = inject("deleteTitle"); //删除会话索引
//<end>获取父组件变量/方法
//aside

const getChatInfo = async (index) => {
  console.log("getChatInfo", index);
  if (streamData.value) {
    abortController.value.abort(); //终止fetch
  }
  if (index != deleteTitle.value) deleteTitle.value = -1;
  if (activeIndex.value != index) drawerAside.value = false;
  activeIndex.value = index.toString();
  history.value = chatHistory.value[index].history;

  structure.value = chatHistory.value[index].structure;
  updataShowdata();

  // 滚动条置底
  nextTick(() => {
    scrollbarRef.value.wrapRef.scrollTop = scrollbarRef.value.wrapRef.scrollHeight;
  });
};

//head
const editTitle = ref(-1);

const inputFocus = ref(null);
const editButton = (index) => {
  editTitle.value = index;
  nextTick(() => {
    inputFocus.value[index].focus();
  });
};
function handleBlur() {
  editTitle.value = -1;
  // 在这里执行失焦后的操作
  console.log("Input 失焦了");
}

//更改标题
const setTitle = async (index) => {
  console.log("setTitle", index);
  //从inputFocus中获取标题并设置
  console.log(inputFocus.value[index].value);
  chatHistory.value[index].title = inputFocus.value[index].value;

  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
};

//删除会话
const deleteButton = (index) => {
  deleteTitle.value = index;
};
const messageDelete = (index) => {
  console.log("messageDelete", index);
  chatHistory.value.splice(index, 1);
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
  deleteTitle.value = -1;
  nextTick(() => {
    activeIndex.value = -1;
    history.value = [];
  });
};

//删除所有会话
const CLearnConversations = () => {
  console.log("CLearnConversations");
  if(deleteTitle.value === 99999) {
    deleteTitle.value = -1;
    newChat();
    chatHistory.value = [];
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
  }
  else{
    deleteTitle.value = 99999;
  }

};
</script>

<style scoped>
.el-aside {
  /* width: 15.5vw; */
  width: 260px;
  max-width: 260px;
  overflow-x: hidden;
  min-height: 100vh;
  padding: 0.5rem;
  background-color: #202123;
  color: #ffffff;
}

.el-aside-scrollbar {
  height: 100vh;
}

.new-chat {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 5px;
  /* height: 1.875rem; */
  padding: 12px;
  margin: 0px 0px 4px;
}

.new-chat svg {
  color: white;
}
.new-chat:hover {
  background: hsla(240, 9%, 59%, 0.1);
}

.tools {
  /* 设置样式持续固定在底部 */
  position: absolute;
  bottom: 0;
  padding-top: 0.5rem;
  width: 240px;
  border-color: hsla(0, 0%, 100%, 0.2);
  border-top-width: 1px;
  border-top-style: solid;

  background-color: #202123;
}

.tools > div {
  justify-content: space-between;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
  padding: 12px;
  margin: 0px 0px 4px;
}
.tools > div:hover {
  background-color: rgb(64, 65, 79);
  border-radius: 0.25rem;
}

.tools > div span {
  width: 100%;
}

.chat-history {
  margin-top: 2rem;
}

.chat-history .el-menu-item {
  height: 3rem;
  border-radius: 0.375rem;
}

.el-menu-item:hover {
  background-color: rgb(42, 42, 52);
}

.message-title {
  display: inline-block;
  width: 190px;
  line-height: 3rem;
  -webkit-mask: linear-gradient(to left, transparent 0%, black 15%);
  -o-mask: linear-gradient(to left, transparent 0%, black 15%);
  -moz-mask: linear-gradient(to left, transparent 0%, black 15%);
  mask: linear-gradient(to left, transparent 0%, black 15%);
}

.el-menu-item.is-active .message-title {
  display: inline-block;
  width: 150px;
  -webkit-mask: linear-gradient(to left, transparent 0%, black 20%);
  -o-mask: linear-gradient(to left, transparent 0%, black 20%);
  -moz-mask: linear-gradient(to left, transparent 0%, black 20%);
  mask: linear-gradient(to left, transparent 0%, black 20%);
}

.titleBox {
  display: flex;
  align-items: center;
  height: 3rem;
}

.edit-title {
  display: flex;
  background-color: #202123;
  color: #ffffff;
  outline: 1.5px solid rgb(36, 88, 177);
  width: 150px;
  border: #202123;
  font-size: 0.875rem;
}

.edit {
  display: flex;
  gap: 0.2rem;
}

.edit div {
  width: 24px;
  height: 24px;
  /* 垂直居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(197, 197, 210);
}

.bt3,
.bt4 {
  font-size: 16px;
  width: 16px;
  height: 16px;
}
.bt3:hover {
  color: #ffffff;
}
.bt4:hover {
  color: #ffffff;
}
.el-menu {
  border-right: 0;
}

.el-menu-item {
  padding: 12px 0px 12px 12px !important;
}

.el-menu-item.is-active {
  background-color: rgb(53, 53, 65);
}

.el-menu-item {
  display: flex;
  justify-content: space-between;
}
</style>
