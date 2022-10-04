import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Charts from "../components/charts"
import onPricesUpdate from "../lib/on-prices-update"
import AssetsModel from "../lib/types/assets-model"
import HistoryDataModel from "../lib/types/history-data-model"

const Asset: NextPage = () => {
  const [values, setValues] = useState<AssetsModel>()
  const [history, setHistory] = useState<HistoryDataModel>()
  const { query } = useRouter()

  useEffect(() => {
    const id = query?.asset
    if (typeof id !== "string") return

    (async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}`)
      const json = await response.json()

      setValues(json.data)
    })().catch(console.error);

    (async () => {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
      const json = await response.json()

      setHistory(json.data)
    })().catch(console.error)

    onPricesUpdate([id], (data) => {
      setValues((prev) => prev && ({ ...prev, priceUsd: data[id] }))
      setHistory((prev) => prev && [...prev, { priceUsd: data[id], time: Date.now() }])
    })
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
      <span>{values.priceUsd}</span>
      <Charts width={300} height={100} data={history || []} name={values.name} />
    </div>
  )
}

export default Asset