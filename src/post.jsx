import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPost from './Cmponents/Editpost'; 
import DeletePost from './Cmponents/Deletepost'; 


function Posts() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleEditClick = (postId) => {
    setEditingPostId(postId);
  };

  const handleDeleteClick = (postId) => {
    setDeletingPostId(postId);
  };

  const handlePostUpdate = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    setEditingPostId(null);
  };

  const handlePostDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setDeletingPostId(null);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-md">
      <h1 className="text-4xl text-center font-bold mb-4">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white rounded-md px-2 py-1 mr-2"
                onClick={() => handleEditClick(post.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white rounded-md px-2 py-1"
                onClick={() => handleDeleteClick(post.id)}
              >
                Delete
              </button>
            </div>
            {editingPostId === post.id && (
              <EditPost postId={post.id} onClose={() => setEditingPostId(null)} onUpdate={handlePostUpdate} />
            )}
            {deletingPostId === post.id && (
              <DeletePost postId={post.id} onDelete={handlePostDelete} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Posts;