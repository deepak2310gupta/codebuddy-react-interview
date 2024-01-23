import { useEffect, useState } from "react";

const Posts = () => {
  const [userPostData, setUserPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserPostData(data?.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userPostData?.map((post) => (
          <div
            key={post.id}
            className="max-w-sm overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
          >
            <div style={{ height: "150px", overflow: "hidden" }}>
              <img
                className="h-full w-full object-cover"
                src={post.image}
                alt={`${post.firstName}'s post`}
              />
            </div>
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold text-indigo-700">{`${post.firstName} ${post.lastName}`}</div>
              <p className="text-base text-gray-700">{post.writeup}</p>
            </div>
            <div className="flex items-center px-6 pb-2 pt-4">
              <img
                className="mr-4 h-10 w-10 rounded-full"
                src={post.avatar}
                alt={`${post.firstName} ${post.lastName}`}
              />
              <span className="text-sm font-semibold text-gray-800">{`${post.firstName} ${post.lastName}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
