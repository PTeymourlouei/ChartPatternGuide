"use client";

import { useEffect, useMemo, useState } from "react";

import {
  buildPatternGuide,
  expertChallenges,
  getPatternBySlug,
  patternLibrary,
  quizQuestions,
  type CoachInputs,
  type ExperienceLevel,
  type PatternCard,
  type RiskProfile,
  type TradeHorizon
} from "@/lib/trade-coach";

const defaultInputs: CoachInputs = {
  horizon: "medium-term",
  risk: "balanced",
  experience: "beginner"
};

const horizonOptions: Array<{ value: TradeHorizon; label: string; hint: string }> = [
  { value: "short-term", label: "Short term", hint: "Quick setups and momentum patterns" },
  { value: "medium-term", label: "Medium term", hint: "Classic swing-trading structures" },
  { value: "long-term", label: "Long term", hint: "Bigger reversals and slower breakouts" }
];

const riskOptions: Array<{ value: RiskProfile; label: string; hint: string }> = [
  { value: "careful", label: "Careful", hint: "More confirmation and fewer false starts" },
  { value: "balanced", label: "Balanced", hint: "A mix of patience and opportunity" },
  { value: "aggressive", label: "Aggressive", hint: "Earlier momentum-style setups" }
];

const experienceOptions: Array<{ value: ExperienceLevel; label: string; hint: string }> = [
  { value: "beginner", label: "Beginner", hint: "Simple explanations and plain language" },
  { value: "experienced", label: "Experienced", hint: "More technical chart language" }
];

const progressKey = "chart-pattern-guide-progress";

export function TradeSetupCoach() {
  const [inputs, setInputs] = useState<CoachInputs>(defaultInputs);
  const [leftCompareSlug, setLeftCompareSlug] = useState(patternLibrary[0].slug);
  const [rightCompareSlug, setRightCompareSlug] = useState(patternLibrary[1].slug);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [bestQuizScore, setBestQuizScore] = useState(0);
  const [expertIndex, setExpertIndex] = useState(0);
  const [expertPatternSelection, setExpertPatternSelection] = useState<string>("");
  const [expertDirectionSelection, setExpertDirectionSelection] = useState<"" | "up" | "down">("");
  const [expertSubmitted, setExpertSubmitted] = useState(false);
  const [expertView, setExpertView] = useState<"question" | "answer">("question");
  const [expertPoints, setExpertPoints] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(progressKey);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        bestQuizScore?: number;
        expertIndex?: number;
        expertPoints?: number;
      };

      setBestQuizScore(parsed.bestQuizScore ?? 0);
      setExpertIndex(parsed.expertIndex ?? 0);
      setExpertPoints(parsed.expertPoints ?? 0);
    } catch {
      // ignore invalid local storage state
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      progressKey,
      JSON.stringify({
        bestQuizScore,
        expertIndex,
        expertPoints
      })
    );
  }, [bestQuizScore, expertIndex, expertPoints]);

  const guide = buildPatternGuide(inputs);

  const visiblePatterns = useMemo(() => {
    return patternLibrary.filter((pattern) => pattern.horizons.includes(inputs.horizon)).slice(0, 8);
  }, [inputs.horizon]);

  const leftPattern = getPatternBySlug(leftCompareSlug);
  const rightPattern = getPatternBySlug(rightCompareSlug);
  const quizScore = quizQuestions.reduce((total, question) => {
    const chosen = quizAnswers[question.id];
    const correct = getPatternBySlug(question.patternSlug).name;
    return total + (chosen === correct ? 1 : 0);
  }, 0);
  const allCorrect = quizSubmitted && quizScore === quizQuestions.length;
  const expertUnlocked = bestQuizScore === quizQuestions.length || allCorrect;
  const expertChallenge = expertChallenges[Math.min(expertIndex, expertChallenges.length - 1)];
  const currentExpertPattern = getPatternBySlug(expertChallenge.patternSlug);

  function submitQuiz() {
    setQuizSubmitted(true);
    setBestQuizScore((current) => Math.max(current, quizScore));
  }

  function resetQuiz() {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }

  function submitExpertAnswer() {
    if (!expertPatternSelection || !expertDirectionSelection) {
      return;
    }

    setExpertSubmitted(true);
    setExpertPoints(
      (current) =>
        current +
        (expertPatternSelection === currentExpertPattern.name ? 1 : 0) +
        (expertDirectionSelection === expertChallenge.direction ? 1 : 0)
    );
  }

  function resetExpertState() {
    setExpertPatternSelection("");
    setExpertDirectionSelection("");
    setExpertSubmitted(false);
    setExpertView("question");
  }

  function goToExpertChallenge(nextIndex: number) {
    setExpertIndex(nextIndex);
    resetExpertState();
  }

  function previousExpertChallenge() {
    goToExpertChallenge(Math.max(expertIndex - 1, 0));
  }

  function nextExpertChallenge() {
    goToExpertChallenge(Math.min(expertIndex + 1, expertChallenges.length - 1));
  }

  return (
    <main className="coach-page">
      <nav className="top-nav">
        <a href="#top">Overview</a>
        <a href="#focus">Focus Pattern</a>
        <a href="#library">Pattern Library</a>
        <a href="#compare">Comparison Lab</a>
        <a href="#quiz">Pattern Quiz</a>
        <a href="#expert">Expert Quiz</a>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Chart Pattern Guide</span>
          <h1>Learn what a pattern means before you trade it.</h1>
          <p>
            A clean, readable tool for understanding common chart patterns, the triggers to
            watch, and how traders typically use them.
          </p>
          <div className="hero-badges">
            <span>Pattern guide</span>
            <span>Comparison lab</span>
            <span>Quiz and expert practice</span>
          </div>
        </div>
      </section>

      <section id="focus" className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Focus Pattern</span>
          <h2>Featured setup and learning preferences</h2>
        </div>

        <div className="focus-grid">
          <div className="control-panel">
            <div className="section-heading compact">
              <span className="eyebrow">Preferences</span>
              <h2>Describe how you want to learn</h2>
              <p>
                The guide shifts the featured pattern and explanation style based on your timeframe,
                risk style, and experience level.
              </p>
            </div>

            <OptionGroup
              label="Time horizon"
              value={inputs.horizon}
              options={horizonOptions}
              onChange={(value) => setInputs((current) => ({ ...current, horizon: value as TradeHorizon }))}
            />
            <OptionGroup
              label="Risk style"
              value={inputs.risk}
              options={riskOptions}
              onChange={(value) => setInputs((current) => ({ ...current, risk: value as RiskProfile }))}
            />
            <OptionGroup
              label="Experience"
              value={inputs.experience}
              options={experienceOptions}
              onChange={(value) =>
                setInputs((current) => ({ ...current, experience: value as ExperienceLevel }))
              }
            />

            <div className="progress-card">
              <span className="eyebrow">Progress</span>
              <h3>Phase 1 scoring</h3>
              <p>Best pattern quiz score: {bestQuizScore}/{quizQuestions.length}</p>
              <p>Expert challenge points: {expertPoints}/{expertChallenges.length * 2}</p>
              <p className="mini-note">
                Progress is saved locally for now. Cloud save will slot into phase 2 with Supabase.
              </p>
            </div>
          </div>

          <div className="results-panel">
            <section className="featured-card">
              <div className="section-heading compact">
                <span className="eyebrow">{guide.featured.category} pattern</span>
                <h2>{guide.featured.name}</h2>
                <p>{guide.featured.summary}</p>
              </div>

              <div className="featured-layout">
                <PatternDiagram pattern={guide.featured} large />
                <div className="meaning-card">
                  <h3>What it means</h3>
                  <p>
                    {inputs.experience === "beginner"
                      ? guide.featured.beginnerMeaning
                      : guide.featured.experiencedMeaning}
                  </p>
                  <h3>How traders use it</h3>
                  <p>
                    {inputs.experience === "beginner"
                      ? guide.featured.beginnerUsage
                      : guide.featured.experiencedUsage}
                  </p>
                </div>
              </div>

              <div className="detail-grid">
                <InfoCard title="What to look for" items={guide.featured.whatToLookFor} />
                <InfoCard title="Key triggers" items={[guide.featured.buySignal, guide.featured.exitSignal]} />
              </div>

              <article className="risk-card">
                <span className="eyebrow">Risk note</span>
                <p>{guide.featured.riskNote}</p>
              </article>
            </section>
          </div>
        </div>
      </section>

      <section id="library" className="section-shell">
        <div className="section-heading compact">
          <span className="eyebrow">Pattern Library</span>
          <h2>Continuation and reversal pattern reference</h2>
        </div>

        <div className="library-grid">
          {visiblePatterns.map((pattern) => (
            <article key={pattern.slug} className="library-card">
              <PatternDiagram pattern={pattern} />
              <div>
                <h3>{pattern.name}</h3>
                <p>{inputs.experience === "beginner" ? pattern.beginnerMeaning : pattern.experiencedMeaning}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="compare" className="section-shell">
        <section className="comparison-section">
          <div className="section-heading compact">
            <span className="eyebrow">Comparison Lab</span>
            <h2>Compare two patterns side by side</h2>
          </div>

          <div className="comparison-controls">
            <PatternSelect
              label="Left pattern"
              value={leftCompareSlug}
              onChange={setLeftCompareSlug}
            />
            <PatternSelect
              label="Right pattern"
              value={rightCompareSlug}
              onChange={setRightCompareSlug}
            />
          </div>

          <div className="comparison-grid">
            <CompareCard pattern={leftPattern} experience={inputs.experience} />
            <CompareCard pattern={rightPattern} experience={inputs.experience} />
          </div>
        </section>
      </section>

      <section id="quiz" className="section-shell">
        <section className="quiz-section">
            <div className="section-heading compact">
              <span className="eyebrow">Pattern Quiz</span>
              <h2>Master the built-in patterns first</h2>
              <p>
                Get a perfect score to unlock expert mode. That keeps the advanced chart practice
                grounded in the core pattern library.
              </p>
            </div>

            <div className="quiz-meta">
              <span>{quizQuestions.length} questions</span>
              <span>{quizSubmitted ? `Current score: ${quizScore}/${quizQuestions.length}` : "Choose an answer for each card"}</span>
            </div>

            <div className="quiz-grid">
              {quizQuestions.map((question) => {
                const pattern = getPatternBySlug(question.patternSlug);
                const selected = quizAnswers[question.id];
                const correctAnswer = pattern.name;
                const isCorrect = selected === correctAnswer;

                return (
                  <article key={question.id} className={`quiz-card${quizSubmitted ? (isCorrect ? " correct" : " incorrect") : ""}`}>
                    <PatternDiagram pattern={pattern} />
                    <h3>{question.prompt}</h3>
                    <div className="choice-grid">
                      {question.choices.map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          className={`choice-button${selected === choice ? " selected" : ""}`}
                          onClick={() =>
                            setQuizAnswers((current) => ({
                              ...current,
                              [question.id]: choice
                            }))
                          }
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                    {quizSubmitted ? (
                      <p className={`quiz-feedback${isCorrect ? " success" : " error"}`}>
                        {isCorrect ? "Correct." : `Correct answer: ${correctAnswer}.`}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>

            <div className="quiz-actions">
              <button type="button" className="primary-button" onClick={submitQuiz}>
                Grade quiz
              </button>
              <button type="button" className="secondary-button" onClick={resetQuiz}>
                Reset answers
              </button>
            </div>
        </section>
      </section>

      <section id="expert" className="section-shell">
        <section className="expert-section">
            <div className="section-heading compact">
              <span className="eyebrow">Expert Mode</span>
              <h2>Practice on real chart screenshots</h2>
              <p>
                Each question is worth 2 points: 1 for predicting the correct direction and 1 for
                recognizing the correct pattern.
              </p>
            </div>

            {expertUnlocked ? (
              <article className="expert-card">
                <div className="expert-header">
                  <div>
                    <span className="eyebrow">{expertChallenge.ticker} · {expertChallenge.timeframe}</span>
                    <h3>{expertChallenge.title}</h3>
                    <p>{expertChallenge.setup}</p>
                  </div>
                  <span className="expert-counter">
                    Challenge {Math.min(expertIndex + 1, expertChallenges.length)} of {expertChallenges.length}
                  </span>
                </div>

                <div className="expert-top-controls">
                  <div className="expert-nav-buttons">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={previousExpertChallenge}
                      disabled={expertIndex === 0}
                    >
                      Previous question
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={nextExpertChallenge}
                      disabled={expertIndex === expertChallenges.length - 1}
                    >
                      Next question
                    </button>
                  </div>

                  <div className="expert-toggle">
                    <button
                      type="button"
                      className={`choice-button${expertView === "question" ? " selected" : ""}`}
                      onClick={() => setExpertView("question")}
                    >
                      Question image
                    </button>
                    <button
                      type="button"
                      className={`choice-button${expertView === "answer" ? " selected" : ""}`}
                      onClick={() => setExpertView("answer")}
                    >
                      Answer image
                    </button>
                  </div>
                </div>

                <figure className="expert-image-frame">
                  <img
                    src={expertView === "answer" ? expertChallenge.answerImage : expertChallenge.questionImage}
                    alt={`${expertChallenge.ticker} expert challenge`}
                    className="expert-image"
                  />
                </figure>

                <div className="expert-input-grid">
                  <label className="pattern-select">
                    <span>Recognized pattern</span>
                    <select
                      value={expertPatternSelection}
                      onChange={(event) => setExpertPatternSelection(event.target.value)}
                    >
                      <option value="">Select a pattern</option>
                      {patternLibrary.map((pattern) => (
                        <option key={pattern.slug} value={pattern.name}>
                          {pattern.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="direction-picker">
                    <span>Predicted direction</span>
                    <div className="direction-buttons">
                      <button
                        type="button"
                        className={`choice-button${expertDirectionSelection === "up" ? " selected" : ""}`}
                        onClick={() => setExpertDirectionSelection("up")}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className={`choice-button${expertDirectionSelection === "down" ? " selected" : ""}`}
                        onClick={() => setExpertDirectionSelection("down")}
                      >
                        Down
                      </button>
                    </div>
                  </div>
                </div>

                <div className="quiz-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={submitExpertAnswer}
                    disabled={!expertPatternSelection || !expertDirectionSelection || expertSubmitted}
                  >
                    Lock answer
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setExpertView((current) => (current === "question" ? "answer" : "question"))}
                  >
                    Toggle question / answer
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={nextExpertChallenge}
                    disabled={expertIndex === expertChallenges.length - 1}
                  >
                    Next challenge
                  </button>
                </div>

                {expertSubmitted ? (
                  <div className="expert-feedback">
                    <p>
                      Pattern point:{" "}
                      <span className={expertPatternSelection === currentExpertPattern.name ? "success" : "error"}>
                        {expertPatternSelection === currentExpertPattern.name ? "1/1" : "0/1"}
                      </span>
                    </p>
                    <p>
                      Direction point:{" "}
                      <span className={expertDirectionSelection === expertChallenge.direction ? "success" : "error"}>
                        {expertDirectionSelection === expertChallenge.direction ? "1/1" : "0/1"}
                      </span>
                    </p>
                    <p className={expertPatternSelection === currentExpertPattern.name && expertDirectionSelection === expertChallenge.direction ? "success" : "error"}>
                      Correct pattern: {currentExpertPattern.name}. Correct direction: {expertChallenge.direction}.
                    </p>
                    {expertView === "answer" ? <p>{expertChallenge.explanation}</p> : null}
                  </div>
                ) : null}
              </article>
            ) : (
              <article className="locked-card">
                <h3>Expert mode locked</h3>
                <p>
                  Score 100% on the built-in pattern quiz first. That unlock requirement helps
                  make the advanced challenges feel earned instead of random.
                </p>
              </article>
            )}
        </section>
      </section>
    </main>
  );
}

function OptionGroup({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string; hint: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <section className="option-group">
      <div className="option-label-row">
        <span>{label}</span>
      </div>
      <div className="option-grid">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              className={`option-card${selected ? " selected" : ""}`}
              onClick={() => onChange(option.value)}
            >
              <strong>{option.label}</strong>
              <span>{option.hint}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PatternSelect({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="pattern-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {patternLibrary.map((pattern) => (
          <option key={pattern.slug} value={pattern.slug}>
            {pattern.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function CompareCard({
  pattern,
  experience
}: {
  pattern: PatternCard;
  experience: ExperienceLevel;
}) {
  return (
    <article className="compare-card">
      <PatternDiagram pattern={pattern} />
      <h3>{pattern.name}</h3>
      <p>{experience === "beginner" ? pattern.beginnerMeaning : pattern.experiencedMeaning}</p>
      <InfoCard title="What to look for" items={pattern.whatToLookFor} />
      <InfoCard title="Triggers" items={[pattern.buySignal, pattern.exitSignal]} />
      <article className="inline-risk-note">
        <span className="eyebrow">Risk note</span>
        <p>{pattern.riskNote}</p>
      </article>
    </article>
  );
}

function PatternDiagram({ pattern, large = false }: { pattern: PatternCard; large?: boolean }) {
  const lineClass = {
    price: "diagram-price",
    guide: "diagram-guide",
    "arrow-up": "diagram-arrow-up",
    "arrow-down": "diagram-arrow-down"
  } as const;

  return (
    <figure className={`pattern-diagram${large ? " large" : ""}`}>
      <svg viewBox="0 0 100 100" role="img" aria-label={pattern.name}>
        <rect x="0" y="0" width="100" height="100" className="diagram-bg" />
        {pattern.lines.map((line, index) => (
          <polyline
            key={`${pattern.slug}-${index}`}
            points={line.points.map(([x, y]) => `${x},${y}`).join(" ")}
            className={lineClass[line.color]}
          />
        ))}
      </svg>
    </figure>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
