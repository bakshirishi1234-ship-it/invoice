import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCalculator from './components/FloatingCalculator';
import { Loader2 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ToolsList = lazy(() => import('./pages/ToolsList'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Legal = lazy(() => import('./pages/Legal'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
    <div className="text-center">
      <Loader2 className="h-10 w-10 text-primary-600 animate-spin mx-auto mb-4" />
      <p className="text-slate-500 dark:text-slate-400 font-medium">Loading InvoiceCore Hub...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tools" element={<ToolsList />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/tool/:id" element={<ToolPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <FloatingCalculator />
        <Analytics />
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
