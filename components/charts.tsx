import { Chart, registerables } from "chart.js"
import { useEffect, useRef, useState } from "react"
import HistoryDataModel from "../lib/types/history-data-model"

const Charts = ({ data, width, height, name }: {
  data: HistoryDataModel,
  width: number,
  height: number,
  name: string
}) => {
  const [mounted, setMounted] = useState(false)
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    Chart.register(...registerables)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !chartRef.current) return
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return
    const c = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((x) => new Date(x.time).toDateString()),
        datasets: [{
          label: name,
          data: data.map((x) => x.priceUsd),
          borderWidth: 0.1
        }]
      }
    })
    return () => {
      c.destroy()
    }
  }, [mounted, data, name])

  return (
    <canvas ref={chartRef} {...{ width, height }}></canvas>
  )
}

export default Charts