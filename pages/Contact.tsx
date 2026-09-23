import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  // Scroll to top on mount to properly show contact page on mobile
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
    }
  };

  return (
    <>
      <SEO
        title="Contact InvoiceCore Hub Support - Fast & Helpful Responses"
        description="Need help with InvoiceCore Hub? Contact our support team for questions about invoicing, legal templates, or business tools. Response time: under 24 hours."
        keywords="contact support, customer service, help desk, InvoiceCore Hub support, business tool support, invoice software help, invoice, free invoice, digital invoice"
        type="website"
      />
      <div className="bg-white dark:bg-slate-900 min-h-screen pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Contact Information</h2>

              {/* Email */}
              <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400">support@invoicecorehub.com</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">We typically reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Business Address */}
              <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Business Address</h3>
                    <p className="text-slate-600 dark:text-slate-400">InvoiceCore Hub LLC</p>
                    <p className="text-slate-600 dark:text-slate-400">EN69, Sector V</p>
                    <p className="text-slate-600 dark:text-slate-400">Kolkata, WB 700102</p>
                    <p className="text-slate-600 dark:text-slate-400">India</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-400">+91 8617202920</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Business hours only</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0 mr-4" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Business Hours</h3>
                    <p className="text-slate-600 dark:text-slate-400">Monday - Friday</p>
                    <p className="text-slate-600 dark:text-slate-400">9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Support Types */}
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">We Can Help With</h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                    General questions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                    Bug reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                    Feature requests
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                    Partnership inquiries
                  </li>
                </ul>
              </div>

              {/* Legal Disclaimer */}
              <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mr-3 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Note:</strong> We do not offer legal advice. For specific legal questions about our templates, please consult an attorney.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 dark:bg-slate-800 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>

                {submitted ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-8 rounded-xl text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/40 mb-6">
                      <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">Message Sent!</h3>
                    <p className="text-green-700 dark:text-green-200 mb-6">
                      Thank you for reaching out. We've received your message and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                      }}
                      className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Report a Bug">Report a Bug</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Partnership">Partnership Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        placeholder="Tell us what's on your mind..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {formData.message.length} / 5000 characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Send className="h-5 w-5" />
                      Send Message
                    </button>

                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                      We typically respond within 24 business hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>

              <div className="space-y-4">
                <details className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 open:bg-white dark:open:bg-slate-900 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white">
                    How quickly will I get a response?
                    <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-slate-600 dark:text-slate-400 mt-4">
                    We aim to respond to all inquiries within 24 business hours. If it's urgent, please mention it in your message.
                  </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 open:bg-white dark:open:bg-slate-900 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white">
                    Is InvoiceCore Hub truly free?
                    <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-slate-600 dark:text-slate-400 mt-4">
                    Yes! All core features are 100% free. No credit card required, no hidden fees, no premium tiers.
                  </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 open:bg-white dark:open:bg-slate-900 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white">
                    Can I use these documents for legal purposes?
                    <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-slate-600 dark:text-slate-400 mt-4">
                    Our templates provide a good starting point for common business documents. However, we recommend having an attorney review any legal documents before signing, especially for complex matters.
                  </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 open:bg-white dark:open:bg-slate-900 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white">
                    Is my data safe and private?
                    <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-slate-600 dark:text-slate-400 mt-4">
                    Yes. Your data is processed locally in your browser and is never stored on our servers. We don't sell your information, period.
                  </p>
                </details>

                <details className="group bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 open:bg-white dark:open:bg-slate-900 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 dark:text-white">
                    Can I suggest a new feature or tool?
                    <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-slate-600 dark:text-slate-400 mt-4">
                    Absolutely! We love hearing from our users. Send us an email with "Feature Request" in the subject line.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
