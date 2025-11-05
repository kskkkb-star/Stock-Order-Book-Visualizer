import { create } from "zustand";

interface Trade {
  price: number;
  qty: number;
  time: number;
  isBuyerMaker: boolean;
  id: number;
}

interface OrderbookState {
  bidsMap: Map<number, number>;
  asksMap: Map<number, number>;
  trades: Trade[];
  bulkApplyDeltas: (
    side: "bids" | "asks",
    deltas: Array<[number, number]>
  ) => void;
  pushTrade: (t: Trade) => void;
  clear: () => void;
}

export const useOrderbookStore = create<OrderbookState>((set, get) => ({
  bidsMap: new Map(),
  asksMap: new Map(),
  trades: [],

  bulkApplyDeltas: (side, deltas) => {
    const map =
      side === "bids" ? new Map(get().bidsMap) : new Map(get().asksMap);

    for (const [price, qty] of deltas) {
      if (qty === 0) {
        map.delete(price);
      } else {
        map.set(price, qty);
      }
    }

    set(
      side === "bids"
        ? { bidsMap: map }
        : { asksMap: map }
    );
  },

  pushTrade: (t) => {
    const prev = get().trades;

    // ✅ Prevent entire array recreation (avoids infinite re-renders)
    const next = [t, ...prev];
    if (next.length > 50) next.length = 50;

    set({ trades: next });
  },

  clear: () => set({ bidsMap: new Map(), asksMap: new Map(), trades: [] }),
}));
