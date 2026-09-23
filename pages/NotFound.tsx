import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found | InvoiceCore Hub"
        description="The page you are looking for does not exist. Browse our free invoice generator, business tools, and guides."
        type="website"
      />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 pt-20">
        <div className="text-center max-w-lg">
          <p className="text-7xl font-extrabold text-primary-600 dark:text-primary-400 mb-4">404</p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The page you requested does not exist or may have been moved. Use the links below to find what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Link>
            <Link
              to="/tools"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 transition-colors"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Tools
            </Link>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center mt-6 text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Read our business guides
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
