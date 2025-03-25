import { notFound } from "next/navigation";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.actions";
import ProfilePageClient from "./ProfilePageClient";

interface ProfileUserNameProps {
  params: {
    username: string;
  };
}

// ✅ Correct function name and types
export async function generateMetadata({ params }: ProfileUserNameProps) {
  const user = await getProfileByUsername(params.username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

// ✅ Correct typing for the page component
export default async function ProfileUserName({
  params,
}: ProfileUserNameProps) {
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
