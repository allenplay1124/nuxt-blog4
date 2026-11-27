export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const toIsoDateTime = (value?: string): string | undefined => {
  if (!value) return undefined
  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return value
  const match = value.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}(?::\d{2})?)$/)
  if (!match) return value
  return `${match[1]}T${match[2]}+08:00`
}
