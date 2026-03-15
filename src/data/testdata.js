export function generateNearbyUsers(centerLat, centerLon) {
  const users = [];
  const ranges = [
    { count: 20, maxDistKm: 5 },
    { count: 20, maxDistKm: 20 },
    { count: 20, maxDistKm: 30 },
    { count: 20, maxDistKm: 50 },
    { count: 20, maxDistKm: 100 },
  ];

  let userId = 1;

  ranges.forEach(({ count, maxDistKm }) => {
    for (let i = 0; i < count; i++) {
      // Random distance and angle
      const distance = Math.random() * maxDistKm; // km
      const angle = Math.random() * 2 * Math.PI; // radians

      // Convert distance to lat/lon offsets
      const deltaLat = (distance / 6371) * (180 / Math.PI);
      const deltaLon = (distance / 6371) * (180 / Math.PI) / Math.cos((centerLat * Math.PI) / 180);

      const lat = centerLat + deltaLat * Math.sin(angle);
      const lon = centerLon + deltaLon * Math.cos(angle);

      users.push({ name: `User${userId}`, lat: parseFloat(lat.toFixed(6)), lon: parseFloat(lon.toFixed(6)) });
      userId++;
    }
  });

  return users;
}



