import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCheck,
  Trophy,
  Brain,
  Lightbulb,
  Users,
  Code,
  ExternalLink,
} from "lucide-react";
import API from "../../api/axios";

export default function NotificationDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await API.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Notifications fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id, link) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      if (link) {
        if (link.startsWith("http")) window.open(link, "_blank");
        else navigate(link);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.put("/notifications/read-all", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "hackathon":
        return <Code size={18} className="text-indigo-600" />;
      case "competition":
        return <Trophy size={18} className="text-amber-600" />;
      case "quiz":
        return <Brain size={18} className="text-purple-600" />;
      case "idea":
        return <Lightbulb size={18} className="text-emerald-600" />;
      case "group":
        return <Users size={18} className="text-blue-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };

  const filteredList =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-3 bg-white rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition relative shadow-sm"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="p-5 pb-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition"
              >
                <CheckCheck size={14} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-gray-100 overflow-x-auto scrollbar-none text-xs font-semibold">
            {["all", "hackathon", "competition", "quiz", "group"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded-xl capitalize transition whitespace-nowrap ${
                  filter === t
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-50">
            {filteredList.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                No notifications right now.
              </div>
            ) : (
              filteredList.map((item) => (
                <div
                  key={item._id}
                  onClick={() => markAsRead(item._id, item.link)}
                  className={`p-4 hover:bg-indigo-50/40 transition cursor-pointer flex gap-3.5 items-start ${
                    !item.read ? "bg-indigo-50/20" : ""
                  }`}
                >
                  <div className="p-2.5 bg-white rounded-2xl border border-gray-100 shadow-sm shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={`text-sm font-semibold truncate ${
                          !item.read ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {item.title}
                      </p>
                      {!item.read && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                  {item.link && (
                    <ExternalLink
                      size={14}
                      className="text-gray-400 shrink-0 mt-1"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}