import React, {useEffect, useState} from "react";
import ExploreCard from "../components/ExploreCard";
import staticData from "../data/exploreBlogs.json";
import {useSelector} from "react-redux";

/**
 * Comments are persisted in localStorage under key: "explore_comments"
 * Structure: { [postId]: [ { user, text, createdAt }, ... ] }
 */

const COMMENTS_KEY = "explore_comments";

const readStoredComments = () => {
    try {
        const raw = localStorage.getItem(COMMENTS_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        console.error("Failed to read explore comments:", e);
        return {};
    }
};

const saveStoredComments = (obj) => {
    try {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(obj));
    } catch (e) {
        console.error("Failed to save explore comments:", e);
    }
};

export default function Explore() {
    // static posts come from staticData import
    const [posts, setPosts] = useState([]);
    const [commentsMap, setCommentsMap] = useState({}); // postId -> comments[]
    const auth = useSelector((s) => s.auth); // expected { isAuthenticated, user? }
    const isAuthenticated = !!auth?.isAuthenticated;
    const currentUser = auth?.user?.email || auth?.user || "User";

    useEffect(() => {
        // Load posts from static JSON (we copy so we can show comment counts from json too)
        setPosts(staticData);

        // load stored comments and merge with static comments
        const stored = readStoredComments();
        // Merge: for each static post, use stored[postId] concatenated after static comments
        const merged = {};
        for (const p of staticData) {
            const staticComments = Array.isArray(p.comments) ? p.comments : [];
            const storedForPost = Array.isArray(stored[p.id]) ? stored[p.id] : [];
            merged[p.id] = [...staticComments, ...storedForPost];
        }
        setCommentsMap(merged);
    }, []);

    const handleAddComment = (postId, commentObj) => {
        // update in-memory map
        setCommentsMap((prev) => {
            const next = {...prev, [postId]: [...(prev[postId] || []), commentObj]};
            // persist to localStorage but only store comments that were added by users (we will store entire array - it's fine)
            // We must persist only user-added comments to avoid duplicating static ones on next load. To keep it simple, we'll persist the delta:
            const storedBefore = readStoredComments();
            const prevStoredForPost = Array.isArray(storedBefore[postId]) ? storedBefore[postId] : [];
            const newStoredForPost = [...prevStoredForPost, commentObj];
            const newStored = {...storedBefore, [postId]: newStoredForPost};
            saveStoredComments(newStored);
            return next;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Explore — Latest Posts</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((p) => (
                        <ExploreCard
                            key={p.id}
                            post={p}
                            comments={commentsMap[p.id] || []}
                            onAddComment={(postId, comment) => {
                                if (!isAuthenticated) {
                                    alert("Please login to comment.");
                                    return;
                                }
                                handleAddComment(postId, comment);
                            }}
                            isAuthenticated={isAuthenticated}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
