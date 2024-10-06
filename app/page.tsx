import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client, urlFor } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

interface SimpleBlogCard {
  title: string;
  smallDescription: string;
  slug: string;
  titleImage: unknown
}

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt asc) {
  title,
    smallDescription,
    "slug": slug.current,
    titleImage
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: SimpleBlogCard[] = await getData()
  return (
    <>
      <h1>Hi</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4">
        {data.map((post,i) => (<Card key={i}>
          <Image src={urlFor(post.titleImage).url()} alt="" width={640} height={640} className="rounded-t-lg h-[200px] object-cover"/>
        <CardContent>
          <h3 className="text-lg line-clamp-2">{post.title}</h3>
          <p className="line-clamp-4 text-sm text-gray-600 dark:text-gray-400">{post.smallDescription}</p>
          <Button asChild className="w-full mt-7" variant='secondary'>
            <Link href={`/blog/${post.slug}`}>Read More</Link>
          </Button>
          </CardContent>
        </Card>))}
      </div>
    </>
  );
}
