import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from "react"
import fetchRankedAssets from "../lib/fetch-ranked-assets"
import getPricesFromAssets from "../lib/get-prices-from-assets"
import onPricesUpdate from "../lib/on-prices-update"
import AssetsModel from "../lib/types/assets-model"

const Home: NextPage = () => {
  const [assets, setAssets] = useState<AssetsModel[]>()
  const [prices, setPrices] = useState<{ [id: string]: number }>()

  useEffect(() => {
    fetchRankedAssets(10)
      .then(setAssets)
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!assets) return

    const p = getPricesFromAssets(assets)
    setPrices(p)

    onPricesUpdate(Object.keys(p), (value) => setPrices((prev) => ({ ...prev, ...value })))
  }, [assets])

  return (
    <div className="min-h-screen bg-slate-100">
      <Head>
        <title>Crypto Watcher</title>
        <meta name="description" content="Keep track of your favorite cryptos" />
      </Head>
      <ul className="w-[90%] max-w-2xl mx-auto flex flex-col gap-[2px] bg-gray-200 shadow-md">
        {prices && Object.keys(prices).map((id, i) => (
          <li key={"crypto" + i} className="px-6 py-4 bg-white">{id} = {prices[id]}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
