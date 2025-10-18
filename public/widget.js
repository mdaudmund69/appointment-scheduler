;(() => {
  const script = document.currentScript
  const barberId = script.getAttribute("data-barber-id")
  const containerId = script.getAttribute("data-container-id") || "trimslotr-widget"

  if (!barberId) {
    console.error("TrimSlotr Widget: data-barber-id attribute is required")
    return
  }

  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`TrimSlotr Widget: Container with id "${containerId}" not found`)
    return
  }

  const iframe = document.createElement("iframe")
  iframe.src = `${window.location.origin}/widget/${barberId}`
  iframe.style.width = "100%"
  iframe.style.height = "600px"
  iframe.style.border = "none"
  iframe.style.borderRadius = "8px"
  iframe.title = "TrimSlotr Booking Widget"

  container.appendChild(iframe)
})()
