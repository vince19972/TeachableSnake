export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

export function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export default function isMobile() {
  return isAndroid() || isiOS()
}