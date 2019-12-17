# dotenv-cascade

根据 [dotenv 文件优先级](https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use)级联重写 `.env*` 中的环境变量

## 安装

```bash
npm i dotenv-cascade
```

## 用法

```javascript
import { cascade } from 'dotenv-cascade';

// 默认使用项目根目录中的 .env* 文件
cascade();
```

通过[测试用例](./test/cascade.test.ts)来查看详细用法
