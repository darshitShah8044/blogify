import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {deleteBlog, editBlog} from "../reducers/blogSlice";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";

const AllBlogs = () => {
    const blogs = useSelector((state) => state.blogs.blogs); // ✅ from Redux store
    const dispatch = useDispatch();
    const [selectedBlog, setSelectedBlog] = useState(null);

    // --- Delete Blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteBlog(id)); // ✅ Redux handles removal + localStorage sync
        }
    };

    // --- Update Blog (from modal)
    const handleUpdate = (updatedBlog) => {
        dispatch(editBlog(updatedBlog)); // ✅ updates store + syncs to localStorage
        setSelectedBlog(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Your Blogs</h2>

                <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                    + Create New Blog
                </Link>
            </div>

            {blogs.length === 0 ? (
                <p className="text-gray-500 text-center mt-20">No blogs found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            onDelete={handleDelete}
                            onView={() => setSelectedBlog(blog)}
                        />
                    ))}
                </div>
            )}

            {selectedBlog && (
                <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} onUpdate={handleUpdate} />
            )}
        </div>
    );
};

export default AllBlogs;
