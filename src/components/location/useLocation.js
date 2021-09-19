import { onUnmounted, onMounted, ref, watch } from 'vue'
const key = "pk.f3dfc2f41d80a467146ddf7a7e3ce040"
const fetchCity = async ({latitude, longitude}) => {
    try {
        const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        return data.display_name
    } catch(e) {
        return "Unknown"
    }
} 

export default function useLocation() {
  const coords = ref({ latitude: 0, longitude: 0 })
  const city = ref("Unknown")
  const isSupported = 'navigator' in window && 'geolocation' in navigator

  watch(coords, async () => {
    city.value = await fetchCity(coords.value)
  });

  let watcher = null
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(
        position => (coords.value = position.coords)
      )
  })
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })

  return { coords, city, isSupported }
}