<template>
  <div class="common-layout">
    <el-container>
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
                @click="getChatInfo(index)"
              >
                <div>
                  <el-icon size="1.125rem"><ChatSquare /></el-icon>
                  <span class="message-title">{{ item.title }}</span>
                </div>

                <div v-if="activeIndex === index.toString()" class="edit">
                  <div><EditOutlined class="bt3" /></div>
                  <div @click="messageDelete(index)">
                    <el-icon class="bt4" size="16px"><Delete /></el-icon>
                  </div>
                </div>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
      </el-scrollbar>
      <el-container>
        <el-header>
          <button class="bt1">
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

          <h1>New chat</h1>
          <button class="bt2">
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
        <el-scrollbar class="el-main-scrollbar">
          <el-main>
            <!-- 如果history为[]则显示div -->
            <div v-if="history.length == 0" class="index">
              <h1>ChatGPT</h1>
              <div class="msg">
                <div class="tip">
                  <div class="tip-header">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="svg-icon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    Examples
                  </div>
                  <div @click="question = 'Explain quantum computing in simple terms'">
                    "Explain quantum computing in simple terms" →
                  </div>
                  <div
                    @click="
                      question = 'Got any creative ideas for a 10 year old’s birthday?'
                    "
                  >
                    "Got any creative ideas for a 10 year old’s birthday?" →
                  </div>
                  <div @click="question = 'How do I make an HTTP request in Javascript?'">
                    "How do I make an HTTP request in Javascript?" →
                  </div>
                </div>
                <div class="tip">
                  <div class="tip-header">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      class="svg-icon"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      ></path>
                    </svg>
                    Capabilities
                  </div>
                  <div>Remembers what user said earlier in the conversation</div>
                  <div>Allows user to provide follow-up corrections</div>
                  <div>Trained to decline inappropriate requests</div>
                </div>
                <div class="tip">
                  <div class="tip-header">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="svg-icon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                      ></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    Limitations
                  </div>
                  <div>May occasionally generate incorrect information</div>
                  <div>
                    May occasionally produce harmful instructions or biased content
                  </div>
                  <div>Trained to decline inappropriate requests</div>
                </div>
              </div>
            </div>
            <!-- 
              xs（特小）：小于 576px 宽度的设备或窗口。
              sm（小）：576px 或更大宽度的设备或窗口。
              md（中）：768px 或更大宽度的设备或窗口。
              lg（大）：992px 或更大宽度的设备或窗口。
              xl（特大）：1200px 或更大宽度的设备或窗口。
             -->
            <div v-for="(item, index) in history" :key="index" class="content">
              <el-row v-if="item.role === 'user'">
                <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
                  <div />
                </el-col>
                <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="12">
                  <div class="d1">
                    <div class="user-img grid-content ep-bg-purple">
                      <img
                        src="../assets/img/user.webp"
                        style="width: 30px; height: 30px; border-radius: 10%"
                      />
                    </div>
                    <div class="text">{{ item.content }}</div>
                  </div>
                </el-col>
                <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
                  <div />
                </el-col>
              </el-row>

              <el-row v-else>
                <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
                  <!-- <div /> -->
                </el-col>
                <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="12">
                  <div class="d1">
                    <div>
                      <div class="ai-img">
                        <svg
                          width="22"
                          height="24"
                          viewBox="0 0 41 41"
                          fill="#ffffff"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke-width="1.5"
                          role="img"
                        >
                          <title>ChatGPT</title>
                          <text x="-9999" y="-9999">ChatGPT</text>
                          <path
                            d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                            fill="#ffffff"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div class="text">{{ item.content }}</div>
                  </div>
                </el-col>
                <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
                  <div />
                </el-col>
              </el-row>
            </div>
            <el-footer>
              <div class="input-box">
                <el-input
                  v-model="question"
                  :autosize="{ minRows: 1, maxRows: 8 }"
                  resize="none"
                  type="textarea"
                  placeholder="Send a message."
                  class="el-textarea-input"
                />
                <div class="send" @click="sendQuestion()">
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
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Plus, ChatSquare, Delete } from "@element-plus/icons-vue";
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import { onBeforeMount, ref } from "vue";
import axios from "../../axios";

//aside
const activeIndex = ref(-1);
const getChatInfo = async (history_index) => {
  console.log("getChatInfo", history_index);
  activeIndex.value = history_index.toString();
  history.value = chatHistory.value[history_index].history;
};

//main
const question = ref("");
const contextLength = ref(8); //上下文长度
const sendQuestion = async () => {
  //发送问题不能为空
  if (question.value == "") {
    return;
  }
  if (activeIndex.value === -1) {
    console.log("new chat", activeIndex.value);

    history.value = [
      { role: "user", content: question.value },
      { role: "ai", content: "" },
    ];
    sendApi();

    chatHistory.value.push({
      // titlle为question.value 的前八个字符
      title: question.value.slice(0, 15),
      history: history.value,
    });

    activeIndex.value = (chatHistory.value.length - 1).toString();
  } else {
    //旧会话
    history.value.push({ role: "user", content: question.value });
    history.value.push({ role: "ai", content: "" });
    sendApi();
  }
  question.value = "";
};

const sendApi = async () => {
  let data = history.value.slice(0, history.value.length - 1);

  const response = await fetch("/chatGPT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      history.value.slice(0, history.value.length - 1).splice(-contextLength.value)
    ),
  });

  const reader = response.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    // console.log(done, value, new TextDecoder("utf-8").decode(value));
    // history.value[history.value.length - 1]["content"] += new TextDecoder("utf-8").decode(value);
    history.value.at(-1).content += new TextDecoder("utf-8").decode(value);
  }
  //如果histroy长度为2 则说明是新会话 需要从最后一个开始覆盖
  if (history.value.length === 2) chatHistory.value.at(-1).history = history.value;
  else chatHistory.value.at(activeIndex.value).history = history.value;
  //持久化 保存
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
};

//新会话
const history = ref([]); //聊天记录
const newChat = () => {
  console.log("newChat");
  history.value = [];
  activeIndex.value = -1;
};

//删除会话
const messageDelete = (index) => {
  console.log("messageDelete", index);
  chatHistory.value.splice(index, 1);
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
};

//收集浏览器历史记录
const chatHistory = ref([]);
onBeforeMount(() => {
  chatHistory.value = JSON.parse(localStorage.getItem("chatHistory"));
  console.log(chatHistory.value);
  // console.log(JSON.stringify(chatHistory.value));
});
</script>

<style scoped>
@media (width < 768px) {
  .el-aside {
    display: none;
  }

  .el-main.el-main {
    width: auto;
  }

  .el-header.el-header {
    display: flex;
  }

  .input-box.input-box {
    width: 95%;
    right: calc(100% / 2 - 95% / 2);
  }
}

@media (width >= 768px) {
  .index h1 {
    margin-top: 20vh;
  }

  .msg.msg {
    flex-direction: row;
  }
}

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

.el-main {
  /* height: 90vh; */
  padding: 0;
  width: calc(100vw - 260px);
  /* padding:20px 0px 20px 0px; */
  overflow-x: hidden;
}

.el-main-scrollbar {
  height: 100dvh;
}
.el-aside-scrollbar {
  height: 100vh;
}

.el-header {
  display: none;
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
.el-footer {
  display: flex;
  height: 10vh;
  padding: 0;
  position: fixed;
  bottom: 0px;
  width: 100vw;
  background-image: linear-gradient(to bottom, transparent 0%, white 40%);
}

.el-header h1 {
  font-weight: 400;
  font-size: 1rem;
  line-height: 0.5rem;
  text-align: center;
  flex: 1 1 0%;
}

.el-header .svg {
  height: 1.5rem;
  width: 1.5rem;
  display: block;
}

button {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;

  border: 0 solid #d9d9e3;
  box-sizing: border-box;
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

.el-menu-item {
  display: flex;
  justify-content: space-between;
}

.message-title {
  display: inline-block;
  width: 150px;
  -webkit-mask: linear-gradient(to left, transparent 0%, black 10%);
  -o-mask: linear-gradient(to left, transparent 0%, black 10%);
  -moz-mask: linear-gradient(to left, transparent 0%, black 10%);
  mask: linear-gradient(to left, transparent 0%, black 10%);
}



.index {
  text-align: center;
  margin: 0 auto;
  max-width: 768px;
}

.index h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: rgb(52, 53, 65);
}
.index h2 {
  font-weight: 300;
  font-size: 1.125rem;
  line-height: 1.75rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;
  color: rgb(52, 53, 65);
  gap: 0.5rem;
}

.msg {
  width: fit-content;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}
.msg .tip {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}
.msg .tip .tip-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  font-size: 1.3rem;
  font-weight: 300;
}

.msg .tip:first-child div:not(.tip-header) {
  cursor: pointer;
}
.msg .tip:first-child div:not(.tip-header):hover {
  background-color: rgb(217, 217, 227);
}
.msg .tip div:not(.tip-header) {
  padding: 0.75rem;
  background-color: rgb(247, 247, 248);
  border-radius: 0.375rem;
}

.index-content {
  width: fit-content;
  margin-top: 1rem;
  /* flex-direction: column; */
  flex-wrap: nowrap;
  gap: 0.875rem;
}

.index-content .el-col {
  padding: 0.75rem;
  background-color: rgb(247, 247, 248);
  border-radius: 0.375rem;
}

.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  /*设置图标居中显示*/
  vertical-align: middle;
}
.ai-img {
  width: 30px;
  height: 30px;
  overflow: hidden;
  /* 设置背景色为绿色 且沉在svg下面 */
  background-color: rgb(25, 194, 125);
  /* 圆角 */
  border-radius: 10%;
}

.ai-img svg {
  /* 设置图标水平垂直居中显示 基于父类ai-img*/
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.content {
  font-size: 1rem;
  color: rgb(52, 53, 65);
}

.content .d1 {
  gap: 0.5rem;
  padding: 1rem 0 1rem 0;
  display: flex;
}
.d1 .text {
  padding: 0.25rem 0 0.75rem 0;
}

.chat-history {
  margin-top: 2rem;
}

.chat-history .el-menu-item {
  height: 3rem;
  border-radius: 0.375rem;
  gap: 0.35rem;
}

.chat-history .el-menu-item:hover {
  background-color: rgb(42, 42, 52);
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

.input-box {
  position: fixed;
  right: calc((100vw - 260px) / 2 - 65% / 2);
  bottom: 40px;
  box-sizing: border-box;
  width: 65%;
  padding: 0.5rem 0.5rem;
  box-shadow: 0px 0px 5px 1px #ccc;
  height: fit-content;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  background-color: #ffffff;
}
:deep(.el-textarea__inner) {
  box-shadow: none;
  border: none;
  padding: 0px 11px;
  font-size: 1.125rem;
  vertical-align: middle;
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
  --color: rgb(186, 186, 181);
  border-radius: 4px;
  padding: 4px 4px 1px 4px;
  color: var(--color);
  cursor: pointer;
}
.send span:hover {
  --color: rgb(142, 142, 160);
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
</style>
