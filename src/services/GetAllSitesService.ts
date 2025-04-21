import { Site } from "@/types/Site";

export async function getAllSites(): Promise<Site[]> {
  const url = encodeURIComponent('https://quyettam.dotb.cloud/rest/v11_3/getallsitev2');
  const response = await fetch(`/api/proxy?targetUrl=${url}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    const data = await response.json();
    return data.data as Site[]
  }

  throw new Error("Error while performing API call");
}