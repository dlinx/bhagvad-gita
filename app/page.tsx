import { Metadata } from 'next';
import { ArrowRight, BookOpen } from 'lucide-react';
import gitaData from './data/gita';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Bhagavad Gita | Verses',
  description: 'Explore the timeless wisdom of the Bhagavad Gita',
};

export default function Home() {
  const { verses } = gitaData;
  const verseList = useMemo(() => Object.keys(verses), [verses]);
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <BookOpen className="h-12 w-12 mx-auto text-orange-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bhagavad Gita
          </h1>
          <p className="text-lg text-gray-600">
            Timeless wisdom from the sacred text
          </p>
        </div>
        <Accordion type="single" defaultValue="1" collapsible>
          {verseList.map((v) => (
            <AccordionItem value={`${v}`}>
              <AccordionTrigger>Chapter {v}</AccordionTrigger>
              <AccordionContent className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-6">
                {verses[v].map((verse) => (
                  <div
                    key={`${verse.chapter}_${verse.verse}`}
                    className="bg-white p-6 rounded-lg shadow-md border border-orange-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="text-orange-600 text-sm font-medium mb-2">
                      {verse.shloka_title}
                    </div>
                    <p className="text-gray-800 font-serif mb-4 text-lg leading-relaxed">
                      {verse.shloka.split('\n')[0]}...
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {verse.description}
                    </p>
                    <Link
                      href={`/verses/${verse.chapter}/${verse.verse}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700"
                    >
                      Read more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
