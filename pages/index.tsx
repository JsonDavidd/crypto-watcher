import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from "react"
import fetchRankedAssets from "../lib/fetch-ranked-assets"
import getPricesFromAssets from "../lib/get-prices-from-assets"
import onPricesUpdate from "../lib/on-prices-update"
import AssetsModel from "../lib/types/assets-model"

const Home: NextPage = () => {
  const [assets, setAssets] = useState<AssetsModel[]>()

  useEffect(() => {
    fetchRankedAssets(10)
      .then(setAssets)
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!assets) return

    onPricesUpdate(assets.map((x) => x.id), (value) => {
      const a = assets.map((x) => {
        if (value[x.id]) {
          x.priceUsd = value[x.id]
        }
        return x
      })

      setAssets(a)
    })
  }, [assets])

  return (
    <div className="min-h-screen bg-slate-100">
      <Head>
        <title>Crypto Watcher</title>
        <meta name="description" content="Keep track of your favorite cryptos" />
      </Head>
      <ul className="w-[90%] max-w-2xl mx-auto flex flex-col gap-[2px] bg-gray-200 shadow-md">
        {assets?.map(({ id, name, symbol, priceUsd }, i) => (
          <li key={id} className="px-6 py-4 flex bg-white">
            <div className="w-1/2 flex flex-col">
              <span>{name}</span>
              <small>{symbol}</small>
            </div>
            <span>{priceUsd} USD</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
