import React, {useEffect, useState} from "react";

export default function Albums() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

    // Load local images from localStorage
    useEffect(() => {
        const storedLocal = localStorage.getItem("local_photos");
        const parsed = storedLocal ? JSON.parse(storedLocal) : [];
        setImages((prev) => [...prev, ...parsed]);
    }, []);

    // Fetch curated Pexels images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch("https://api.pexels.com/v1/search?query=mountain?per_page=10", {
                    headers: {Authorization: API_KEY},
                });
                const data = await res.json();
                const photos = data.photos.map((p) => ({
                    id: p.id,
                    src: p.src.medium,
                    title: p.alt,
                    isLocal: false,
                }));
                setImages((prev) => [...photos, ...prev]);
            } catch (err) {
                console.error("Error fetching Pexels images:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [API_KEY]);

    // Upload local image
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newLocalImages = files.map((file) => ({
            id: Date.now() + Math.random(),
            src: URL.createObjectURL(file),
            title: file.name,
            isLocal: true,
        }));

        // Update localStorage
        const existing = JSON.parse(localStorage.getItem("local_photos")) || [];
        const updated = [...existing, ...newLocalImages];
        localStorage.setItem("local_photos", JSON.stringify(updated));

        // Update state
        setImages((prev) => [...newLocalImages, ...prev]);
    };

    // Shimmer loading placeholder
    const Shimmer = () => <div className="animate-pulse bg-gray-200 rounded-xl h-48 w-full"></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">📸 Your Albums</h1>

                <label className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer transition mt-4 sm:mt-0">
                    Upload Image
                    <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                </label>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array(8)
                    .fill()
                    .map((_, i) => (
                        <Shimmer key={i} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
                        >
                            <img src={img.src} alt={img.title} loading="lazy" className="w-full h-48 object-cover" />
                            <div className="p-3 text-sm text-gray-700 font-medium truncate">{img.title}</div>
                            {img.isLocal && <p className="text-xs text-gray-500 px-3 pb-2 italic">(Uploaded by you)</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
