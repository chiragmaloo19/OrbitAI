import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const Result = () => {
  const location = useLocation();
  const { resultData = {}, answers = {}, questions = [] } = location.state || {};

  const {
    personalityTitle = "The Strategic Innovator",
    personalitySummary = "Your profile indicates a strong inclination towards structural thinking and strategic problem-solving.",
    careers = [],
    skills = {}
  } = resultData;

  const sortedCareers = [...careers].sort((a, b) => b.matchPercent - a.matchPercent);
  while(sortedCareers.length < 4) {
      sortedCareers.push({ name: "Unmapped Path", matchPercent: 0, description: "Insufficient data.", youtubeUrl: "#", learnMoreUrl: "#" });
  }

  const careerIcons = ["draw", "neurology", "architecture", "insights"];

  const [chatMessages, setChatMessages] = useState([
    { role: 'system', text: `System analysis shows a high propensity for ${personalityTitle}. Would you like to explore why ${sortedCareers[0]?.name} ranked as your top match?` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputShake, setInputShake] = useState(false);
  const chatScrollRef = useRef(null);
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (!canvasRef.current || !window.Chart) return;
    
    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    const labels = Object.keys(skills);
    const dataNum = Object.values(skills);
    if(labels.length === 0) {
        labels.push('Analytical', 'Creative', 'Technical', 'Leadership', 'Communication');
        dataNum.push(8, 7, 6, 9, 7);
    }

    const ctx = canvasRef.current.getContext('2d');
    chartInstance.current = new window.Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skill Proficiency',
          data: dataNum,
          backgroundColor: 'rgba(105, 246, 184, 0.4)',
          borderColor: '#69f6b8',
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#69f6b8',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverBackgroundColor: '#69f6b8',
          pointHoverBorderColor: '#fff'
        }]
      },
      options: {
        layout: {
          padding: 50
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(105, 246, 184, 0.2)' },
            grid: { color: 'rgba(105, 246, 184, 0.1)' },
            pointLabels: {
              color: '#69f6b8',
              font: { family: 'Plus Jakarta Sans', size: 11, weight: 'bold' }
            },
            ticks: {
              display: false,
              min: 0,
              max: 10
            }
          }
        },
        plugins: { legend: { display: false } }
      }
    });

    return () => {
        if(chartInstance.current) chartInstance.current.destroy();
    };
  }, [skills]);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) {
      setInputShake(true);
      setTimeout(() => setInputShake(false), 500);
      return;
    }

    const userText = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const prompt = `User personality: ${personalitySummary}
Careers suggested: ${sortedCareers.map(c => c.name + ': ' + c.description).join(' | ')}
User asks: "${userText}". Reply concisely.`;

      const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HF_TOKEN}`
        },
        body: JSON.stringify({
          model: "mlfoundations-dev/oh-dcft-v3.1-claude-3-5-sonnet-20241022:featherless-ai",
          messages: [
            { role: 'system', content: 'You are a career chatbot for OrbitAI. Keep your answers conversational, concise, and helpful.' },
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      const dataText = data.choices[0].message.content;
      setChatMessages(prev => [...prev, { role: 'system', text: dataText }]);
    } catch(err) {
      setChatMessages(prev => [...prev, { role: 'system', text: 'Connection error. Please try again.', isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!window.jspdf) {
      alert("jsPDF not loaded yet.");
      return;
    }
    const doc = new window.jspdf.jsPDF();
    
    doc.setFontSize(24);
    doc.text("OrbitAI Dossier", 20, 20);
    
    doc.setFontSize(16);
    doc.text(personalityTitle, 20, 40);
    
    doc.setFontSize(12);
    const splitSummary = doc.splitTextToSize(personalitySummary, 170);
    doc.text(splitSummary, 20, 50);

    let y = 50 + (splitSummary.length * 7) + 10;
    
    sortedCareers.forEach((c, i) => {
      doc.setFontSize(14);
      doc.text(`${i+1}. ${c.name} (${c.matchPercent}% Match)`, 20, y);
      y += 7;
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(c.description, 170);
      doc.text(splitDesc, 20, y);
      y += (splitDesc.length * 5) + 3;
      doc.text("YouTube: " + c.youtubeUrl, 20, y);
      y += 5;
      doc.text("Learn More: " + c.learnMoreUrl, 20, y);
      y += 15;
    });

    if(y > 250) {
        doc.addPage();
        y = 20;
    }

    doc.setFontSize(14);
    doc.text("Skill Analysis", 20, y);
    y += 10;
    doc.setFontSize(12);
    Object.entries(skills).forEach(([s, v]) => {
        doc.text(`${s}: ${v}/10`, 20, y);
        y += 7;
    });

    const dateStr = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text("Generated on: " + dateStr, 20, 290);
    
    doc.save("OrbitAI_Results.pdf");
    
    setToastMsg("PDF Downloaded successfully");
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <PageWrapper>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(105,246,184,0.08)_0%,transparent_70%)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(6,183,127,0.05)_0%,transparent_70%)] rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #494847 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <section className="mb-20 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-headline uppercase tracking-[0.2em] text-primary-fixed">Analysis Complete</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface mb-6 leading-none"
          >
            {personalityTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed"
          >
            {personalitySummary}
          </motion.p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {sortedCareers.map((career, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 + (i * 0.1), duration: 0.6 }}
               className="glass-panel p-8 rounded-xl border border-outline-variant/20 flex flex-col justify-between h-full hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
             >
               {i === 0 && <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>}
               <div>
                  <div className="flex justify-between items-start mb-10">
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl group-hover:text-primary transition-colors">{careerIcons[i%careerIcons.length]}</span>
                    <div className="text-right">
                      <div className="text-3xl font-black text-on-surface group-hover:text-primary transition-colors">{career.matchPercent}%</div>
                      <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">Match</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-headline text-on-surface mb-3">{career.name}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8">{career.description}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <a href={career.youtubeUrl} target="_blank" rel="noreferrer" className="w-full py-3 px-4 rounded-lg bg-surface-container-highest text-on-surface text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <span className="material-symbols-outlined text-sm">play_circle</span> YouTube
                  </a>
                  <a href={career.learnMoreUrl} target="_blank" rel="noreferrer" className="w-full py-3 px-4 text-center rounded-lg border border-outline-variant/30 text-on-surface text-xs font-bold uppercase tracking-wider hover:bg-primary/10 hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(105,246,184,0.2)]">
                    Learn More
                  </a>
                </div>
             </motion.div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          {/* Radar Chart */}
          <div className="relative flex justify-center items-center p-12 glass-panel rounded-2xl border border-outline-variant/10 w-full min-h-[400px]">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
            <canvas ref={canvasRef} className="w-full max-w-md relative z-10 aspect-square"></canvas>
          </div>

          {/* Terminal Chatbox */}
          <div className="flex flex-col h-full gap-4 min-h-[400px]">
            <div className="glass-panel rounded-xl border border-outline-variant/20 p-6 flex-1 flex flex-col overflow-hidden max-h-[500px]">
              <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/10 pb-4 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-[10px] text-on-surface-variant font-mono ml-4 uppercase tracking-[0.2em]">OrbitAI System Terminal v2.04</span>
              </div>
              <div ref={chatScrollRef} className="space-y-6 overflow-y-auto flex-1 mb-6 pr-2 scroll-smooth">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'system' && <span className="material-symbols-outlined text-primary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>}
                    <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary/10 text-primary px-4 py-2 rounded-xl rounded-br-none' : (msg.isError ? 'text-error' : 'text-on-surface-variant')} `}>
                       {msg.text}
                    </p>
                    {msg.role === 'user' && <span className="material-symbols-outlined text-outline shrink-0">person</span>}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4">
                     <span className="material-symbols-outlined text-primary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_satisfied</span>
                     <p className="text-sm text-primary animate-pulse">Thinking...</p>
                  </div>
                )}
              </div>
              <form onSubmit={handleChat} className={`mt-auto relative shrink-0 transition-transform ${inputShake ? 'translate-x-2' : ''}`}>
                <input 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-6 pr-12 text-sm text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary transition-all" 
                  placeholder="Ask OrbitAI about your career path..." 
                  type="text"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary">arrow_forward</button>
              </form>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold font-headline mb-8 text-on-surface-variant uppercase tracking-[0.3em]">Secure Your Dossier</h2>
          <button onClick={handleDownloadPDF} className="group relative px-12 py-5 rounded-xl bg-black border-2 border-primary/30 hover:border-primary transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">download_for_offline</span>
              <span className="text-xl font-bold text-on-surface tracking-tight">Download PDF Report</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm"></div>
          </button>
          <p className="mt-6 text-xs text-on-surface-variant uppercase tracking-widest opacity-60">Full analytical breakdown</p>
          {toastMsg && <div className="fixed bottom-10 right-10 bg-surface-container-high border border-primary text-primary px-6 py-3 rounded shadow-lg animate-fade-in">{toastMsg}</div>}
        </section>
      </main>

      {/* Decorative Wireframe Icons */}
      <div className="fixed top-1/4 left-10 pointer-events-none opacity-10 hidden xl:block">
        <span className="material-symbols-outlined text-8xl text-primary" style={{ fontVariationSettings: "'wght' 100" }}>psychology</span>
      </div>
      <div className="fixed bottom-1/4 right-10 pointer-events-none opacity-10 hidden xl:block">
        <span className="material-symbols-outlined text-8xl text-primary" style={{ fontVariationSettings: "'wght' 100" }}>explore</span>
      </div>
      <div className="fixed top-1/2 left-20 pointer-events-none opacity-5 hidden xl:block animate-pulse">
        <span className="material-symbols-outlined text-[120px] text-primary" style={{ fontVariationSettings: "'wght' 100" }}>rocket_launch</span>
      </div>
    </PageWrapper>
  );
};

export default Result;
