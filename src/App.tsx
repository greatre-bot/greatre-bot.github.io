import { useEffect, useMemo, useState } from 'react';
import { EnergyCard } from './components/EnergyCard';
import { IntroSplash } from './components/IntroSplash';
import { Landing } from './components/Landing';
import { LotteryWheel } from './components/LotteryWheel';
import { PhoneFrame } from './components/PhoneFrame';
import { ProductShowcase } from './components/ProductShowcase';
import { Quiz } from './components/Quiz';
import { Result } from './components/Result';
import { resultProfiles, type EnergyType } from './data/results';
import { getDominantType, getEnergyIndex } from './utils/scoring';

type Step = 'landing' | 'quiz' | 'result' | 'card' | 'lottery' | 'products';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [answers, setAnswers] = useState<EnergyType[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);

  const resultType = useMemo(() => getDominantType(answers), [answers]);
  const profile = resultProfiles[resultType];
  const energyIndex = useMemo(
    () => getEnergyIndex(resultType, answers),
    [answers, resultType],
  );

  const startQuiz = () => {
    setAnswers([]);
    setStep('quiz');
  };

  const goHome = () => {
    setAnswers([]);
    setStep('landing');
  };

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIntroExiting(true), 2300);
    const hideTimer = window.setTimeout(() => setShowIntro(false), 2850);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const renderStep = () => {
    switch (step) {
      case 'quiz':
        return (
          <Quiz
            onComplete={(nextAnswers) => {
              setAnswers(nextAnswers);
              setStep('result');
            }}
          />
        );
      case 'result':
        return (
          <Result
            profile={profile}
            energyIndex={energyIndex}
            onCreateCard={() => setStep('card')}
            onRetake={startQuiz}
          />
        );
      case 'card':
        return (
          <EnergyCard
            profile={profile}
            energyIndex={energyIndex}
            onLottery={() => setStep('lottery')}
            onRetake={startQuiz}
          />
        );
      case 'lottery':
        return (
          <LotteryWheel
            profile={profile}
            onProducts={() => setStep('products')}
            onHome={goHome}
          />
        );
      case 'products':
        return (
          <ProductShowcase
            profile={profile}
            onBack={() => setStep('lottery')}
            onHome={goHome}
          />
        );
      case 'landing':
      default:
        return <Landing onStart={startQuiz} />;
    }
  };

  return (
    <main className="app-shell">
      <section className="phone-zone" aria-label="元气森林互动H5手机界面">
        <PhoneFrame>
          {showIntro ? <IntroSplash exiting={introExiting} /> : null}
          <div className={`screen screen-${step}`} key={step}>
            {renderStep()}
          </div>
        </PhoneFrame>
      </section>
    </main>
  );
}
