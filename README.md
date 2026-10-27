# 灵跃健康官网

灵跃智能戒指官网的多版本静态站点。当前仓库保留三个设计阶段的入口：

- `V1`：初版，以产品结构为主的官网
- `V2`：第二版，沉浸式首屏与全维 App 展示
- `V3`：第三版，基于 V2 继续迭代（开发中）

线上入口：`https://scamille2823-boop.github.io/lingyue-official-site/`

## 本地运行

```bash
npm ci
npm run dev
```

生产构建：

```bash
npm run build
```

## 版本管理

- `main`：当前开发版本
- `v1.0.0`：第一版源码
- `v2.0.0`：第二版源码

版本页面由 GitHub Actions 自动构建到同一个 Pages 站点的 `/v1/`、`/v2/`、`/v3/` 子路径，根目录为版本入口页。

## 目录

```text
src/                 当前版本源码
public/              当前版本静态资源
scripts/postbuild.mjs 子路径资源修正与版本切换入口注入
versions/index.html  版本入口页
.github/workflows/    Pages 部署流程
```

## 说明

本项目为品牌官网展示站点，不含后端接口、用户数据或密钥配置。仓库内仅保留网站运行所需的代码与图片；产品规格书、设计源文件、竞品资料等内部素材不进入本仓库。

代码、品牌标识与产品图片归昊克云智（杭州）科技有限公司所有，未经授权不得用于商业用途。
