"use client";

import { useState } from "react";
import { useBinanceSocket } from "../hooks/useBinanceSocket";
import OrderBook from "../components/OrderBook";
import RecentTrades from "../components/RecentTrades";

export default function Page() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  useBinanceSocket(symbol);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-yellow-400">
        Binance Live Order Book
      </h1>

      <div className="flex justify-center mb-6">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="px-4 py-2 border border-gray-600 bg-black text-white rounded"
        />
      </div>

      <OrderBook />

      <div className="flex justify-center">
        <RecentTrades />
      </div>
    </div>
  );
}
