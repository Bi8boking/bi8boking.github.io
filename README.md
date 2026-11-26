# 王启月的个人主页

[访问主页](https://wangqiyue26-lab.github.io/)

主页基于 [PRISM](https://github.com/xyjoey/PRISM)，布局参考 [Shuang Zeng 的主页](https://stevezs315.github.io/)和 [academic-homepage](https://github.com/luost26/academic-homepage)。

## 更新主页

- `content/config.toml` 管理个人资料和导航。
- `content/bio.md` 和 `content/skills.md` 分别维护简介和技能。
- `content/education.toml`、`projects.toml`、`experience.toml`、`awards.toml` 分别维护教育、项目、实践和荣誉。
- 导航项可用 `home_column = "left"` 或 `home_column = "right"` 将教育、项目、荣誉、技能等栏目放进首页双栏。
- 中文内容放在 `content/`，英文内容放在 `content_en/` 的同名文件。`content/config.toml` 的 `[i18n]` 管理默认语言。

## 本地预览

使用 Node.js 22 或更高版本。

```bash
npm ci
npm run dev
```

打开 [本地预览](http://localhost:3000)。`npm run build` 将网站静态导出到 `out/`。向 `main` 推送改动后，GitHub Actions 会构建并部署到 GitHub Pages。

模板代码使用 [MIT 许可证](LICENSE)。
