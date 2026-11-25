# 王启月的个人主页

[访问主页](https://wangqiyue26-lab.github.io/)

主页基于 [PRISM](https://github.com/xyjoey/PRISM)，展示教育经历、项目与实习、专业技能、社会实践和荣誉奖项。

## 更新主页

- `content/config.toml` 管理个人资料和导航。
- `content/bio.md` 和 `content/skills.md` 分别维护简介和技能。
- `content/education.toml`、`projects.toml`、`experience.toml`、`awards.toml` 分别维护教育、项目、实践和荣誉。
- `public/portrait.png` 是主页头像。

## 本地预览

使用 Node.js 22 或更高版本。

```bash
npm ci
npm run dev
```

打开 [本地预览](http://localhost:3000)。`npm run build` 将网站静态导出到 `out/`。向 `main` 推送改动后，GitHub Actions 会构建并部署到 GitHub Pages。

模板代码使用 [MIT 许可证](LICENSE)。
