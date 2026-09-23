import React, { useEffect } from 'react';
import { CheckCircle, Globe, Heart, Shield, Zap, Users, Target } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="About InvoiceCore Hub - Free Business Tools for Freelancers & SMBs"
        description="Discover InvoiceCore Hub's mission: providing free, professional-grade business tools to freelancers and small businesses. Learn about our privacy-first approach to invoicing, legal documents, and business management."
        keywords="about InvoiceCore Hub, free business tools, freelancer software, small business solutions, invoice generator mission, privacy-focused tools, no credit card required, invoice, free invoice, digital invoice"
        type="website"
      />
      <div className="bg-white dark:bg-slate-900">
        {/* Hero Section */}
        <div className="relative pt-20 pb-16 sm:py-24 lg:pt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                Empowering Freelancers & Small Businesses
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Professional business tools, completely free. No hidden fees, no data selling, no login required.
              </p>
            </div>

            {/* Hero Quote */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl opacity-10 blur-3xl"></div>
                <div className="relative bg-primary-600 rounded-2xl p-8 sm:p-10 shadow-xl">
                  <Heart className="h-12 w-12 text-white/20 mb-6" />
                  <blockquote>
                    <p className="text-xl sm:text-2xl font-medium text-white mb-6 leading-relaxed">
                      "We believe that essential business tools shouldn't be hidden behind paywalls. Every freelancer deserves professional-grade documentation from day one."
                    </p>
                  </blockquote>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400">
                  <p className="text-lg leading-relaxed">
                    InvoiceCore Hub was born out of frustration. We realized that simple tasks like generating an invoice or drafting a basic contract often required signing up for expensive SaaS subscriptions or dealing with ad-riddled, clunky websites.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We decided to build something different. A platform built by freelancers, for freelancers. Something that respects your privacy and doesn't nickel-and-dime you for essential features.
                  </p>
                  <p className="text-lg leading-relaxed font-semibold text-primary-600">
                    Our mission is simple: <span className="text-slate-900 dark:text-white">Empower US freelancers and small businesses</span> with high-quality, free, and privacy-focused tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="bg-slate-50 dark:bg-slate-800/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Simple, fast, and completely privacy-respecting</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Visit & Fill</h3>
                <p className="text-slate-600 dark:text-slate-400">No sign-up needed. Just come to our site and fill in your information in our simple forms.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Generate & Preview</h3>
                <p className="text-slate-600 dark:text-slate-400">See your document instantly. Edit as needed. Everything happens in your browser.</p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Download & Use</h3>
                <p className="text-slate-600 dark:text-slate-400">Download your PDF instantly. Your data stays with you—we never store it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Accessibility */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Accessibility First</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Business tools should be accessible to everyone, regardless of their budget. We are committed to keeping our core tools 100% free, forever.
                </p>
              </div>

              {/* Privacy */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Privacy Focused</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your business data is yours. Our generators run locally in your browser whenever possible. We do not sell your data, period.
                </p>
              </div>

              {/* Quality */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quality Standards</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Free doesn't mean cheap. We adhere to US business standards to ensure your documents are professional and legally sound.
                </p>
              </div>

              {/* Speed */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <Zap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  No lengthy forms or complicated processes. Generate professional documents in minutes, not hours.
                </p>
              </div>

              {/* User-Centric */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">User-Centric Design</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We listen to feedback and constantly improve. Your success is our success.
                </p>
              </div>

              {/* Always Improving */}
              <div className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-700">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                      <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Always Improving</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We're constantly adding new tools and features based on the needs of our community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-slate-800 dark:to-slate-800/50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose InvoiceCore Hub?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Completely Free</h3>
                  <p className="text-slate-600 dark:text-slate-400">No credit card required. No premium tiers. All features free forever.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Regular Updates</h3>
                  <p className="text-slate-600 dark:text-slate-400">We constantly add new tools and guides based on user feedback.</p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">No Login Required</h3>
                  <p className="text-slate-600 dark:text-slate-400">Just visit, fill, and download. No account creation hassle.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Professional Quality</h3>
                  <p className="text-slate-600 dark:text-slate-400">Documents that look professional and meet US business standards.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Mobile Friendly</h3>
                  <p className="text-slate-600 dark:text-slate-400">Works perfectly on your phone, tablet, or desktop.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Data Privacy</h3>
                  <p className="text-slate-600 dark:text-slate-400">Your data never leaves your device unless you choose to download.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Company Information</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Transparent and trustworthy business details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Legal Entity</h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <p><strong className="text-slate-900 dark:text-white">Business Name:</strong> InvoiceCore Hub LLC</p>
                  <p><strong className="text-slate-900 dark:text-white">Founded:</strong> 2024</p>
                  <p><strong className="text-slate-900 dark:text-white">Type:</strong> Limited Liability Company</p>
                  <p><strong className="text-slate-900 dark:text-white">Jurisdiction:</strong> United States</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Contact Details</h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <p><strong className="text-slate-900 dark:text-white">Email:</strong> invoicecorehub@gmail.com</p>
                  <p><strong className="text-slate-900 dark:text-white">Phone:</strong> +91 8617202920</p>
                  <p><strong className="text-slate-900 dark:text-white">Address:</strong> EN69, Sector V<br />Kolkata, WB 700102, India</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Service Coverage</h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <p><strong className="text-slate-900 dark:text-white">Primary Market:</strong> United States</p>
                  <p><strong className="text-slate-900 dark:text-white">Global Reach:</strong> Available Worldwide</p>
                  <p><strong className="text-slate-900 dark:text-white">Languages:</strong> English</p>
                  <p><strong className="text-slate-900 dark:text-white">Support Hours:</strong> Mon-Fri, 9 AM - 5 PM EST</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Trust & Compliance</h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    GDPR Compliant
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    CCPA Compliant
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    SSL Encrypted
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    No Data Selling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              InvoiceCore Hub helps freelancers and small business owners create professional documents without subscriptions or complicated software.
            </p>
            <a
              href="/tools"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Explore Our Tools
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
