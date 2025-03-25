
// import createPost from "../components/CreatePost"
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost"
import WhoToFollow from "@/components/WhoToFollow"
import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/post.actions";
import { getDbUserId } from "@/actions/user.actions";
// import { redirect } from "next/navigation";


export default async function Home() {
 const user = await currentUser();
//  if (!user) redirect("/sign-in"); // Redirect instead of crashing
 const posts = await getPosts();
 const dbUserId = await getDbUserId();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        
        <div className="space-y-4">
          {posts.map((post) => (
             <PostCard key={post.id} post={post} dbUserId={dbUserId}/>
          ))}
        </div>

      </div>
      
      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow/>
      </div>
    </div>
  );
}
