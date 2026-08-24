import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

export const QuizModule: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      {!completed ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#73CAE5]" />
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Desafio do Conhecimento Nuclear
              </h3>
            </div>
            <div className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-2.5 py-1 rounded-full border border-[#73CAE5]/30">
              Questão {currentIdx + 1} de {quizQuestions.length}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F83FF]">
              {currentQ.category}
            </span>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isCorrect = idx === currentQ.correctIndex;
              const isChosen = idx === selectedOption;

              let optionStyle = 'bg-white/[0.03] border-white/10 text-[#B7B7B7] hover:border-white/30 hover:text-white';
              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-white font-medium shadow-md shadow-emerald-500/10';
                } else if (isChosen) {
                  optionStyle = 'bg-rose-950/40 border-rose-500 text-white font-medium';
                } else {
                  optionStyle = 'bg-white/[0.01] border-white/5 text-white/30';
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 sm:p-4 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-start space-x-3 ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Scientific Explanation when answered */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#73CAE5]">
                <span>Fundamentação Científica:</span>
              </div>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-[#73CAE5]/20 hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>{currentIdx + 1 < quizQuestions.length ? 'Próxima Questão' : 'Ver Resultado'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Quiz Complete Screen */
        <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] flex items-center justify-center mx-auto shadow-xl shadow-[#73CAE5]/20">
            <Award className="w-8 h-8 text-[#0D0D0D]" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              Desafio Concluído!
            </h4>
            <p className="text-xs sm:text-sm text-[#B7B7B7]">
              Você acertou <strong className="text-[#73CAE5] text-base">{score}</strong> de <strong className="text-white">{quizQuestions.length}</strong> questões ({Math.round((score / quizQuestions.length) * 100)}%).
            </p>
          </div>

          <p className="text-xs text-[#B7B7B7] max-w-md mx-auto leading-relaxed">
            {score >= 5
              ? 'Excelente domínio conceitual sobre a física nuclear, história da era atômica e aplicações de energia!'
              : 'Bom esforço! Continue explorando as seções de Física Nuclear e Casos Históricos para aprofundar seu aprendizado.'}
          </p>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4 text-[#73CAE5]" />
            <span>Refazer Desafio</span>
          </button>
        </div>
      )}
    </div>
  );
};
