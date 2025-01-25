export type Verse = {
    shloka: string;
    shloka_title: string;
    shloka_transliteration: string;
    Shloka_meanings: string;
    shloka_breakdown: string;
    commentary?: string;
    description: string;
    chapter: number;
    verse: number;

}
export type Chapters = {
    [chapterId:string]: Verse[]
}