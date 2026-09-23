import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark } from 'lucide-react';
import { ARTICLES } from '../constants';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const article = ARTICLES.find(a => a.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">The resource you are looking for doesn't exist.</p>
                    <Link to="/articles" className="text-primary-600 hover:underline font-bold">Back to Articles</Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`${article.title} - InvoiceCore Hub`}
                description={article.summary}
                keywords={`${article.category}, ${article.title.split(' ').join(', ')}, business guide, InvoiceCore Hub`}
                type="article"
            />
            <div className="bg-white dark:bg-slate-900 min-h-screen pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/articles')}
                        className="flex items-center text-slate-500 hover:text-primary-600 mb-8 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </button>

                    {/* Article Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider">
                                {article.category}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500 text-sm flex items-center gap-1">
                                <Clock className="h-4 w-4" /> {article.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                    <User className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white leading-none mb-1">{article.author}</p>
                                    <p className="text-sm text-slate-500">{article.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all border border-slate-200 dark:border-slate-700">
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <button className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all border border-slate-200 dark:border-slate-700">
                                    <Bookmark className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
            prose-headings:font-extrabold prose-headings:tracking-tight 
            prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-white
            prose-blockquote:border-primary-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
          ">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Was this guide helpful?</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                Explore more tools and resources to streamline your business operations.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/tools" className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors">
                                    Browse All Tools
                                </Link>
                                <Link to="/articles" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    More Articles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArticlePage;
