// "use client";

// import { useOrderbookStore } from "../store/useOrderbookStore";

// export default function RecentTrades() {
//   const trades = useOrderbookStore((s) => s.trades);

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-bold">Recent Trades</h2>
//       {trades.map((t) => (
//         <div
//           key={t.id}
//           className={t.isBuyerMaker ? "text-red-600" : "text-green-600"}
//         >
//           {t.price} — {t.qty}
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useOrderbookStore } from "../store/useOrderbookStore";

export default function RecentTrades() {
  const trades = useOrderbookStore((s) => s.trades);
  const [flashId, setFlashId] = useState<number | null>(null);

  useEffect(() => {
    if (trades.length > 0) {
      setFlashId(trades[0].id ?? null);
      setTimeout(() => setFlashId(null), 200);
    }
  }, [trades]);

  return (
    <div className="bg-[#111827] mt-10 p-4 rounded-lg shadow-lg border border-blue-500/40 max-w-xl">
      <h2 className="text-xl font-bold mb-2 text-blue-400">Recent Trades</h2>

      {trades.slice(0, 50).map((t) => {
        const isBuy = !t.isBuyerMaker;
        const flash = flashId === t.id;

        return (
          <div
            key={t.id}
            className={`flex justify-between text-sm py-1 ${
              flash ? "animate-pulse" : ""
            }`}
          >
            <span className={isBuy ? "text-green-400" : "text-red-400"}>
              {t.price.toFixed(2)}
            </span>

            <span>{t.qty.toFixed(4)}</span>

            <span className="text-gray-500">
              {new Date(t.time).toLocaleTimeString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
