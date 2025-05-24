<h4 align="right">
  <a href="https://github.com/simongino/bob-plugin-qwen-translator/blob/main/README.md">简体中文</a> | <strong>English</strong>
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

## Introduction

This is a Bob translation plugin based on OpenAI format API, using Qwen API by default. The plugin supports all large language models compatible with OpenAI format, providing intelligent and natural translation experiences.

### Why Choose This Plugin?

- Supports all language models compatible with OpenAI format
- Default configuration uses Qwen API, no additional setup needed
- Compatible with both Bob Store and Community versions
- Text polishing feature for expression optimization
- Easy installation and configuration
- Completely free to use with your own API Key

### Version Compatibility

| Bob Version | Compatibility | Features |
|-------------|--------------|----------|
| Bob Community | ✓ Supported | - Version requirement >= 0.50<br>- No streaming response support |
| Bob Store | ✓ Supported | - Full feature support<br>- Streaming response support<br>- Custom API URL, model parameters, etc. |

### Key Features

#### Smart Translation
Leverages the powerful language understanding capabilities of large language models for more accurate translations, especially suitable for long sentences and technical terms.

#### Text Polishing
Supports text optimization within the same language - just set the target language to match the source language for improved expression.

#### Model Flexibility
- Uses Qwen API by default (`qwen-plus`)
- Can be customized to use any model compatible with OpenAI format
- Configurable custom API URL and Path, supporting proxies or self-hosted models

## Usage

1. Install [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85)
   - Community version requires version >= 0.50
   - Store version fully supports all features

2. Download plugin: [qwen-translator.bobplugin](https://github.com/simongino/bob-plugin-qwen-translator/releases/latest)

3. Install plugin: Double-click the downloaded .bobplugin file

4. Get API Key:
   - For default Qwen API: Visit [Qwen Console](https://console.aliyun.com/product/dashscope)
   - You can also use other APIs compatible with OpenAI format

5. Configure plugin:
   - Open Bob Preferences
   - Select Services tab
   - Find Qwen Translator
   - Enter your API Key in the configuration box
   - Optional: Configure custom API Base URL and Path (if using proxies or other models)
   - Optional: Select or customize the model

6. Optional setup:
   - Install [PopClip](https://bobtranslate.com/guide/integration/popclip.html) for text selection translation
   - Configure hotkeys for improved efficiency

## Acknowledgments

This project was inspired by these excellent projects:

- [bob-plugin-openai-translator](https://github.com/yetone/bob-plugin-openai-translator) - Provided the foundational architecture and inspiration
- [bob-plugin-claude-translator](https://github.com/jtsang4/bob-plugin-claude-translator) - Offered excellent functional implementation references

Special thanks to the authors of these projects for their contributions to the open source community!
