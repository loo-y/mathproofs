import OpenAI from 'openai';
import 'dotenv/config';

// https://help.aliyun.com/zh/model-studio/qwen-omni
// 模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
const modelName = `qwen-omni-turbo`;
const recognizePrompt = `作为一个专业的图像识别与文字转换专家，你的任务是将给定的图片中的内容准确地从图片形式转换成可编辑的文字。\
请专注于识别图片中出现的所有数学相关的题目文本，保持其原始格式不变，不对其进行任何形式的加工、处理或解答。\
请忽略图片中的手写内容，这些手写内容可能是回答的解题过程，可能是错误的内容。\
确保最终输出的文字版本忠实地反映了图片中的所有数学题信息。如果可能的话，尽量保留图片中的数学公式、符号和排版格式，可以使用 lean 4 格式。\
请注意，你的目标是将图片中的内容转换为文字，而不是对其进行任何形式的分析或解答。`;

let openaiInstance: OpenAI | null = null;

const getOpenaiInstance = () => {
	console.log(`DASHSCOPE_API_KEY`, process.env.DASHSCOPE_API_KEY);
	if (!process?.env?.DASHSCOPE_API_KEY) return null;
	// 需要返回一个 OpenAI 实例，如果已经创建过实例，可以直接返回
	if (!openaiInstance) {
		openaiInstance = new OpenAI({
			// 若没有配置环境变量，请用阿里云百炼API Key将下行替换为：apiKey: "sk-xxx",
			apiKey: process.env.DASHSCOPE_API_KEY,
			baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
		});
	}

	return openaiInstance;
};

// 识别图片 by qwen-omni-turbo
export const recognizeImage = async (base64ImageWithFileType: string) => {
	const openaiInstance = getOpenaiInstance() as OpenAI;
	if (!openaiInstance) {
		return {
			status: false,
			msg: `Please set API KEY for qwen omni.`, // please set API KEY
		};
	}

	let imageToText = ``;
	try {
		const completion = await openaiInstance.chat.completions.create({
			model: modelName,
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'image_url',
							image_url: { url: base64ImageWithFileType }, // `data:image/png;base64,${base64Image}`
						},
						{ type: 'text', text: recognizePrompt },
					],
				},
			],
			stream: true,
			stream_options: {
				include_usage: true,
			},
			modalities: ['text'],
		});

		for await (const chunk of completion) {
			if (Array.isArray(chunk?.choices) && chunk?.choices?.length > 0) {
				const deltaContent = chunk.choices[0]?.delta?.content || ``;
				console.log(`delta`, deltaContent);
				imageToText += deltaContent;
			} else {
				console.log(chunk.usage);
			}
		}
	} catch (error) {}

	return imageToText;
};
