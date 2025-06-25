export default function getDistance(lat1: number, lng1: number, lat2: number, lng2: number){
  function rad(deg: number){
    return deg * (Math.PI/180);
  }
  const R = 6371;
  const deltaLat = rad(lat2-lat1);
  const deltaLng = rad(lng2-lng1);
  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return parseFloat(distance.toFixed(1));
}