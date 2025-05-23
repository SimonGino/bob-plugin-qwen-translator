//@ts-check

var lang = require('./lang.js');

function supportLanguages() {
  return lang.supportLanguages.map(([standardLang]) => standardLang);
}

/**
 * @param {string} apiKey - The authentication API key.
 * @returns {{
 * "Authorization": string;
 * "Content-Type": string;
 * }} The header object.
 */
function buildHeader(apiKey) {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

/**
 * @param {Bob.TranslateQuery} query
 * @returns {{generatedSystemPrompt: string, generatedUserPrompt: string}}
 */
function generatePrompts (query)  {
 const SYSTEM_PROMPT = "You are an expert translator. Your task is to accurately translate the given text without altering its original meaning, tone, and style. Present only the translated result without any additional commentary.";

  let generatedSystemPrompt = null;
  const detectFrom =  query.detectFrom
  const detectTo =  query.detectTo
  const sourceLang = lang.langMap.get(detectFrom) || detectFrom;
  const targetLang = lang.langMap.get(detectTo) || detectTo;
  let generatedUserPrompt = `Please translate below text from ${sourceLang} to ${targetLang}. Present only the translated result without any additional commentary`;

  if (detectTo === "wyw" || detectTo === "yue") generatedUserPrompt = `翻译成${targetLang}，只呈现翻译结果,不需要任何额外的评论`;
  if (detectFrom === "wyw" || detectFrom === "zh-Hans" || detectFrom === "zh-Hant") {
    if (detectTo === "zh-Hant") {
      generatedUserPrompt = "翻译成繁体白话文，只呈现翻译结果,不需要任何额外的评论";
    } else if (detectTo === "zh-Hans") {
      generatedUserPrompt = "翻译成简体白话文，只呈现翻译结果,不需要任何额外的评论";
    } else if (detectTo === "yue") generatedUserPrompt = "翻译成粤语白话文，只呈现翻译结果,不需要任何额外的评论";
  }

  if (detectFrom === detectTo) {
    generatedSystemPrompt = "You are an expert text embellisher. Your sole purpose is to enhance and elevate the given text without altering its core meaning or intent. Please refrain from interpreting or explaining the text. Just give me the result. Present only the refined result without any additional commentary.";
    if (detectTo === "zh-Hant" || detectTo === "zh-Hans") {
      generatedUserPrompt = "润色此句，只呈现翻译结果,不需要任何额外的评论";
    } else {
      generatedUserPrompt = "polish this sentence. Present only the refined result without any additional commentary:";
    }
  }

  generatedUserPrompt = `${generatedUserPrompt}:\n\n${query.text}`

  return {
    generatedSystemPrompt: generatedSystemPrompt ?? SYSTEM_PROMPT,
    generatedUserPrompt
  };
}

/**
 * @param {string} model
 * @param {Bob.TranslateQuery} query
 * @param {boolean} isStream
 * @returns {{
 * model: string;
 * messages: {role: string; content: string}[];
 * stream: boolean;
 * }}
 */
function buildRequestBody(model, query, isStream) {
  const {generatedSystemPrompt, generatedUserPrompt} = generatePrompts(query);

  // prompt
  const replacePromptKeywords = (/** @type {string} */ prompt, /** @type {Bob.TranslateQuery} */ query) => {
      if (!prompt) return prompt;
      return prompt.replace("$text", query.text)
          .replace("$sourceLang", query.detectFrom)
          .replace("$targetLang", query.detectTo);
  }
  const customSystemPrompt = replacePromptKeywords($option.customSystemPrompt, query);
  const customUserPrompt = replacePromptKeywords($option.customUserPrompt, query);
  const systemPrompt = customSystemPrompt || generatedSystemPrompt;
  const userPrompt = customUserPrompt || generatedUserPrompt;

  $log.info(`System Prompt:${systemPrompt}\nUser Prompt:${userPrompt}`);

  // 优先使用自定义模型，如果未设置则使用预设模型
  const modelToUse = $option.customModel ? $option.customModel : (model || "qwen-plus");
  
  return {
    model: modelToUse,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    stream: isStream
  };
}

/**
 * @param {Bob.TranslateQuery} query
 * @param {Function} completion
 */
function translate(query, completion) {
  // Input validation
  if (!query || typeof query !== 'object') {
    return completion({
      error: {
        type: 'param',
        message: 'Invalid query object',
        addtion: 'Query must be a valid object',
      },
    });
  }

  if (!query.text || typeof query.text !== 'string' || query.text.trim() === '') {
    return completion({
      error: {
        type: 'param',
        message: 'Invalid input text',
        addtion: 'Input text must be a non-empty string',
      },
    });
  }

  if (!lang.langMap.get(query.detectTo)) {
      return completion({
          error: {
              type: 'unsupportLanguage',
              message: '不支持该语种',
              addtion: '不支持该语种',
          },
      });
  }

  const apiKey = $option.apiKey;
  if (!apiKey) {
    return completion({
      error: {
        type: 'param',
        message: '请先配置 API Key',
        addtion: '请在插件配置中填写 API Key',
      },
    });
  }

  const isStream = $option.request_mode === 'stream';
  const model = $option.model;
  const header = buildHeader(apiKey);
  const body = buildRequestBody(model, query, isStream);

  if (isStream) {
    handleStreamRequest(query, header, body);
  } else {
    handleNormalRequest(query, completion, header, body);
  }
}

/**
 * 处理普通请求
 * @param {Bob.TranslateQuery} query
 * @param {Function} completion
 * @param {Object} header
 * @param {Object} body
 */
function handleNormalRequest(query, completion, header, body) {
  (async () => {
    try {
      // 使用自定义API URL或默认URL
      const apiBaseUrl = $option.apiUrl || 'https://dashscope.aliyuncs.com';
      const apiUrlPath = $option.apiUrlPath || '/compatible-mode/v1/chat/completions';
      const apiUrl = `${apiBaseUrl}${apiUrlPath}`;
      
      const response = await $http.request({
        method: 'POST',
        url: apiUrl,
        header,
        body,
      });

      if (response.error || response.data.error) {
        handleError(query, completion, response);
        return;
      }

      const data = response.data;
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        completion({
          error: {
            type: 'api',
            message: '未获取到有效的翻译结果',
            addtion: JSON.stringify(response),
          },
        });
        return;
      }

      const translatedText = data.choices[0].message.content;
      completion({
        result: {
          from: query.detectFrom,
          to: query.detectTo,
          toParagraphs: [translatedText],
        },
      });
    } catch (err) {
      $log.error(`Request error: ${err}`);
      completion({
        error: {
          type: 'unknown',
          message: err.message || '未知错误',
          addtion: err.stack || '',
        },
      });
    }
  })();
}

/**
 * @param {Bob.TranslateQuery} query
 * @param {Function} completion
 * @param {{response?: {statusCode: number}, data?: Object}} result
 * @returns {void}
 */
function handleError(query, completion, result) {
  let errorMessage = '接口响应错误';
  /** @type {"param" | "api"} */
  let errorType = 'api';

  if (result.data && result.data.error) {
    errorMessage = result.data.error.message || result.data.error.msg || errorMessage;
    errorType = result.data.error.code === 'InvalidApiKey' || result.data.error.code === 'InvalidToken' ? 'param' : 'api';
  }

  $log.error(`Translation error: ${errorMessage}. Full response: ${JSON.stringify(result)}`);

  completion({
    error: {
      type: errorType,
      message: errorMessage,
      addtion: JSON.stringify(result),
    },
  });
}

/**
 * 解析流事件数据
 * @param {string} line 从流中接收到的一行数据
 * @returns {Object|null} 解析后的数据对象或null
 */
function parseStreamData(line) {
  try {
    if (!line.trim() || line === 'data: [DONE]') return null;
    const match = line.match(/^data: (.+)$/);
    if (!match) return null;
    return JSON.parse(match[1]);
  } catch (err) {
    return null;
  }
}

/**
 * @param {Bob.TranslateQuery} query
 * @param {string} targetText
 * @param {string} responseObj
 * @returns {string}
 */
function handleResponse(query, targetText, responseObj) {
  let resultText = targetText;

  try {
    // @ts-ignore
    const { type, delta, index } = responseObj;

    // 根据事件类型处理逻辑
    switch (type) {
      case 'content_block_start':
        // 如有必要，处理 content_block_start 事件
        break;
      case 'content_block_delta':
        // 处理文本变化
        if (delta && delta.type === 'text_delta') {
          resultText += delta.text;
        }
        query.onStream({
          result: {
            from: query.detectFrom,
            to: query.detectTo,
            toParagraphs: [resultText],
          },
        });
        break;
      case 'content_block_stop':
        // 如有必要，处理 content_block_stop 事件
        break;
      case 'message_start':
        // 如有必要，处理 message_start 事件
        break;
      case 'message_delta':
        // 可以在此处理停止原因等 message_delta 信息
        break;
      case 'message_stop':
        // 当消息流停止时，完成处理
        query.onCompletion({
          result: {
            from: query.detectFrom,
            to: query.detectTo,
            toParagraphs: [resultText],
          },
        });
        break;
      default:
        // 对无法识别的事件类型不做处理
        break;
    }
    return resultText;
  } catch (err) {
    // 错误处理
    query.onCompletion({
      error: {
        type: err._type || 'param',
        message: err.message || 'JSON 解析错误',
        // @ts-ignore
        addition: err._addition,
      },
    });
    return resultText;
  }
}

/**
 * 处理流式请求
 * @param {Bob.TranslateQuery} query
 * @param {Object} header
 * @param {Object} body
 */
function handleStreamRequest(query, header, body) {
  let targetText = '';

  (async () => {
    try {
      // 使用自定义API URL或默认URL
      const apiBaseUrl = $option.apiUrl || 'https://dashscope.aliyuncs.com';
      const apiUrlPath = $option.apiUrlPath || '/compatible-mode/v1/chat/completions';
      const apiUrl = `${apiBaseUrl}${apiUrlPath}`;
      
      await $http.streamRequest({
        method: 'POST',
        url: apiUrl,
        header,
        body,
        streamHandler: (streamData) => {
          try {
            const lines = streamData.text.split('\n');
            for (const line of lines) {
              const data = parseStreamData(line);
              if (!data || !data.choices || !data.choices[0]) continue;

              const choice = data.choices[0];
              if (choice.delta && choice.delta.content) {
                targetText += choice.delta.content;
                query.onStream({
                  result: {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: [targetText],
                  },
                });
              }
            }
          } catch (err) {
            $log.error(`Stream data parse error: ${err}`);
          }
        },
        handler: (result) => {
          if (result.error) {
            handleError(query, query.onCompletion, result);
            return;
          }
          
          if (!targetText) {
            query.onCompletion({
              error: {
                type: 'api',
                message: '未获取到有效的翻译结果',
                addtion: JSON.stringify(result),
              },
            });
            return;
          }
          
          query.onCompletion({
            result: {
              from: query.detectFrom,
              to: query.detectTo,
              toParagraphs: [targetText],
            },
          });
        },
      });
    } catch (err) {
      query.onCompletion({
        error: {
          type: 'unknown',
          message: err.message || '未知错误',
          addtion: err.stack || '',
        },
      });
    }
  })();
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;