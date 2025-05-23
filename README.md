<h4 align="right">
  <strong>简体中文</strong> | <a href="https://github.com/simongino/bob-plugin-qwen-translator/blob/main/docs/README_EN.md">English</a>
</h4>

<div>
  <h1 align="center">Qwen Translator Bob Plugin</h1>
  <p align="center">
    <a href="https://github.com/simongino/bob-plugin-qwen-translator/releases" target="_blank">
        <img src="https://github.com/simongino/bob-plugin-qwen-translator/actions/workflows/release.yaml/badge.svg" alt="release">
    </a>
    <a href="https://github.com/simongino/bob-plugin-qwen-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/simongino/bob-plugin-qwen-translator?style=flat">
    </a>
    <a href="https://github.com/simongino/bob-plugin-qwen-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/badge/qwen-bob-orange?style=flat">
    </a>
    <a href="https://github.com/simongino/bob-plugin-qwen-translator/releases">
        <img alt="GitHub Repo stars" src="https://img.shields.io/badge/langurage-JavaScript-brightgreen?style=flat&color=blue">
    </a>
  </p>
</div>

## 简介

这是一个基于通义千问 API 的 Bob 翻译插件。Bob 社区版本目前缺乏基于大语言模型的翻译服务，这个插件填补了这个空白，为用户提供了更智能、更自然的翻译体验。

### 为什么选择这个插件？

- 基于大语言模型的翻译服务，翻译结果更加自然流畅
- 支持Bob社区版，版本要求 >= 0.50
- 支持文本润色功能，可以优化文本表达
- 响应速度快，采用最新的 Qwen-3.5 模型
- 安装配置简单，使用方便
- 完全免费，只需要自己的通义千问 API Key

### 特色功能

#### 智能翻译
利用通义千问强大的语言理解能力，提供更准确的翻译结果，特别适合处理长句和专业术语。

#### 文本润色
支持同语言间的文本优化，只需将目标语言设置为与源语言相同，即可获得更优美的表达方式。

### 语言模型

目前默认使用 `Qwen-3.5` 模型：
- 响应速度快，接近实时翻译体验
- 翻译质量优秀
- API 调用成本较低

更多模型详情请参考[官方模型对比](https://www.aliyun.com/product/dashscope)。

## 使用方法

1. 安装 [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (要求版本 >= 0.50)

2. 下载插件: [qwen-translator.bobplugin](https://github.com/simongino/bob-plugin-qwen-translator/releases/latest)

3. 安装插件：双击下载的 .bobplugin 文件

4. 获取 API Key：
   - 访问[通义千问控制台](https://console.aliyun.com/product/dashscope)
   - 注册/登录账号
   - 在控制台中获取 API Key

5. 配置插件：
   - 打开 Bob 偏好设置
   - 选择服务栏
   - 找到 Qwen Translator
   - 将获取的 API Key 填入配置框
   - 可选：配置自定义API URL和Path（如果需要使用代理或自定义端点）

6. 可选配置：
   - 安装 [PopClip](https://bobtranslate.com/guide/integration/popclip.html) 实现划词翻译
   - 配置快捷键，提高使用效率

## 致谢

本项目的诞生离不开以下优秀项目的启发：

- [bob-plugin-openai-translator](https://github.com/yetone/bob-plugin-openai-translator) - 提供了基础的项目架构和灵感
- [bob-plugin-claude-translator](https://github.com/jtsang4/bob-plugin-claude-translator) - 提供了优秀的功能实现参考

特别感谢这些项目的作者们对开源社区的贡献！
