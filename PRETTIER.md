# Prettier 代码格式化配置

本项目已配置 Prettier 用于统一代码格式。

## 📋 配置说明

### 配置文件

- **`.prettierrc`** - Prettier 格式化规则配置
- **`.prettierignore`** - 忽略格式化的文件和目录

### 格式化规则

- **分号**: 使用分号 (`semi: true`)
- **引号**: 使用双引号 (`singleQuote: false`)
- **行宽**: 100 字符 (`printWidth: 100`)
- **缩进**: 2 个空格 (`tabWidth: 2`)
- **尾随逗号**: ES5 兼容 (`trailingComma: "es5"`)
- **箭头函数参数**: 总是使用括号 (`arrowParens: "always"`)
- **行尾**: LF (`endOfLine: "lf"`)

## 🚀 使用方法

### 格式化所有文件

```bash
npm run format
```

### 检查格式（不修改文件）

```bash
npm run format:check
```

### 格式化特定文件

```bash
npx prettier --write src/components/YourComponent.tsx
```

### 格式化特定目录

```bash
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
```

## 🔧 编辑器集成

### VS Code

1. 安装 [Prettier 扩展](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. 在设置中启用 "Format On Save"
3. 设置 Prettier 为默认格式化工具

**设置示例** (`settings.json`):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm / IntelliJ IDEA

1. 打开 `Settings` → `Languages & Frameworks` → `JavaScript` → `Prettier`
2. 选择 Prettier 包路径（通常是 `node_modules/prettier`）
3. 启用 "On save" 选项

## 🔗 ESLint 集成

项目已配置 `eslint-config-prettier`，它会自动禁用与 Prettier 冲突的 ESLint 规则。

## 📝 忽略文件

以下文件和目录会被 Prettier 忽略（见 `.prettierignore`）：

- `node_modules/`
- `.next/`, `out/`, `build/`, `dist/`
- 锁文件 (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`)
- 环境变量文件 (`.env*`)
- 生成的文件

## 💡 最佳实践

1. **提交前格式化**: 在提交代码前运行 `npm run format`
2. **CI/CD 检查**: 在 CI/CD 流程中添加 `npm run format:check`
3. **编辑器自动格式化**: 启用编辑器的 "Format On Save" 功能
4. **团队统一**: 确保团队成员都使用相同的 Prettier 配置

## 🐛 常见问题

### Prettier 和 ESLint 冲突

如果遇到 Prettier 和 ESLint 规则冲突，确保：
1. 已安装 `eslint-config-prettier`
2. 在 ESLint 配置中正确引入了 Prettier 配置

### 某些文件没有被格式化

检查 `.prettierignore` 文件，确认文件没有被忽略。

### 格式化后代码不符合预期

检查 `.prettierrc` 配置文件，根据项目需求调整规则。

## 📚 更多资源

- [Prettier 官方文档](https://prettier.io/docs/en/)
- [Prettier 配置选项](https://prettier.io/docs/en/options.html)
- [ESLint 与 Prettier 集成](https://prettier.io/docs/en/integrating-with-linters.html)

