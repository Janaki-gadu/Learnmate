import { useEffect, useState } from "react";

export default function WelcomeBanner() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user") || localStorage.getItem("profile");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        const data = parsed?.user || parsed;
        setUserName(data?.name || data?.username || "User");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
      <h2 className="text-3xl font-bold capitalize">
        Welcome back, {userName} 👋
      </h2>
      <p className="text-blue-100 mt-2 text-lg">
        Ready to learn something new today?
      </p>

      <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 inline-block">
        <p className="text-sm font-medium">
          🚀 <span className="font-bold">Daily Motivation:</span> The best time to plant a tree was 20 years ago. The second best time is now.
        </p>
      </div>
    </div>
  );
}