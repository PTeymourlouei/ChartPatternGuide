export type TradeHorizon = "short-term" | "medium-term" | "long-term";
export type RiskProfile = "careful" | "balanced" | "aggressive";
export type ExperienceLevel = "beginner" | "experienced";
export type PatternCategory = "reversal" | "continuation";

export interface CoachInputs {
  horizon: TradeHorizon;
  risk: RiskProfile;
  experience: ExperienceLevel;
}

export interface PatternLine {
  color: "price" | "guide" | "arrow-up" | "arrow-down";
  points: Array<[number, number]>;
}

export interface PatternCard {
  slug: string;
  name: string;
  category: PatternCategory;
  horizons: TradeHorizon[];
  riskProfiles: RiskProfile[];
  summary: string;
  beginnerMeaning: string;
  experiencedMeaning: string;
  beginnerUsage: string;
  experiencedUsage: string;
  whatToLookFor: string[];
  buySignal: string;
  exitSignal: string;
  riskNote: string;
  alternatives: string[];
  lines: PatternLine[];
}

export interface PatternGuideResult {
  heroTitle: string;
  featured: PatternCard;
  alternatives: PatternCard[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  patternSlug: string;
  choices: string[];
}

export interface ExpertChallenge {
  id: string;
  title: string;
  patternSlug: string;
  ticker: string;
  timeframe: string;
  setup: string;
  questionImage: string;
  answerImage: string;
  direction: "up" | "down";
  explanation: string;
}

function line(
  color: PatternLine["color"],
  points: PatternLine["points"]
): PatternLine {
  return { color, points };
}

export const patternLibrary: PatternCard[] = [
  {
    slug: "bull-flag",
    name: "Bull Flag",
    category: "continuation",
    horizons: ["short-term", "medium-term"],
    riskProfiles: ["balanced", "aggressive"],
    summary: "A strong move up pauses briefly, then has a chance to continue higher.",
    beginnerMeaning:
      "Think of this as a stock running up, resting for a moment, and then trying to keep climbing.",
    experiencedMeaning:
      "A bullish continuation structure where an impulsive leg is followed by a controlled downward-sloping consolidation.",
    beginnerUsage:
      "Wait until the price breaks above the small pullback area before considering an entry. If it falls back into the pattern, the breakout may have failed.",
    experiencedUsage:
      "Prioritize flags with shallow retracement, volume contraction through consolidation, and expansion on breakout through flag resistance.",
    whatToLookFor: [
      "A sharp move upward before the pause",
      "A small pullback that slopes down or moves sideways",
      "A breakout above the flag area"
    ],
    buySignal: "Potential buy idea: price breaks above the flag resistance with strength.",
    exitSignal: "Potential exit clue: price quickly falls back into the flag after the breakout.",
    riskNote: "Works best when the pullback is controlled. Deep pullbacks are weaker.",
    alternatives: ["Ascending Triangle", "Bear Flag"],
    lines: [
      line("price", [[14, 86], [28, 42], [36, 50], [46, 44], [55, 58], [66, 52], [76, 64]]),
      line("guide", [[32, 40], [78, 54]]),
      line("guide", [[30, 55], [76, 69]]),
      line("arrow-up", [[74, 60], [88, 28]])
    ]
  },
  {
    slug: "bear-flag",
    name: "Bear Flag",
    category: "continuation",
    horizons: ["short-term", "medium-term"],
    riskProfiles: ["balanced", "aggressive"],
    summary: "A sharp move down pauses briefly, then may continue lower.",
    beginnerMeaning:
      "This is the opposite of a bull flag: price drops hard, pauses, then may fall again.",
    experiencedMeaning:
      "A bearish continuation setup marked by an impulsive selloff followed by a weak upward-sloping retracement channel.",
    beginnerUsage:
      "Watch for the price to break below the small bounce pattern. If it climbs back above the pattern, the setup may not be working.",
    experiencedUsage:
      "Look for lower-quality bounce structure, weak reclaim attempts, and breakdown confirmation beneath the lower channel boundary.",
    whatToLookFor: [
      "A strong move downward before the pause",
      "A small bounce that slopes upward",
      "A breakdown below the flag support area"
    ],
    buySignal: "Potential signal: price breaks down below the lower edge of the flag.",
    exitSignal: "Potential exit clue: price reclaims the flag and holds above it.",
    riskNote: "Failed bear flags can reverse sharply upward, so invalidation matters.",
    alternatives: ["Descending Triangle", "Bull Flag"],
    lines: [
      line("price", [[16, 28], [28, 70], [38, 62], [48, 66], [58, 54], [68, 60], [78, 46]]),
      line("guide", [[30, 72], [80, 50]]),
      line("guide", [[30, 56], [80, 34]]),
      line("arrow-down", [[76, 50], [90, 84]])
    ]
  },
  {
    slug: "double-bottom",
    name: "Double Bottom",
    category: "reversal",
    horizons: ["short-term", "medium-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Price hits a low twice and then tries to reverse upward.",
    beginnerMeaning:
      "This looks like a W shape. It can suggest sellers are losing control and buyers are stepping back in.",
    experiencedMeaning:
      "A bullish reversal structure where price rejects the same demand zone twice before reclaiming the neckline.",
    beginnerUsage:
      "Many traders wait for price to move above the middle peak of the W before trusting the reversal.",
    experiencedUsage:
      "Favor double bottoms with clean support defense, improving momentum, and neckline reclaim confirmation instead of premature bottom-fishing.",
    whatToLookFor: [
      "A first low, bounce, and second low near the same area",
      "The second low holds instead of breaking much lower",
      "A move above the middle peak between the lows"
    ],
    buySignal: "Potential buy idea: price breaks above the neckline between the two lows.",
    exitSignal: "Potential exit clue: price loses the second low after the breakout attempt.",
    riskNote: "A double bottom is stronger when the second drop shows less selling pressure.",
    alternatives: ["Inverse Head and Shoulders", "Double Top"],
    lines: [
      line("price", [[12, 30], [26, 78], [40, 48], [54, 80], [70, 44], [84, 24]]),
      line("guide", [[28, 48], [72, 48]]),
      line("arrow-up", [[72, 42], [88, 12]])
    ]
  },
  {
    slug: "double-top",
    name: "Double Top",
    category: "reversal",
    horizons: ["short-term", "medium-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Price reaches a high twice and then starts to weaken.",
    beginnerMeaning:
      "This looks like an M shape. It can suggest buyers are running out of strength.",
    experiencedMeaning:
      "A bearish reversal pattern where price fails twice near the same resistance and then loses neckline support.",
    beginnerUsage:
      "Many traders wait for price to fall below the middle low of the M before treating it as a real breakdown.",
    experiencedUsage:
      "Look for rejection at resistance, momentum loss on the retest, and a decisive neckline break for confirmation.",
    whatToLookFor: [
      "A first peak, pullback, and second peak near the same area",
      "The second peak fails to break out clearly",
      "A move below the neckline between the peaks"
    ],
    buySignal: "Potential bearish signal: price breaks below the neckline after the second peak fails.",
    exitSignal: "Potential exit clue: price reclaims the neckline and holds above it.",
    riskNote: "A weak breakdown can turn into a range instead of a reversal.",
    alternatives: ["Head and Shoulders", "Double Bottom"],
    lines: [
      line("price", [[14, 84], [28, 30], [40, 52], [52, 28], [68, 50], [84, 82]]),
      line("guide", [[30, 52], [70, 52]]),
      line("arrow-down", [[70, 56], [86, 88]])
    ]
  },
  {
    slug: "ascending-triangle",
    name: "Ascending Triangle",
    category: "continuation",
    horizons: ["medium-term", "long-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Price keeps pressing into a flat ceiling while lows rise underneath it.",
    beginnerMeaning:
      "Buyers keep pushing higher while sellers defend one price area. If buyers finally break through, price can move fast.",
    experiencedMeaning:
      "A bullish compression structure with horizontal resistance and ascending support, often resolving in the direction of pressure.",
    beginnerUsage:
      "Watch the flat top area. If price breaks above it clearly, that can be the main trigger to watch.",
    experiencedUsage:
      "Look for repeated resistance tests, rising swing lows, and breakout confirmation above the horizontal supply line.",
    whatToLookFor: [
      "A flat resistance line on top",
      "Higher lows pressing upward",
      "A breakout through resistance"
    ],
    buySignal: "Potential buy idea: price breaks above the flat top resistance.",
    exitSignal: "Potential exit clue: price falls back into the triangle and loses the rising support.",
    riskNote: "The more obvious the triangle, the more traders will watch the same breakout level.",
    alternatives: ["Bull Flag", "Descending Triangle"],
    lines: [
      line("price", [[14, 84], [28, 46], [40, 60], [52, 40], [62, 54], [74, 34], [84, 18]]),
      line("guide", [[24, 42], [86, 42]]),
      line("guide", [[22, 72], [82, 26]]),
      line("arrow-up", [[82, 24], [92, 8]])
    ]
  },
  {
    slug: "descending-triangle",
    name: "Descending Triangle",
    category: "continuation",
    horizons: ["medium-term", "long-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Price keeps pressing into a flat floor while highs keep falling.",
    beginnerMeaning:
      "Sellers keep pushing lower while buyers defend one support level. If support breaks, price can drop quickly.",
    experiencedMeaning:
      "A bearish compression structure with horizontal support and descending resistance, often resolving lower if supply wins.",
    beginnerUsage:
      "Watch the flat support area. If price breaks below it clearly, that is the key trigger to pay attention to.",
    experiencedUsage:
      "Prioritize repeated support tests, lower highs, and a decisive breakdown beneath the horizontal demand line.",
    whatToLookFor: [
      "A flat support line on the bottom",
      "Lower highs pressing downward",
      "A breakdown through support"
    ],
    buySignal: "Potential bearish signal: price breaks below the flat support area.",
    exitSignal: "Potential exit clue: price climbs back into the triangle and holds above support.",
    riskNote: "False breakdowns can happen if price briefly dips below support and snaps back.",
    alternatives: ["Bear Flag", "Ascending Triangle"],
    lines: [
      line("price", [[12, 20], [26, 54], [38, 40], [52, 62], [64, 50], [76, 74], [86, 88]]),
      line("guide", [[22, 72], [88, 72]]),
      line("guide", [[24, 22], [84, 68]]),
      line("arrow-down", [[84, 78], [92, 96]])
    ]
  },
  {
    slug: "head-shoulders",
    name: "Head and Shoulders",
    category: "reversal",
    horizons: ["medium-term", "long-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Three peaks form, with the middle peak highest, then price breaks down.",
    beginnerMeaning:
      "This pattern can show an uptrend is weakening. The middle peak is the head, and the two smaller peaks are the shoulders.",
    experiencedMeaning:
      "A bearish reversal structure defined by left shoulder, head, right shoulder, and neckline breakdown confirmation.",
    beginnerUsage:
      "Traders often focus on the neckline. If price breaks below it after the right shoulder forms, the pattern becomes more meaningful.",
    experiencedUsage:
      "Look for a clear head above both shoulders, momentum deterioration on the right shoulder, and decisive neckline failure.",
    whatToLookFor: [
      "A left shoulder, higher head, and lower right shoulder",
      "A neckline connecting the lows between peaks",
      "A break below the neckline"
    ],
    buySignal: "Potential bearish signal: price breaks below the neckline after the right shoulder forms.",
    exitSignal: "Potential exit clue: price reclaims the neckline and invalidates the breakdown.",
    riskNote: "Without a neckline break, this is just a shape, not a confirmed reversal.",
    alternatives: ["Double Top", "Inverse Head and Shoulders"],
    lines: [
      line("price", [[12, 78], [26, 40], [38, 56], [50, 24], [62, 50], [74, 38], [88, 78]]),
      line("guide", [[24, 58], [78, 58]]),
      line("arrow-down", [[78, 60], [90, 90]])
    ]
  },
  {
    slug: "inverse-head-shoulders",
    name: "Inverse Head and Shoulders",
    category: "reversal",
    horizons: ["medium-term", "long-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Three lows form, with the middle low deepest, then price breaks upward.",
    beginnerMeaning:
      "This is a possible reversal from downtrend to uptrend. The middle dip is the head, and the two smaller dips are the shoulders.",
    experiencedMeaning:
      "A bullish reversal structure featuring a left shoulder, deeper head, right shoulder, and neckline breakout.",
    beginnerUsage:
      "Many traders wait for a move above the neckline before trusting the pattern.",
    experiencedUsage:
      "Look for a controlled right shoulder and a strong neckline reclaim before treating the reversal as active.",
    whatToLookFor: [
      "A left shoulder, lower head, and higher right shoulder",
      "A neckline connecting the bounces between lows",
      "A breakout above the neckline"
    ],
    buySignal: "Potential buy idea: price breaks above the neckline after the right shoulder forms.",
    exitSignal: "Potential exit clue: price loses the right shoulder low after the breakout.",
    riskNote: "The breakout matters more than the shape alone.",
    alternatives: ["Double Bottom", "Head and Shoulders"],
    lines: [
      line("price", [[12, 24], [26, 62], [38, 46], [50, 82], [62, 48], [74, 60], [88, 24]]),
      line("guide", [[24, 44], [80, 44]]),
      line("arrow-up", [[80, 40], [92, 10]])
    ]
  },
  {
    slug: "symmetrical-triangle",
    name: "Symmetrical Triangle",
    category: "continuation",
    horizons: ["short-term", "medium-term"],
    riskProfiles: ["balanced", "aggressive"],
    summary: "Price compresses between lower highs and higher lows until it is forced to break out or break down.",
    beginnerMeaning:
      "Price keeps getting squeezed tighter and tighter. Traders watch to see which side finally wins.",
    experiencedMeaning:
      "A neutral compression structure where converging trendlines often lead to an expansion move once price resolves.",
    beginnerUsage:
      "Wait for price to clearly break out of the triangle instead of guessing early.",
    experiencedUsage:
      "Treat it as a volatility compression setup and wait for directional confirmation beyond converging support or resistance.",
    whatToLookFor: [
      "Lower highs pressing down from above",
      "Higher lows pressing up from below",
      "A breakout or breakdown once the triangle tightens"
    ],
    buySignal: "Potential trigger: price breaks cleanly outside the triangle with follow-through.",
    exitSignal: "Potential exit clue: price falls back inside the triangle after the break.",
    riskNote: "Triangles can produce false moves near the apex if traders enter too early.",
    alternatives: ["Ascending Triangle", "Descending Triangle"],
    lines: [
      line("price", [[16, 28], [30, 60], [42, 40], [54, 58], [66, 46], [76, 54], [84, 50]]),
      line("guide", [[18, 24], [88, 48]]),
      line("guide", [[20, 70], [88, 50]]),
      line("arrow-up", [[84, 48], [94, 16]])
    ]
  },
  {
    slug: "rounding-bottom",
    name: "Rounding Bottom",
    category: "reversal",
    horizons: ["medium-term", "long-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "A long curved bottom forms as selling pressure fades and price slowly turns upward.",
    beginnerMeaning:
      "Instead of reversing sharply, the stock slowly stops falling and gradually starts climbing again.",
    experiencedMeaning:
      "A slower accumulation-style reversal where momentum shifts gradually from distribution to constructive recovery.",
    beginnerUsage:
      "Traders often wait until price moves above the top of the rounded base before trusting the reversal.",
    experiencedUsage:
      "Focus on the right side of the curve and the eventual breakout above resistance rather than trying to buy the exact bottom.",
    whatToLookFor: [
      "A long curved base instead of a sharp V-shape",
      "Price begins making higher lows on the right side",
      "A breakout above the top of the rounded structure"
    ],
    buySignal: "Potential buy idea: price breaks above the resistance at the top of the rounded base.",
    exitSignal: "Potential exit clue: price fails the breakout and falls back into the base.",
    riskNote: "These patterns take time to develop, so patience matters more than speed.",
    alternatives: ["Double Bottom", "Inverse Head and Shoulders"],
    lines: [
      line("price", [[14, 26], [24, 42], [34, 58], [46, 72], [58, 78], [70, 70], [82, 52], [92, 30]]),
      line("guide", [[18, 30], [92, 30]]),
      line("arrow-up", [[88, 32], [96, 10]])
    ]
  },
  {
    slug: "rectangle-range",
    name: "Rectangle Range",
    category: "continuation",
    horizons: ["short-term", "medium-term"],
    riskProfiles: ["careful", "balanced"],
    summary: "Price moves sideways between a clear ceiling and floor before eventually breaking one side.",
    beginnerMeaning:
      "The stock is stuck in a box. Traders watch for the moment it finally breaks out of that box.",
    experiencedMeaning:
      "A horizontal consolidation structure where repeated resistance and support tests define clear breakout or breakdown levels.",
    beginnerUsage:
      "The simplest way to use it is to mark the top and bottom of the box and wait for a break.",
    experiencedUsage:
      "Use the range boundaries as decision points and wait for acceptance beyond the box before acting.",
    whatToLookFor: [
      "Several bounces between the same top and bottom levels",
      "A clear horizontal ceiling and floor",
      "A breakout or breakdown outside the range"
    ],
    buySignal: "Potential trigger: price breaks and holds above the top of the range.",
    exitSignal: "Potential exit clue: price re-enters the box after the breakout or breakdown.",
    riskNote: "Ranges can trap traders who enter in the middle where reward is limited.",
    alternatives: ["Symmetrical Triangle", "Double Top"],
    lines: [
      line("price", [[16, 62], [28, 34], [40, 62], [52, 34], [64, 62], [76, 34], [88, 16]]),
      line("guide", [[16, 30], [90, 30]]),
      line("guide", [[16, 66], [90, 66]]),
      line("arrow-up", [[88, 18], [96, 4]])
    ]
  }
];

export const quizQuestions: QuizQuestion[] = patternLibrary.map((pattern, index, all) => {
  const distractors = all
    .filter((item) => item.slug !== pattern.slug)
    .slice(index % 3, index % 3 + 3)
    .map((item) => item.name);

  return {
    id: `quiz-${pattern.slug}`,
    prompt: "Identify the chart pattern shown below.",
    patternSlug: pattern.slug,
    choices: shuffleChoices([pattern.name, ...distractors].slice(0, 4))
  };
});

export const expertChallenges: ExpertChallenge[] = [
  {
    id: "expert-msft-1",
    title: "MSFT long-range reversal setup",
    patternSlug: "bull-flag",
    ticker: "MSFT",
    timeframe: "Multi-year",
    setup: "Continuation setup before the next leg higher",
    questionImage: "/expert-charts/q1.jpg",
    answerImage: "/expert-charts/a1.jpg",
    direction: "up",
    explanation:
      "This is being treated as a bullish continuation read. The setup resolves upward, so the direction call is up and the pattern label is bull flag."
  },
  {
    id: "expert-msft-2",
    title: "MSFT continuation after breakdown pressure",
    patternSlug: "bear-flag",
    ticker: "MSFT",
    timeframe: "3M",
    setup: "Sharp selloff followed by weak sideways-to-up pause",
    questionImage: "/expert-charts/q2.jpg",
    answerImage: "/expert-charts/a2.jpg",
    direction: "down",
    explanation:
      "The pause after the initial drop does not reclaim the trend. Price eventually continues lower, which is the classic bearish continuation outcome."
  },
  {
    id: "expert-tsla-3",
    title: "TSLA topping structure before breakdown",
    patternSlug: "head-shoulders",
    ticker: "TSLA",
    timeframe: "1Y",
    setup: "Topping pattern followed by clear downside continuation",
    questionImage: "/expert-charts/q3.jpg",
    answerImage: "/expert-charts/a3.jpg",
    direction: "down",
    explanation:
      "This is being scored as a head and shoulders style top. After the pattern completes, the stock breaks lower, so the correct direction is down."
  },
  {
    id: "expert-tsla-4",
    title: "TSLA reversal from a base",
    patternSlug: "double-bottom",
    ticker: "TSLA",
    timeframe: "1M",
    setup: "Support holds twice before a strong upside reversal",
    questionImage: "/expert-charts/q4.jpg",
    answerImage: "/expert-charts/a4.jpg",
    direction: "up",
    explanation:
      "This one is scored as a double bottom with an upside resolution. The base holds, price turns higher, and the correct direction is up."
  }
];

function shuffleChoices(choices: string[]): string[] {
  const copy = [...choices];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = (index * 7 + 3) % (index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function pickFeaturedPattern(inputs: CoachInputs) {
  return patternLibrary
    .map((pattern) => {
      let score = 0;
      if (pattern.horizons.includes(inputs.horizon)) score += 3;
      if (pattern.riskProfiles.includes(inputs.risk)) score += 2;
      if (inputs.horizon === "short-term" && pattern.category === "continuation") score += 1;
      if (inputs.horizon === "long-term" && pattern.category === "reversal") score += 1;
      if (inputs.risk === "careful" && pattern.category === "reversal") score += 1;
      if (inputs.risk === "aggressive" && pattern.name.includes("Flag")) score += 1;
      return { pattern, score };
    })
    .sort((left, right) => right.score - left.score);
}

export function buildPatternGuide(inputs: CoachInputs): PatternGuideResult {
  const ranked = pickFeaturedPattern(inputs);
  const featured = ranked[0].pattern;
  const alternatives = ranked
    .slice(1)
    .map((item) => item.pattern)
    .filter((pattern) => featured.alternatives.includes(pattern.name))
    .concat(ranked.slice(1).map((item) => item.pattern))
    .filter((pattern, index, array) => array.findIndex((item) => item.slug === pattern.slug) === index)
    .slice(0, 3);

  return {
    heroTitle: `${featured.name} is a strong pattern to study first`,
    featured,
    alternatives
  };
}

export function getPatternBySlug(slug: string): PatternCard {
  return patternLibrary.find((pattern) => pattern.slug === slug) ?? patternLibrary[0];
}
