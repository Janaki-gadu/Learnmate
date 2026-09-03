import { Pencil, Trash2, FileText, Download, Pin } from "lucide-react";

export default function NoteCard({ note, onDelete, onEdit }) {
  // Normalize file path ensuring single leading slash resolution
  const fileUrl = note.file
    ? `http://localhost:5000/${note.file.replace(/^\//, "")}`
    : null;

  // Format updated date
  const formattedDate = note.updatedAt
    ? new Date(note.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Recently";

  // Parse tags whether array or comma-delimited string
  const tagsList = Array.isArray(note.tags)
    ? note.tags
    : typeof note.tags === "string" && note.tags.trim()
    ? note.tags.split(",").map((t) => t.trim())
    : [];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between relative overflow-hidden">
      {/* Pinned Badge */}
      {note.pinned && (
        <div className="absolute top-5 right-5 bg-amber-100 text-amber-800 p-2 rounded-xl">
          <Pin size={16} />
        </div>
      )}

      <div>
        {/* Top Section */}
        <div className="flex items-start justify-between gap-3 pr-10">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words leading-snug">
              {note.title}
            </h2>

            {/* Category */}
            <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                {note.category || "General"}
              </span>

              {/* Tags */}
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-600 text-xs px-2.5 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => onEdit(note)}
              className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition"
              title="Edit note"
            >
              <Pencil size={17} />
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition"
              title="Delete note"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-wrap line-clamp-4 text-sm sm:text-base">
          {note.content}
        </p>

        {/* File Attachment */}
        {note.file && (
          <div className="mt-5 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl shrink-0">
                <FileText size={20} />
              </div>

              <div className="flex-1 overflow-hidden min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {note.fileName || "Attachment"}
                </p>
                <p className="text-xs text-gray-500">Attached File</p>
              </div>
            </div>

            <div className="flex gap-2.5 mt-3">
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-xl transition font-medium text-xs sm:text-sm"
              >
                Open
              </a>
              <a
                href={fileUrl}
                download
                className="px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition flex items-center justify-center text-gray-700"
                title="Download file"
              >
                <Download size={16} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <p>Updated {formattedDate}</p>
        {note.pinned && (
          <span className="font-semibold text-amber-600">Pinned</span>
        )}
      </div>
    </div>
  );
}