import SearchBox from '../components/SearchBox'
import CryptoList from '../components/CryptoList'
import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
const MarketPlace = () => {

  let [cryptos, setCryptos] = useState([])
  let [filtered, setFiltered] = useState([])

  useEffect(() => {
    let fetchData = async () => {
      let res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100')
      let data = await res.json();
      setCryptos(data)
      setFiltered(data)
      console.log(data);
    }
    fetchData()
  }, [])

  const handleSearch = (query) => {
    const filteredData = cryptos.filter((coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filteredData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-transparent bg-clip-text text-center">
        🚀 Crypto Market Place
      </h1>

      <div className="w-full max-w-xl mb-8">
        <div className="searchbox">
          <SearchBox onsearch={handleSearch} />
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <div className="crypto-list grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl justify-items-center">
          
            <CryptoList data={filtered} />
          

        </div>
      </div>
    </div>
  )
}

export default MarketPlace
