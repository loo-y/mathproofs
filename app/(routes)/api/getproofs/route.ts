// a nextjs route handler
import { NextResponse, NextRequest } from 'next/server';
import { recognizeImage } from '../../fetches/qwen';
export async function GET(request: NextRequest) {
	const token = request.cookies.get('token');
	return NextResponse.json({ token });
}

export async function POST(request: NextRequest) {
	const { token } = await request.json();
	const res = NextResponse.json({ token });
	res.cookies.set('token', token, { path: '/' });
	return res;
}
