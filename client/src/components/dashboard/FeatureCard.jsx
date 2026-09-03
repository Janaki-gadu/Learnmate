export default function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col justify-between group select-none"
    >
      <div>
        <div className="text-5xl group-hover:scale-110 transition duration-300">
          {icon}
        </div>

        <h3 className="mt-6 text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
          {title}
        </h3>

        <p className="mt-3 text-gray-500 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}