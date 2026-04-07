const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-black/80 backdrop-blur-md border-t border-emerald-500/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
        <div className="text-on-surface-variant text-xs uppercase tracking-widest font-inter text-center md:text-left">
          © 2026 OrbitAI. Cinematic Career Intelligence.
        </div>
        <div className="flex gap-8">
          <a className="text-emerald-100/40 hover:text-emerald-400 transition-colors text-xs uppercase tracking-widest font-inter" href="#">Privacy Policy</a>
          <a className="text-emerald-100/40 hover:text-emerald-400 transition-colors text-xs uppercase tracking-widest font-inter" href="#">Terms of Service</a>
          <a className="text-emerald-100/40 hover:text-emerald-400 transition-colors text-xs uppercase tracking-widest font-inter" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
