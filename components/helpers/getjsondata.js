export default async function getJSONData(url) {
  const response = await fetch(url);
  return response.json();
}
