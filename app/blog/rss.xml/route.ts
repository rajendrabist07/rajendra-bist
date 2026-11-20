import { redirect } from 'next/navigation';

export function GET() {
  redirect('/rss.xml');
}
