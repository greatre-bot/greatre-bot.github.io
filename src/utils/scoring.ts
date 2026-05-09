import { energyOrder, type EnergyType } from '../data/results';

export type ScoreMap = Record<EnergyType, number>;

export function createInitialScores(): ScoreMap {
  return {
    night: 0,
    study: 0,
    sport: 0,
    social: 0,
  };
}

export function scoreAnswers(answers: EnergyType[]): ScoreMap {
  return answers.reduce<ScoreMap>((scores, type) => {
    scores[type] += 1;
    return scores;
  }, createInitialScores());
}

export function getDominantType(answers: EnergyType[]): EnergyType {
  const scores = scoreAnswers(answers);

  return energyOrder.reduce<EnergyType>((winner, current) => {
    if (scores[current] > scores[winner]) {
      return current;
    }

    return winner;
  }, energyOrder[0]);
}

export function getEnergyIndex(type: EnergyType, answers: EnergyType[]): number {
  const baseIndex: Record<EnergyType, number> = {
    night: 78,
    study: 86,
    sport: 92,
    social: 88,
  };
  const matchCount = answers.filter((answer) => answer === type).length;
  const bonus = Math.min(matchCount * 2, 8);

  return Math.min(baseIndex[type] + bonus, 98);
}
