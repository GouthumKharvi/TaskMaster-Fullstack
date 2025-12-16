import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  Trash2,
  Plus,
  Moon,
  Sun,
  Sparkles,
  Trophy,
  Calendar,
  TrendingUp,
  Zap,
  Star,
  Filter,
  ListTodo,
} from "lucide-react";

// API Configuration - Update this with your Replit backend URL
const API_URL = "http://localhost:8000/api";

// API Service
const api = {
  async getAllTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  async addTask(title, category = "work", priority = "medium") {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, priority }),
    });
    if (!response.ok) throw new Error("Failed to add task");
    return response.json();
  },

  async toggleTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to toggle task");
    return response.json();
  },

  async deleteTask(id) {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
    return response.json();
  },
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("work");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const completedCount = tasks.filter((t) => t.completed).length;
    if (completedCount === tasks.length && tasks.length > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const data = await api.getAllTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks. Make sure backend is running.");
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    setLoading(true);
    setError("");
    try {
      await api.addTask(newTask.trim(), category, priority);
      setNewTask("");
      setPriority("medium");
      await loadTasks();
    } catch (err) {
      setError("Failed to add task");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.toggleTask(id);
      await loadTasks();
      setError("");
    } catch (err) {
      setError("Failed to update task");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      await loadTasks();
      setError("");
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "high") return task.priority === "high" && !task.completed;
    if (
      filter === "work" ||
      filter === "personal" ||
      filter === "health" ||
      filter === "learning" ||
      filter === "sports"
    ) {
      return task.category === filter && !task.completed;
    }
    return true;
  });

  const categories = [
    {
      id: "work",
      emoji: "💼",
      label: "Work",
      color: darkMode
        ? "from-blue-600 to-cyan-600"
        : "from-blue-500 to-cyan-500",
    },
    {
      id: "personal",
      emoji: "🏠",
      label: "Personal",
      color: darkMode
        ? "from-purple-600 to-pink-600"
        : "from-purple-500 to-pink-500",
    },
    {
      id: "health",
      emoji: "💪",
      label: "Health",
      color: darkMode
        ? "from-green-600 to-emerald-600"
        : "from-green-500 to-emerald-500",
    },
    {
      id: "learning",
      emoji: "📚",
      label: "Learning",
      color: darkMode
        ? "from-orange-600 to-red-600"
        : "from-orange-500 to-red-500",
    },
    {
      id: "sports",
      emoji: "⚽",
      label: "Sports",
      color: darkMode
        ? "from-yellow-600 to-amber-600"
        : "from-yellow-500 to-amber-500",
    },
  ];

  const getCategoryData = (catId) =>
    categories.find((c) => c.id === catId) || categories[0];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "2s",
              }}
            >
              {["✨", "🎉", "⭐", "🌟", "💫"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Floating Orbs Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
          <div
            className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${darkMode ? "bg-purple-600" : "bg-indigo-400"} animate-pulse`}
          ></div>
          <div
            className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${darkMode ? "bg-pink-600" : "bg-purple-400"} animate-pulse`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="relative z-10 mb-4 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-lg">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${darkMode ? "from-purple-500 to-pink-500" : "from-indigo-500 to-purple-500"} flex items-center justify-center shadow-lg`}
              >
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white animate-bounce"></div>
            </div>
            <div>
              <h1
                className={`text-4xl md:text-5xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Task
                <span
                  className={`bg-gradient-to-r ${darkMode ? "from-purple-400 to-pink-400" : "from-indigo-600 to-purple-600"} bg-clip-text text-transparent`}
                >
                  Master
                </span>
              </h1>
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} flex items-center gap-1 mt-1`}
              >
                <Zap className="w-4 h-4" />
                Get things done with style
              </p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`group relative p-4 rounded-2xl ${darkMode ? "bg-slate-800" : "bg-white"} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110`}
          >
            <div className="relative">
              {darkMode ? (
                <Sun className="w-7 h-7 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-7 h-7 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div
            className={`${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center`}
              >
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {tasks.length}
              </span>
            </div>
            <p
              className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Total Tasks
            </p>
          </div>

          <div
            className={`${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center`}
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {completedCount}
              </span>
            </div>
            <p
              className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Completed
            </p>
          </div>

          <div
            className={`${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center`}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {Math.round(progress)}%
              </span>
            </div>
            <p
              className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Progress
            </p>
          </div>

          <div
            className={`${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
          >
            <div className="flex items-center justify-between mb-2 relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center`}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {completedCount}
              </span>
            </div>
            <p
              className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"} relative z-10`}
            >
              Wins 🎯
            </p>
            {completedCount > 0 && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`relative z-10 ${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-6 mb-8 shadow-xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star
                className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-500"} animate-spin`}
                style={{ animationDuration: "3s" }}
              />
              <span
                className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Your Progress Journey
              </span>
            </div>
            <span
              className={`text-2xl font-black ${darkMode ? "text-purple-400" : "text-indigo-600"}`}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div
            className={`w-full h-5 ${darkMode ? "bg-slate-700" : "bg-gray-200"} rounded-full overflow-hidden relative`}
          >
            <div
              className={`h-full bg-gradient-to-r ${darkMode ? "from-purple-500 via-pink-500 to-purple-500" : "from-indigo-500 via-purple-500 to-pink-500"} transition-all duration-700 ease-out rounded-full relative`}
              style={{
                width: `${progress}%`,
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            >
              <div className="absolute inset-0 bg-white/30"></div>
            </div>
          </div>
          {progress === 100 && tasks.length > 0 && (
            <div className="mt-4 text-center animate-bounce">
              <span className="text-2xl">
                🎉 🏆 Amazing! All tasks completed! 🏆 🎉
              </span>
            </div>
          )}
        </div>

        {/* Add Task Section */}
        <div
          className={`relative z-10 ${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-6 mb-8 shadow-xl`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="✨ What's your next big thing?"
                  className={`w-full px-6 py-4 ${darkMode ? "bg-slate-900/50 border-slate-600 text-white placeholder-gray-500" : "bg-gray-50 border-gray-300 placeholder-gray-400"} border-2 rounded-2xl focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-purple-500/50 focus:border-purple-500" : "focus:ring-indigo-500/50 focus:border-indigo-500"} transition-all text-lg font-medium`}
                  disabled={loading}
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`px-5 py-4 ${darkMode ? "bg-slate-900/50 border-slate-600 text-white" : "bg-gray-50 border-gray-300"} border-2 rounded-2xl focus:outline-none focus:ring-4 ${darkMode ? "focus:ring-purple-500/50" : "focus:ring-indigo-500/50"} font-semibold`}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleAddTask}
                  disabled={loading || !newTask.trim()}
                  className={`px-8 py-4 bg-gradient-to-r ${darkMode ? "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" : "from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"} text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 text-lg`}
                >
                  <Plus className="w-6 h-6" />
                  {loading ? "Adding..." : "Add Task"}
                </button>
              </div>
            </div>

            {/* Priority Selector */}
            <div className="flex items-center gap-3">
              <span
                className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Priority:
              </span>
              <div className="flex gap-2">
                {[
                  {
                    value: "low",
                    label: "Low",
                    emoji: "🟢",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                    emoji: "🟡",
                    color: "from-yellow-500 to-amber-500",
                  },
                  {
                    value: "high",
                    label: "High",
                    emoji: "🔴",
                    color: "from-red-500 to-orange-500",
                  },
                ].map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPriority(p.value)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                      priority === p.value
                        ? `bg-gradient-to-r ${p.color} text-white shadow-lg scale-105`
                        : darkMode
                          ? "bg-slate-900/50 text-gray-400 hover:bg-slate-700 border-2 border-slate-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200"
                    }`}
                  >
                    <span className="text-lg">{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="relative z-10 flex gap-3 mb-6 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All", icon: "📋" },
            { id: "active", label: "Active", icon: "⚡" },
            { id: "completed", label: "Done", icon: "✅" },
            ...categories.map((c) => ({
              id: c.id,
              label: c.label,
              icon: c.emoji,
            })),
            { id: "high", label: "High Priority", icon: "🔥" },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 whitespace-nowrap text-base shadow-lg hover:shadow-xl hover:scale-105 ${
                filter === id
                  ? darkMode
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : darkMode
                    ? "bg-slate-800 text-gray-300 hover:bg-slate-700 border-2 border-slate-700"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="relative z-10 space-y-4">
          {filteredTasks.length === 0 ? (
            <div
              className={`${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border rounded-3xl p-20 text-center shadow-xl`}
            >
              <div className="text-8xl mb-6 animate-bounce">
                {filter === "completed" ? "🎯" : "📝"}
              </div>
              <p
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-2`}
              >
                {filter === "all" ? "No tasks yet!" : `No ${filter} tasks`}
              </p>
              <p
                className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-lg`}
              >
                {filter === "all"
                  ? "Create your first task to get started! 🚀"
                  : "Looking good! Keep it up! 💪"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => {
              const catData = getCategoryData(task.category);
              return (
                <div
                  key={task.id}
                  className={`${darkMode ? "bg-slate-800/80 backdrop-blur-xl border-slate-700" : "bg-white/80 backdrop-blur-xl border-white"} border-2 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 group relative overflow-hidden hover:scale-[1.02]`}
                  style={{
                    animation: "slideIn 0.5s ease-out",
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${catData.color}`}
                  ></div>

                  <div className="flex items-center gap-5 ml-2">
                    <button
                      onClick={() => handleToggle(task.id)}
                      className="flex-shrink-0 transition-transform hover:scale-125 active:scale-95"
                    >
                      {task.completed ? (
                        <div className="relative">
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                          <div className="absolute inset-0 animate-ping">
                            <CheckCircle2 className="w-8 h-8 text-green-500 opacity-75" />
                          </div>
                        </div>
                      ) : (
                        <Circle
                          className={`w-8 h-8 ${darkMode ? "text-gray-600 hover:text-purple-400" : "text-gray-300 hover:text-indigo-500"} transition-colors`}
                        />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{catData.emoji}</span>
                        <span
                          className={`text-xl font-semibold ${
                            task.completed
                              ? darkMode
                                ? "line-through text-gray-500"
                                : "line-through text-gray-400"
                              : darkMode
                                ? "text-white"
                                : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </span>
                        {task.priority === "high" && !task.completed && (
                          <span className="animate-pulse text-2xl">🔥</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold bg-gradient-to-r ${catData.color} text-white`}
                        >
                          {catData.label}
                        </span>
                        {task.priority && (
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-bold ${
                              task.priority === "high"
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                                : task.priority === "medium"
                                  ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            }`}
                          >
                            {task.priority === "high"
                              ? "🔴"
                              : task.priority === "medium"
                                ? "🟡"
                                : "🟢"}{" "}
                            {task.priority.toUpperCase()}
                          </span>
                        )}
                        {task.completed && (
                          <span className="text-xs px-3 py-1 rounded-full font-bold bg-green-100 text-green-700">
                            ✓ Completed
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className={`flex-shrink-0 p-3 ${darkMode ? "text-gray-500 hover:text-red-400 hover:bg-red-900/30" : "text-gray-400 hover:text-red-500 hover:bg-red-50"} rounded-2xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95`}
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div
            className={`relative z-10 mt-10 text-center ${darkMode ? "text-gray-400" : "text-gray-600"} text-base font-medium`}
          >
            🎯 Managing {tasks.length} {tasks.length === 1 ? "task" : "tasks"} •{" "}
            {completedCount} completed • Keep crushing it! 💪
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
