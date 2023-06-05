<template>
  <div>
    <el-container>
      <component-aside v-if="screenWidth > 768"></component-aside>
      <el-container style="flex-direction: column">
        <component-header v-if="screenWidth <= 768"></component-header>
        <el-drawer
          v-if="screenWidth <= 768"
          v-model="drawerAside"
          :with-header="false"
          direction="ltr"
          show-close="true"
          size="260px"
        >
          <component-aside></component-aside>
        </el-drawer>
        <el-scrollbar
          class="el-main-scrollbar"
          ref="scrollbarRef"
          :style="screenWidth <= 768 ? 'max-height: 95vh;' : ''"
        >
          <el-main :style="screenWidth <= 768 ? 'width:auto' : ''">
            <!-- 如果history为[]则显示首页提示组件 -->
            <component-index v-if="history.length == 0"></component-index>
            <!-- 
              xs（特小）：小于 576px 宽度的设备或窗口。
              sm（小）：576px 或更大宽度的设备或窗口。
              md（中）：768px 或更大宽度的设备或窗口。
              lg（大）：992px 或更大宽度的设备或窗口。
              xl（特大）：1200px 或更大宽度的设备或窗口。
             -->
            <component-content @contentSend="contentSend"></component-content>
          </el-main>
          <component-footer ref="componentFooter"></component-footer>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref, provide } from "vue";
import { ElScrollbar, ElMain, ElContainer, ElDrawer } from "element-plus";

import ComponentAside from "./child/Component-Aside.vue";
import ComponentHeader from "./child/Component-Header.vue";
import ComponentContent from "./child/Component-Content.vue";
import ComponentFooter from "./child/Component-Footer.vue";
import ComponentIndex from "./child/Component-Index.vue"; //不知为何 提示重复导入

//<start> 实时监听屏幕宽度 大于768px时显示侧边栏
const screenWidth = ref(window.innerWidth);
const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
//<end> 实时监听屏幕宽度

//变量声明
const activeIndex = ref(-1); //当前会话索引
const history = ref([]); //当前会话聊天记录
const structure = ref([]); // 会话结构
const showData = ref([]); // 显示的会话数据
const question = ref(""); //问题
const deleteTitle = ref(-1); //删除会话索引
const abortController = ref(null); //终止fetch
const streamData = ref(false); //是否正在接收流式数据
const drawerAside = ref(false); //侧边栏抽屉
const dialogSettings = ref(false); //settings对话框是否打开
const scrollbarRef = ref(); //main的滚动条ref

const componentFooter = ref(null); //contentFooter组件的ref
//新会话
const newChat = () => {
  console.log("newChat");
  history.value = [];
  showData.value = [];
  if (activeIndex.value != -1) drawerAside.value = false;
  activeIndex.value = -1;
  deleteTitle.value = -1;
};

//收集浏览器历史记录
const chatHistory = ref([]);
const settings = ref();
onBeforeMount(() => {
  try {
    chatHistory.value = JSON.parse(localStorage.getItem("chatHistory"));
    if (localStorage.getItem("settings")) {
      settings.value = JSON.parse(localStorage.getItem("settings"));
    } else {
      settings.value = { charactersName:"",prompt:"", characters: {}, temperature: 0.5 };
      localStorage.setItem("settings", JSON.stringify(settings.value));
    }

    if (
      chatHistory.value == null ||
      (chatHistory.value.length != 0 &&
        chatHistory.value[chatHistory.value.length - 1].tail == null)
    ) {
      chatHistory.value = [];
    }
  } catch (e) {
    chatHistory.value = [];
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
  }

  // if (chatHistory.value == null) chatHistory.value = [];
  // console.log(chatHistory.value);
});

//content组件发送消息
const contentSend = () => {
  console.log("contentSend");
  updataShowdata();
  componentFooter.value.sendApi();
};

//根据tail更新会话结构
const updataShowdata = () => {
  // let i = structure.value.length - 1;
  let i = chatHistory.value[activeIndex.value].tail;
  // console.log("getStructure", i, history.value);
  showData.value = [];
  while (i != 0) {
    // console.log(i - 1, structure.value[i], history.value[i - 1]);
    showData.value.unshift({ value: history.value[i - 1], structure_index: i });
    i = structure.value[i][0];
  }
};

//<start>子组件传值
//方法
provide("newChat", newChat);
//变量
provide("chatHistory", chatHistory);
provide("history", history);
provide("activeIndex", activeIndex);
provide("question", question);
provide("drawerAside", drawerAside);
provide("abortController", abortController);
provide("streamData", streamData);
provide("scrollbarRef", scrollbarRef);
provide("screenWidth", screenWidth); // 传递屏幕宽度
provide("structure", structure);
provide("showData", showData);
provide("updataShowdata", updataShowdata);
provide("deleteTitle", deleteTitle);
provide("dialogSettings", dialogSettings);
provide("settings", settings);
//<end>子组件传值
</script>

<style scoped>
@media (width <= 768px) {
  /* .el-aside {
    宽度少于768时aside会自动隐藏
    display: none;
  } */
  /* .el-header.el-header {
    display: flex;
  } */

  .el-main.el-main {
    width: auto;
  }
  .el-main-scrollbar {
    max-height: 95vh;
  }
}

.el-main {
  /* height: 90vh; */
  padding: 0;
  width: calc(100vw - 260px);
  /* padding:20px 0px 20px 0px; */
  overflow-x: hidden;
  /* min-height:80vh; */
  margin-bottom: 15vh;
}

.el-main-scrollbar {
  height: 100vh;
}

:deep(.el-drawer__body) {
  padding: 0 !important;
}

.newButton {
  color: #ffffff;
  align-items: center;
}
.centered-menu-item {
  text-align: center;
}
.index-content .el-col {
  padding: 0.75rem;
  background-color: rgb(247, 247, 248);
  border-radius: 0.375rem;
}
</style>
