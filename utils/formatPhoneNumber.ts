function formatPhoneNumber(value: string) {
  const nums = value.replace(/\D/g, '')

  if (nums.length <= 3) return nums
  if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`
  return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`
}

export default formatPhoneNumber
