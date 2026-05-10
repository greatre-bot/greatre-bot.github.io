import { useState } from 'react';
import { quizQuestions } from '../data/quiz';
import type { EnergyType } from '../data/results';
import { assetPath } from '../utils/assets';
import { playSelectSound } from '../utils/sound';

interface QuizProps {
  onComplete: (answers: EnergyType[]) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<EnergyType[]>([]);
  const [pulse, setPulse] = useState(0);

  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  const handleSelect = (optionType: EnergyType, optionIndex: number) => {
    if (selectedIndex !== null) {
      return;
    }

    setSelectedIndex(optionIndex);
    setPulse((value) => value + 1);
    playSelectSound();
    const nextAnswers = [...answers, optionType];

    window.setTimeout(() => {
      if (currentIndex === quizQuestions.length - 1) {
        onComplete(nextAnswers);
        return;
      }

      setAnswers(nextAnswers);
      setCurrentIndex((index) => index + 1);
      setSelectedIndex(null);
    }, 430);
  };

  return (
    <section className="quiz-screen branded-quiz">
      <div className="quiz-brand-layer" aria-hidden="true">
        <img
          className="quiz-watermark-logo"
          src={assetPath('assets/official/yuanqi-logo.png')}
          alt=""
        />
        <img
          className="quiz-side-bottle"
          src={assetPath('assets/official/peach-bottle.png')}
          alt=""
        />
        <img
          className="quiz-splash"
          src={assetPath('assets/official/water-splash-wide.png')}
          alt=""
        />
      </div>

      <div className="quiz-header">
        <div>
          <p className="eyebrow">元气状态测试</p>
          <h2>
            {currentIndex + 1}/{quizQuestions.length}
          </h2>
        </div>
        <span className="quiz-badge">0糖轻负担</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={quizQuestions.length}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-atmosphere" aria-hidden="true">
        <span>0糖</span>
        <span>0脂</span>
        <span>0卡</span>
        <i key={pulse} />
      </div>

      <div className="question-block question-card">
        <p className="question-count">QUESTION {currentQuestion.id}</p>
        <h1>{currentQuestion.question}</h1>
      </div>

      <div className="option-list">
        {currentQuestion.options.map((option, index) => (
          <button
            className={`option-button option-${option.type} ${
              selectedIndex === index ? 'selected' : ''
            }`}
            type="button"
            key={option.code}
            onClick={() => handleSelect(option.type, index)}
          >
            <span className="option-code">{option.code}</span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
