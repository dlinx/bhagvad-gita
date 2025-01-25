import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: `${post.title} | SSR Demo`,
    description: post.body.slice(0, 160),
  };
}

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <article className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {post.body}
          </p>
        </article>
      </div>
    </main>
  );
}