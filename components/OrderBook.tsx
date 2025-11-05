// "use client";

// import { useOrderbookStore } from "../store/useOrderbookStore";
// import { useMemo } from "react";

// export default function OrderBook() {
//   const bidsMap = useOrderbookStore((s) => s.bidsMap);
//   const asksMap = useOrderbookStore((s) => s.asksMap);

//   const bids = useMemo(() => {
//     return [...bidsMap]
//       .map(([price, qty]) => ({ price, qty }))
//       .sort((a, b) => b.price - a.price);
//   }, [bidsMap]);

//   const asks = useMemo(() => {
//     return [...asksMap]
//       .map(([price, qty]) => ({ price, qty }))
//       .sort((a, b) => a.price - b.price);
//   }, [asksMap]);

//   const topBid = bids[0]?.price ?? 0;
//   const topAsk = asks[0]?.price ?? 0;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Order Book</h2>

//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <h3 className="font-semibold">Bids</h3>
//           {bids.slice(0, 20).map((row) => (
//             <div key={row.price} className="text-green-600">
//               {row.price} — {row.qty}
//             </div>
//           ))}
//         </div>

//         <div>
//           <h3 className="font-semibold">Asks</h3>
//           {asks.slice(0, 20).map((row) => (
//             <div key={row.price} className="text-red-600">
//               {row.price} — {row.qty}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-4 font-bold">
//         Spread: {topAsk - topBid}
//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";
import { useOrderbookStore } from "../store/useOrderbookStore";

export default function OrderBook() {
  const bidsMap = useOrderbookStore((s) => s.bidsMap);
  const asksMap = useOrderbookStore((s) => s.asksMap);

  const bids = useMemo(() => {
    const arr = [...bidsMap].map(([price, qty]) => ({ price, qty }));
    arr.sort((a, b) => b.price - a.price);

    let cumulative = 0;
    return arr.slice(0, 50).map((row) => ({
      ...row,
      total: (cumulative += row.qty),
    }));
  }, [bidsMap]);

  const asks = useMemo(() => {
    const arr = [...asksMap].map(([price, qty]) => ({ price, qty }));
    arr.sort((a, b) => a.price - b.price);

    let cumulative = 0;
    return arr.slice(0, 50).map((row) => ({
      ...row,
      total: (cumulative += row.qty),
    }));
  }, [asksMap]);

  const maxBidTotal = Math.max(...bids.map((b) => b.total), 1);
  const maxAskTotal = Math.max(...asks.map((a) => a.total), 1);

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">

      {/* ✅ BIDS */}
      <div className="bg-[#111827] p-4 rounded-lg shadow-lg border border-green-700/40">
        <h2 className="text-green-400 text-xl font-bold mb-2">Bids</h2>

        <div className="grid grid-cols-3 text-gray-400 text-sm mb-1">
          <span>Price</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>

        {bids.map((row) => (
          <div key={row.price} className="relative mb-1">
            <div
              className="absolute inset-0 bg-green-600 opacity-20"
              style={{ width: `${(row.total / maxBidTotal) * 100}%` }}
            />
            <div className="grid grid-cols-3 relative text-sm py-1">
              <span className="text-green-400">{row.price.toFixed(2)}</span>
              <span className="text-right">{row.qty.toFixed(6)}</span>
              <span className="text-right">{row.total.toFixed(6)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ ASKS */}
      <div className="bg-[#111827] p-4 rounded-lg shadow-lg border border-red-700/40">
        <h2 className="text-red-400 text-xl font-bold mb-2">Asks</h2>

        <div className="grid grid-cols-3 text-gray-400 text-sm mb-1">
          <span>Price</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>

        {asks.map((row) => (
          <div key={row.price} className="relative mb-1">
            <div
              className="absolute inset-0 bg-red-600 opacity-20"
              style={{ width: `${(row.total / maxAskTotal) * 100}%` }}
            />
            <div className="grid grid-cols-3 relative text-sm py-1">
              <span className="text-red-400">{row.price.toFixed(2)}</span>
              <span className="text-right">{row.qty.toFixed(6)}</span>
              <span className="text-right">{row.total.toFixed(6)}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

