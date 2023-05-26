<template>
  <div class="index">
    <h1 :style="screenWidth <= 768 ? `margin-right:0;` : `margin-top: 20vh;`">
        Aoung AI
    </h1>
    <div class="msg" :style="screenWidth >= 768 ? `flex-direction: row;` : ''">
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
        <div @click="question = 'Got any creative ideas for a 10 year old’s birthday?'">
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
        <div>May occasionally produce harmful instructions or biased content</div>
        <div>Trained to decline inappropriate requests</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const question = inject("question"); //问题
const screenWidth = inject("screenWidth");// 屏幕宽度
</script>

<style scoped>
@media (width >= 768px) {
  .index h1 {
    margin-top: 20vh;
  }

  .msg.msg {
    flex-direction: row;
  }
}

.index {
  text-align: center;
  margin: 0 auto;
  max-width: 768px;
  /* height:100vh; */
}

.index h1 {
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  color: rgb(52, 53, 65);
  margin-right:54px;
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

.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  /*设置图标居中显示*/
  vertical-align: middle;
}
</style>
