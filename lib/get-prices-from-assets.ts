import AssetsModel from "./types/assets-model"

const getPricesFromAssets = (assets: AssetsModel[]): { [id: string]: number } => {
  return assets.reduce((t, { id, priceUsd }) => {
    t[id] = priceUsd
    return t
  }, {} as any)
}

export default getPricesFromAssets