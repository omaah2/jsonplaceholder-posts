import React, { useState, useEffect } from "react";
import axios from "axios";

function EditPost({ postId, onClose, onUpdate }) {
  const [post, setPost] = useState({ title: "", body: "" });

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId]);

  const handleUpdate = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${postId}`, post)
      .then(() => {
        onUpdate(post);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <div className="bg-zinc-50 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
      <div className="mb-2">
        <input
          type="text"
          className="border rounded w-full py-2 px-3"
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Body"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2"
          onClick={handleUpdate}
        >
          Save
        </button>
        <button className="bg-gray-400 text-white rounded-md px-4 py-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPost;
