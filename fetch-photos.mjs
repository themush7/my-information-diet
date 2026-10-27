// Runs on every Vercel deploy. For each creator in public/creators.json that has a
// "photoSource" (a YouTube channel, Substack profile or website), it reads the page's
// preview image and saves it as public/photos/<id>.jpg. Photos you add yourself are
// never overwritten. If anything fails, the site still deploys and shows initials.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const data = JSON.parse(await fs.readFile(path.join(pub, 'creators.json'), 'utf8'));
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
await fs.mkdir(path.join(pub, 'photos'), { recursive: true });

const exists = p => fs.access(p).then(() => true, () => false);
function ogImage(html) {
  const tags = html.match(/<meta[^>]+>/gi) || [];
  for (const t of tags) {
    if (/(property|name)=["'](og:image|twitter:image)["']/i.test(t)) {
      const m = t.match(/content=["']([^"']+)["']/i);
      if (m) return m[1].replace(/&amp;/g, '&');
    }
  }
  return null;
}

let saved = 0, kept = 0, manual = [];
for (const c of data.creators) {
  if (!c.photo) continue;
  const out = path.join(pub, c.photo);
  if (await exists(out)) { kept++; continue; }
  if (!c.photoSource) { manual.push(c.id); continue; }
  try {
    const page = await fetch(c.photoSource, { headers: { 'user-agent': UA, 'accept-language': 'en' }, redirect: 'follow' });
    if (!page.ok) throw new Error('page ' + page.status);
    let url = ogImage(await page.text());
    if (!url) throw new Error('no preview image on page');
    url = url.replace(/=s\d+-c-k/, '=s400-c-k'); // smaller YouTube avatars
    const img = await fetch(url, { headers: { 'user-agent': UA } });
    if (!img.ok) throw new Error('image ' + img.status);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, Buffer.from(await img.arrayBuffer()));
    saved++; console.log('photo saved:', c.id);
  } catch (e) {
    console.warn('photo skipped:', c.id, '(' + e.message + ')');
  }
}
console.log(`Photos: ${saved} fetched, ${kept} already there.`);
if (manual.length) console.log('Add these yourself in public/photos/ (name each file <id>.jpg):', manual.join(', '));
