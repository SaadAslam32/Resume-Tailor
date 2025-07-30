'use client';

export default function HistoryItem({ item, onView }) {
  const created = item.createdAt 
    ? new Date(item.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Unknown date';

  return (
    <li 
      className="border-2 border-gray-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-sm"
      onClick={onView}
    >
      <div className="flex-1 mb-3 md:mb-0">
        <div className="font-bold text-gray-800 flex items-center">
          <span className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </span>
          {item.originalFileName}
        </div>
        <div className="text-sm text-gray-600 mt-2 ml-11">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-xs">
            {created}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onView}
          className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md text-sm"
        >
          View Resume
        </button>
      </div>
    </li>
  );
}