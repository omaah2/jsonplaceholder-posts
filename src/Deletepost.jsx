// src/DeletePost.js
import React from "react";
import axios from "axios";

function DeletePost({ postId, onDelete }) {
  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        onDelete(postId);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Delete Post</h2>
      <p className="mb-4">Are you sure you want to delete this post?</p>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 mr-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2"
          onClick={() => onDelete(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePost;
