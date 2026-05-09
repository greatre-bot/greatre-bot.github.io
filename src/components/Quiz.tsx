import { useMemo, useState } from 'react';
import { quizQuestions } from '../data/quiz';
import type { EnergyType } from '../data/results';
import { assetPath } from '../utils/assets';

interface QuizProps {
  onComplete: (answers: EnergyType[]) => void;
}

const quizProductMap: Record<EnergyType, string> = {
  night: 'assets/official/peach-bottle.png',
  study: 'assets/official/lime-bottle.png',
  sport: 'assets/official/alien-peach.png',
  social: 'assets/official/grapefruit-bottle.png',
};

const quizNotes: Record<EnergyType, string> = {
  night: '白桃回血',
  study: '卡曼橘续航',
  sport: '电解质回弹',
  social: '荔枝冒泡',
};

export function Quiz({ onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<EnergyType[]>([]);
  const [noteType, setNoteType] = useState<EnergyType>('night');

  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  const spotlightType = useMemo<EnergyType>(() => {
    return currentQuestion.options[currentIndex % currentQuestion.options.length].type;
  }, [currentIndex, currentQuestion.options]);

  const handleSelect = (optionType: EnergyType, optionIndex: number) => {
    if (selectedIndex !== null) {
      return;
    }

    setSelectedIndex(optionIndex);
    setNoteType(optionType);
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
          src={assetPath(quizProductMap[spotlightType])}
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

      <div className="quiz-collage" aria-label="可点击的元气元素">
        {(Object.keys(quizProductMap) as EnergyType[]).map((type, index) => (
          <button
            className={`quiz-float quiz-float-${index} ${
              noteType === type ? 'active' : ''
            }`}
            type="button"
            key={type}
            onClick={() => setNoteType(type)}
          >
            <img src={assetPath(quizProductMap[type])} alt="" />
            <span>{quizNotes[type]}</span>
          </button>
        ))}
        <p>{quizNotes[noteType]}，今天先补这一口。</p>
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
