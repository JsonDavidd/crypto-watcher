import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from "react"
import fetchRankedAssets from "../lib/fetch-ranked-assets"
import getPricesFromAssets from "../lib/get-prices-from-assets"

const Home: NextPage = () => {
  const [prices, setPrices] = useState<{ [id: string]: number }>()

  useEffect(() => {
    fetchRankedAssets(10)
      .then((assets) => {
        const p = getPricesFromAssets(assets)
        setPrices(p)

        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${Object.keys(p).join()}`)
        pricesWs.onmessage = ({ data }) => {
          setPrices((prev) => ({ ...prev, ...JSON.parse(data) }))
        }
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <Head>
        <title>Crypto Watcher</title>
        <meta name="description" content="Keep track of your favorite cryptos" />
      </Head>
      <ul>
        {prices && Object.keys(prices).map((id, i) => (
          <li key={"crypto" + i}>{id} = {prices[id]}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
