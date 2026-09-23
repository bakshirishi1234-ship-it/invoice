import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path
    ? 'text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/10 font-semibold'
    : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium';

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md no-print supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[60px]">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="bg-primary-600 rounded-lg p-1.5 mr-2 group-hover:bg-primary-700 transition-colors">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">InvoiceCore Hub</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-2">
              <Link to="/" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/')}`}>Home</Link>
              <Link to="/tools" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/tools')}`}>Tools</Link>
              <Link to="/articles" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/articles')}`}>Articles</Link>
              <Link to="/about" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/about')}`}>About</Link>

              <Link to="/contact" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/contact')}`}>Contact</Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="-mr-2 flex md:hidden">
              <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none transition-colors">
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800">Home</Link>
            <Link to="/tools" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Tools</Link>
            <Link to="/articles" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Articles</Link>
            <Link to="/about" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">About</Link>

            <Link to="/contact" className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
