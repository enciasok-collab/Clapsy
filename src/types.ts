/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizChoice {
  text: string;
  score: number;
  jawTensionWeight: number; // impact on mandibular tension index
  sleepDisruptionWeight: number; // impact on sleep quality disruption
}

export interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  category: "mandibular" | "sleep" | "stress";
  choices: QuizChoice[];
}

export interface QuizResultDetails {
  title: string;
  category: "mild" | "moderate" | "severe";
  score: number;
  jawTensionIndex: number; // 0-100
  sleepQualityIndex: number; // 0-100 (100 is excellent, lower is disrupted)
  description: string;
  physiologicalImplication: string;
  customActionPlan: string[];
}

export interface SoundOption {
  id: string;
  name: string;
  category: "nature" | "therapy" | "frequencies";
  description: string;
  active: boolean;
  volume: number; // 0 to 1
  iconName: string;
}

export interface LeadData {
  name: string;
  email: string;
  score: number;
  jawTension: number;
  sleepQuality: number;
}
