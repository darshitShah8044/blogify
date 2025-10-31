import React, {useState} from "react";

const BlogModal = ({blog, onClose, onUpdate}) => {
    const [form, setForm] = useState(blog);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        onUpdate({...form, updatedAt: new Date().toISOString()});
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-lg p-6 relative">
                <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-gray-700">
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows="5"
                    className="w-full border border-gray-300 rounded-lg p-2 mb-3"
                    placeholder="Write your blog content..."
                ></textarea>

                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default BlogModal;
