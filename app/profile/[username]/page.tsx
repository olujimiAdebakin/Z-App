// import { notFound } from "next/navigation";
// // import ProfilePageClient from "./profilePageClient";
// import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.actions";
// import ProfilePageClient from "./ProfilePageClient";


// export async function generateMetadata({
//   params,
// }: {
//   params: { username: string };
// }) {
//   const user = await getProfileByUsername(params.username);
//   if (!user) return;

//   return {
//     title: `${user.name ?? user.username}`,
//     description: user.bio || `Check out ${user.username}'s profile.`,
//   };
// }
// export default async function ProfileUserName({ params }: { params: { username: string } }) {
//   const user = await getProfileByUsername(params.username);

//   if (!user) notFound();

//   const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
//     getUserPosts(user.id),
//     getUserLikedPosts(user.id),
//     isFollowing(user.id),
//   ]);
    
//   return (
//     <>
//       <ProfilePageClient
//         user={user}
//         posts={posts}
//         likedPosts={likedPosts}
//         isFollowing={isCurrentUserFollowing}
//       />
//     </>
//   );
// }

import { notFound } from "next/navigation";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.actions";
import ProfilePageClient from "./ProfilePageClient";

type ProfileParams = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: ProfileParams) {
  const user = await getProfileByUsername(params.username);

  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

export default async function ProfileUserName({ params }: ProfileParams) {
  const user = await getProfileByUsername(params.username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}