import React, { useState, useMemo, useEffect } from 'react';
import { quizQuestions } from '../data/quizData';
import { QuizQuestion } from '../types';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  Shuffle,
  Trophy,
  Sparkles,
  BookOpen
} from 'lucide-react';

/**
 * Fisher-Yates in-place copy shuffle
 */
function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Shuffles the options of a question and updates the correctIndex accordingly
 */
function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const originalCorrectText = q.options[q.correctIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);
  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex
  };
}

/**
 * Builds a fresh randomized quiz: shuffles all 50 questions order first
 * (so any question, including #50, can appear first), slices to limit,
 * and shuffles the answer options for each question.
 */
function buildShuffledQuiz(limit: number): QuizQuestion[] {
  const shuffledPool = shuffleArray(quizQuestions);
  return shuffledPool.slice(0, limit).map((q) => shuffleOptions(q));
}

export const QuizModule: React.FC = () => {
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(50);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<
    Array<{ questionId: number; chosenIndex: number; isCorrect: boolean }>
  >([]);

  // Initialize quiz with both question order AND options freshly shuffled every session
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildShuffledQuiz(50));

  // Re-generate randomized question order + shuffled options whenever starting/restarting
  const initQuiz = (limit: number) => {
    const selected = buildShuffledQuiz(limit);
    setQuestions(selected);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
    setUserAnswers([]);
  };

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => [
      ...prev,
      { questionId: currentQ.id, chosenIndex: index, isCorrect }
    ]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    initQuiz(questionCountLimit);
  };

  const handleModeChange = (limit: number) => {
    setQuestionCountLimit(limit);
    initQuiz(limit);
  };

  // Performance category calculations
  const performanceStats: Record<string, { correct: number; total: number }> = useMemo(() => {
    const categoryMap: Record<string, { correct: number; total: number }> = {};
    questions.slice(0, userAnswers.length).forEach((q, idx) => {
      const ans = userAnswers[idx];
      if (!categoryMap[q.category]) {
        categoryMap[q.category] = { correct: 0, total: 0 };
      }
      categoryMap[q.category].total += 1;
      if (ans && ans.isCorrect) {
        categoryMap[q.category].correct += 1;
      }
    });
    return categoryMap;
  }, [questions, userAnswers]);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 sm:p-8 shadow-2xl space-y-6">
      {!completed ? (
        <>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#73CAE5]/10 border border-[#73CAE5]/20 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 text-[#73CAE5]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                  Grande Quiz da Era Nuclear
                </h3>
                <span className="text-[11px] text-[#B7B7B7] flex items-center space-x-1.5 mt-0.5">
                  <Shuffle className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-medium">Questões e Alternativas Embaralhadas a Cada Tentativa</span>
                </span>
              </div>
            </div>

            {/* Mode selection pills (10, 25 or 50 questions) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 w-full sm:w-auto">
              <div className="grid grid-cols-3 sm:flex w-full sm:w-auto rounded-lg bg-white/5 p-1 border border-white/10 text-xs font-mono gap-1 sm:gap-0">
                <button
                  onClick={() => handleModeChange(10)}
                  className={`px-2 py-1.5 sm:px-2.5 sm:py-1 rounded-md transition-all cursor-pointer min-h-[40px] sm:min-h-0 flex items-center justify-center ${
                    questionCountLimit === 10
                      ? 'bg-[#73CAE5] text-[#0D0D0D] font-bold'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                  title="10 Questões sorteadas aleatoriamente"
                >
                  10 Q
                </button>
                <button
                  onClick={() => handleModeChange(25)}
                  className={`px-2 py-1.5 sm:px-2.5 sm:py-1 rounded-md transition-all cursor-pointer min-h-[40px] sm:min-h-0 flex items-center justify-center ${
                    questionCountLimit === 25
                      ? 'bg-[#73CAE5] text-[#0D0D0D] font-bold'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                  title="25 Questões sorteadas aleatoriamente"
                >
                  25 Q
                </button>
                <button
                  onClick={() => handleModeChange(50)}
                  className={`px-2 py-1.5 sm:px-2.5 sm:py-1 rounded-md transition-all cursor-pointer min-h-[40px] sm:min-h-0 flex items-center justify-center text-center leading-tight ${
                    questionCountLimit === 50
                      ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold shadow-sm'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                  title="Desafio Completo: Todas as 50 Questões em ordem aleatória"
                >
                  <span className="max-[400px]:hidden">50 Q (Completo)</span>
                  <span className="min-[401px]:hidden">50 Q</span>
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1.5">
                <div className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-3 py-1.5 rounded-full border border-[#73CAE5]/30 shrink-0">
                  Questão {currentIdx + 1} / {questions.length}
                </div>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#B7B7B7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[42px] min-h-[42px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                  title="Sortear nova ordem das questões agora"
                  aria-label="Embaralhar e reiniciar quiz"
                >
                  <Shuffle className="w-4 h-4 text-[#73CAE5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#B7B7B7]">
              <span>Progresso no Teste</span>
              <span>
                {Math.round(((currentIdx + 1) / questions.length) * 100)}% • Acertos:{' '}
                <strong className="text-emerald-400 font-bold">{score}</strong> / {currentIdx + (isAnswered ? 1 : 0)}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#8F83FF]/15 text-[#8F83FF] border border-[#8F83FF]/30 font-mono">
                {currentQ.category}
              </span>
              <span className="text-[11px] text-[#B7B7B7] font-mono">
                ID #{currentQ.id}
              </span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Shuffled Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isCorrect = idx === currentQ.correctIndex;
              const isChosen = idx === selectedOption;

              let optionStyle =
                'bg-white/[0.03] border-white/10 text-[#B7B7B7] hover:border-white/30 hover:text-white';
              if (isAnswered) {
                if (isCorrect) {
                  optionStyle =
                    'bg-emerald-950/40 border-emerald-500 text-white font-medium shadow-md shadow-emerald-500/10';
                } else if (isChosen) {
                  optionStyle = 'bg-rose-950/40 border-rose-500 text-white font-medium';
                } else {
                  optionStyle = 'bg-white/[0.01] border-white/5 text-white/30';
                }
              }

              return (
                <button
                  key={`${currentQ.id}-${option}`}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full min-w-0 p-3.5 sm:p-4 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-start space-x-3 group ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono transition-colors ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-500 text-[#0D0D0D]'
                        : isAnswered && isChosen && !isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/10 text-white group-hover:bg-white/20'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 min-w-0 break-words leading-relaxed">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isChosen && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scientific Explanation when answered */}
          {isAnswered && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#73CAE5] font-mono">
                <BookOpen className="w-4 h-4" />
                <span>Fundamentação Científica & Histórica:</span>
              </div>
              <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <span className="text-[11px] font-mono text-[#B7B7B7]">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-emerald-400 font-bold">✓ Resposta Correta (+1 ponto)</span>
                  ) : (
                    <span className="text-rose-400 font-bold">
                      ✗ Incorreto — Correta: Alternativa {String.fromCharCode(65 + currentQ.correctIndex)}
                    </span>
                  )}
                </span>

                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-lg bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-[#73CAE5]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer min-h-[42px] sm:min-h-0"
                >
                  <span>
                    {currentIdx + 1 < questions.length
                      ? `Próxima (${currentIdx + 2} de ${questions.length})`
                      : 'Ver Resultado Final'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Quiz Complete Screen */
        <div className="text-center py-6 space-y-8 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] flex items-center justify-center mx-auto shadow-2xl shadow-[#73CAE5]/30">
            <Trophy className="w-10 h-10 text-[#0D0D0D]" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Desafio Nuclear Concluído!
            </h4>
            <p className="text-sm text-[#B7B7B7]">
              Você acertou <strong className="text-[#73CAE5] text-lg">{score}</strong> de{' '}
              <strong className="text-white text-lg">{questions.length}</strong> questões (
              <span className={`font-bold ${percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage}%
              </span>
              ).
            </p>
          </div>

          {/* Performance Badge */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-xs font-bold font-mono">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-white">
                {percentage >= 90
                  ? 'Classificação: Físico Nuclear Sênior (Distinção Máxima)'
                  : percentage >= 70
                  ? 'Classificação: Engenheiro Nuclear & Especialista'
                  : percentage >= 50
                  ? 'Classificação: Pesquisador Assistente'
                  : 'Classificação: Aprendiz da Era Atômica'}
              </span>
            </div>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              {percentage >= 80
                ? 'Espetacular! Você demonstrou domínio profundo sobre física das partículas, reatores nucleares, armas e radioproteção.'
                : 'Excelente jornada de aprendizado! Explore os simuladores interativos e as páginas temáticas para atingir 100% de precisão.'}
            </p>
          </div>

          {/* Breakdown by Category */}
          {Object.keys(performanceStats).length > 0 && (
            <div className="max-w-lg mx-auto text-left space-y-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B7B7B7]">
                Desempenho por Área Temática:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(Object.entries(performanceStats) as [string, { correct: number; total: number }][]).map(
                  ([cat, stat]) => {
                  const catPerc = Math.round((stat.correct / stat.total) * 100);
                  return (
                    <div
                      key={cat}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <span className="text-white/80 font-medium max-sm:whitespace-normal break-words sm:truncate mr-2">{cat}</span>
                      <span className="font-mono font-bold text-[#73CAE5] shrink-0">
                        {stat.correct}/{stat.total} ({catPerc}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] text-xs font-bold hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 shadow-lg shadow-[#73CAE5]/20 cursor-pointer min-h-[44px]"
            >
              <Shuffle className="w-4 h-4 shrink-0" />
              <span>Refazer Quiz (Nova Ordem Embaralhada)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
