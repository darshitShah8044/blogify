import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import TodoList from "../components/TodoList";

export default function Dashboard() {
    const navigate = useNavigate();
    const blogs = useSelector((state) => state.blogs.blogs);

    const totalBlogs = blogs.length;
    const publishedBlogs = blogs.filter((b) => b.status === "Published").length;
    const draftBlogs = blogs.filter((b) => b.status === "Draft").length;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome to Your Dashboard 📝</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-700">Total Blogs</h2>
                    <p className="text-4xl font-bold text-blue-600 mt-2">{totalBlogs}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-700">Published</h2>
                    <p className="text-4xl font-bold text-green-600 mt-2">{publishedBlogs}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold text-gray-700">Drafts</h2>
                    <p className="text-4xl font-bold text-yellow-500 mt-2">{draftBlogs}</p>
                </div>
            </div>

            {/* To-Do Component */}
            <TodoList />

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center mt-8">
                <button
                    onClick={() => navigate("/create")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
                >
                    ➕ Create New Blog
                </button>
                <button
                    onClick={() => navigate("/blogs")}
                    className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow hover:bg-gray-900 transition"
                >
                    📚 View All Blogs
                </button>
            </div>
        </div>
    );
}
