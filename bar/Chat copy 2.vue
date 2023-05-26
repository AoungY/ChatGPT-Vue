<template>
  <div v-on:blur="handleBlur"></div>
  <input v-on:blur="handleBlur" />
</template>

<script>
export default {
  methods: {
    handleBlur() {
      // 在这里执行你想要的操作
      console.log("失去焦点");
    },
  },
};
</script>

<style scoped>
div{
  width: 300px;
  height: 300px;
  background-color: black;
}

</style>
