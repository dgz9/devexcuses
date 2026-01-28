import { NextRequest, NextResponse } from 'next/server';
import { getRandomExcuse, type Category } from '@/lib/excuses';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') as Category | null;
  
  const excuse = getRandomExcuse(category || undefined);
  
  return NextResponse.json({
    excuse: excuse.text,
    emoji: excuse.emoji,
    category: excuse.category,
  });
}
