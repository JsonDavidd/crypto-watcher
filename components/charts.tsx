import { Chart, registerables } from "chart.js"
import { useEffect, useRef, useState } from "react"
import HistoryDataModel from "../lib/types/history-data-model"

const Charts = ({ data, width, height, name, zoom }: {
  data: HistoryDataModel,
  width: number,
  height: number,
  name: string,
  zoom: number
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
    const d = data.slice(data.length - (Math.floor(data.length / zoom)))

    const c = new Chart(ctx, {
      type: "line",
      data: {
        labels: d.map((x) => new Date(x.time).toDateString()),
        datasets: [{
          label: name,
          data: d.map((x) => x.priceUsd)
        }]
      }
    })
    return () => {
      c.destroy()
    }
  }, [mounted, data, name, zoom])

  return (
    <canvas ref={chartRef} {...{ width, height }}></canvas>
  )
}

export default Charts