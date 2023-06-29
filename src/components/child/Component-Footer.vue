<template>
  <el-footer>
    <div class="footer">
      <div
        class="regenerate"
        v-show="screenWidth > 768 && activeIndex !== -1 && !streamData"
        @click="regenerateSend()"
        :style="
          screenWidth <= 768
            ? `    bottom: 7.5vh;
    right: calc(100vw / 2 - 178.49px / 2);`
            : ''
        "
      >
        <div class="regenerate-button">
          <div>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-3 w-3 flex-shrink-0"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path
                d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
              ></path>
            </svg>
            Regenerate response
          </div>
        </div>
      </div>
      <div
        class="regenerate"
        v-show="screenWidth > 768 && activeIndex !== -1 && streamData"
        @click="stopStream()"
      >
        <div class="regenerate-button">
          <div>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-3 w-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            Stop generating
          </div>
        </div>
      </div>
      <div
        class="input-entity"
        :style="
          screenWidth <= 768
            ? `--width-input: 100vw;right: calc(100vw / 2 - var(--width-input) / 2);background-color: #ffffff;
    border-top: #e5e5e5 solid 1px;
    padding: 10px;`
            : ''
        "
      >
        <div class="input-box">
          <el-input
            v-model="question"
            :autosize="{ minRows: 1, maxRows: 8 }"
            resize="none"
            type="textarea"
            placeholder="Send a message."
            class="el-textarea-input"
            @keydown.enter="handleEnterKey($event)"
          />
          <div class="send" @click="sendQuestion()">
            <span
              :style="sendStyles"
              class="send-svg"
              :class="{ 'send-svg-active': question != '' }"
            >
              <svg
                v-show="!streamData"
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
            <div v-show="streamData" class="send-point">
              <span>.</span>
              <span :class="{ invisible: point1 }">.</span>
              <span :class="{ invisible: point2 }">.</span>
            </div>
          </div>
        </div>
        <div class="phone-regenerate" v-show="screenWidth <= 768 && activeIndex !== -1">
          <svg
            v-show="screenWidth <= 768 && activeIndex !== -1 && !streamData"
            @click="regenerateSend()"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="16px"
            width="16px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path
              d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
            ></path>
          </svg>

          <svg
            v-show="screenWidth <= 768 && activeIndex !== -1 && streamData"
            @click="stopStream()"
            stroke="currentColor"
            fill="none"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="16px"
            width="16px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </div>
      </div>
      <div
        class="myInfo"
        :style="
          screenWidth <= 768
            ? `    height: 5vh;
    --width-myInfo: 100vw;
    right: calc(100vw / 2 - var(--width-myInfo) / 2);`
            : ''
        "
      >
        <span>
          The model is gpt-3.5-turbo-16k-0613.Data stored locally in the browser (safe and
          free).Problem feedback
          <a
            href="tencent://Message/?Uin=3342174599&websiteName=www.oicqzone.com&Menu=yes"
            >QQ:3342174599</a
          >
          Author home page:
          <a href="http://aoung.cn" target="_blank">Aoung</a>
        </span>
      </div>
    </div>
  </el-footer>
</template>

<script setup>
import { inject, ref, computed, nextTick, watch } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import { mangle } from "marked-mangle";
import { update } from "lodash";
//<start>获取父组件变量/方法
const history = inject("history");
const structure = inject("structure"); //结构化数据
const showData = inject("showData"); //显示的数据
const updataShowdata = inject("updataShowdata"); //更新showData
const question = inject("question"); //问题
const chatHistory = inject("chatHistory");
const activeIndex = inject("activeIndex");
const abortController = inject("abortController"); //终止fetch
const streamData = inject("streamData"); //是否正在接收流式数据
const scrollbarRef = inject("scrollbarRef");
const screenWidth = inject("screenWidth"); //屏幕宽度
const settings = inject("settings"); //设置
let timer = null; // 定时器变量
//<end>获取父组件变量/方法
const contextLength = ref(8); //上下文长度
// marked配置
marked.setOptions({
  headerIds: false,
});
marked.use(mangle());
marked.use(
  markedHighlight({
    // async: true,
    langPrefix: "hljs language-",
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  })
);

//定义变量
const point1 = ref(true); //发送中需要动态变化的两个点
const point2 = ref(true);

watch(streamData, (newVal) => {
  if (newVal === false && timer !== null) {
    console.log("clearInterval");
    clearInterval(timer);
    timer = null;
  }
});

//main
const sendQuestion = () => {
  //发送问题不能为空
  if (question.value == "") {
    return;
  }

  if (activeIndex.value === -1) {
    //新会话
    console.log("new chat", activeIndex.value);

    history.value = [
      { role: "user", content: question.value, markdown: question.value },
      { role: "ai", content: "" },
    ];
    structure.value = [[-1, 1], [0, 2], [1]];
    // 从尾部加入
    // chatHistory.value.push({
    //   title: "New Chat",
    //   history: history.value,
    // });
    // activeIndex.value = (chatHistory.value.length - 1).toString();

    // 从头加入
    chatHistory.value.unshift({
      title: "New Chat",
      history: history.value,
      structure: structure.value,
      tail: 2,
    });
    activeIndex.value = "0";
    updataShowdata();
    sendApi();
  } else {
    //旧会话
    history.value.push({
      role: "user",
      content: question.value,
      markdown: question.value,
    });
    history.value.push({ role: "ai", content: "" });

    structure.value.push([
      chatHistory.value[activeIndex.value].tail,
      structure.value.length + 1,
    ]);
    structure.value[chatHistory.value[activeIndex.value].tail].push(
      structure.value.length - 1
    );
    structure.value.push([structure.value.length - 1]);

    chatHistory.value[activeIndex.value].tail = structure.value.length - 1;
    updataShowdata();
    sendApi();
  }
  question.value = "";
};

const sendApi = async () => {
  setPoint(); //发送时两个点的动画
  let index = parseInt(activeIndex.value); //当前会话索引
  // 注：如果后续使用history.at(-1) 则在你自己手机中无法发送成功！！！
  let len = showData.value.length - 1;

  showData.value[len].value.content = "";
  delete showData.value[len].value["markdown"];
  // chatHistory.value[index].history.at(-1).markdown; //清空上一次ai生成的内容
  let data = showData.value.slice(0, showData.value.length - 1);
  //遍历data 提取出元素中的value
  data = data.map((item) => {
    return item.value;
  });

  console.log("data", data.length);
  streamData.value = true; //开启流式数据
  abortController.value = new AbortController(); //重置abortController
  data = data.splice(-contextLength.value); //截取最后8个元素
  data.unshift({prompt:settings.value.prompt,temperature:settings.value.temperature});//加入设置

  const response = await fetch("/chatGPT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    signal: abortController.signal,
  });
  const reader = response.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    // 在每次循环开始之前检查请求是否已经中止
    if (abortController.value.signal.aborted) {
      streamData.value = false; // 关闭流式数据
      console.log("请求已经中止");
      break;
    }
    // console.log(done, value, new TextDecoder("utf-8").decode(value));
    // 写法二：history.value[history.value.length - 1]["content"] += new TextDecoder("utf-8").decode(value);
    showData.value[len].value.content += new TextDecoder("utf-8").decode(value);
    showData.value[len].value.markdown = marked.parse(showData.value[len].value.content);

    // chatHistory.value[index].history[len].content += new TextDecoder("utf-8").decode(value); //// 这样写也能改变history 因为本质history是一个引用
    // chatHistory.value[index].history[len].markdown = marked.parse(
    // chatHistory.value[index].history[len].content
    // );
    // marked.parse(text);

    let sub =
      scrollbarRef.value.wrapRef.scrollHeight -
      (scrollbarRef.value.wrapRef.scrollTop + scrollbarRef.value.wrapRef.offsetHeight);
    if (Math.abs(sub) <= 2) {
      //滚动条在底部时继续滑到底部
      scrollbarRef.value.wrapRef.scrollTop = scrollbarRef.value.wrapRef.scrollHeight;
    }
  }
  if (
    chatHistory.value[index].title == "New Chat" &&
    chatHistory.value[index].history.length === 2
  )
    getTitle(index); // 新会话 请求标题
  //持久化 保存
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
  console.log("持久化保存成功！");
  streamData.value = false; //关闭流式数据
};
//向ChatGPT获得会话标题 并 设置
const getTitle = async (index) => {
  let data = chatHistory.value[index].history.slice(
    0,
    chatHistory.value[index].history.length
  );
  data.push({
    role: "user",
    content:
      "根据我们刚才以上的会话内容生成一个标题，token限制在10以内，只需回答标题内容即可",
  });
  console.log("setTitle", index, data);
  const response = await fetch("/chatGPT", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const reader = response.body.getReader();
  chatHistory.value[index].title = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (new TextDecoder("utf-8").decode(value) === '"') continue;
    chatHistory.value[index].title += new TextDecoder("utf-8").decode(value);
  }
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
};

//regenerateSend
const regenerateSend = () => {
  console.log("regenerateSend");

  history.value.push({ role: "ai", content: "" });

  structure.value.push([structure.value[chatHistory.value[activeIndex.value].tail][0]]);
  structure.value[structure.value[chatHistory.value[activeIndex.value].tail]].push(
    structure.value.length - 1
  );

  chatHistory.value[activeIndex.value].tail = structure.value.length - 1;
  updataShowdata();

  sendApi();
};

//停止接收流式数据
const stopStream = () => {
  abortController.value.abort();
  streamData.value = false;
};

//Enter 和 Shift+Enter的事件
const handleEnterKey = (event) => {
  //若同时按下shift键 则不触发
  if (event.shiftKey) return;
  sendQuestion();
  event.preventDefault(); //阻止默认事件
};

//sendStyles
const sendStyles = computed(() => {
  if (question.value == "") return "cursor:default;";
  else return "cursor:pointer;color:rgb(142, 142, 160);";
});

//设置两个点的动画
const setPoint = () => {
  timer = setInterval(() => {
    // console.log("setPoint");
    if (point1.value) point1.value = false;
    else if (point2.value) point2.value = false;
    else point1.value = point2.value = true;
  }, 400);
};

defineExpose({ sendApi }); // 暴露方法给父组件
</script>

<style>
@import "../../assets/css/markdown.css";
/* markdown样式补充 */
pre {
  /* user-select: all; */
  display: block;
  padding: 10px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #abb2bf;
  background: #23241f;
  word-break: break-all;
  word-wrap: break-word;
  overflow: auto;
  border-radius: 5px;
}

@media (width <= 768px) {
  .input-entity.input-entity {
    --width-input: 100vw;
    right: calc(100vw / 2 - var(--width-input) / 2);
    background-color: #ffffff;
    /* border:#e5e5e5 solid 0px; */
    border-top: #e5e5e5 solid 1px;
    padding: 10px;
    /* z-index:9999; */
  }
  .myInfo.myInfo {
    height: 5vh;
    --width-myInfo: 100vw;
    right: calc(100vw / 2 - var(--width-myInfo) / 2);
  }

  .regenerate.regenerate {
    bottom: 7.5vh;
    right: calc(100vw / 2 - 178.49px / 2);
  }
}

.el-footer {
  display: flex;
  height: 10vh;
  padding: 0;
  position: fixed;
  bottom: 0px;
  width: 100vw;
  background-image: linear-gradient(to bottom, transparent 0%, white 40%);
  /* 设置层级高于main 渐变对main的滚动条一样生效 */
  z-index: 10;
}

.footer {
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 0%;
  position: relative;
}

.regenerate {
  width: 178.49px;
  height: 37.33px;
  padding: 0.5rem 0.75rem;
  border: rgba(0, 0, 0, 0.1) solid 1px;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  position: fixed;
  right: calc((100vw - 260px) / 2 - 178.49px / 2);
  bottom: 10.5vh;
  cursor: pointer;
}

.regenerate:hover {
  background-color: rgb(236, 236, 241);
}

.regenerate-button {
  border-width: 1px;
  position: relative;
}

.regenerate-button div {
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 105%;
  display: flex;
}
.regenerate-button div svg {
  flex-shrink: 0;
  width: 0.75rem;
  height: 0.75rem;
  margin-top: 2px;
}

.input-entity {
  --width-input: 65vw;
  position: fixed;
  bottom: 4.5vh;
  display: flex;
  width: var(--width-input);
  right: calc((100vw - 260px) / 2 - var(--width-input) / 2);
  justify-content: space-between;
  align-items: stretch;
  box-sizing: border-box;
}

.input-box {
  box-sizing: border-box;
  flex: 1;
  padding: 0.5rem 0.5rem;
  box-shadow: 0px 0px 5px 1px #ccc;
  height: fit-content;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  background-color: #ffffff;
  --phone-regenerate-width: 0px;
}
.el-textarea__inner {
  box-shadow: none;
  border: none;
  padding: 0px 11px;
  font-size: 1.125rem;
  vertical-align: middle;
}
.el-textarea__inner:hover,
.el-textarea__inner:focus {
  border: none;
  box-shadow: none;
}

.phone-regenerate {
  --phone-regenerate-width: 44px;
  box-sizing: border-box;
  width: 44px;
  margin-left: 10px;
  /* height: 44px; */
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
}

.phone-regenerate:hover {
  background-color: rgb(236, 236, 241);
  border-radius: 0.25rem;
}

.myInfo {
  --width-myInfo: 65vw;
  height: 4.5vh;
  font-size: 0.75rem;
  line-height: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  bottom: 0vh;
  color: rgb(86, 88, 105);

  display: flex;
  width: var(--width-myInfo);
  right: calc((100vw - 260px) / 2 - var(--width-myInfo) / 2);
}

.myInfo span {
  cursor: text;
  max-height: 5vh;
}
a {
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration-line: underline;
  color: inherit;
}

.el-textarea-input {
  flex: 1;
}

.send .send-svg {
  display: inline-block;
  margin-bottom: 2px;
  --color: rgb(186, 186, 181);
  border-radius: 4px;
  padding: 4px 4px 1px 4px;
  color: var(--color);
  cursor: "pointer";
}

.send span.send-svg-active:hover {
  --color: rgb(142, 142, 160);
  background: #e5e5e5;
}

.send .send-point {
  display: inline-block;
  cursor: default;
  font-size: 1.5rem;
  line-height: 1.5rem;
  color: rgb(142, 142, 160);
}

.send .send-point span {
  position: relative;
  bottom: 0.5rem;
}

.invisible {
  visibility: hidden;
}
</style>
