# Chart Pattern Guide

Chart Pattern Guide is a polished educational web app for learning how common trading patterns look, what they usually mean, and how traders often interpret their triggers.

## What it does

- Highlights a featured pattern based on the user’s selected time horizon, risk style, and experience level.
- Switches explanation style between plain-language beginner guidance and more technical experienced guidance.
- Shows visual pattern diagrams inspired by cheat-sheet style chart references.
- Includes side-by-side pattern comparison, a full pattern quiz, and expert screenshot-based chart challenges.

## Built with

- Next.js
- React
- TypeScript

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

1. `src/components/trade-setup-coach.tsx`
   Main UI and interactive pattern guide experience.
2. `src/lib/trade-coach.ts`
   Pattern data, quiz content, and expert challenge configuration.
3. `src/app/globals.css`
   Visual design, responsive layout, and navigation styling.

## Notes

This project is educational and should not be treated as financial advice.
