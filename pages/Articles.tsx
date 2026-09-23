import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Calendar, User } from 'lucide-react';
import { ARTICLES } from '../constants';
import SEO from '../components/SEO';

const Articles: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO
                title="Business Guides & Resources for Freelancers - InvoiceCore Hub"
                description="Explore our library of free business guides, tax tips, and legal resources designed to help freelancers and small business owners succeed."
                keywords="business guides, freelancer tips, invoicing guides, tax advice for freelancers, legal resources, LLC guides, small business resources, InvoiceCore Hub blog"
                type="website"
            />
            <div className="bg-white dark:bg-slate-900 min-h-screen pt-20 pb-16">
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 py-16 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                            Business Resources & Guides
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Expert advice to help you manage your business, handle taxes, and navigate legal requirements with confidence.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ARTICLES.map((article) => (
                            <article
                                key={article.id}
                                className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                        <span className="text-slate-400 dark:text-slate-500 text-sm flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {article.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                                    </h2>

                                    <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">
                                        {article.summary}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                            </div>
                                            <div className="text-xs">
                                                <p className="font-bold text-slate-900 dark:text-white">{article.author}</p>
                                                <p className="text-slate-500">{article.date}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/article/${article.id}`}
                                            className="text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center group/link"
                                        >
                                            Read Guide <ArrowRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="mt-20 bg-primary-600 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-600/20">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[100%] bg-white rounded-full blur-[100px]"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[100%] bg-indigo-400 rounded-full blur-[100px]"></div>
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <BookOpen className="h-12 w-12 mx-auto mb-6 opacity-80" />
                            <h2 className="text-3xl font-extrabold mb-4">Want more business tips?</h2>
                            <p className="text-primary-100 text-lg mb-8">
                                We're constantly adding new guides and tools to help your business grow. Check back often or follow us for updates.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/tools"
                                    className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg"
                                >
                                    Explore All Tools
                                </Link>
                                <Link
                                    to="/contact"
                                    className="bg-primary-700 text-white border border-primary-500 px-8 py-3 rounded-xl font-bold hover:bg-primary-800 transition-colors"
                                >
                                    Suggest a Topic
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Articles;
