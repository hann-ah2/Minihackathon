/**
 * Fictional blackout simulation. These are NOT real devices or live positions.
 * A missed heartbeat is only evidence of lost connectivity, not of injury.
 */
export interface LastPingDevice {
  id: string;
  latitude: number;
  longitude: number;
  last_seen_at: string;
  status: 'unreachable';
  simulated: true;
}

export interface SilentConcentrationZone {
  id: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
  device_count: number;
}

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function distanceMeters(a: Pick<LastPingDevice, 'latitude' | 'longitude'>, b: Pick<LastPingDevice, 'latitude' | 'longitude'>) {
  const R = 6371000;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const latA = toRadians(a.latitude);
  const latB = toRadians(b.latitude);
  const q = Math.sin(dLat / 2) ** 2 + Math.cos(latA) * Math.cos(latB) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
}

/**
 * Density-connected clustering (DBSCAN-like), min 3 nearby unreachable devices.
 * Recalculate whenever the set of stale heartbeats changes.
 */
export function computeSilentZones(devices: LastPingDevice[], neighborhoodMeters = 350, minimumDevices = 3): SilentConcentrationZone[] {
  const visited = new Set<number>();
  const assigned = new Set<number>();
  const zones: SilentConcentrationZone[] = [];
  const neighborsOf = (i: number) => devices.map((other, j) => distanceMeters(devices[i], other) <= neighborhoodMeters ? j : -1).filter((j) => j >= 0);

  for (let i = 0; i < devices.length; i++) {
    if (visited.has(i)) continue;
    visited.add(i);
    const initial = neighborsOf(i);
    if (initial.length < minimumDevices) continue;

    const members = new Set<number>();
    const queue = [...initial];
    while (queue.length) {
      const candidate = queue.shift()!;
      if (assigned.has(candidate)) continue;
      members.add(candidate);
      if (!visited.has(candidate)) {
        visited.add(candidate);
        const nearby = neighborsOf(candidate);
        if (nearby.length >= minimumDevices) {
          for (const next of nearby) if (!queue.includes(next) && !members.has(next)) queue.push(next);
        }
      }
    }
    if (members.size < minimumDevices) continue;
    const points = [...members].map((index) => devices[index]);
    for (const index of members) assigned.add(index);
    const latitude = points.reduce((sum, d) => sum + d.latitude, 0) / points.length;
    const longitude = points.reduce((sum, d) => sum + d.longitude, 0) / points.length;
    const center = { latitude, longitude };
    const radius_meters = Math.max(200, ...points.map((d) => distanceMeters(center, d) + 75));
    zones.push({ id: `silent-zone-${zones.length + 1}`, latitude, longitude, radius_meters, device_count: points.length });
  }
  return zones;
}

/** Simulated last-known device locations around Subang / Sunway. */
export function simulateSeismicBlackout(now = Date.now()): LastPingDevice[] {
  const positions: Array<[number, number]> = [
    // Example cluster A - around SS15
    [3.0726, 101.5968], [3.0734, 101.5976], [3.0715, 101.5982], [3.0741, 101.5962], [3.0722, 101.5990],
    // Example cluster B - around Bandar Sunway
    [3.0676, 101.6062], [3.0685, 101.6078], [3.0669, 101.6086], [3.0689, 101.6068],
    // Example cluster C - north of SS14
    [3.0804, 101.5905], [3.0814, 101.5910], [3.0794, 101.5913],
    // Isolated unreachable devices (do not count as concentration zones)
    [3.0560, 101.5808], [3.0885, 101.6182],
  ];
  return positions.map(([latitude, longitude], i) => ({
    id: `DEMO-LKL-${String(i + 1).padStart(3, '0')}`,
    latitude,
    longitude,
    last_seen_at: new Date(now - (4 + (i * 3) % 17) * 60_000).toISOString(),
    status: 'unreachable' as const,
    simulated: true as const,
  }));
}
