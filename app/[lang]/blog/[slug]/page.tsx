import { urlFor } from "@/sanity/lib/image";
import { fetchBlogArticle } from "@/utils/apiService";
import { PortableText } from "next-sanity";
import { Image } from "next-sanity/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await fetchBlogArticle(params.slug);
  return (
    <article className="mt-8">
      <h1 className="text-3xl text-center font-bold ">{data.title}</h1>
      <Image
        className="rounded-lg mt-8 border"
        priority
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt=""
      ></Image>
      <div className="mt-8 prose dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </article>
  );
}

