const fetchRankedAssets = async (limit: number) => {
  const response = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}`)
  const json = await response.json()
  return json.data as any[]
}

export default fetchRankedAssets