import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import ToolPage from '../pages/ToolPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ToolsList from '../pages/ToolsList';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Legal from '../pages/Legal';
import Articles from '../pages/Articles';
import ArticlePage from '../pages/ArticlePage';
import { TOOLS, ARTICLES } from '../constants';

export const routes = [
  '/', '/about', '/contact', '/tools', '/privacy', '/terms', '/legal', '/articles',
  ...ARTICLES.map((a) => `/article/${a.id}`),
  ...TOOLS.map((t) => `/tool/${t.id}`),
];

export function render(url: string) {
  const helmetContext: any = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          <Navbar />
          <main className="flex-grow flex flex-col">
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
            </Routes>
          </main>
          <Footer />
        </div>
      </StaticRouter>
    </HelmetProvider>
  );
  return { html, helmet: helmetContext.helmet };
}
