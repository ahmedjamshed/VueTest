import { onUnmounted, onMounted, ref, watch } from "vue";
const key = "pk.f3dfc2f41d80a467146ddf7a7e3ce040";
const fetchCity = async ({ latitude, longitude }) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    console.log(data);
    return data.display_name; //`${data.address.city ?? 'N/A' }, ${data.address.state ?? 'N/A'}, ${data.address.country ?? 'N/A'}`
  } catch (e) {
    return "Unknown";
  }
};

export default function useLocation() {
  const coords = ref({ latitude: 0, longitude: 0 });
  const displayName = ref("Unknown");
  const isSupported = "navigator" in window && "geolocation" in navigator;

  watch(coords, async () => {
    displayName.value = await fetchCity(coords.value);
  });

  let watcher = null;
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(
        (position) =>
          (coords.value = {
            latitude: position.coords.latitude.toFixed(2),
            longitude: position.coords.longitude.toFixed(2),
          })
      );
  });
  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher);
  });
  return { coords, displayName, isSupported };
}
