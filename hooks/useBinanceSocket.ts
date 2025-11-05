import { useEffect, useRef } from "react";
import { fetchOrderbookSnapshot } from "../lib/binance";
import { useOrderbookStore } from "../store/useOrderbookStore";

export function useBinanceSocket(symbol: string) {
  const { bulkApplyDeltas, pushTrade, clear } = useOrderbookStore();
  const lastUpdateId = useRef<number | null>(null);

  useEffect(() => {
    clear();

    async function loadSnapshot() {
      const snap = await fetchOrderbookSnapshot(symbol, 1000);
      lastUpdateId.current = snap.lastUpdateId;

      bulkApplyDeltas(
        "bids",
        snap.bids.map(([p, q]) => [Number(p), Number(q)])
      );
      bulkApplyDeltas(
        "asks",
        snap.asks.map(([p, q]) => [Number(p), Number(q)])
      );
    }

    loadSnapshot();

    const streamUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth@100ms`;
    const tradesUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade`;

    const depthWS = new WebSocket(streamUrl);
    const tradeWS = new WebSocket(tradesUrl);

    depthWS.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      const bids = data.b.map(([p, q]: [string, string]) => [Number(p), Number(q)]);
      const asks = data.a.map(([p, q]: [string, string]) => [Number(p), Number(q)]);

      bulkApplyDeltas("bids", bids);
      bulkApplyDeltas("asks", asks);
    };

    tradeWS.onmessage = (msg) => {
      const t = JSON.parse(msg.data);
      pushTrade({
        price: Number(t.p),
        qty: Number(t.q),
        time: t.T,
        isBuyerMaker: t.m,
        id: t.a,
      });
    };

    return () => {
      depthWS.close();
      tradeWS.close();
    };
  }, [symbol, bulkApplyDeltas, pushTrade, clear]);
}
