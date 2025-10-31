import React, {useState} from "react";


export default function ExploreCard({post, comments = [], onAddComment, isAuthenticated, currentUser}) {
    const [openComments, setOpenComments] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleAdd = () => {
        setError("");
        if (!text.trim()) {
            setError("Please enter a comment.");
            return;
        }

        const commentObj = {
            user: currentUser || "Anonymous",
            text: text.trim(),
            createdAt: new Date().toISOString(),
        };

        onAddComment(post.id, commentObj);
        setText("");
        setOpenComments(true);
    };

    return (
        <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                        by {post.author} · {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-sm text-gray-400">{post.category}</div>
            </div>

            <p className="mt-3 text-gray-700 text-sm line-clamp-3">{post.content}</p>

            <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2 text-xs text-gray-500">
                    {post.tags &&
                        post.tags.map((t) => (
                            <span key={t} className="px-2 py-1 bg-gray-100 rounded-full">
                                {t}
                            </span>
                        ))}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOpenComments((s) => !s)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        {openComments ? "Hide" : `Comments (${comments.length})`}
                    </button>
                </div>
            </div>

            {openComments && (
                <div className="mt-4 border-t pt-4">
                    {/* Comments list */}
                    <div className="max-h-48 overflow-auto space-y-3 mb-3">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 text-sm">No comments yet — be the first!</p>
                        ) : (
                            comments.map((c, i) => (
                                <div key={i} className="bg-gray-50 p-3 rounded">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-medium">{c.user}</div>
                                        <div className="text-xs text-gray-400">
                                            {new Date(c.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-700 mt-1">{c.text}</div>
                                </div>
                            ))
                        )}
                    </div>

                   
                    {isAuthenticated ? (
                        <div className="flex gap-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <button onClick={handleAdd} className="bg-blue-600 text-white px-3 py-2 rounded">
                                Post
                            </button>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-600">
                            Please <span className="text-blue-600">login</span> to comment.
                        </div>
                    )}

                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
            )}
        </div>
    );
}
