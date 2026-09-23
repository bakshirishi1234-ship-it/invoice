import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { ToolCategory } from '../types';
import { Search, ArrowRight, Calculator, Scale, Users, Layers, X } from 'lucide-react';
import SEO from '../components/SEO';

const ToolsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: ToolCategory) => {
    switch (category) {
      case ToolCategory.FINANCIAL: return <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />;
      case ToolCategory.LEGAL: return <Scale className="h-5 w-5 sm:h-6 sm:w-6" />;
      case ToolCategory.HR: return <Users className="h-5 w-5 sm:h-6 sm:w-6" />;
      default: return <Layers className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  const categories = Object.values(ToolCategory);

  return (
    <>
      <SEO
        title="Free Online Invoice Tools & Business Document Generators | InvoiceCore Hub"
        description="Browse 15+ free professional tools: invoice generator, estimate maker, NDA generator, bill of sale, purchase orders, contractor agreements, and more. 100% FREE, no signup required. Create & download PDF instantly."
        keywords="invoice, free invoice generator, online invoice maker, free estimate generator, NDA generator free, bill of sale template, purchase order generator, contractor agreement template, free business tools, freelancer invoice tool, small business invoice software, create invoice online free, invoice template pdf, legal document generator, professional invoice maker, free pdf generator, invoice generator no signup, online tools for freelancers, free invoice template, best invoice generator 2025, digital invoice, proforma invoice"
        type="website"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                {TOOLS.length} Free Tools Available
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight leading-tight px-4">
              Tool Library
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 leading-relaxed">
              Browse our complete collection of free generators and templates. No signup required.
            </p>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto mt-8 sm:mt-10 lg:mt-12 relative group px-4">
              <div className="absolute inset-y-0 left-4 sm:left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-12 py-3.5 sm:py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl leading-5 bg-white dark:bg-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 text-sm sm:text-base text-slate-900 dark:text-white shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-4 sm:right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Active Search Indicator */}
            {searchTerm && (
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 px-4">
                Found {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} matching "{searchTerm}"
              </div>
            )}
          </div>

          {/* Results Section */}
          {filteredTools.length === 0 ? (
            <div className="text-center py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 mx-4 sm:mx-0">
              <div className="max-w-md mx-auto px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
                  <Search className="h-8 w-8 sm:h-10 sm:w-10 text-slate-400" />
                </div>
                <p className="text-slate-900 dark:text-white text-lg sm:text-xl font-semibold mb-2">
                  No tools found
                </p>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  We couldn't find any tools matching "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center px-6 py-3 text-sm sm:text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Clear search & view all tools
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {/* Editorial intro for content depth */}
              <div className="px-4 sm:px-0">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-w-4xl">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About Our Business Document Tools</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    InvoiceCore Hub provides free, browser-based generators for invoices, estimates, purchase orders, and common legal templates.
                    Each tool is designed for freelancers, contractors, and small business owners who need professional PDFs without expensive software subscriptions.
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Your data is processed locally in your browser whenever possible. For step-by-step guidance, visit our{' '}
                    <Link to="/articles" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">business guides</Link>{' '}
                    or read the detailed description on each tool page before you generate a document.
                  </p>
                </div>
              </div>

              {categories.map(category => {
                const categoryTools = filteredTools.filter(t => t.category === category);
                if (categoryTools.length === 0) return null;

                return (
                  <div
                    key={category}
                    className="scroll-mt-20 sm:scroll-mt-28"
                    id={category.toLowerCase().replace(' ', '-')}
                  >
                    {/* Category Header */}
                    <div className="flex items-center mb-6 sm:mb-8 px-4 sm:px-0">
                      <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-primary-600 dark:text-primary-400 mr-3 sm:mr-4 flex-shrink-0">
                        {getCategoryIcon(category)}
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {category} Tools
                      </h2>
                      <div className="ml-4 sm:ml-6 flex-grow h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800 dark:to-transparent"></div>
                      <span className="ml-4 text-sm font-medium text-slate-500 dark:text-slate-400 flex-shrink-0">
                        {categoryTools.length}
                      </span>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
                      {categoryTools.map((tool) => (
                        <Link
                          key={tool.id}
                          to={`/tool/${tool.id}`}
                          className="group relative bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                        >
                          {/* Icon */}
                          <div className="flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-primary-500 mb-4 sm:mb-5 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                            <tool.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                          </div>

                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                            {tool.name}
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex-grow mb-4 leading-relaxed line-clamp-3">
                            {tool.description}
                          </p>

                          {/* CTA */}
                          <div className="flex items-center text-xs sm:text-sm text-primary-600 dark:text-primary-500 font-semibold mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
                            Use Tool
                            <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                          </div>

                          {/* Hover Gradient Effect */}
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolsList;