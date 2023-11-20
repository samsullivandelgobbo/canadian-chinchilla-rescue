import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export async function GET() {
	const links = [
		{ url: '/', changefreq: 'daily', priority: 1 },
		{ url: '/about', changefreq: 'daily', priority: 1 },
		{ url: '/adopt', changefreq: 'daily', priority: 1 },
		{ url: '/shop', changefreq: 'daily', priority: 1 },
		{ url: '/donate', changefreq: 'daily', priority: 1 },
		{ url: '/blog', changefreq: 'daily', priority: 1 },
		{ url: '/adopt/application', changefreq: 'daily', priority: 1 },
		{ url: '/care', changefreq: 'daily', priority: 1 }
	];

	const stream = new SitemapStream({ hostname: 'https://canadianchinchilla.ca' });

	// Create a readable stream and pipe the links to the SitemapStream
	Readable.from(links).pipe(stream);

	// Wait for the sitemap to be generated
	const sitemap = await streamToPromise(stream).then((data) => data.toString());

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
