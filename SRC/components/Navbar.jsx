import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="fixed top-0 w-full z-50 bg-emerald-950/40 backdrop-blur-xl border-b border-emerald-500/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto font-plus-jakarta-sans tracking-tight">
        <div className="text-2xl font-bold tracking-tighter text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
          OrbitAI
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-emerald-100/60 hover:text-emerald-100 transition-colors duration-300">Home</Link>
          <Link to="/quiz" className="text-emerald-100/60 hover:text-emerald-100 transition-colors duration-300">Quiz</Link>
          <Link to="/about" className="text-emerald-100/60 hover:text-emerald-100 transition-colors duration-300">About</Link>
        </div>
        <div className="flex gap-4 items-center">
          <button className="p-2 md:hidden hover:bg-emerald-400/10 rounded-lg">
            <span className="material-symbols-outlined text-emerald-400">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
