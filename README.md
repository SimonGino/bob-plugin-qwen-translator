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

这是一个基于 OpenAI 格式 API 的 Bob 翻译插件，默认使用通义千问 API。该插件支持所有兼容 OpenAI 格式的大语言模型，为用户提供智能、自然的翻译体验。

### 为什么选择这个插件？

- 支持所有兼容 OpenAI 格式的大语言模型
- 默认配置为通义千问 API，无需额外设置
- 兼容 Bob 商店版和社区版
- 支持文本润色功能，可以优化文本表达
- 安装配置简单，使用方便
- 完全免费，只需要自己的 API Key

### 版本兼容性

| Bob 版本 | 兼容性 | 特性支持 |
|---------|------|--------|
| Bob 社区版 | ✓ 支持 | - 版本要求 >= 0.50<br>- 不支持流式响应 |
| Bob 商店版 | ✓ 支持 | - 完整支持所有功能<br>- 支持流式响应<br>- 支持自定义 API URL、模型等参数 |

### 特色功能

#### 智能翻译
利用大语言模型强大的语言理解能力，提供更准确的翻译结果，特别适合处理长句和专业术语。

#### 文本润色
支持同语言间的文本优化，只需将目标语言设置为与源语言相同，即可获得更优美的表达方式。

#### 模型灵活性
- 默认使用通义千问 API（`qwen-plus`）
- 可自定义使用任何兼容 OpenAI 格式的模型
- 可配置自定义 API URL 和 Path，支持使用代理或自托管模型

## 使用方法

1. 安装 [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85)
   - 社区版要求版本 >= 0.50
   - 商店版完整支持所有功能

2. 下载插件: [qwen-translator.bobplugin](https://github.com/simongino/bob-plugin-qwen-translator/releases/latest)

3. 安装插件：双击下载的 .bobplugin 文件

4. 获取 API Key：
   - 默认使用通义千问 API：访问[通义千问控制台](https://console.aliyun.com/product/dashscope)
   - 也可使用其他兼容 OpenAI 格式的 API

5. 配置插件：
   - 打开 Bob 偏好设置
   - 选择服务栏
   - 找到 Qwen Translator
   - 将获取的 API Key 填入配置框
   - 可选：配置自定义 API URL 和 Path（如果需要使用代理或其他模型）
   - 可选：选择或自定义模型

6. 可选配置：
   - 安装 [PopClip](https://bobtranslate.com/guide/integration/popclip.html) 实现划词翻译
   - 配置快捷键，提高使用效率

## 致谢

本项目的诞生离不开以下优秀项目的启发：

- [bob-plugin-openai-translator](https://github.com/yetone/bob-plugin-openai-translator) - 提供了基础的项目架构和灵感
- [bob-plugin-claude-translator](https://github.com/jtsang4/bob-plugin-claude-translator) - 提供了优秀的功能实现参考

特别感谢这些项目的作者们对开源社区的贡献！
