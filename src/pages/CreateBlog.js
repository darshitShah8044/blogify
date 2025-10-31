import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addBlog} from "../reducers/blogSlice"; // ✅ import from your slice

const CreateBlog = () => {
    const [form, setForm] = useState({
        title: "",
        content: "",
        status: "Published", // ✅ default to Published now
    });
    const navigate = useNavigate();
    const dispatch = useDispatch(); // ✅ initialize dispatch

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.content.trim()) {
            alert("Please fill in all fields!");
            return;
        }

        dispatch(addBlog(form));

        // Navigate to blogs page
        navigate("/blogs");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-5 text-gray-700 text-center">Create New Blog</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter blog title"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Content</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        placeholder="Write your blog content..."
                        rows="6"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    ></textarea>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
                    >
                        Save Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
