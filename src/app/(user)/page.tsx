import { PostCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import $fetch from "@/lib/fetch";
import { Post } from "@/types";
import { Search } from "lucide-react";

export default async function Home() {
  const posts: Post = await (
    await $fetch("https://dummyjson.com/posts")
  ).json();

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            All Posts
          </h1>
          <p className="text-sm text-gray-600">
            Browser through all{" "}
            <span className="font-semibold">{posts.total}</span> posts
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
