import React, { useEffect, useState } from "react";
import axios from "axios";

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

const BlogPostsPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/blog-posts");
      setBlogPosts(response.data);
    } catch (err) {
      setError("Failed to fetch blog posts.");
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async () => {
    if (!newPost.title || !newPost.content) {
      setError("Title and content are required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/blog-posts", newPost);
      setBlogPosts([...blogPosts, response.data]);
      setNewPost({ title: "", content: "" });
    } catch (err) {
      setError("Failed to create blog post.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/blog-posts/${id}`);
      setBlogPosts(blogPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError("Failed to delete blog post.");
    } finally {
      setLoading(false);
    }
  };

  const updateBlogPost = async (id: number, updatedPost: BlogPost) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/blog-posts/${id}`, updatedPost);
      setBlogPosts(
        blogPosts.map((post) => (post.id === id ? response.data : post))
      );
    } catch (err) {
      setError("Failed to update blog post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) =>
            setNewPost({ ...newPost, content: e.target.value })
          }
          className="border p-2 mr-2"
        ></textarea>
        <button onClick={createBlogPost} className="bg-blue-500 text-white p-2">
          Create Post
        </button>
      </div>

      <ul>
        {blogPosts.map((post) => (
          <li key={post.id} className="mb-4 border p-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
            <button
              onClick={() => deleteBlogPost(post.id)}
              className="bg-red-500 text-white p-2 mr-2"
            >
              Delete
            </button>
            <button
              onClick={() =>
                updateBlogPost(post.id, {
                  ...post,
                  title: prompt("New title", post.title) || post.title,
                  content: prompt("New content", post.content) || post.content,
                })
              }
              className="bg-green-500 text-white p-2"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostsPage;
