const getPricesFromAssets = (assets: { id: string, priceUsd: number }[]): { [id: string]: number } => {
  return assets.reduce((t, { id, priceUsd }) => {
    t[id] = priceUsd
    return t
  }, {} as any)
}

export default getPricesFromAssets