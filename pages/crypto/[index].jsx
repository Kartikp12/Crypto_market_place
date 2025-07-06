import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Crypto({ data }) {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-10">
            <div className="max-w-4xl mx-auto">
                {/* Go Back Button */}
                <div className="mb-8">

                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 border border-gray-700"
                    >
                        ← Go Back
                    </button>
                </div>

                {/* Crypto Details */}
                <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700">
                    <div className="flex items-center gap-6 mb-8">
                        <img
                            src={data.image?.large || data.image}
                            alt={data.name}
                            className="w-20 h-20 rounded-full"
                        />
                        <div>
                            <h1 className="text-4xl font-bold">{data.name}</h1>
                            <p className="text-xl text-gray-400 uppercase">{data.symbol}</p>
                            <p className="text-sm text-gray-500">Rank: #{data.market_cap_rank}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-green-400">
                                ${data.market_data?.current_price?.usd || 'N/A'}
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Market Cap:</span>
                                    <span className="font-semibold">${data.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">24h Change:</span>
                                    <span className={`font-semibold ${data.market_data?.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {data.market_data?.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">7d Change:</span>
                                    <span className={`font-semibold ${data.market_data?.price_change_percentage_7d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {data.market_data?.price_change_percentage_7d?.toFixed(2) || 'N/A'}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">30d Change:</span>
                                    <span className={`font-semibold ${data.market_data?.price_change_percentage_30d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {data.market_data?.price_change_percentage_30d?.toFixed(2) || 'N/A'}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">About {data.name}</h3>
                            <div className="text-gray-300 leading-relaxed">
                                {data.description?.en ? (
                                    data.description.en.length > 500
                                        ? `${data.description.en.substring(0, 500)}...`
                                        : data.description.en
                                ) : (
                                    'Description not available'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps({ params }) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params.index}`)
        
        if (!res.ok) {
            throw new Error(`API responded with status: ${res.status}`)
        }
        
        const data = await res.json()
        
        if (data.status?.error_code) {
            throw new Error(`API Error: ${data.status.error_message}`)
        }
        
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.error('Error fetching crypto data:', error)
        return {
            notFound: true
        }
    }
}

export async function getStaticPaths() {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        const data = await res.json()

        if (data.status?.error_code) {
            console.error('API Error:', data.status.error_message)
            return {
                paths: [],
                fallback: 'blocking'
            }
        }

        if (!Array.isArray(data)) {
            console.error('API response is not an array:', data)
            return {
                paths: [],
                fallback: 'blocking'
            }
        }

        const paths = data.map((coin) => ({
            params: { index: coin.id }
        }))

        return {
            paths,
            fallback: 'blocking'
        }
    } catch (error) {
        console.error('Error fetching crypto data:', error)
        return {
            paths: [],
            fallback: 'blocking'
        }
    }
}