export const fetchLocations = async (keyword: string) => {
  const response = await fetch(`/api/amadeus/locations?keyword=${keyword}`);
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }
  return response.json();
};
