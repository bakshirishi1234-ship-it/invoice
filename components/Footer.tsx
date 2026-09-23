import { Link } from 'react-router-dom';
import { FileText, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 no-print">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-primary-600 rounded-lg p-1 mr-2">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">InvoiceCore Hub</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              The simplest way to create professional documents. Built for US freelancers and small businesses with privacy in mind.
            </p>
            <div className="mt-4 text-xs text-slate-400 dark:text-slate-500 space-y-1">
              <p className="font-semibold text-slate-600 dark:text-slate-400">InvoiceCore Hub LLC</p>
              <p>EN69, Sector V</p>
              <p>Kolkata, WB 700102, India</p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Email: support@invoicecorehub.com</p>
              <p>Phone: +91 8617202920</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">Home</Link></li>
              <li><Link to="/tools" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">All Tools</Link></li>
              <li><Link to="/articles" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">Business Guides</Link></li>
              <li><Link to="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-wider uppercase mb-4">Support</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Need help or have a suggestion?
            </p>
            <Link to="/contact" className="inline-flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              Contact Support
            </Link>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-100 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; 2025 InvoiceCore Hub. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/InvoiceCoreHub" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="text-slate-400 hover:text-slate-500">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
