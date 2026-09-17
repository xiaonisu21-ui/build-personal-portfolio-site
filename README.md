# Build Personal Portfolio Site

一个把简历、项目材料与职业故事整理成双语个人网站的 Codex Skill。它不仅生成页面，也会先提炼证据、检查隐私，并输出可直接部署的静态文件。

> 仓库内的示例人物“林知夏”、经历、公司、案例、指标与肖像均为虚构或 AI 生成，仅用于展示模板能力，不对应任何真实个人。

[在线示例](https://xiaonisu21-ui.github.io/build-personal-portfolio-site/) · [安装 Skill](#安装) · [直接使用静态模板](#不安装-skill直接使用模板)

## 它能做什么

- 从简历、作品集与零散项目材料中提炼专业定位。
- 把能力写成有问题、方法、证据与结果的案例。
- 生成结构一致、语气自然的中英双语内容。
- 对手机号、邮箱、客户名、内部数据、密钥与本地路径做发布前检查。
- 输出无登录、无构建依赖、适配手机的静态网站。
- 支持个人真实网站、完全虚构演示和现有网站更新三种模式。

## 安装

将仓库克隆到个人 Skills 目录：

```bash
git clone https://github.com/xiaonisu21-ui/build-personal-portfolio-site.git ~/.codex/skills/build-personal-portfolio-site
```

在 Codex 中这样使用：

```text
$build-personal-portfolio-site 根据我的简历生成一个双语个人网站。隐藏手机号，案例脱敏，先给我预览，不要直接发布。
```

Skill 会先确认真实性与隐私边界，再生成网站并做发布检查。发布到 GitHub Pages 或其他平台属于单独步骤，只有在你明确同意后才执行。

## 不安装 Skill，直接使用模板

需要 Node.js 18 或更高版本。

```bash
node scripts/create_site.mjs --output my-portfolio
node scripts/validate_site.mjs my-portfolio
```

然后编辑 `my-portfolio/content.js`，替换 `demo-avatar.png`，用任意静态服务器预览即可。模板所有资源使用相对路径，可以部署到 GitHub Pages 的项目子路径。

## 仓库结构

```text
SKILL.md                       Skill 主工作流
agents/openai.yaml             Codex 界面元数据
assets/starter-site/           无构建依赖的双语网站模板
references/                    内容模型与隐私发布清单
scripts/create_site.mjs        创建一份可编辑网站
scripts/validate_site.mjs      网站结构与隐私扫描
docs/                          GitHub Pages 在线示例
promo/xiaohongshu/             小红书发布素材与文案
```

## 设计与隐私原则

1. 先证据、后包装，不为真实用户虚构经历或结果。
2. 默认不公开手机号、家庭住址、原始用户数据和内部经营信息。
3. 演示资料必须在页面上清晰标明为虚构或合成内容。
4. 作品案例重质量而非数量；让读者快速看见“问题—方法—结果”。
5. 公开网站不需要 ChatGPT 登录，也不包含临时访问令牌。

## English

This is an open-source Codex Skill for turning resumes and project evidence into a bilingual, privacy-aware portfolio website. The included profile, career history, case studies, metrics and portrait are entirely fictional or AI-generated demonstration content.

## License

MIT

