## publish

npm publish --access=public

## 本地调试 build 文件

> https://reactjs.org/warnings/invalid-hook-call-warning.html

npm link {testAppRoot}/node_module/react

npm link

在你的测试项目中

npm link dataview

在 package.json 中写入依赖
"dataview": "^1.0.0"

然后在你使用的 tsx 里即可使用

## 本地开发

```
npm run test:nowatch
```
