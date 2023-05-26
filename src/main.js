import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router";
import 'element-plus/dist/index.css';
import './assets/global.css';
// import { ElMessage, ElMessageBox } from 'element-plus'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App);
app.use(router);
// app.use(ElMessage);//全局注册ElMessage 下面的注册包含ElMessage不用重复注册!
//国际化 https://element-plus.gitee.io/zh-CN/guide/i18n.html
// app.use(ElementPlus, {
//     locale: zhCn,
//   })
app.mount('#app')
