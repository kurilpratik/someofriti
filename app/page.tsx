import Preloader from "@/components/Preloader";
import { client } from "@/lib/sanity";

type PostSummary = {
  _id: string;
  title?: string;
  slug?: string;
};

export default async function Home() {
  const posts = await client.fetch<PostSummary[]>(
    `*[_type == "post"] | order(_createdAt desc)[0...3]{
      _id,
      title,
      "slug": slug.current
    }`,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <>
      <Preloader />

      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Sanity connected
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            someofriti
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Project: <strong>nz3on36n</strong> · Dataset:{" "}
            <strong>production</strong>
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Latest posts</h2>

          {posts.length === 0 ? (
            <p className="mt-4 text-slate-600">
              No Sanity content has been published yet. Add a post in the
              standalone Studio and refresh this page.
            </p>
          ) : (
            <ul className="mt-4 space-y-3 text-slate-700">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="rounded-lg border border-slate-200 px-4 py-3"
                >
                  {post.title ?? "Untitled post"}
                  {post.slug ? (
                    <span className="ml-2 text-sm text-slate-500">
                      /{post.slug}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
