import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const userRes = await axios.get(
          "http://localhost:5000/api/auth/dashboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(userRes.data.user);

        const tasksRes = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasksRes.data);
        setFilteredTasks(tasksRes.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    let updatedTasks = tasks;
    if (searchQuery) {
      updatedTasks = updatedTasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus === "completed") {
      updatedTasks = updatedTasks.filter((task) => task.completed);
    } else if (filterStatus === "pending") {
      updatedTasks = updatedTasks.filter((task) => !task.completed);
    }
    setFilteredTasks(updatedTasks);
  }, [searchQuery, filterStatus, tasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        editTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === editTask._id ? res.data : t)));
      setEditTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  
  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
            />
          </svg>
          <span className="text-gray-700 text-lg font-medium">
            Loading your dashboard...
          </span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-3xl mx-auto transition-all duration-700 transform hover:scale-[1.01] hover:shadow-blue-200">
          {/* Header with User Profile */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={`https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff&size=120`}
              alt="Profile Avatar"
              className="w-28 h-28 rounded-full shadow-md border-4 border-blue-500 mb-4"
            />
            <h2 className="text-3xl font-extrabold text-gray-800 animate-fadeIn">
              Welcome back,{" "}
              <span className="text-blue-600">{user.username}!</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Glad to see you again 👋 Here’s your personal dashboard.
            </p>
          </div>

          {/* Profile Details and Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Profile Details
              </h3>
              <p className="text-gray-700">👤 Username: {user.username}</p>
              {user.email && (
                <p className="text-gray-700 mt-1">📧 Email: {user.email}</p>
              )}
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                Stats
              </h3>
              <p className="text-gray-700">🚀 Tasks: {tasks.length} total</p>
              <p className="text-gray-700 mt-1">
                ✅ Completed: {tasks.filter((t) => t.completed).length}
              </p>
            </div>
          </div>

          {/* Tasks Section with CRUD, Search, and Filter */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Your Tasks
            </h3>

            {/* Search and Filter UI */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search tasks by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Add/Edit Form */}
            <form
              onSubmit={editTask ? handleEditTask : handleAddTask}
              className="mb-6 space-y-4"
            >
              <input
                type="text"
                placeholder="Task Title"
                value={editTask ? editTask.title : newTask.title}
                onChange={(e) =>
                  editTask
                    ? setEditTask({ ...editTask, title: e.target.value })
                    : setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Task Description"
                value={editTask ? editTask.description : newTask.description}
                onChange={(e) =>
                  editTask
                    ? setEditTask({ ...editTask, description: e.target.value })
                    : setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all"
              >
                {editTask ? "Update Task" : "Add Task"}
              </button>
              {editTask && (
                <button
                  type="button"
                  onClick={() => setEditTask(null)}
                  className="ml-4 bg-gray-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-gray-600 transition-all"
                >
                  Cancel Edit
                </button>
              )}
            </form>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks found.</p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-gray-600">{task.description}</p>
                      <span
                        className={`text-sm ${
                          task.completed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleComplete(task)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all"
                      >
                        {task.completed ? "Mark Pending" : "Mark Complete"}
                      </button>
                      <button
                        onClick={() => setEditTask(task)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions (unchanged) */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300">
              Edit Profile
            </button>
            <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300">
              Settings
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
