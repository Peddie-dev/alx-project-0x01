import { useState } from "react";
import PostCard from "@/components/common/PostCard";
import Header from "@/components/layout/Header";
import { PostProps, PostsPageProps, PostData } from "@/interfaces";
import PostModal from "@/components/common/PostModal";

const Posts: React.FC<PostsPageProps> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postList, setPostList] = useState<PostProps[]>(posts);

  const handleAddPost = (newPost: PostData) => {
    setPostList((prev) => [
      ...prev,
      { ...newPost, id: prev.length + 1 }, // assign unique id
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white hover:bg-blue-800 transition"
          >
            Add Post
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {postList.map(({ title, body, userId, id }: PostProps) => (
            <PostCard
              key={id}
              title={title}
              body={body}
              userId={userId}
              id={id}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <PostModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: PostProps[] = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Posts;
