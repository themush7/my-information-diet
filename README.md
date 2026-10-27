# My Information Diet

The creators I learn from, kept on a 3D bookcase with one shelf per subject.
It's a static site: no server, no database, and it costs nothing to host.

## What's in here

- `public/index.html` is the whole site.
- `public/creators.json` is the list of creators. **This is the only file you edit each month.**
- `public/photos/` holds creator photos, one per creator, named `<id>.jpg`.
- `public/og-image.jpg` is the preview image shown when the link is shared.
- `scripts/fetch-photos.mjs` runs on every deploy and fetches photos automatically.

## Put it online (one time, about 15 minutes, free)

1. Create a free GitHub account if you don't have one, then make a new repository called `my-information-diet`.
2. Upload everything in this folder to that repository (on the repository page: Add file, then Upload files, then drag the folder contents in, then Commit).
3. Go to vercel.com, sign in with GitHub, choose Add New, then Project, and import `my-information-diet`. Leave every setting as it is and click Deploy.
4. When it finishes, Vercel gives you a link like `https://my-information-diet.vercel.app`. That's your site.
5. Open `public/index.html` on GitHub, click the pencil icon, search for `YOUR-SITE.vercel.app` and replace it with your real address, then commit. This makes the preview image show up when you share the link on WhatsApp or LinkedIn.
6. Optional: in your Vercel project, open the Analytics tab and click Enable to see visitor counts. It's free on the Hobby plan.

Vercel's free Hobby plan covers personal, non-commercial sites like this one. If you ever add sponsorships or affiliate links, move the site to Cloudflare Pages, which is also free and allows commercial use.

## Photos

On every deploy, the build script fetches profile photos for creators on YouTube and Substack, plus any creator with a `photoSource` link. LinkedIn and Instagram block this, so for these five, save their profile photo yourself into `public/photos/` with these exact names:

- `chahal-vermaa.jpg`
- `adam-mosseri.jpg`
- `diego.jpg`
- `aviral-bhatnagar.jpg`
- `kunal-shah.jpg`

Any square-ish photo works, and the site gives every photo the same warm film look. A photo you add yourself is never overwritten. If a photo is missing, the site shows the creator's initials instead.

## Monthly update (about 10 minutes)

1. Open `public/creators.json` on GitHub and click the pencil icon.
2. Copy an existing creator block, paste it at the end of the list (add a comma after the previous `}`), and change the details. For example:

```json
{
  "id": "new-creator",
  "name": "New Creator",
  "shelf": "ai",
  "platform": "youtube",
  "tier": "gold",
  "note": "Short line for the tag, under 40 characters",
  "longNote": "The full line that appears on the card, in your voice.",
  "links": {
    "youtube": "https://www.youtube.com/@handle",
    "instagram": "https://www.instagram.com/handle"
  },
  "added": "2026-11-15",
  "photo": "photos/new-creator.jpg",
  "photoSource": "https://www.youtube.com/@handle"
}
```

3. Commit. Vercel rebuilds the site and it updates in about a minute.

Anything added after the launch date gets a "new" sticker and shows under the **New** pill for 30 days. The pill only appears when something is new. To point people straight at it, share `your-site.vercel.app/#new` in your story.

**Field guide**

- `shelf`: one of `ai`, `business`, `money`, `film`, `ideas`, `health`.
- `platform`: the main platform, which decides the object on the shelf. `youtube` is a plaque, `instagram` a printed photo, `linkedin` a notebook, `substack` a booklet, `podcast` a cassette, `music` a vinyl record, and anything else a hardcover book.
- `tier` (YouTube only): the plaque finish. Use `copper` under 100K subscribers, `silver` for 100K+, `gold` for 1M+ and `diamond` for 10M+.
- `links`: list the main platform first. Supported keys are `youtube`, `instagram`, `linkedin`, `substack`, `podcast`, `x` and `website`.

## Handy links

Each creator has their own link, for example `your-site.vercel.app/#jeff-su`. There are also links for each shelf (`#ai`, `#film` and so on), `#desk` for the top of the bookcase, and `#new` for this month's additions.
