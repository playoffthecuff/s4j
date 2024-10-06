import { client, urlFor } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { Image } from "next-sanity/image";
import { TypedObject } from "sanity";

interface BlogArticle {
  title: string;
  content: TypedObject | TypedObject[];
  slug: string;
  titleImage: unknown
}

async function getData(slug: string) {
  slug = 'test-title-1'
const query = `
*[_type == "blog" && slug.current == "${slug}"] {
  "slug": slug.current,
    title,
    content,
    titleImage
}[0]`;
const data = await client.fetch(query)
return data
}

async function BlogArticle({params}: {params: {slug: string}}) {
  const data: BlogArticle = await getData(params.slug)
  console.log(data)
  return (
    <article className="mt-8">
      <h1 className='text-3xl text-center font-bold '>{data.title}</h1>
      <Image className="rounded-lg mt-8 border" priority src={urlFor(data.titleImage).url()} width={800} height={800} alt=""></Image>
      <div className="mt-8 prose dark:prose-invert">
        <PortableText value={data.content}/>
      </div>
    </article>
  )
}

export default BlogArticle