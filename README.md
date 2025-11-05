This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




# Real-Time Stock Order Book Visualizer

## Objective
The goal of this project is to build a **high-performance, real-time stock order book visualizer** using NextJS. This application streams live market data from the Binance WebSocket API and displays it efficiently in a professional, responsive UI.

---

## Live Demo
[View Live Demo](https://your-app-link.vercel.app)  
*(Replace with your deployed Vercel or Netlify link)*

---

## Features
- **Live Binance WebSocket Integration**  
  - Streams Aggregate Trades and Order Book Deltas for a selected trading pair.
- **Order Book Component**  
  - Displays Bids and Asks in a two-column layout.
  - Sorted by price: Bids descending, Asks ascending.
  - Shows Price, Amount, and Cumulative Total.
  - Visual depth bars for each row to indicate relative liquidity.
  - Displays the Spread between highest Bid and lowest Ask.
- **Recent Trades Component**  
  - Logs the 50 most recent trades.
  - Highlights trade direction (green for buy, red for sell).

---

## Tech Stack
- **Framework:** NextJS  
- **Language:** TypeScript  
- **State Management:** Zustand (for efficient, high-frequency updates)  
- **Styling:** Tailwind CSS  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/<repo-name>.git


cd nextjs
npm install
npm run dev
http://localhost:3000

