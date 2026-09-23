import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronRight, Star, Users, Shield, Zap, FileText, Search } from 'lucide-react';
import { TOOLS, FAQs } from '../constants';
import SEO from '../components/SEO';
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Limit to 8 featured tools for homepage
  const featuredTools = TOOLS.slice(0, 8);

  // Filter tools based on search
  const filteredTools = searchQuery
    ? TOOLS.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : featuredTools;

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <SEO
        title="Free Online Invoice Generator | Make Invoice Instantly"
        description="Make invoices online for free. Create professional invoices, estimates, and purchase orders instantly. 100% free forever — no signup required."
        keywords="invoice, make invoice, online invoice, invoice generator, invoice creator, create invoice free, invoice template, free invoice maker, invoice maker online, gst invoice maker, bill generator, invoicecore hub, digital invoice, simple invoice, seo free invoice generator, free invoice template, simple invoice maker, professional invoice generator, receipt maker, invoice app, no login invoice, pdf invoice generator"
        type="website"
        structuredData={faqSchema}
      />
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/40 via-transparent to-transparent dark:from-primary-900/20"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-100/30 to-transparent dark:from-indigo-900/10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-24 lg:pb-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Signal Banner */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm leading-6 bg-gradient-to-r from-primary-50 to-indigo-50 dark:from-primary-900/30 dark:to-indigo-900/30 ring-1 ring-inset ring-primary-600/20 mb-8">
              <span className="flex items-center gap-1 text-primary-700 dark:text-primary-300 font-semibold">
                <Shield className="h-4 w-4" /> Privacy-first tools
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600 dark:text-slate-400">Built for <strong className="text-primary-600 dark:text-primary-400">freelancers &amp; small businesses</strong></span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              <span className="block">Free Invoice Generator</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-violet-600">&amp; Business Tools</span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300 mb-2">
              The Easiest Way to <span className="text-primary-600 dark:text-primary-400 font-bold">Make Invoices Online</span>
            </p>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Create professional invoices, estimates, and legal documents in seconds. <strong className="text-slate-800 dark:text-slate-200">100% Free</strong> forever. No signup required. No watermarks.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tools... (e.g., Invoice, NDA, Estimate)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg shadow-slate-200/50 dark:shadow-black/20 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    {filteredTools.length} results
                  </span>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/tools" className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold hover:from-primary-700 hover:to-indigo-700 transition-all shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 flex items-center justify-center group">
                Explore All Tools <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tool/invoice-generator" className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border-2 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all flex items-center justify-center">
                <FileText className="mr-2 h-5 w-5 text-primary-600" />
                Generate Invoice Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span>100% Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <span>Instant PDF Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-500" />
                <span>No Signup Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Tools Grid */}
      <section id="tools" className="py-20 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-600 font-bold tracking-wide uppercase mb-2">Professional Templates</h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Free Tools'}
            </p>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {searchQuery
                ? `Found ${filteredTools.length} tool${filteredTools.length !== 1 ? 's' : ''} matching your search.`
                : 'US-compliant templates designed for freelancers and small businesses.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.id}`}
                className="group relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                  <tool.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-3 w-fit">
                  {tool.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                  Use Free <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {!searchQuery && (
            <div className="mt-16 text-center">
              <Link to="/tools" className="inline-flex items-center text-slate-600 dark:text-slate-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                View all {TOOLS.length} available tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}

          {searchQuery && filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No tools found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Why Choose InvoiceCore Hub?</h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Built for speed, privacy, and professionalism.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                iconColor: 'text-green-500',
                iconBg: 'bg-green-100 dark:bg-green-900/30',
                title: '100% Free Forever',
                desc: 'No hidden fees, no "pro" plans, no watermarks. Every tool is completely free to use with unlimited documents.'
              },
              {
                icon: Shield,
                iconColor: 'text-blue-500',
                iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                title: 'Your Privacy Matters',
                desc: 'All processing happens in your browser. We never store your invoices, client data, or personal information.'
              },
              {
                icon: FileText,
                iconColor: 'text-purple-500',
                iconBg: 'bg-purple-100 dark:bg-purple-900/30',
                title: 'US Standard Compliance',
                desc: 'Templates designed specifically for US freelancers, LLCs, and contractors. Meets IRS requirements.'
              },
              {
                icon: Zap,
                iconColor: 'text-orange-500',
                iconBg: 'bg-orange-100 dark:bg-orange-900/30',
                title: 'Instant Download',
                desc: 'Generate high-quality PDF documents instantly. Share via WhatsApp, Email, or any app on your device.'
              },
              {
                icon: Users,
                iconColor: 'text-cyan-500',
                iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
                title: 'No Account Needed',
                desc: 'Start creating professional documents immediately. No email signup, no verification, no waiting.'
              },
              {
                icon: Star,
                iconColor: 'text-yellow-500',
                iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
                title: 'Regularly Updated',
                desc: 'We add new tools and guides based on real feedback from freelancers and small business owners.'
              }
            ].map((feat, idx) => (
              <div key={idx} className="flex items-start p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                <div className={`flex-shrink-0 p-3 rounded-xl ${feat.iconBg}`}>
                  <feat.icon className={`h-6 w-6 ${feat.iconColor}`} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{feat.title}</h4>
                  <p className="mt-2 text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ with Schema Markup */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-12">Everything you need to know about our free invoice generator and business tools.</p>
          <div className="space-y-4">
            {FAQs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-800 transition-colors"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center" itemProp="name">
                  <Star className="w-4 h-4 text-primary-500 mr-2 fill-primary-500" />
                  {faq.q}
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-6" itemProp="text">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Getting Started with InvoiceCore Hub</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Learn how to use our free invoice generator and business tools in minutes</p>
          </div>

          <div className="space-y-12">
            {/* How to Create an Invoice */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600 text-white font-bold mr-4">1</span>
                How to Create Your First Invoice
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="leading-relaxed">
                  Creating an invoice with InvoiceCore Hub is simple and takes less than 5 minutes. Here's the step-by-step process:
                </p>
                <ol className="space-y-3 pl-6 list-decimal">
                  <li><strong>Click the Invoice Generator</strong> – Select "Invoice Generator" from our tools or click "Generate Invoice Now" button</li>
                  <li><strong>Enter Your Business Info</strong> – Fill in your name, email, business address, and phone number. Upload your company logo if you have one</li>
                  <li><strong>Add Client Details</strong> – Enter your client or customer's information including name, email, address, and any reference numbers like EIN</li>
                  <li><strong>Add Line Items</strong> – List all products or services with descriptions, quantities, and prices. Add multiple line items as needed</li>
                  <li><strong>Set Terms & Taxes</strong> – Choose your invoice number, date, due date, payment terms (Net 30, Net 60, etc.), and tax rate</li>
                  <li><strong>Review & Download</strong> – Preview your invoice and click "Download PDF" to save it to your computer</li>
                  <li><strong>Send to Client</strong> – Email or share the PDF invoice with your client instantly</li>
                </ol>
                <p className="leading-relaxed text-sm text-slate-600 dark:text-slate-400 mt-4">
                  Pro tip: All your data stays with you—we never store your invoices or client information on our servers. Everything happens securely in your browser.
                </p>
              </div>
            </div>

            {/* Invoice Best Practices */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold mr-4">2</span>
                Invoice Best Practices & Tips
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="leading-relaxed">
                  Make your invoices more professional and get paid faster with these proven tips:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-4">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-600" />
                    <span><strong>Include clear payment terms</strong> – Specify when payment is due (e.g., "Due upon receipt" or "Net 30 days")</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-600" />
                    <span><strong>Add your logo</strong> – A branded invoice looks more professional and builds trust with clients</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-600" />
                    <span><strong>Include payment instructions</strong> – Add bank details, PayPal account, or payment methods in the notes section</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-600" />
                    <span><strong>Use sequential numbering</strong> – Keep track of invoices with consistent numbering (INV-001, INV-002, etc.)</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-600" />
                    <span><strong>Document all details</strong> – Include project descriptions, dates, and any relevant reference numbers for record-keeping</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-600" />
                    <span><strong>Apply discounts clearly</strong> – If offering a discount, show the amount and percentage for transparency</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Other Templates */}
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-8 border border-purple-200 dark:border-purple-800/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-600 text-white font-bold mr-4">3</span>
                Beyond Invoices: Other Templates
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300">
                <p className="leading-relaxed">
                  InvoiceCore Hub offers more than just invoices. Use our platform for other business documents:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Estimates & Quotes</h4>
                    <p className="text-sm">Send professional quotes to potential clients before they commit. Convert estimates to invoices once accepted.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Purchase Orders</h4>
                    <p className="text-sm">Create official POs when ordering from vendors. Track orders and maintain vendor relationships professionally.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Legal Documents</h4>
                    <p className="text-sm">Generate NDAs, contractor agreements, and privacy policies using AI. All compliant with US standards.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Credit & Debit Notes</h4>
                    <p className="text-sm">Issue credit notes for refunds or debit notes for supplier adjustments. Keep accurate business records.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Who Uses InvoiceCore Hub */}
            <div className="bg-gradient-to-r from-indigo-50 to-primary-50 dark:from-indigo-900/20 dark:to-primary-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 text-white font-bold mr-4">4</span>
                Who Uses InvoiceCore Hub?
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Thousands of professionals across different industries rely on InvoiceCore Hub for their billing and documentation needs:
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Users className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span><strong>Freelancers</strong> – Developers, designers, writers, and consultants</span>
                </li>
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Users className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span><strong>Small Business Owners</strong> – Plumbers, contractors, service providers</span>
                </li>
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Users className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span><strong>Agencies</strong> – Marketing, design, and creative agencies</span>
                </li>
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Users className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span><strong>Startups & Solopreneurs</strong> – New business owners getting established</span>
                </li>
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Users className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span><strong>Nonprofits</strong> – Invoicing for services and fundraising</span>
                </li>
                <li className="flex gap-3 text-slate-700 dark:text-slate-300">
                  <Users className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span><strong>Virtual Assistants</strong> – Managing client billing and documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Business Guides &amp; Resources</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              In-depth articles on invoicing, taxes, legal documents, and small business operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'how-to-create-professional-invoices', title: 'How to Create Professional Invoices That Get Paid Faster', category: 'Business Tips' },
              { id: 'freelancer-tax-guide-us', title: 'The Ultimate Tax Guide for US-Based Freelancers', category: 'Taxes' },
              { id: 'when-to-use-an-nda', title: 'When to Use an NDA: A Practical Guide for Small Businesses', category: 'Legal' },
            ].map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">{article.category}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {article.title}
                </h3>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center">
                  Read guide <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/articles" className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              View all guides <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-600 via-indigo-600 to-violet-700">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Create Professional Invoices?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Create professional invoices and business documents in minutes — completely free, no account required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/tool/invoice-generator" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-bold rounded-full hover:bg-primary-50 transition-colors shadow-xl hover:shadow-2xl">
              <FileText className="mr-2 h-5 w-5" />
              Create Free Invoice
            </Link>
            <Link to="/tools" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors border border-white/30">
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;