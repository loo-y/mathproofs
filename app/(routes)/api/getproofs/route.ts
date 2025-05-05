// a nextjs route handler
import { NextResponse, NextRequest } from 'next/server';
import { recognizeImage } from '../../fetches/qwen';
export async function GET(request: NextRequest) {
	const token = request.cookies.get('token');
	return NextResponse.json({ token });
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { image, imageType } = body || {};

	const result = await recognizeImage(image);
	console.log(`result`, result);
	return NextResponse.json(
		{
			content: result || '',
		},
		{
			status: 200,
		},
	);
}
