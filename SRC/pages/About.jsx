import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const About = () => {
  return (
    <PageWrapper>
      <main className="md:ml-0 pt-20">
        <section className="relative min-h-[819px] flex items-center justify-center overflow-hidden px-6 py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-background to-background"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
          </div>
          <div className="relative z-10 max-w-5xl text-center">
            <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] animate-[fadeInUp_0.8s_ease-out_forwards]">
              Our Mission
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8 leading-[1.1] animate-[fadeInUp_0.8s_ease-out_forwards] animate-stagger-1">
              Navigating the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future Workforce</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 animate-[fadeInUp_0.8s_ease-out_forwards] animate-stagger-2">
              We bridge the gap between student potential and professional destiny through the lens of cinematic AI intelligence.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-[fadeInUp_0.8s_ease-out_forwards] animate-stagger-3">
              <Link to="/quiz" className="px-10 py-4 bg-primary-container text-on-primary-container font-bold rounded-xl shadow-[0_0_20px_rgba(6,183,127,0.4)] hover:shadow-[0_0_35px_rgba(6,183,127,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300">
                Discover Your Path
              </Link>
              <button className="px-10 py-4 border border-outline-variant/30 text-on-surface font-medium rounded-xl hover:bg-surface-container-high transition-all duration-300">
                Meet the AI
              </button>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-20 text-center reveal-on-scroll visible">
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-on-surface mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-primary rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-24 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center group reveal-on-scroll visible">
              <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center border border-primary/20 mb-8 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(105,246,184,0.3)] group-hover:-translate-y-2 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
              </div>
              <div className="absolute -top-4 -right-4 md:right-1/4 text-primary/20 text-7xl font-black italic">01</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface group-hover:text-primary transition-colors">Answer Questions</h3>
              <p className="text-on-surface-variant leading-relaxed px-4">Deep psychological and aptitude assessments designed to reveal your core professional persona.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group md:mt-16 reveal-on-scroll visible" style={{ transitionDelay: '0.2s' }}>
              <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center border border-primary/20 mb-8 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(105,246,184,0.3)] group-hover:-translate-y-2 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>neurology</span>
              </div>
              <div className="absolute -top-4 -right-4 md:right-1/4 text-primary/20 text-7xl font-black italic">02</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface group-hover:text-primary transition-colors">AI Analyzes</h3>
              <p className="text-on-surface-variant leading-relaxed px-4">Our proprietary OrbitEngine scans thousands of career vectors to find the perfect orbital alignment for you.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group reveal-on-scroll visible" style={{ transitionDelay: '0.4s' }}>
              <div className="w-20 h-20 rounded-2xl bg-surface-container-high flex items-center justify-center border border-primary/20 mb-8 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(105,246,184,0.3)] group-hover:-translate-y-2 transition-all duration-500">
                <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
              </div>
              <div className="absolute -top-4 -right-4 md:right-1/4 text-primary/20 text-7xl font-black italic">03</div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-on-surface group-hover:text-primary transition-colors">Get Matches</h3>
              <p className="text-on-surface-variant leading-relaxed px-4">Receive a curated portfolio of high-impact careers, personalized roadmaps, and instant connection opportunities.</p>
            </div>
          </div>
        </section>

        <section className="py-32 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-on-scroll visible">
              <div className="max-w-2xl">
                <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6">Designed for the Next Generation.</h2>
                <p className="text-on-surface-variant text-lg">We've built OrbitAI to be more than just a tool—it's your digital co-pilot in an ever-shifting professional landscape.</p>
              </div>
              <div className="text-primary text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-primary/30">The Observatory Advantage</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(105,246,184,0.15)] transition-all duration-500 reveal-on-scroll visible">
                <span className="material-symbols-outlined text-primary text-3xl mb-6 block group-hover:scale-110 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <h4 className="font-headline text-xl font-bold mb-3 text-on-surface">AI Powered</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">State-of-the-art neural networks trained on modern industrial shifts and emerging job markets.</p>
              </div>

              <div className="group p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(105,246,184,0.15)] transition-all duration-500 reveal-on-scroll visible" style={{ transitionDelay: '0.1s' }}>
                <span className="material-symbols-outlined text-primary text-3xl mb-6 block group-hover:scale-110 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>person_pin</span>
                <h4 className="font-headline text-xl font-bold mb-3 text-on-surface">Personalized Results</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">No generic lists. Every career path is mathematically calculated to match your unique traits and goals.</p>
              </div>

              <div className="group p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(105,246,184,0.15)] transition-all duration-500 reveal-on-scroll visible" style={{ transitionDelay: '0.2s' }}>
                <span className="material-symbols-outlined text-primary text-3xl mb-6 block group-hover:scale-110 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                <h4 className="font-headline text-xl font-bold mb-3 text-on-surface">Free Forever</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">We believe career clarity should be a right, not a luxury. Our core intelligence is free for all students.</p>
              </div>

              <div className="group p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(105,246,184,0.15)] transition-all duration-500 reveal-on-scroll visible" style={{ transitionDelay: '0.3s' }}>
                <span className="material-symbols-outlined text-primary text-3xl mb-6 block group-hover:scale-110 transition-transform duration-500" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                <h4 className="font-headline text-xl font-bold mb-3 text-on-surface">Built for Students</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Tailored for the 16-22 age group, focusing on potential over experience and passion over prestige.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center text-center p-12 reveal-on-scroll visible">
            <div className="absolute inset-0 z-0">
              <img className="w-full h-full object-cover grayscale opacity-40" alt="cinematic digital representation of earth from space with glowing green data networks and neon digital connections orbiting the planet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8peXx8rlMiYejNne_TJQ0rPbZ9631s7YTJvxrkMpY0qeKU02sXfMzHmvKT6zOH-8y-Q-T43ewcM0HuyOcp06znVrm4mQbHrp132MWGz_GH1iauvdGi03JOAN0LMuhBeDRHYVQiEL7jHEhjuMJ69QgcScI3W_J2kNiDYbwcyiGyxl1w4eOFNfRG974jZZulm5i-oh8h4zRSiXg8hCqp90KVa4-sb6aFFdPAk1sH95o6C3VFCtnABFCs_noX9YgsciQlbZsVxPtWU4" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-background/80 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-3xl">
              <h2 className="font-headline text-4xl md:text-6xl font-black mb-8 tracking-tighter text-on-surface leading-tight">
                  Your Orbital Path <br/> is Waiting.
              </h2>
              <Link to="/quiz" className="group flex items-center justify-center gap-3 mx-auto max-w-xs px-12 py-5 bg-primary text-on-primary font-black rounded-xl text-lg hover:shadow-[0_0_40px_rgba(105,246,184,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out">
                  Start Your Journey
                  <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
};

export default About;
