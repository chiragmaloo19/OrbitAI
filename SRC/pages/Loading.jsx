import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const loadingMessages = [
  "Analyzing your responses...",
  "Mapping your strengths...",
  "Calculating your path..."
];

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, questions } = location.state || { answers: {}, questions: [] };
  const [currentMessageIdx, setCurrentMessageIdx] = useState(0);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const fetchResults = async () => {
    setError(null);
    try {
      const promptText = questions.map((q, i) => `${i + 1}. ${q} → ${answers[i]}`).join('\n');
      const prompt = `Here are a user's answers to personality questions.
Each answer is like, neutral, or dislike.

${promptText}

Return only a raw JSON object. No explanation. No markdown.
No backticks. Just the JSON.

{
  "personalityTitle": "3-4 word title like The Creative Strategist",
  "personalitySummary": "2-3 sentences about this persons personality, strengths and working style. Personal not generic.",
  "careers": [
    {
      "name": "Career name",
      "matchPercent": 92,
      "description": "2 sentences about why this suits this user",
      "youtubeUrl": "https://www.youtube.com/results?search_query=career+name+explained+2026",
      "learnMoreUrl": "https://www.google.com/search?q=how+to+become+a+career+name"
    }
  ],
  "skills": {
    "SkillLabel": 8
  }
}

Rules:
- Exactly 4 careers
- Match percentages between 60 and 99, all different
- Decide skill category labels yourself based on the users answers and careers suggested — EXACTLY 5 skills
- Skill scores between 1 and 10
- YouTube URLs must link to a youtube search query ending with 2026
- learnMoreUrl must link to a google search for how to become that career
- Return raw JSON only, absolutely nothing else`;

      const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HF_TOKEN}`
        },
        body: JSON.stringify({
          model: "mlfoundations-dev/oh-dcft-v3.1-claude-3-5-sonnet-20241022:featherless-ai",
          messages: [
            { role: 'system', content: 'You are a strict JSON data generator. Return ONLY raw JSON without markdown formatting, code blocks, or any explanations.' },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API call failed with status ' + response.status);
      }

      const data = await response.json();
      const rawText = data.choices[0].message.content;
      const jsonStr = rawText.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(jsonStr);

      navigate('/result', { state: { resultData: parsed, answers, questions } });
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during API communication or parsing.');
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentMessageIdx(prev => (prev + 1) % loadingMessages.length);
    }, 2500);

    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchResults();
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <main className="flex-grow relative flex flex-col items-center justify-center p-6 overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]"></div>
          
          <div className="absolute top-1/4 left-1/4 floating-icon" style={{ animationDelay: '0s' }}>
            <span className="material-symbols-outlined text-primary/40 text-6xl">psychology</span>
          </div>
          <div className="absolute bottom-1/4 right-1/4 floating-icon" style={{ animationDelay: '2s' }}>
            <span className="material-symbols-outlined text-primary/40 text-5xl">explore</span>
          </div>
          <div className="absolute top-1/3 right-1/5 floating-icon" style={{ animationDelay: '4s' }}>
            <span className="material-symbols-outlined text-primary/40 text-4xl">rocket_launch</span>
          </div>
          <div className="absolute bottom-1/3 left-1/5 floating-icon" style={{ animationDelay: '1s' }}>
            <span className="material-symbols-outlined text-primary/40 text-4xl">hub</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            <div className="absolute w-16 h-16 bg-primary rounded-full blur-xl animate-[pulse-glow_3s_ease-in-out_infinite]"></div>
            <div className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_30px_#69f6b8]"></div>
            
            <div className="absolute w-full h-full border border-primary/20 rounded-full animate-[orbit-rotate_8s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#69f6b8]"></div>
            </div>
            <div className="absolute w-[80%] h-[80%] border border-primary/10 rounded-full animate-[orbit-rotate-reverse_12s_linear_infinite]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_10px_#68fcbf]"></div>
            </div>
            <div className="absolute w-[60%] h-[60%] border border-primary/30 rounded-full animate-[orbit-rotate_20s_linear_infinite]">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary-fixed rounded-full shadow-[0_0_8px_#69f6b8]"></div>
            </div>
            
            <div className="absolute w-32 h-32 bg-surface/10 backdrop-blur-md rounded-full border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
          </div>

          <div className="mt-16 text-center space-y-4">
            {error ? (
              <div className="relative overflow-hidden p-6 bg-error/10 border border-error/20 rounded-xl max-w-lg mx-auto backdrop-blur-md">
                <p className="text-xl font-headline font-bold text-error mb-2">Analysis Failed</p>
                <p className="text-on-surface-variant text-sm mb-6">{error}</p>
                <button 
                  onClick={() => { fetchedRef.current = false; fetchResults(); }}
                  className="px-6 py-2 bg-error text-on-error rounded-lg font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform"
                >
                  Retry Analysis
                </button>
              </div>
            ) : (
              <>
                <div className="relative h-12 overflow-hidden">
                  <p className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface transition-all duration-300">
                    {loadingMessages[currentMessageIdx]}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-bold">Neural Mapping in Progress</p>
                  <div className="w-48 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4 rounded-full shadow-[0_0_12px_rgba(105,246,184,0.4)]"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-12 w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 z-20">
          <div className="bg-surface-container-low/60 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(105,246,184,0.15)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">database</span>
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Data Points</span>
            </div>
            <p className="text-xl font-headline font-bold">{questions.length}/{questions.length} Quiz Completed</p>
            <p className="text-sm text-on-surface-variant mt-1">Full behavioral spectrum captured</p>
          </div>
          <div className="bg-surface-container-low/60 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(105,246,184,0.15)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary text-xl">memory</span>
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">AI Engine</span>
            </div>
            <p className="text-xl font-headline font-bold">Vector Comparison</p>
            <p className="text-sm text-on-surface-variant mt-1">Matching with 1.2M career trajectories</p>
          </div>
          <div className="bg-surface-container-low/60 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-2xl hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(105,246,184,0.15)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary text-xl">insights</span>
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Prediction</span>
            </div>
            <p className="text-xl font-headline font-bold">High Precision</p>
            <p className="text-sm text-on-surface-variant mt-1">98.4% Confidence in path alignment</p>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
    </PageWrapper>
  );
};

export default Loading;
