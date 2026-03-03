
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
//import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default  function BlogPage() {
  return (
    <>
      <div className="py-12">
        <div className="text-center pb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Our Blog
          </h1>
          <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Insights, thoughts, and trends from our team.
          </p>
        </div>
          <Suspense fallback={<BlogLoading/>}>
            <LoadingBlogList/>
          </Suspense>
         
      </div>
    </>
  );
}


async function LoadingBlogList() {
 //const data = useQuery(api.posts.getPosts);
  const data= await fetchQuery(api.posts.getPosts) //server action 
  return (
    <>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post)=>(
             <Card key={post._id} className="
             pt-0">
               <div className="h-48 w-full overflow-hidden relative">
                   <Image  src="https://images.unsplash.com/photo-1761839258803-21515f43190c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt="image" fill
                   className="rounded-t-lg"
                   />
               </div>
                <CardContent>
                    <Link href={`/bog/${post._id}`}>
                      <h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
                    </Link>
                    <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                </CardContent>
                 <CardFooter>
                    <Link className={buttonVariants({
                        className:"w-full"
                    })} href={`/bog/${post._id}`}>
                     Read more
                    </Link>
                 </CardFooter>
             </Card>
        ))}
        </div>
    </>
  )
}

function BlogLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-12">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border p-4 space-y-4"
        >
          <div className="h-48 bg-muted rounded-xl" />
          <div className="h-5 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-10 bg-muted rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
}

