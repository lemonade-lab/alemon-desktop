## AlemonJS

### 开发

Node.js V18.18.2

- 源码

```sh
git clone --depth=1 -b main git@github.com:bietiaop/Alemon-Desktop.git
```

- 依赖

```sh
npm install pnpm -g
```

```sh
pnpm install
```

- 启动

```sh
pnpm dev
```

### 部署

- 编译

```sh
pnpm build
```

### 说明

**务必使用 Eslint 进行代码格式约束检查**

css 请使用 tailwindcss

除修改 antd 样式外，尽量避免使用自定义 css 文件

公共 tailwindcss 样式文件在 `src/index.scss` 中声明
