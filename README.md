# React + TypeScript + Vite
基础模板项目，用于快速搭建项目（已在vite demo的基础上进行了API，Router，等封装，已在自建后台项目中使用）

## 项目结构
```
|-- src
    |-- components # 组件文件夹
    |-- configs # 项目配置
    |-- pages # 项目配置
        |-- Home # 主页
        |-- Layout # 外侧容器组件 （可移除）
        |-- NoMatch # 404组件 （可移除）
    |-- request # 存放请求文件配置
        |-- cards # 示例请求
        |-- http.ts # 请求库的基础封装，带拦截器
        |-- types.ts # 请求返回的状态码的字典
    |-- routes # 路由配置
    |-- styles # 公用样式
        |-- reset.css # 重置样式
    |-- utils # 工具类

```
## 如何启动
建议直接使用`pnpm`安装
```bash
$ pnpm i
$ npm run dev
```