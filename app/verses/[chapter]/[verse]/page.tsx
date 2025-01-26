import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import gitaData from '../../../data/gita';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  params: { chapter: string; verse: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const verse = gitaData.verses[params.chapter].find(
    (v) => v.verse === parseInt(params.verse)
  );

  if (!verse) {
    return {
      title: 'Verse Not Found | Bhagavad Gita',
      description: 'The requested verse could not be found.',
    };
  }

  return {
    title: `${verse.shloka_title} | Bhagavad Gita`,
    description: verse.shloka,
  };
}

export default function VersePage({ params }: Props) {
  const currentVerseIndex = gitaData.verses[params.chapter].findIndex(
    (v) =>
      v.chapter === parseInt(params.chapter) &&
      v.verse === parseInt(params.verse)
  );

  if (currentVerseIndex === -1) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chapters
          </Link>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Verse Not Found
            </h1>
            <p className="text-gray-600">
              The requested verse could not be found.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const verse = gitaData.verses[params.chapter][currentVerseIndex];
  const prevVerse =
    currentVerseIndex > 0
      ? gitaData.verses[params.chapter][currentVerseIndex - 1]
      : +params.chapter > 1
      ? gitaData.verses[(+params.chapter - 1).toString()][
          gitaData.verses[(+params.chapter - 1).toString()].length - 1
        ]
      : null;
  const nextVerse =
    currentVerseIndex < gitaData.verses[params.chapter].length - 1
      ? gitaData.verses[params.chapter][currentVerseIndex + 1]
      : +params.chapter < 18
      ? gitaData.verses[+params.chapter + 1][0]
      : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to verses
        </Link>

        <article className="bg-white p-8 rounded-lg shadow-md border border-orange-100">
          <div className="text-center mb-8">
            <BookOpen className="h-8 w-8 mx-auto text-orange-600 mb-4" />
            <div className="text-orange-600 font-medium">
              {verse.shloka_title}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Sanskrit
              </h2>
              <h1 className="text-xl font-serif text-gray-900 leading-relaxed whitespace-pre-line">
                {verse.shloka}
              </h1>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Summary
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                {verse.description}
              </p>
            </div>

            <Accordion type="single" defaultValue="1" collapsible>
              <AccordionItem value="transliteration">
                <AccordionTrigger>
                  <h2 className="text-sm font-medium text-gray-500">
                    Transliteration
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                  {verse.shloka_transliteration}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="wordMeaning">
                <AccordionTrigger>
                  <h2 className="text-sm font-medium text-gray-500">
                    Word Meanings
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                  {verse.Shloka_meanings}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="explanation">
                <AccordionTrigger>
                  <h2 className="text-sm font-medium text-gray-500">
                    Detailed Explanation
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-800 leading-relaxed">
                  {verse.shloka_breakdown}
                </AccordionContent>
              </AccordionItem>

              {verse.commentary && (
                <AccordionItem value="commentary">
                  <AccordionTrigger>
                    <h2 className="text-sm font-medium text-gray-500">
                    Commentary
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                    {verse.commentary}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>

          <div className="mt-12 flex justify-between items-center pt-8 border-t border-orange-100">
            {prevVerse ? (
              <Link
                href={`/verses/${prevVerse.chapter}/${prevVerse.verse}`}
                className="inline-flex items-center text-orange-600 hover:text-orange-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Verse
              </Link>
            ) : (
              <div />
            )}

            {nextVerse ? (
              <Link
                href={`/verses/${nextVerse.chapter}/${nextVerse.verse}`}
                className="inline-flex items-center text-orange-600 hover:text-orange-700"
              >
                Next Verse
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const { verses } = gitaData;
  const params = [];
  for (const chapter in verses) {
    for (const verse of verses[chapter]) {
      params.push({
        chapter: chapter.toString(),
        verse: verse.verse.toString(),
      });
    }
  }

  return params;
}
