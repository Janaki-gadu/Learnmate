export default function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div className="min-w-0">

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </h2>

        </div>

        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-100 text-2xl shrink-0">

          {icon}

        </div>

      </div>

    </div>
  );
}