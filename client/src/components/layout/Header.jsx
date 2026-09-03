import { useState } from "react";
import { Search } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileModal from "../profile/ProfileModal";

export default function Header() {
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Jaanu",
    email: "janaki@learnmate.dev",
    bio: "Full Stack Developer",
    learningGoal: "Building MERN Apps",
  });

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative flex-1 max-w-lg">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search notes, topics, study rooms..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <NotificationDropdown />

          {/* Clickable Profile Trigger */}
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-3 bg-white pl-2 pr-4 py-1.5 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition text-left cursor-pointer"
          >
            <div className="h-9 w-9 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center text-sm shadow-sm">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-gray-400 font-medium">Learner</p>
            </div>
          </button>
        </div>
      </header>

      {/* Profile Popup */}
      {showProfile && (
        <ProfileModal
          user={currentUser}
          closeModal={() => setShowProfile(false)}
          onUserUpdated={(updated) =>
            setCurrentUser((prev) => ({ ...prev, ...updated }))
          }
        />
      )}
    </>
  );
}