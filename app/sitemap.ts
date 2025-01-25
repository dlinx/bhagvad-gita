import { MetadataRoute } from 'next'
import gitaData from './data/gita'

export const BASE_URL = 'https://aigita.in'
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const {verses} = gitaData
  const links:any[] = [];
  Object.keys(verses).forEach(c=>{
    verses[c].forEach(v=>{
        links.push({
            url: `${BASE_URL}/verse/${c}/${v.verse}`
        });
    })
  })
  return links;
}