const onPricesUpdate = (assetsIDs: string[], callback: (prices: { [id: string]: number }) => void) => {
  const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assetsIDs.join()}`)
  pricesWs.onmessage = ({ data }) => callback(JSON.parse(data))
  pricesWs.onclose = () => console.log("WebSocket closed")

  return ({ dismount: () => pricesWs.close() })
}

export default onPricesUpdate