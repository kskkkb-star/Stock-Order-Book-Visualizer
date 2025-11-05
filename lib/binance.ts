import axios from "axios";

export type DepthSide = [string, string][];

export interface OrderbookSnapshot {
  lastUpdateId: number;
  bids: DepthSide;
  asks: DepthSide;
}

export async function fetchOrderbookSnapshot(symbol: string, limit = 1000): Promise<OrderbookSnapshot> {
  const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`;
  const res = await axios.get(url, { timeout: 10000 });
  return res.data as OrderbookSnapshot;
}

export function depthArrayToMap(depth: DepthSide) {
  const map = new Map<number, number>();
  for (const [price, qty] of depth) {
    const p = Number(price);
    const q = Number(qty);
    if (q === 0) continue;
    map.set(p, q);
  }
  return map;
}
