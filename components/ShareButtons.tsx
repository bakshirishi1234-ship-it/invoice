import React, { useState, useEffect } from 'react';
import {
  Share2,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Send,
  Download,
  Smartphone,
  X,
  Sparkles
} from 'lucide-react';
import { sharePDF, isWebShareAvailable, downloadPDF } from '../services/shareService';

interface ShareButtonsProps {
  fileName: string;
  documentTitle: string;
  documentDescription?: string;
  pdfBlob?: Blob;
  onShare?: (platform: string) => void;
  variant?: 'default' | 'compact' | 'floating';
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  fileName,
  documentTitle,
  documentDescription = 'Check out this professional document created with InvoiceCore Hub!',
  pdfBlob,
  onShare,
  variant = 'default'
}) => {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Show floating bar after PDF is ready
  useEffect(() => {
    if (pdfBlob && variant === 'floating') {
      setTimeout(() => setShowFloatingBar(true), 500);
    }
  }, [pdfBlob, variant]);

  const handleShare = async (platform: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'email' | 'telegram' | 'web') => {
    setIsSharing(true);
    try {
      await sharePDF(platform, {
        title: documentTitle,
        text: documentDescription,
        url: window.location.href,
        fileName: fileName,
        pdfBlob: pdfBlob,
      });
      onShare?.(platform);
      setShowMenu(false);
      setShareSuccess(platform);
      setTimeout(() => setShareSuccess(null), 2000);
    } catch (error) {
      console.error(`Error sharing via ${platform}:`, error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleNativeShare = async () => {
    if (!isWebShareAvailable()) return;

    setIsSharing(true);
    try {
      const shareData: ShareData = {
        title: documentTitle,
        text: documentDescription,
        url: window.location.href,
      };

      // If we have a PDF blob and the browser supports file sharing
      if (pdfBlob && navigator.canShare) {
        const file = new File([pdfBlob], fileName || 'document.pdf', { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ ...shareData, files: [file] });
          onShare?.('native-with-file');
          setShareSuccess('native');
          setTimeout(() => setShareSuccess(null), 2000);
          return;
        }
      }

      await navigator.share(shareData);
      onShare?.('native');
      setShareSuccess('native');
      setTimeout(() => setShareSuccess(null), 2000);
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Native share error:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShare?.('copy');
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      downloadPDF(pdfBlob, fileName);
      onShare?.('download');
    }
  };

  const shareOptions = [
  ];

  // Floating variant for mobile - shows after PDF is generated
  if (variant === 'floating' && pdfBlob) {
    return (
      <>
        {/* Floating Share Bar */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-out ${showFloatingBar ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          {/* Success toast */}
          {shareSuccess && (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Shared successfully!</span>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl safe-area-bottom">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-500" />
                <span className="font-semibold text-slate-900 dark:text-white">Share Your Document</span>
              </div>
              <button
                onClick={() => setShowFloatingBar(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            {/* Share buttons grid */}
            <div className="p-4">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {/* Native Share (Mobile Priority) */}
                {isWebShareAvailable() && (
                  <button
                    onClick={handleNativeShare}
                    disabled={isSharing}
                    className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all min-w-[72px] disabled:opacity-50"
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-xs font-medium">Share</span>
                  </button>
                )}

                {/* Quick share options */}
                {shareOptions.slice(0, 4).map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleShare(option.id as any)}
                      disabled={isSharing}
                      className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl transition-all min-w-[72px] ${option.bgColor} ring-1 ${option.ringColor} disabled:opacity-50`}
                    >
                      <Icon className={`h-6 w-6 ${option.color}`} />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{option.label}</span>
                    </button>
                  );
                })}

                {/* Download */}
                <button
                  onClick={handleDownload}
                  className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all min-w-[72px] ring-1 ring-slate-200 dark:ring-slate-700"
                >
                  <Download className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Save</span>
                </button>

                {/* More options */}
                <button
                  onClick={() => setShowMenu(true)}
                  className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all min-w-[72px] ring-1 ring-slate-200 dark:ring-slate-700"
                >
                  <Share2 className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">More</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full share menu modal */}
        {showMenu && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMenu(false)}
            />
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl animate-slide-up safe-area-bottom">
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Share via</h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4 p-6">
                {shareOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleShare(option.id as any)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      <div className={`p-3 rounded-full ${option.bgColor}`}>
                        <Icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copy link section */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="font-medium text-green-600 dark:text-green-400">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 text-slate-500" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Compact variant for inline use
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2">
        {isWebShareAvailable() && (
          <button
            onClick={handleNativeShare}
            className="p-2.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md"
            title="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>
        )}
        {shareOptions.slice(0, 3).map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => handleShare(option.id as any)}
              className={`p-2.5 rounded-full transition-colors ${option.bgColor}`}
              title={option.label}
            >
              <Icon className={`h-5 w-5 ${option.color}`} />
            </button>
          );
        })}
        <button
          onClick={handleCopyLink}
          className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Copy link"
        >
          {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-slate-500" />}
        </button>
        {pdfBlob && (
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Download PDF"
          >
            <Download className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button>
        )}
      </div>
    );
  }

  // Default variant - full featured
  return (
    <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-700">
      {/* Success toast */}
      {shareSuccess && (
        <div className="mb-4 flex items-center justify-center gap-2 py-3 px-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800 animate-pulse">
          <Check className="h-5 w-5 text-green-500" />
          <span className="font-medium text-green-700 dark:text-green-300">Shared successfully!</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white shadow-lg shadow-primary-500/20">
            <Share2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Share Your {documentTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Send directly to WhatsApp, Email, or any app on your device
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Native Share - Primary on mobile */}
          {isWebShareAvailable() && (
            <button
              onClick={handleNativeShare}
              disabled={isSharing}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-semibold hover:from-primary-700 hover:to-indigo-700 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 disabled:opacity-50 order-first"
            >
              <Smartphone className="h-5 w-5" />
              <span>Share to Apps</span>
            </button>
          )}

          {/* Download Button */}
          {pdfBlob && (
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors shadow-sm"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          )}

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors shadow-sm"
            title="Copy link"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="hidden sm:inline text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* More Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 font-medium transition-colors shadow-md"
              title="More share options"
            >
              <Share2 className="h-5 w-5" />
              <span>More</span>
            </button>

            {/* Share Menu Dropdown */}
            {showMenu && (
              <div className="absolute right-0 bottom-full mb-2 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden min-w-64 animate-fade-in">
                <div className="p-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-2">Share via</p>
                </div>

                {/* Grid of share options */}
                <div className="grid grid-cols-3 gap-2 p-3">
                  {shareOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleShare(option.id as any)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${option.bgColor} ring-1 ${option.ringColor}`}
                        title={`Share via ${option.label}`}
                      >
                        <Icon className={`h-5 w-5 ${option.color}`} />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close menu when clicking outside */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Share Info Message */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
              Your document is 100% private
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Generated only in your browser—nothing is stored on our servers. Share with confidence!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
