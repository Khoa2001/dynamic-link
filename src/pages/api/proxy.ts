import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { targetUrl } = req.query

  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid targetUrl' })
  }

  try {
    const axiosConfig = {
      method: req.method,
      url: decodeURIComponent(targetUrl),
      headers: {
        ...req.headers,
        host: '',
      },
      data: req.body,
      params: req.query,
    }

    const response = await axios(axiosConfig)

    res.status(response.status).json(response.data)
  } catch (error: AxiosError | any) {
    const status = error.response?.status || 500
    const message = error.response?.data || error.message || 'Unknown error'

    res.status(status).json({
      error: 'Error when perform API call',
      detail: message,
    })
  }
}
