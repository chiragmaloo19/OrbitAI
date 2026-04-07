import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const questions = [
  "I enjoy working directly with tools, machinery, or my hands to build or fix things.",
  "I am deeply fulfilled by helping people feel better, whether physically or emotionally.",
  "I prefer solving complex technical and architectural logic puzzles over managing people.",
  "I am fascinated by how biological ecosystems, the human body, or chemistry works.",
  "I find it easy to take charge, delegate tasks, and maintain a high-level strategic vision.",
  "I love expressing my ideas through visual design, writing, or performance art.",
  "I am comfortable working outdoors in varying conditions for extended periods of time.",
  "I like organizing schedules, spreadsheets, and finding ways to make processes highly efficient.",
  "I enjoy teaching complex concepts to people who are just learning them for the first time.",
  "I naturally gravitate towards analyzing data to uncover hidden trends or insights.",
  "I have a keen eye for aesthetics, color palettes, spacing, and visual harmony.",
  "I thrive in environments where the goals are loosely defined and I must create the structure.",
  "I find satisfaction in navigating legal frameworks, compliance, or regulatory boundaries.",
  "I'd rather construct or repair a physical structure than sit at a desk sending emails.",
  "I enjoy resolving conflicts between people and ensuring everyone feels heard and valued.",
  "I am heavily motivated by measurable outcomes, performance metrics, and quantitative tracking.",
  "I feel energized when standing in front of groups, presenting ideas, or public speaking.",
  "I prefer solitary, deep-dive work sessions over continuous collaboration and brainstorming.",
  "I am passionate about environmental conservation and working directly with the natural world.",
  "I like working in fast-paced culinary or hospitality settings where client satisfaction is key.",
  "I find it satisfying to piece together historical, psychological, or social timelines of humanity.",
  "I have strong mechanical intuition and can quickly figure out how physical things operate.",
  "I enjoy crafting compelling narratives or marketing angles that persuade consumer behavior.",
  "I prefer jobs with high physical mobility rather than being tethered to one location.",
  "I want my daily work to revolve around inventing or coding products that change the future."
];

const Quiz = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [currentIdx]: answer };
    setAnswers(updatedAnswers);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      navigate('/loading', { state: { answers: updatedAnswers, questions } });
    }
  };

  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <PageWrapper>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mesh-gradient">
        <div className="floating-icon animate-drift-1 top-[10%] left-[12%] delay-[200ms]">
          <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
        </div>
        <div className="floating-icon animate-drift-2 top-[40%] left-[5%] delay-[1200ms]">
          <span className="material-symbols-outlined text-[110px]" style={{ fontVariationSettings: "'FILL' 0" }}>help_outline</span>
        </div>
        <div className="floating-icon animate-drift-1 bottom-[20%] right-[15%] delay-[1500ms]">
          <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 0" }}>explore</span>
        </div>
        <div className="floating-icon animate-drift-3 top-[55%] right-[5%] delay-[100ms]">
          <span className="material-symbols-outlined text-[130px]" style={{ fontVariationSettings: "'FILL' 0" }}>psychology</span>
        </div>
        <div className="floating-icon animate-drift-2 bottom-[8%] left-[40%] opacity-5 delay-[2000ms]">
          <span className="material-symbols-outlined text-[70px]" style={{ fontVariationSettings: "'FILL' 0" }}>rocket_launch</span>
        </div>
      </div>

      <main className="relative z-10 pt-32 pb-24 md:pl-64 flex flex-col items-center px-6 max-w-7xl mx-auto min-h-screen">
        <div className="w-full max-w-3xl mb-12 animate-fade-in delay-100">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-primary font-headline text-sm font-bold uppercase tracking-[0.2em]">Step {(currentIdx + 1).toString().padStart(2, '0')}</span>
              <h2 className="text-2xl font-headline font-bold text-on-surface">Question {currentIdx + 1} of {questions.length}</h2>
            </div>
            <div className="text-primary-dim font-headline font-bold text-lg">{progressPercent}%</div>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-secondary-container to-primary rounded-full shadow-[0_0_12px_rgba(105,246,184,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="w-full max-w-3xl bg-surface-container-low rounded-xl p-8 md:p-12 border border-primary/20 shadow-[0_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-md relative overflow-hidden group">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">Aptitude & Preference</span>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="min-h-[150px]"
              >
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight tracking-tight">
                    "{questions[currentIdx]}"
                </h1>
                <p className="mt-6 text-on-surface-variant text-lg leading-relaxed max-w-xl">
                    Take your time and answer honestly based on your natural instincts.
                </p>
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-12">
          <button 
            onClick={() => handleAnswer('dislike')}
            className="flex flex-col items-center gap-4 p-8 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-error/40 hover:bg-error/5 group transition-all duration-300 btn-hover-glow-error"
          >
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-error transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>sentiment_dissatisfied</span>
            <span className="font-headline font-semibold text-on-surface-variant group-hover:text-on-surface">Dislike</span>
          </button>
          
          <button 
             onClick={() => handleAnswer('neutral')}
             className="flex flex-col items-center gap-4 p-8 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-primary/40 hover:bg-primary/5 group transition-all duration-300 btn-hover-glow"
          >
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>sentiment_neutral</span>
            <span className="font-headline font-semibold text-on-surface-variant group-hover:text-on-surface">Neutral</span>
          </button>
          
          <button 
             onClick={() => handleAnswer('like')}
             className="flex flex-col items-center gap-4 p-8 bg-surface-container-low rounded-xl border border-primary/30 bg-primary/5 shadow-[0_0_20px_rgba(105,246,184,0.1)] group transition-all duration-300 active:scale-95 btn-hover-glow"
          >
            <span className="material-symbols-outlined text-4xl text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_satisfied</span>
            <span className="font-headline font-semibold text-on-surface">Like</span>
          </button>
        </div>

        <div className="flex justify-between w-full max-w-3xl mt-16">
          <button 
            onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
             className={`flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-headline font-medium text-sm tracking-widest uppercase px-6 py-3 ${currentIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIdx === 0}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Quiz;
