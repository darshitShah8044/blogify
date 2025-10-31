import React from "react";

const BlogCard = ({blog, onView, onDelete}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-all">
            <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 mt-2 line-clamp-2">{blog.content}</p>
            <p className="text-sm text-gray-400 mt-2">{new Date(blog.createdAt).toLocaleString()}</p>

            <div className="flex justify-between mt-4">
                <button onClick={onView} className="text-blue-600 hover:underline font-medium">
                    View / Edit
                </button>
                <button onClick={() => onDelete(blog.id)} className="text-red-500 hover:underline font-medium">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
