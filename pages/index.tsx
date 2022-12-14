import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { useEffect, useState } from "react"
import fetchRankedAssets from "../lib/fetch-ranked-assets"
import formatPrice from "../lib/format-price"
import getPricesFromAssets from "../lib/get-prices-from-assets"
import onPricesUpdate from "../lib/on-prices-update"
import AssetsModel from "../lib/types/assets-model"

const Home: NextPage = () => {
  const [assets, setAssets] = useState<AssetsModel[]>()
  const [cryptosWatched, setCryptosWatched] = useState<string[]>()

  useEffect(() => {
    fetchRankedAssets(10)
      .then((data) => {
        setAssets(data)
        setCryptosWatched(data.map((x) => x.id))
      })
      .catch(console.error)

    setInterval(() => {
      fetchRankedAssets(10)
        .then((data) => {
          setAssets(data)
          setCryptosWatched(data.map((x) => x.id))
        })
        .catch(console.error)
    }, 15000)
  }, [])

  useEffect(() => {
    if (!cryptosWatched) return

    const { dismount } = onPricesUpdate(cryptosWatched, (value) => setAssets((prev) => prev?.map((x) => {
      if (value[x.id]) {
        x.priceUsd = value[x.id]
      }
      return x
    })))

    return dismount
  }, [cryptosWatched])

  return (
    <div className="min-h-screen bg-slate-100">
      <Head>
        <title>Crypto Watcher</title>
        <meta name="description" content="Keep track of your favorite cryptos" />
      </Head>
      <ul className="w-[90%] max-w-2xl mx-auto flex flex-col gap-[2px] bg-gray-200 shadow-md">
        {assets?.map(({ id, name, symbol, priceUsd }, i) => (
          <li key={id}>
            <Link href={id}><a className="px-6 py-4 flex bg-white">
              <div className="w-1/2 flex flex-col">
                <span>{name}</span>
                <small>{symbol}</small>
              </div>
              <span>{formatPrice(priceUsd)} USD</span>
            </a></Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
