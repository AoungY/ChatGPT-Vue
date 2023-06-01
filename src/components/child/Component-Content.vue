<template>
  <div v-for="(item, index) in showData" :key="index" class="content">
    <el-row v-if="item.value.role === 'user'" class="user-content">
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
        <component-switchover
          v-show="
            structure[structure[item.structure_index][0]].length - 1 >= 2 &&
            screenWidth > 992 &&
            !isReadonly.includes(index)
          "
          :item="item"
          :structure="structure"
          :nowIndex="nowIndex"
          :switchover="switchover"
        >
        </component-switchover>
      </el-col>
      <el-col :xs="20" :sm="20" :md="18" :lg="16" :xl="12">
        <div class="d1">
          <div class="user-img grid-content ep-bg-purple">
            <img
              src="../../assets/img/user.webp"
              style="width: 30px; height: 30px; border-radius: 10%"
            />
          </div>
          <div class="pre-user-textarea">
            <el-input
              v-model="item.value.markdown"
              autosize
              resize="none"
              :readonly="!isReadonly.includes(index)"
              type="textarea"
              class="user-textarea"
            />

            <component-switchover
              class="switchoverPhone"
              v-show="
                structure[structure[item.structure_index][0]].length - 1 >= 2 &&
                screenWidth <= 992 &&
                !isReadonly.includes(index)
              "
              :item="item"
              :structure="structure"
              :nowIndex="nowIndex"
              :switchover="switchover"
            >
            </component-switchover>
            <div class="buttons" v-show="isReadonly.includes(index)">
              <el-button
                id="edit-button"
                type="success"
                color="#10A37F"
                @click="Submit(index, item.structure_index)"
                :class="streamData ? 'streamDataTrueSubmit' : 'streamDataFalseSubmit'"
                >Save & Submit</el-button
              >
              <el-button id="cancel-button" @click="Cancel(index)">Cancel</el-button>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
        <el-icon
          @click="userSvgClick(index)"
          class="IconEdit"
          size="18"
          :style="screenWidth <= 1022 ? 'display:block;' : ''"
          v-show="!isReadonly.includes(index)"
          ><Edit
        /></el-icon>
        <div />
      </el-col>
    </el-row>

    <el-row v-else class="ai-content">
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
        <component-switchover
          v-show="
            structure[structure[item.structure_index][0]].length - 1 >= 2 &&
            screenWidth > 992 &&
            !isReadonly.includes(index)
          "
          :item="item"
          :structure="structure"
          :nowIndex="nowIndex"
          :switchover="switchover"
        >
        </component-switchover>
      </el-col>

      <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="12">
        <div class="d1">
          <div>
            <div class="ai-img">
              <img src="../../assets/svg/logo-svg.svg" />
            </div>
          </div>
          <div ref="userTextarea" class="text" v-html="item.value.markdown"></div>

        </div>
        <component-switchover
            class="switchoverPhone"
            style="padding-top: 0px;margin-left:52px;margin-bottom:15px;"
            v-show="
              structure[structure[item.structure_index][0]].length - 1 >= 2 &&
              screenWidth <= 992 &&
              !isReadonly.includes(index)
            "
            :item="item"
            :structure="structure"
            :nowIndex="nowIndex"
            :switchover="switchover"
          >
          </component-switchover>
      </el-col>
      <el-col :xs="1" :sm="1" :md="3" :lg="4" :xl="6">
        <div />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { Edit } from "@element-plus/icons-vue";
import ComponentSwitchover from "./Component-Switchover.vue"; //不知为何 提示重复导入


const chatHistory = inject("chatHistory");
const history = inject("history");
const structure = inject("structure"); //结构化数据
const showData = inject("showData");
const updataShowdata = inject("updataShowdata"); //更新showData
const activeIndex = inject("activeIndex");
const streamData = inject("streamData");
const screenWidth = inject("screenWidth");
const emit = defineEmits(["contentSend"]);

/* 当点击按钮.user-content svg时 多行文本域.user-textarea变成可编辑 */
const isReadonly = ref([]);
const userSvgClick = (index) => {
  if (!isReadonly.value.includes(index)) isReadonly.value.push(index);
};


const Submit = (index, structure_index) => {
  if (streamData.value) return; //如果正在请求中 则不允许再次提交
  //从isReadonly中删除index这个元素值
  isReadonly.value.splice(isReadonly.value.indexOf(index), 1);
  console.log("showData", showData.value, index, structure_index);
  history.value.push({
    role: "user",
    content: showData.value[index].value.markdown,
    markdown: showData.value[index].value.markdown,
  });
  history.value.push({ role: "ai", content: "" });

  structure.value.push([structure.value[structure_index][0], structure.value.length + 1]);
  structure.value[structure.value[structure_index][0]].push(structure.value.length - 1);
  structure.value.push([structure.value.length - 1]);

  showData.value[index].value.markdown = showData.value[index].value.content; //将编辑的内容还原
  chatHistory.value[activeIndex.value].tail = structure.value.length - 1;

  emit("contentSend");
};

const Cancel = (index) => {
  //从isReadonly中删除index这个元素值
  isReadonly.value.splice(isReadonly.value.indexOf(index), 1);
  history.value[index].markdown = history.value[index].content;
};

//返回当前是第几个
const nowIndex = (structureIndex) => {
  let structureParent = structure.value[structure.value[structureIndex][0]];
  for (let i = 1; i < structureParent.length; i++) {
    if (structureParent[i] == structureIndex) return i;
  }
};

//切换
const switchover = (structureIndex, offset) => {
  let now_index = nowIndex(structureIndex);

  let structureParent = structure.value[structure.value[structureIndex][0]];
  if (now_index + offset >= structureParent.length || now_index + offset <= 0) return;
  let tail = structureParent[now_index + offset];

  while (structure.value[tail].length != 1) tail = structure.value[tail][1];
  chatHistory.value[activeIndex.value].tail = tail;
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value)); //持久化用户的当前对话信息在哪
  updataShowdata();
};
</script>

<style scoped>
.content {
  font-size: 1rem;
  color: rgb(52, 53, 65);
}

.content .d1 {
  gap: 1.5rem;
  padding: 1.5rem 0 1.5rem 0;
  display: flex;
}
.d1 .text {
  padding: 0.25rem 0 0.75rem 0;
  overflow-x: auto;
}

/* 选择text类的第一个子元素 */

:deep(.text p:first-child) {
  margin-top: 0px;
}
:deep(.text p:last-child) {
  margin-bottom: 0px;
}

.ai-img {
  width: 30px;
  height: 30px;
  overflow: hidden;
  /* 设置背景色为绿色 且沉在svg下面 */
  background-color: #43aa8b;
  /* 圆角 */
  border-radius: 10%;
  margin-top: 5px;
}

.ai-img img {
  margin-left: 3px;
  margin-right: 3px;
  width: calc(100% - 6px);
  height: 100%;
}

/* .ai-img svg {
  设置图标水平垂直居中显示 基于父类ai-img
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  display: flex;
  align-items: center;
  justify-content: center; 
} */

.ai-content {
  background-color: rgb(247, 247, 248);
  border: rgba(0, 0, 0, 0.1) solid 1px;
  border-right-width: 0px;
  border-left-width: 0px;
  /* 设置行高 */
  line-height: 1.5rem;
  /* 设置文字垂直对齐方式为靠上方 */
  vertical-align: top;
}

.IconEdit {
  padding: 1.5rem 0 1.5rem 0.5rem;
  display: none;
  --color: rgb(186, 186, 181);
  color: var(--color);
}
.IconEdit svg {
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
}

.user-content:hover .IconEdit {
  display: block;
}
.IconEdit svg:hover {
  background: #e5e5e5;
  color: rgb(142, 142, 160);
}

:deep(.user-textarea .el-textarea__inner) {
  font-size: 1rem;
  color: rgb(52, 53, 65);
  line-height: 1.5rem;
  padding: 0px;
}

.pre-user-textarea {
  width: 100%;
}

.buttons {
  display: flex;
  /* 居中 */
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

#edit-button {
  width: 115.75px;
  height: 37.33px;
}

.streamDataFalseSubmit:hover {
  background-color: #1a7f64;
}
.streamDataTrueSubmit {
  opacity: 0.5;
  cursor: not-allowed;
}

#cancel-button {
  color: black;
  width: 68.02px;
  height: 37.33px;
}

#cancel-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #dcdfe6;
}
</style>
