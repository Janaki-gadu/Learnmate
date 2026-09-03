export default function WelcomeBanner() {
  return (
    <div className="mt-8 bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 rounded-3xl p-8 text-white shadow-lg">
      
      <h2 className="text-3xl font-bold">
        Welcome back, Jaanu 👋
      </h2>

      <p className="mt-3 text-lg text-indigo-100">
        Ready to learn something new today?
      </p>

      <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-5">
        <h3 className="text-xl font-semibold">
          🚀 Daily Motivation
        </h3>

        <p className="mt-2 text-indigo-50">
          The best time to plant a tree was 20 years ago.
          The second best time is now.
        </p>
      </div>

    </div>
  );
}