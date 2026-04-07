import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const Home = () => {
  return (
    <PageWrapper>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <span className="material-symbols-outlined text-primary wireframe-element absolute bottom-[20%] left-[35%] text-8xl delay-[-5s]">school</span>
        <span className="material-symbols-outlined text-primary wireframe-element absolute top-[35%] right-[12%] text-9xl delay-[-8s]">bar_chart</span>
        <span className="material-symbols-outlined text-primary wireframe-element absolute top-[10%] right-[25%] text-6xl delay-[-12s]">ads_click</span>
        <span className="material-symbols-outlined text-primary wireframe-element absolute bottom-[10%] right-[5%] text-7xl delay-[-15s]">groups</span>
      </div>

      <main className="min-h-screen pt-24 pb-32 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 max-w-7xl mx-auto gap-12 relative z-10">
        <section className="flex-1 space-y-8 z-10 w-full">
          <div className="reveal-item inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(105,246,184,0.15)] delay-[0.1s]">
            <span className="text-xs font-bold font-headline uppercase tracking-widest text-primary">AI-Powered Career Discovery</span>
          </div>

          <div className="space-y-4">
            <h1 className="reveal-item text-5xl md:text-7xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface delay-[0.2s]">
              Discover the career you were <span className="text-primary-container">built for</span>
            </h1>
            <p className="reveal-item text-xl md:text-2xl text-on-surface-variant font-light max-w-xl leading-relaxed delay-[0.3s]">
              Answer 25 questions and let AI reveal your ideal career path with cinematic precision.
            </p>
          </div>

          <div className="reveal-item flex flex-col gap-4 items-start delay-[0.4s]">
            <Link to="/quiz" className="group px-8 py-4 bg-primary-container text-on-primary-container font-headline font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(6,183,127,0.4)] hover:shadow-[0_0_50px_rgba(6,183,127,0.7)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center gap-3">
              Begin Your Journey
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <p className="text-sm text-on-surface-variant flex items-center gap-2 px-2">
              <span className="material-symbols-outlined text-xs">timer</span>
              3 minutes · No signup required
            </p>
          </div>
        </section>

        <section className="flex-1 relative w-full aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="relative w-full h-full flex items-center justify-center orbit-container">
            <div className="reveal-item w-72 h-72 md:w-96 md:h-96 rounded-full border border-primary/30 relative flex items-center justify-center shadow-[0_0_100px_rgba(105,246,184,0.15)] bg-gradient-to-tr from-emerald-950/40 to-primary/5 backdrop-blur-sm z-10 delay-[0.5s]">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary/40 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border border-outline-variant/30 animate-[spin_15s_linear_infinite_reverse]"></div>
              <span className="material-symbols-outlined text-primary text-8xl md:text-9xl opacity-80 drop-shadow-[0_0_20px_rgba(105,246,184,0.6)]">stream</span>
            </div>

            <div className="absolute top-[10%] left-[5%] glass-panel px-6 py-4 rounded-2xl shadow-2xl border border-primary/20 animate-revolve-1 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-headline uppercase tracking-tighter">AI Accuracy</p>
                  <p className="text-xl font-bold text-primary">92% Match</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[20%] right-[-5%] glass-panel px-6 py-4 rounded-2xl shadow-2xl border border-primary/20 animate-revolve-2 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">brush</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-headline uppercase tracking-tighter">Recommendation</p>
                  <p className="text-xl font-bold text-on-surface">UI/UX Designer</p>
                </div>
              </div>
            </div>

            <div className="absolute top-[40%] right-[-10%] glass-panel p-3 rounded-full shadow-lg border border-outline-variant/20 z-20">
              <span className="material-symbols-outlined text-primary-dim text-xl">rocket_launch</span>
            </div>
          </div>
        </section>
      </main>

      <div className="reveal-item fixed bottom-0 left-0 w-full z-40 px-6 py-8 md:px-12 bg-black/40 backdrop-blur-md border-t border-emerald-500/10 delay-[0.7s]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col md:items-center gap-1">
            <span className="text-primary-container font-black text-2xl font-headline tracking-tighter">15</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Questions</span>
          </div>
          <div className="flex flex-col md:items-center gap-1">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">AI Powered</span>
          </div>
          <div className="flex flex-col md:items-center gap-1">
            <span className="text-primary-container font-black text-2xl font-headline tracking-tighter">4</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Matches</span>
          </div>
          <div className="flex flex-col md:items-center gap-1">
            <span className="text-on-surface font-black text-2xl font-headline tracking-tighter">FREE</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Forever</span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
