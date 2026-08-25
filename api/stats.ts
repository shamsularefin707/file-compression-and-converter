import type { Request, Response } from 'express';

// In-memory counter store with baseline seed values
let totalPageViews = 48520;
let totalVisitors = 14290;
let totalConversions = 38940;
const visitorCache = new Set<string>();

export default function handler(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { isNewVisitor, visitorId, action } = req.body || {};

    if (action === 'conversion') {
      totalConversions += 1;
    } else {
      // Default: pageview
      totalPageViews += 1;
      if (isNewVisitor || (visitorId && !visitorCache.has(visitorId))) {
        totalVisitors += 1;
        if (visitorId) visitorCache.add(visitorId);
      }
    }

    return res.status(200).json({
      success: true,
      pageViews: totalPageViews,
      visitors: totalVisitors,
      conversions: totalConversions,
      timestamp: new Date().toISOString(),
    });
  }

  // GET request - return current counts
  return res.status(200).json({
    status: 'ok',
    pageViews: totalPageViews,
    visitors: totalVisitors,
    conversions: totalConversions,
    activeNow: Math.floor(Math.random() * 8) + 12, // Live active session estimate
    timestamp: new Date().toISOString(),
  });
}
