<template>
  <div></div>
</template>

<script setup>

  chatHistory.value.push({
    title: "测试0",
    history: [
    {role:"user",content:"Python 学习路线"},{role:"ai",content:"1. 基础语法：学习 Python 的基本语法，包括变量、数据类型、运算符、条件语句、循环语句、函数等。 2. 数据结构和算法：学习 Python 中的常用数据结构，如列表、元组、字典、集合等，以及常用算法，如排序、查找、递归等。 3. 文件操作和模块：学习 Python 中的文件操作和模块，包括读写文件、导入模块、创建自己的模块等。 4. Web 开发：学习 Python 中的 Web 开发框架，如 Flask、Django 等，以及相关的 HTML、CSS、JavaScript 等前端技术。 5. 数据库操作：学习 Python 中的数据库操作，如 MySQL、SQLite、MongoDB 等，以及相关的 SQL 语言。 6. 爬虫和数据分析：学习 Python 中的爬虫和数据分析，包括爬取网页数据、数据清洗、数据可视化等。 7. 机器学习和人工智能：学习 Python 中的机器学习和人工智能，包括常用的机器学习算法、深度学习框架等。 8. 其他应用领域：学习 Python 在其他应用领域的应用，如科学计算、自然语言处理、图像处理等。 以上是 Python 学习的基本路线，具体的学习内容和深度可以根据个人兴趣和需求进行调整。"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    ],
  });
  chatHistory.value.push({
    title: "测试1",
    history: [
    {role:"user",content:"你好1"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    ],
  });
  chatHistory.value.push({
    title: "测试2",
    history: [
    {role:"user",content:"你好2"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    ],
  });
  chatHistory.value.push({
    title: "测试3",
    history: [
    {role:"user",content:"你好3"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    {role:"user",content:"你好0"},{role:"ai",content:"你好，我是ChatGPT"},
    ],
  });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
</script>

<style scoped></style>
