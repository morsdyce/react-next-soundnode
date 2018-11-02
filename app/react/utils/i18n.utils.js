const numberFormat = new Intl.NumberFormat();

export function formatNumber(number) {
  return numberFormat.format(number)
}
