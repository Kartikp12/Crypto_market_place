import React from 'react'


const SearchBox = ({ onsearch }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl shadow-lg w-full">
      <input
        type="text"
        placeholder="Search any crypto here..."
        onChange={(e) => onsearch(e.target.value)}
        className="flex-grow px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-300"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBox
