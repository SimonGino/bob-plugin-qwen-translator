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

[Bob](https://bobtranslate.com/) plugin based on [Qwen API](https://console.aliyun.com/product/dashscope). Has translation and retouching functions.

### Polishing

You can use the Qwen API to polish and syntactically modify sentences, you just need to set the target language to be the same as the source language.

### Language Model

[Model Comparison in official website](https://www.aliyun.com/product/dashscope)
* `Qwen 3.5` (default): Fastest and most compact model for near-instant responsiveness

## Usage


1. Install [Bob](https://bobtranslate.com/guide/#%E5%AE%89%E8%A3%85) (version >= 0.50), a translation and OCR software for the macOS platform

2. Download this plugin: [qwen-translator.bobplugin](https://github.com/simongino/bob-plugin-qwen-translator/releases/latest)

3. Install this plugin

4. Get your access key from [Qwen](https://console.aliyun.com/product/dashscope)

5. Enter the API KEY in Bob Preferences > Services > This plugin configuration interface's API KEY input box

6. (Optional) Install [PopClip](https://bobtranslate.com/guide/integration/popclip.html) to achieve the floating icon appearing near the mouse after selecting words

## Thanks

This repository is based on the excellent [bob-plugin-openai-translator](https://github.com/yetone/bob-plugin-openai-translator) from [yetone](https://github.com/yetone) This is an adaptation of the Claude API based on the source code, thanks to the excellent contribution of the original author.
