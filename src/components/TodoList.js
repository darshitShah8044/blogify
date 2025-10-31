import React, {useState, useEffect} from "react";

const TODOS_KEY = "dashboard_todos";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState("all"); // all | pending | completed

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(TODOS_KEY);
        if (stored) setTodos(JSON.parse(stored));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (!newTodo.trim()) return;
        const todoObj = {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false,
        };
        setTodos((prev) => [...prev, todoObj]);
        setNewTodo("");
    };

    const toggleTodo = (id) => {
        setTodos((prev) => prev.map((t) => (t.id === id ? {...t, completed: !t.completed} : t)));
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const filteredTodos =
        filter === "pending"
            ? todos.filter((t) => !t.completed)
            : filter === "completed"
            ? todos.filter((t) => t.completed)
            : todos;

    const pendingCount = todos.filter((t) => !t.completed).length;
    const completedCount = todos.filter((t) => t.completed).length;

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                <h2 className="text-2xl font-semibold text-gray-800">🗒️ Your To-Do List</h2>
                <div className="text-gray-600 text-sm flex gap-4">
                    <span>Pending: {pendingCount}</span>
                    <span>Completed: {completedCount}</span>
                </div>
            </div>

            {/* Add Todo */}
            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("pending")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        filter === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        filter === "completed"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Completed
                </button>
            </div>

            {/* Todo Cards */}
            {filteredTodos.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No tasks found for this filter.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTodos.map((t) => (
                        <div
                            key={t.id}
                            className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition ${
                                t.completed ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                            }`}
                        >
                            <h3
                                onClick={() => toggleTodo(t.id)}
                                className={`text-lg font-medium mb-2 cursor-pointer ${
                                    t.completed ? "line-through text-gray-400" : "text-gray-800"
                                }`}
                            >
                                {t.text}
                            </h3>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => toggleTodo(t.id)}
                                    className={`px-3 py-1 rounded-lg text-sm ${
                                        t.completed
                                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                            : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                                >
                                    {t.completed ? "Undo" : "Done"}
                                </button>
                                <button
                                    onClick={() => deleteTodo(t.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
