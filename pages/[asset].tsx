import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AssetsModel from "../lib/types/assets-model"

const Asset: NextPage = () => {
  const [values, setValues] = useState<AssetsModel>()
  const [history, setHistory] = useState<{ priceUsd: number, time: number }[]>()
  const { query } = useRouter()

  useEffect(() => {
    if (!query?.asset) return

    (async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${query?.asset}`)
      const json = await response.json()

      setValues(json.data)
    })().catch(console.error);

    (async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${query?.asset}/history?interval=d1`)
      const json = await response.json()

      setHistory(json.data)
    })().catch(console.error)
  }, [query])

  if (!values) return (
    <div>
      Fetching data...
    </div>
  )

  return (
    <div className="flex flex-col items-center">
      <h1>{values.name}</h1>
      <small><h2>{values.symbol}</h2></small>
      <ul>
        {history?.map(({ time, priceUsd }) => (
          <li key={time}>{time} = {priceUsd}</li>
        ))}
      </ul>
    </div>
  )
}

export default Asset