import React from 'react'
import Link from 'next/link'
import '../styles/globals.css'

const CryptoList = ({ data }) => {
  return (
    <>
        {data.map((coin) => (
          <Link href={`/crypto/${coin.id}`} key={coin.id}>
            <div
              className="w-full flex items-center justify-between bg-gray-800 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-700 cursor-pointer hover:bg-gray-700"
            >
              <div className="flex items-center gap-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold">{coin.name}</h2>
                  <p className="text-sm uppercase text-gray-400">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-bold text-green-400">${coin.current_price}</h2>
                <p className="text-sm text-gray-300">
                  M.cap: ${coin.market_cap.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </>
  )
}

export default CryptoList


