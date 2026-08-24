import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  HelpCircle,
  BookOpen,
  Share2
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Dúvida Científica');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <Mail className="w-3.5 h-3.5" />
          <span>Canais de Comunicação</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Fale Conosco
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Tem dúvidas científicas, sugestões de aprofundamento temático para a plataforma ou deseja propor parcerias educacionais? Envie sua mensagem para nossa equipe editorial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider">
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Prof. Carlos Silva"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#B7B7B7]/40 focus:outline-none focus:border-[#73CAE5] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider">
                    Seu E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#B7B7B7]/40 focus:outline-none focus:border-[#73CAE5] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white uppercase tracking-wider">
                  Assunto da Mensagem *
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-[#73CAE5] transition-colors"
                >
                  <option value="Dúvida Científica" className="bg-[#141414]">Dúvida Científica / Teórica</option>
                  <option value="Sugestão de Conteúdo" className="bg-[#141414]">Sugestão de Conteúdo ou Caso Histórico</option>
                  <option value="Correção Acadêmica" className="bg-[#141414]">Correção / Revisão Acadêmica</option>
                  <option value="Uso Educacional em Sala de Aula" className="bg-[#141414]">Uso Educacional em Sala de Aula / Escolas</option>
                  <option value="Outro Assunto" className="bg-[#141414]">Outro Assunto</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white uppercase tracking-wider">
                  Sua Mensagem *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva sua mensagem, dúvida ou contribuição detalhada aqui..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#B7B7B7]/40 focus:outline-none focus:border-[#73CAE5] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#73CAE5]/20 active:scale-98"
              >
                {loading ? (
                  <span>Enviando mensagem...</span>
                ) : (
                  <>
                    <span>ENVIAR MENSAGEM</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Mensagem Recebida com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-md mx-auto leading-relaxed">
                Obrigado pelo seu contato, <strong>{name}</strong>. Nossa equipe editorial e científica responderá no e-mail <strong>{email}</strong> em breve.
              </p>
              <button
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setSubmitted(false);
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Enviar Outra Mensagem
              </button>
            </div>
          )}
        </div>

        {/* Informational Side Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#73CAE5]" />
              <span>Para Educadores e Professores</span>
            </h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              Todos os simuladores interativos e textos da plataforma <strong>ERA NUCLEAR</strong> são de livre uso educacional em salas de aula, universidades e feiras de ciências. Não hesite em solicitar materiais complementares em PDF ou roteiros de aula.
            </p>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
              <Share2 className="w-5 h-5 text-[#8F83FF]" />
              <span>Canais e Comunidade</span>
            </h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              Conecte-se com projetos de extensão científica e debates abertos sobre energia sustentável e desarmamento nas redes institucionais parceiras.
            </p>
            <div className="pt-2 text-xs text-[#73CAE5] font-mono">
              contato@eranuclear.org
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
