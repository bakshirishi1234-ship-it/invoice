import React, { useEffect, Suspense, lazy, ComponentType } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../constants';
import { DocumentType, ToolDef } from '../types';
import { ChevronLeft, AlertTriangle, Loader2, Users, Shield, Zap } from 'lucide-react';
import { generateToolKeywords } from '../hooks/useSEO';
import SEO from '../components/SEO';

// Lazy load specific tool components.
const FinancialTool = lazy(() => import('../components/FinancialTool')) as ComponentType<{ tool: ToolDef }>;
const LegalTool = lazy(() => import('../components/LegalTool')) as ComponentType<{ tool: ToolDef }>;

const ToolLoader = () => (
  <div className="flex flex-col items-center justify-center py-24">
    <Loader2 className="h-8 w-8 text-primary-600 animate-spin mb-4" />
    <p className="text-slate-500 text-sm font-medium">Loading Tool...</p>
  </div>
);

const TrustBadges = () => (
  <div className="flex flex-wrap items-center gap-4 mt-4">
    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Shield className="h-4 w-4 text-green-500" />
      <span>Browser-based — your data stays private</span>
    </div>
    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Zap className="h-4 w-4 text-orange-500" />
      <span>Instant PDF download</span>
    </div>
    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <Users className="h-4 w-4 text-primary-500" />
      <span>No signup required</span>
    </div>
  </div>
);

const ToolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = TOOLS.find(t => t.id === id);

  // Prepare SEO data with enhanced keywords for each tool
  const title = tool
    ? `Free ${tool.name} - Create ${tool.name} Online Free | InvoiceCore Hub`
    : "Tool Not Found | InvoiceCore Hub";

  const description = tool
    ? `${tool.description} 100% free, no signup required. Create and download a professional ${tool.name.toLowerCase()} PDF instantly.`
    : "The tool you are looking for doesn't exist.";

  const keywords = tool
    ? `${generateToolKeywords(tool.name, tool.category)}, invoice, free invoice, digital invoice, seo free invoice generator, invoice generator free, best invoice app`
    : "tool not found";

  // Construct JSON-LD Schema
  const softwareAppSchema = tool ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": tool.category || "Invoice Generator",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": description,
  } : undefined;

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        type="website"
        structuredData={softwareAppSchema}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12 pt-24 md:pt-28">
        {/* Tool Header - Enhanced with trust signals */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm no-print top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <div className="flex items-center mb-2 md:mb-4">
              <Link to="/" className="text-slate-500 hover:text-primary-600 transition-colors flex items-center text-sm font-medium">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Tools
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {tool && (
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl mr-4 shadow-lg shadow-primary-500/20">
                    <tool.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{tool.name}</h1>
                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">{tool.description}</p>
                    {/* Trust badges for mobile */}
                    <TrustBadges />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Breadcrumb schema helper - hidden but semantic */}
        <nav aria-label="Breadcrumb" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/"><span itemProp="name">Home</span></a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/tools"><span itemProp="name">Tools</span></a>
              <meta itemProp="position" content="2" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">{tool.name}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* Tool Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<ToolLoader />}>
            {tool.type === DocumentType.INVOICE ? (
              <FinancialTool tool={tool} />
            ) : (
              <LegalTool tool={tool} />
            )}
          </Suspense>
        </div>

        {/* SEO Content Section - Helps with search ranking */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 no-print">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              About This Free {tool.name}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {tool.seoParagraphs && tool.seoParagraphs.length > 0 ? (
                tool.seoParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our free {tool.name.toLowerCase()} is designed for freelancers, small business owners, and contractors in the United States.
                  Create professional {tool.name.toLowerCase()} documents in seconds with our easy-to-use online tool.
                  No signup or credit card required - just fill in your details and download your PDF instantly.
                </p>
              )}

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
                Key Features of Our {tool.name}
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>100% free to use - no hidden fees or premium plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>No signup or account creation required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Professional PDF download with no watermarks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Share directly to WhatsApp, Email, or any app</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Works on desktop, tablet, and mobile devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Your data stays private - nothing stored on our servers</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">
                Who Uses This Tool?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our {tool.name.toLowerCase()} is designed for freelance designers, consultants, contractors,
                plumbers, electricians, photographers, web developers, and small business owners across the United States.
                Whether you are billing clients, creating estimates, or generating legal documents, InvoiceCore Hub
                provides a straightforward way to produce professional PDFs without installing software.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ToolPage;