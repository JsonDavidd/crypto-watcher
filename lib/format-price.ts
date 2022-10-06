const formatPrice = (price: number, locales = "en-US", options: Intl.NumberFormatOptions = {
  currency: "USD",
  maximumSignificantDigits: price < 100000 ? 7 : undefined
}) =>
  new Intl.NumberFormat(locales, options).format(price)

export default formatPrice