<template>
  <div class="switchover">
    <svg
      @click="switchover(item.structure_index, -1)"
      :class="nowIndex(item.structure_index) == 1 ? 'switchoverHidden' : ''"
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
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
    <span class="flex-grow flex-shrink-0"
      >{{ nowIndex(item.structure_index) }} /
      {{ structure[structure[item.structure_index][0]].length - 1 }}</span
    >
    <svg
      @click="switchover(item.structure_index, 1)"
      :class="
        nowIndex(item.structure_index) ==
        structure[structure[item.structure_index][0]].length - 1
          ? 'switchoverHidden'
          : ''
      "
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
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  nowIndex: Object,
  structure: Object,
  item: Object,
  switchover: Object,
});
</script>

<style scoped>
.switchover {
  display: flex;
  /* 位于父元素的右边 */
  margin-left: auto;
  align-items: center;

  gap: 0.25rem;
  padding-top: 38px;
  /* margin-right: 10px; */
  width: 70px;
  height: 16px;
  font-size: 0.75rem;
  line-height: 1rem;
}

.switchoverHidden.switchoverHidden {
  cursor: default;
  /* 透明度 */
  opacity: 0.5;
}
.switchoverPhone {
  margin-right: auto;
  margin-left: 0;

}

.switchover svg {
  cursor: pointer;
}
</style>
