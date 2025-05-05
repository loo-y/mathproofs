import OpenAI from 'openai';
import 'dotenv/config';

// https://openrouter.ai/deepseek/deepseek-prover-v2:free
const modelName = `deepseek/deepseek-prover-v2:free`;
const recognizePrompt = `作为一个专业的图像识别与文字转换专家，你的任务是将给定的图片中的内容准确地从图片形式转换成可编辑的文字。\
请专注于识别图片中出现的所有数学相关的题目文本，保持其原始格式不变，不对其进行任何形式的加工、处理或解答。\
请忽略图片中的手写内容，这些手写内容可能是回答的解题过程，可能是错误的内容。\
确保最终输出的文字版本忠实地反映了图片中的所有数学题信息。如果可能的话，尽量保留图片中的数学公式、符号和排版格式，可以使用 lean 4 格式。\
请注意，你的目标是将图片中的内容转换为文字，而不是对其进行任何形式的分析或解答。`;

let deepseekInstance: OpenAI | null = null;

const getDeepseekInstance = () => {
	console.log(`DEEPSEEK_API_KEY`, process.env.DEEPSEEK_API_KEY);
	if (!process?.env?.DEEPSEEK_API_KEY || !process?.env?.DEEPSEEK_API_URL) return null;
	// 需要返回一个 OpenAI 实例，如果已经创建过实例，可以直接返回
	if (!deepseekInstance) {
		deepseekInstance = new OpenAI({
			// 若没有配置环境变量，请用阿里云百炼API Key将下行替换为：apiKey: "sk-xxx",
			apiKey: process.env.DEEPSEEK_API_KEY,
			baseURL: process.env.DEEPSEEK_API_URL,
		});
	}

	return deepseekInstance;
};

// 解数学题
export const solveMathProblem = async (mathContent: string) => {
	const deepseekInstance = getDeepseekInstance() as OpenAI;
	if (!deepseekInstance) {
		return {
			status: false,
			msg: `Please set API KEY for deepseek omni.`, // please set API KEY
		};
	}

	let result = ``;
	const prompt = `作为一名经验丰富的六年级数学老师，你熟悉这个年龄段学生的学习能力和教学方法。现在，请根据以下数学题目：\
    \n==========\
    ${mathContent}\
    \n==========\
    用适合小学六年级学生的语言和概念来解答这个问题。\
    请确保解释清晰易懂，并适当使用图示或例子辅助说明，让孩子们能够轻松理解解题过程。\
    同时，需要给出具体的解题步骤，分步解决，徐徐渐进。\
    注意，如果有数学公式，请转换为html可以展示的公式。 `;
	//    注意，如果有数学公式，请转换为katex可以识别的格式，同时需要考虑string中斜杠会自动处理的情况。(如果是katex公式，在你输出时需要两次斜杠转义。)
	try {
		const completion = await deepseekInstance.chat.completions.create({
			model: modelName,
			messages: [
				{
					role: 'user',
					content: prompt,
				},
			],
			stream: true,
			stream_options: {
				include_usage: true,
			},
			modalities: ['text'],
		});
		console.log(`completion`, completion);
		for await (const part of completion) {
			if (part.choices[0].delta?.content) {
				result += part.choices[0].delta.content;
			}
		}
	} catch (error) {
		console.error(`error`, error);
		return {
			status: false,
			msg: `Error in deepseek omni`,
		};
	}

	return result;
};
