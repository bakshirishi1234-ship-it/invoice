/**
 * Share Service
 * Handles sharing of generated PDFs across different platforms
 */

export interface ShareOptions {
  title: string;
  text: string;
  url?: string;
  fileName?: string;
}

/**
 * Check if Web Share API is available
 */
export const isWebShareAvailable = (): boolean => {
  return typeof navigator !== 'undefined' && !!navigator.share;
};

/**
 * Share via Web Share API (native sharing on mobile)
 */
/**
 * Share via Web Share API (native sharing on mobile)
 */
export const shareViaWebAPI = async (options: ShareOptions & { file?: Blob }): Promise<boolean> => {
  if (!isWebShareAvailable()) {
    return false;
  }

  try {
    const shareData: ShareData = {
      title: options.title,
      text: options.text,
    };

    // Add URL if available
    if (options.url) {
      shareData.url = options.url;
    }

    // Add File if available and supported
    if (options.file && navigator.canShare) {
      const file = new File([options.file], options.fileName || 'document.pdf', { type: 'application/pdf' });
      const fileShareData = { ...shareData, files: [file] };

      if (navigator.canShare(fileShareData)) {
        await navigator.share(fileShareData);
        return true;
      }
    }

    // Fallback to text/url sharing if file sharing not supported
    await navigator.share(shareData);
    return true;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Web Share API error:', error);
    }
    return false;
  }
};

/**
 * Generate WhatsApp share link
 */
export const getWhatsAppShareLink = (options: ShareOptions): string => {
  const message = encodeURIComponent(`${options.title}\n\n${options.text}${options.url ? `\n\n${options.url}` : ''}`);
  return `https://wa.me/?text=${message}`;
};

/**
 * Generate Facebook share link
 */
export const getFacebookShareLink = (options: ShareOptions): string => {
  const params = new URLSearchParams({
    app_id: '9042798295560530', // Your app ID would go here
    display: 'popup',
    href: options.url || window.location.href,
    redirect_uri: window.location.href,
  });
  return `https://www.facebook.com/dialog/share?${params.toString()}`;
};

/**
 * Generate Twitter share link
 */
export const getTwitterShareLink = (options: ShareOptions): string => {
  const params = new URLSearchParams({
    text: `${options.title} - ${options.text}`,
    url: options.url || window.location.href,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
};

/**
 * Generate LinkedIn share link
 */
export const getLinkedInShareLink = (options: ShareOptions): string => {
  const params = new URLSearchParams({
    url: options.url || window.location.href,
    title: options.title,
    summary: options.text,
  });
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
};

/**
 * Generate Email share link
 */
export const getEmailShareLink = (options: ShareOptions): string => {
  const subject = encodeURIComponent(options.title);
  const body = encodeURIComponent(`${options.text}${options.url ? `\n\n${options.url}` : ''}`);
  return `mailto:?subject=${subject}&body=${body}`;
};

/**
 * Generate Telegram share link
 */
export const getTelegramShareLink = (options: ShareOptions): string => {
  const params = new URLSearchParams({
    url: options.url || window.location.href,
    text: `${options.title} - ${options.text}`,
  });
  return `https://t.me/share/url?${params.toString()}`;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Clipboard copy error:', error);
    return false;
  }
};

/**
 * Download PDF file directly
 */
export const downloadPDF = (blob: Blob, fileName: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName || 'document.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Share PDF via different platforms
 */
export const sharePDF = async (
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'email' | 'telegram' | 'web',
  options: ShareOptions & { pdfBlob?: Blob }
): Promise<void> => {

  // High Priority: Try native file sharing first for ALL mobile platforms if blob exists
  // This allows "Share to WhatsApp" to actually send the file
  if (options.pdfBlob && isWebShareAvailable()) {
    const success = await shareViaWebAPI({
      ...options,
      file: options.pdfBlob
    });
    if (success) return;
    // If native sharing failed or was cancelled, continue to fallback below
  }

  // Fallback: URL/Text Link Sharing
  switch (platform) {
    case 'whatsapp':
      window.open(getWhatsAppShareLink(options), '_blank');
      break;
    case 'facebook':
      window.open(getFacebookShareLink(options), '_blank');
      break;
    case 'twitter':
      window.open(getTwitterShareLink(options), '_blank');
      break;
    case 'linkedin':
      window.open(getLinkedInShareLink(options), '_blank');
      break;
    case 'email':
      window.open(getEmailShareLink(options));
      break;
    case 'telegram':
      window.open(getTelegramShareLink(options), '_blank');
      break;
    case 'web':
      // We already tried web share above, but if it failed due to file issues, try text only
      await shareViaWebAPI(options);
      break;
    default:
      console.warn(`Unknown platform: ${platform}`);
  }
};
