import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from "react"

const Home: NextPage = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>()

  useEffect(() => {
    const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin")
    pricesWs.onmessage = ({ data }) => {
      setPrices((prev) => ({ ...prev, ...JSON.parse(data) }))
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Crypto Watcher</title>
        <meta name="description" content="Keep track of your favorite cryptos" />
      </Head>
      <ul>
        {prices && Object.keys(prices).map((key, i) => (
          <li key={"crypto" + i}>{key} = {prices[key]}</li>
        ))}
      </ul>
    </div>
  )
}

export default Home
