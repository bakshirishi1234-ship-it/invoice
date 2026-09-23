import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { ToolDef, LegalFormData } from '../types';
import { generateLegalDocument } from '../services/geminiService';
import { Wand2, Printer, Loader2, AlertCircle, FileText, Plus, Trash2, RefreshCw, ArrowRight, Download, Users, Calendar, Briefcase, Building2, User, Tag, ShoppingBag, ZoomIn, ZoomOut, ShieldCheck, FileSignature, FileCheck, UploadCloud } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface LegalToolProps {
    tool: ToolDef;
}

const CONTRACTOR_DEFAULTS: LegalFormData = {
    partyA: 'Acme Corporation',
    partyAAddress: '123 Business Rd, Suite 100\nSan Francisco, CA 94105',
    partyB: 'Jane Freelancer',
    partyBAddress: '456 Developer Ave\nOakland, CA 94612',
    effectiveDate: '2025-12-04',
    projectStartDate: '2025-12-04',
    projectEndDate: '2026-03-04',
    noticePeriod: '14',
    jurisdictionState: 'California',
    additionalDetails: '',
    services: [
        'Develop and launch a new marketing website.',
        'Provide ongoing monthly maintenance for 6 months post-launch.'
    ],
    compensationAmount: '5000',
    paymentSchedule: '50% upon signing, 50% upon project completion.',
    confidentialityClause: 'During the term of this Agreement and for five (5) years thereafter, the Contractor will not disclose any proprietary or confidential information of the Client.',
    ipClause: 'All deliverables, ideas, and work product developed by the Contractor in connection with the Services for the Client shall be the sole and exclusive property of the Client.',
};

const OFFER_LETTER_DEFAULTS: LegalFormData = {
    partyA: 'Innovate Inc.',
    partyAAddress: '123 Tech Park, Silicon Valley, CA 94000',
    partyB: 'Jane Smith',
    partyBAddress: '456 Applicant Ave, Job-Seeker City, JS 12345',
    effectiveDate: '2025-12-04', // Letter Date
    projectStartDate: '2025-12-18', // Start Date
    offerDeadline: '2025-12-09',
    jurisdictionState: 'California',
    additionalDetails: '',
    jobTitle: 'Senior Software Engineer',
    reportingTo: 'John Johnson, Engineering Manager',
    salary: '120000',
    senderName: 'Bob Ross',
    senderTitle: 'Hiring Manager'
};

const LLC_DEFAULTS: LegalFormData = {
    partyA: 'My Awesome Business, LLC', // LLC Name
    jurisdictionState: 'Delaware',
    effectiveDate: '2025-12-04',
    partyB: 'John Doe', // Member Name
    partyBAddress: '123 Main Street, Anytown, USA 12345',
    additionalDetails: 'To engage in e-commerce, digital marketing services, and any other lawful act or activity for which limited liability companies may be organized under the laws of the State of Delaware.', // Purpose
    agentName: 'Jane Smith',
    agentAddress: '456 Corporate Lane, Wilmington, DE 19801'
};

const BILL_OF_SALE_DEFAULTS: LegalFormData = {
    partyA: 'Jane Smith', // Seller
    partyAAddress: '123 Seller St, Buyerville, BS 12345',
    partyAMobile: '(555) 123-4567',
    partyB: 'John Doe', // Buyer
    partyBAddress: '456 Buyer Ave, Townsville, TS 54321',
    partyBMobile: '(555) 987-6543',
    effectiveDate: '2025-12-04', // Date of Sale
    jurisdictionState: 'California',
    additionalDetails: '',
    itemType: 'Vehicle',
    itemDescription: 'A used 2018 Toyota Camry, blue, 4-door sedan.',
    vin: 'JT1K23L45M6789012',
    make: 'Toyota',
    model: 'Camry',
    year: '2018',
    purchasePrice: '15000',
    warrantyType: 'As-Is'
};

const NDA_DEFAULTS: LegalFormData = {
    partyA: 'TechCorp Solutions Inc.',
    partyAAddress: '123 Innovation Drive, San Francisco, CA 94105',
    partyB: 'Jane Developer',
    partyBAddress: '456 Code Street, Oakland, CA 94612',
    effectiveDate: '2025-12-04',
    jurisdictionState: 'California',
    additionalDetails: 'Confidential business plans, technical specifications, and proprietary algorithms related to the development of AI software solutions.',
};

const PRIVACY_POLICY_DEFAULTS: LegalFormData = {
    partyA: 'My Website LLC',
    partyB: 'support@mywebsite.com',
    effectiveDate: '2025-12-04',
    jurisdictionState: 'California',
    additionalDetails: 'User account information, browsing history, cookies, and analytics data. We also collect payment information for purchases.',
};

const LEASE_AGREEMENT_DEFAULTS: LegalFormData = {
    partyA: 'John Smith, Property Owner',
    partyAAddress: '123 Main Street, Boston, MA 02101',
    partyB: 'Jane Tenant',
    partyBAddress: '456 Rental Lane, Boston, MA 02102',
    effectiveDate: '2025-12-04',
    projectStartDate: '2026-01-01',
    projectEndDate: '2026-12-31',
    jurisdictionState: 'Massachusetts',
    additionalDetails: 'Single bedroom apartment, 1000 sq ft, no pets allowed, monthly rent payment on the 1st of each month.',
};

const GENERIC_DEFAULTS: LegalFormData = {
    partyA: '',
    partyB: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    jurisdictionState: 'Delaware',
    additionalDetails: ''
};

const LegalTool: React.FC<LegalToolProps> = ({ tool }) => {
    const isContractorTool = tool.id === 'contractor-agreement';
    const isOfferLetterTool = tool.id === 'offer-letter';
    const isLLCTool = tool.id === 'llc-operating-agreement';
    const isBillOfSaleTool = tool.id === 'bill-of-sale';
    const isNDATool = tool.id === 'nda-generator';
    const isPrivacyPolicyTool = tool.id === 'privacy-policy';
    const isLeaseAgreementTool = tool.id === 'lease-agreement';

    const [data, setData] = useState<LegalFormData>(
        isContractorTool ? CONTRACTOR_DEFAULTS :
            isOfferLetterTool ? OFFER_LETTER_DEFAULTS :
                isLLCTool ? LLC_DEFAULTS :
                    isBillOfSaleTool ? BILL_OF_SALE_DEFAULTS :
                        isNDATool ? NDA_DEFAULTS :
                            isPrivacyPolicyTool ? PRIVACY_POLICY_DEFAULTS :
                                isLeaseAgreementTool ? LEASE_AGREEMENT_DEFAULTS :
                                    GENERIC_DEFAULTS
    );

    const [generatedContent, setGeneratedContent] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [scale, setScale] = useState(1);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [template, setTemplate] = useState<'standard' | 'alternate' | 'professional'>('standard');
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Image Handling
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, logo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerLogoUpload = () => {
        fileInputRef.current?.click();
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '[Date]';
        try {
            if (dateStr.includes('-')) {
                const [y, m, d] = dateStr.split('-');
                const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
                return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            }
            return dateStr;
        } catch (e) {
            return dateStr;
        }
    };

    const formatCurrency = (amount?: string) => {
        if (!amount) return '$0.00';
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(amount));
        } catch (e) {
            return '$' + amount;
        }
    };

    // Reset state when tool changes
    useEffect(() => {
        setData(
            isContractorTool ? CONTRACTOR_DEFAULTS :
                isOfferLetterTool ? OFFER_LETTER_DEFAULTS :
                    isLLCTool ? LLC_DEFAULTS :
                        isBillOfSaleTool ? BILL_OF_SALE_DEFAULTS :
                            isNDATool ? NDA_DEFAULTS :
                                isPrivacyPolicyTool ? PRIVACY_POLICY_DEFAULTS :
                                    isLeaseAgreementTool ? LEASE_AGREEMENT_DEFAULTS :
                                        GENERIC_DEFAULTS
        );
        setGeneratedContent('');
        setError(null);
    }, [tool.id, isContractorTool, isOfferLetterTool, isLLCTool, isBillOfSaleTool, isNDATool, isPrivacyPolicyTool, isLeaseAgreementTool]);

    // Handle responsive scaling
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const requiredWidth = 820; // A4 + Padding

                if (containerWidth < requiredWidth) {
                    const newScale = containerWidth / requiredWidth;
                    setScale(newScale);
                } else {
                    setScale(1);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    // Specific handler for Services array in Contractor Tool
    const handleServiceChange = (index: number, value: string) => {
        const newServices = [...(data.services || [])];
        newServices[index] = value;
        setData(prev => ({ ...prev, services: newServices }));
    };

    const addService = () => {
        setData(prev => ({ ...prev, services: [...(prev.services || []), ''] }));
    };

    const removeService = (index: number) => {
        const newServices = [...(data.services || [])];
        newServices.splice(index, 1);
        setData(prev => ({ ...prev, services: newServices }));
    };

    const resetToBlank = () => {
        if (window.confirm('Are you sure you want to clear all data and start fresh?')) {
            let blank;
            if (isContractorTool) {
                blank = {
                    ...CONTRACTOR_DEFAULTS,
                    partyA: '', partyAAddress: '', partyB: '', partyBAddress: '',
                    services: [''], compensationAmount: '', paymentSchedule: ''
                };
            } else if (isOfferLetterTool) {
                blank = {
                    ...OFFER_LETTER_DEFAULTS,
                    partyA: '', partyAAddress: '', partyB: '', partyBAddress: '',
                    jobTitle: '', reportingTo: '', salary: '', senderName: '', senderTitle: ''
                };
            } else if (isLLCTool) {
                blank = {
                    ...LLC_DEFAULTS,
                    partyA: '', partyB: '', partyBAddress: '', additionalDetails: '', agentName: '', agentAddress: ''
                }
            } else if (isBillOfSaleTool) {
                blank = {
                    ...BILL_OF_SALE_DEFAULTS,
                    partyA: '', partyAAddress: '', partyAMobile: '', partyB: '', partyBAddress: '', partyBMobile: '',
                    itemDescription: '', vin: '', make: '', model: '', year: '', purchasePrice: ''
                }
            } else {
                blank = GENERIC_DEFAULTS;
            }
            setData(blank);
        }
    };

    const handleGenerate = async () => {
        if (!tool.promptTemplate) return;

        setLoading(true);
        setError(null);
        try {
            const result = await generateLegalDocument(tool.promptTemplate, data);
            setGeneratedContent(result);
        } catch (err) {
            setError('Failed to generate document.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById('legal-document-preview');

        if (!element) {
            alert('Unable to find document content. Please refresh the page and try again.');
            return;
        }

        setIsGeneratingPdf(true);

        // Wait for React to update and remove transforms
        await new Promise(resolve => setTimeout(resolve, 150));

        // Check if html2pdf is available
        // @ts-ignore
        let html2pdfLib = window.html2pdf;
        let retries = 3;

        while (!html2pdfLib && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 500));
            // @ts-ignore
            html2pdfLib = window.html2pdf;
            retries--;
        }

        if (!html2pdfLib) {
            setIsGeneratingPdf(false);
            alert('PDF generator library is not available. Please refresh the page and try again.');
            return;
        }

        const filename = `${tool.name.replace(/\s+/g, '-')}.pdf`;

        // Optimal settings for professional PDF output
        const deviceScale = Math.max(1, window.devicePixelRatio || 1);
        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: Math.min(2, deviceScale),
                useCORS: true,
                logging: false,
                allowTaint: false,
                windowWidth: 794,
                width: 794,
                x: 0,
                y: 0,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        try {
            // Use a clone to capture a clean, fixed-size A4 rendering.
            const clone = element.cloneNode(true) as HTMLElement;

            // Remove minimum height constraint to prevent forcing a second page if content is short
            clone.classList.remove('min-h-[29.7cm]');
            clone.style.minHeight = 'auto';

            // Apply fixed A4 width and white background to the clone so html2canvas captures consistently
            clone.style.width = '794px';
            clone.style.boxSizing = 'border-box';
            clone.style.background = '#ffffff';
            clone.style.transform = 'none';
            clone.style.margin = '0';
            clone.style.padding = '40px'; // Apply consistent padding directly to container, matching FinancialTool

            // Hide the footer in PDF to prevent layout issues and extra pages
            const footer = clone.querySelector('.absolute.bottom-4');
            if (footer) {
                (footer as HTMLElement).style.display = 'none';
            }

            // Place clone inside viewport but invisible so mobile browsers still render it
            const wrapper = document.createElement('div');
            wrapper.style.position = 'fixed';
            wrapper.style.left = '0';
            wrapper.style.top = '0';
            wrapper.style.width = '794px';
            wrapper.style.height = 'auto';
            wrapper.style.overflow = 'visible';
            wrapper.style.opacity = '0';
            wrapper.style.pointerEvents = 'none';
            wrapper.style.zIndex = '9999';
            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);

            // Force reflow so fonts/styles settle
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            clone.offsetHeight;
            // Use a slightly longer wait to ensure mobile browsers finish layout and font loading
            await new Promise(resolve => setTimeout(resolve, 300));

            // Try primary capture with html2pdf
            try {
                // @ts-ignore
                await new Promise<void>((resolve) => {
                    html2pdfLib()
                        .set(opt)
                        .from(clone)
                        .save()
                        .then(() => {
                            // After save, capture the blob
                            setTimeout(() => {
                                try {
                                    // @ts-ignore
                                    html2pdfLib()
                                        .set(opt)
                                        .from(clone)
                                        .toPdf()
                                        .get('pdf', (pdfDoc: any) => {
                                            try {
                                                const blob = pdfDoc.output('blob');
                                                setPdfBlob(blob);
                                                console.log('Legal PDF blob captured');
                                            } catch (blobErr) {
                                                console.warn('Could not capture legal blob:', blobErr);
                                                // Fallback blob
                                                const fallbackBlob = new Blob(['PDF generated'], { type: 'application/pdf' });
                                                setPdfBlob(fallbackBlob);
                                            }
                                            resolve();
                                        });
                                } catch (err) {
                                    console.warn('Error capturing legal blob:', err);
                                    const fallbackBlob = new Blob(['PDF generated'], { type: 'application/pdf' });
                                    setPdfBlob(fallbackBlob);
                                    resolve();
                                }
                            }, 100);
                        })
                        .catch((err: any) => {
                            console.error('Legal PDF generation error:', err);
                            const fallbackBlob = new Blob(['PDF generated'], { type: 'application/pdf' });
                            setPdfBlob(fallbackBlob);
                            resolve();
                        });
                });
            } catch (primaryError) {
                console.warn('html2pdf primary capture failed, attempting html2canvas/jsPDF fallback', primaryError);
                // Fallback: use html2canvas then jsPDF directly (load from CDN if needed)
                try {
                    const ensureHtml2Canvas = async () => {
                        // @ts-ignore
                        if ((window as any).html2canvas) return (window as any).html2canvas;
                        await new Promise<void>((resolve, reject) => {
                            const s = document.createElement('script');
                            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                            s.onload = () => resolve();
                            s.onerror = () => reject(new Error('Failed to load html2canvas'));
                            document.head.appendChild(s);
                        });
                        // @ts-ignore
                        return (window as any).html2canvas;
                    };

                    const ensureJsPDF = async () => {
                        // @ts-ignore
                        if ((window as any).jsPDF || (window as any).jspdf) return (window as any).jsPDF || (window as any).jspdf?.jsPDF || (window as any).jspdf;
                        await new Promise<void>((resolve, reject) => {
                            const s = document.createElement('script');
                            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                            s.onload = () => resolve();
                            s.onerror = () => reject(new Error('Failed to load jsPDF'));
                            document.head.appendChild(s);
                        });
                        // @ts-ignore
                        return (window as any).jsPDF || (window as any).jspdf?.jsPDF || (window as any).jspdf;
                    };

                    // @ts-ignore
                    const html2canvas = await ensureHtml2Canvas();
                    const canvas = await html2canvas(clone, opt.html2canvas || {});
                    const imgData = canvas.toDataURL('image/jpeg', 0.95);
                    // @ts-ignore
                    const jsPDFCtor = await ensureJsPDF();
                    if (jsPDFCtor) {
                        // @ts-ignore
                        const pdf = new jsPDFCtor('p', 'mm', 'a4');
                        const imgProps = (pdf as any).getImageProperties(imgData);
                        const pdfWidth = 210; // mm
                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                        // @ts-ignore
                        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                        // @ts-ignore
                        pdf.save(filename);

                        // Capture blob for sharing
                        try {
                            const blob = pdf.output('blob');
                            setPdfBlob(blob);
                        } catch (blobError) {
                            console.warn('Could not capture PDF blob:', blobError);
                        }
                    } else {
                        throw new Error('jsPDF not found for fallback');
                    }
                } catch (fallbackError) {
                    console.error('Fallback PDF capture failed', fallbackError);
                    throw fallbackError;
                }
            }

            // Clean up clone
            document.body.removeChild(wrapper);

        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please ensure all content is properly filled and try again.');
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    const generateContractorPreview = () => {
        return `
# INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement (the "Agreement") is entered into as of **${formatDate(data.effectiveDate)}** (the "Effective Date").

**BETWEEN:**
**${data.partyA || '[Client Name]'}** located at:  
${data.partyAAddress?.replace(/\n/g, '  \n') || '[Client Address]'}  
(the "Client")

**AND:**
**${data.partyB || '[Contractor Name]'}** located at:  
${data.partyBAddress?.replace(/\n/g, '  \n') || '[Contractor Address]'}  
(the "Contractor")

---

### 1. SERVICES PROVIDED
The Client hereby engages the Contractor to provide the following services (the "Services"):

${data.services?.map(s => `* ${s || '[Service Description]'}`).join('\n')}

### 2. TERM AND TERMINATION
The Services shall commence on **${data.projectStartDate}**${data.projectEndDate ? ` and shall continue until **${data.projectEndDate}**` : ''}.

Either party may terminate this Agreement with **${data.noticePeriod || '14'} days** written notice to the other party.

### 3. COMPENSATION
The Client agrees to pay the Contractor a total of **${data.compensationAmount ? formatCurrency(data.compensationAmount) : '[Amount]'}** for the Services.

**Payment Schedule:**  
${data.paymentSchedule || '[Payment Schedule]'}

### 4. INDEPENDENT CONTRACTOR STATUS
The Contractor is an independent contractor, not an employee. The Contractor is responsible for all taxes and other obligations associated with the receipt of payment.

### 5. CONFIDENTIALITY
${data.confidentialityClause}

### 6. INTELLECTUAL PROPERTY
${data.ipClause}

### 7. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of **${data.jurisdictionState}**.

---

**IN WITNESS WHEREOF**, the parties have executed this Agreement as of the Effective Date.

**Client:** ________________________  
Name: ${data.partyA || '[Name]'}

**Contractor:** ________________________  
Name: ${data.partyB || '[Name]'}
    `;
    };

    const generateOfferLetterPreview = () => {
        return `
# OFFER OF EMPLOYMENT

**Date:** ${formatDate(data.effectiveDate)}

**To:**  
**${data.partyB || '[Candidate Name]'}**  
${data.partyBAddress?.replace(/\n/g, '  \n') || '[Candidate Address]'}

**From:**  
**${data.partyA || '[Company Name]'}**  
${data.partyAAddress?.replace(/\n/g, '  \n') || '[Company Address]'}

---

Dear **${data.partyB || '[Candidate Name]'}**,

We are pleased to offer you the full-time position of **${data.jobTitle || '[Job Title]'}** at **${data.partyA || '[Company Name]'}** with a start date of **${data.projectStartDate}**. You will be reporting directly to **${data.reportingTo || '[Manager Name]'}**.

### Compensation
The starting annual salary for this position is **${formatCurrency(data.salary)}**, paid on a regular basis in accordance with the Company's standard payroll practice.

### At-Will Employment
Your employment with the Company is "at-will." This means that either you or the Company may terminate the employment relationship at any time, with or without cause, and with or without notice.

### Benefits
You will be eligible to participate in the standard benefit plans offered to employees in similar positions, subject to plan terms and eligibility requirements.

### Acceptance
This offer is valid until **${formatDate(data.offerDeadline)}**. To accept this offer, please sign and date this letter and return it to us by the deadline.

We are excited to have you join the team!

Sincerely,

__________________________  
**${data.senderName || '[Sender Name]'}**  
${data.senderTitle || '[Sender Title]'}  
${data.partyA || '[Company Name]'}

&nbsp;

**Agreed to and Accepted:**

__________________________  
**${data.partyB || '[Candidate Name]'}**  
Date: ____________________
    `;
    };

    const generateLLCPreview = () => {
        return `
# Operating Agreement
### for a Single-Member LLC
### of ${data.partyA || '[LLC Name]'}

This Operating Agreement (the "Agreement") is made and entered into as of **${formatDate(data.effectiveDate)}** (the "Effective Date"), by and between the Company and its sole member.

### Article I: Company Formation

**1.1 Name.** The name of the Limited Liability Company is **${data.partyA || '[LLC Name]'}** (the "Company").

**1.2 Formation.** The Company was formed under the laws of the State of **${data.jurisdictionState}** by filing Articles of Organization with the Secretary of State.

**1.3 Purpose.** The purpose of the Company is to engage in the following business: ${data.additionalDetails || '[Business Purpose]'} and to engage in any other lawful business or activity for which a limited liability company may be formed under the laws of the State of **${data.jurisdictionState}**.

### Article II: Member

**2.1 Sole Member.** The sole member of the Company (the "Member") is **${data.partyB || '[Member Name]'}**.

**2.2 Address.** The mailing address of the Member is ${data.partyBAddress || '[Member Address]'}.

**2.3 Liability.** The Member's liability is limited as provided under the laws of the State of **${data.jurisdictionState}**. The Member shall not be liable for the debts, obligations, or liabilities of the Company.

### Article III: Capital Contributions

The Member has contributed or shall contribute capital to the Company as they see fit. No other member shall be admitted to the Company except with the written consent of the Member.

### Article IV: Management

**4.1 Management.** The Company shall be managed by its single Member. The Member has the full and complete authority, power, and discretion to manage and control the business, property, and affairs of the Company, to make all decisions regarding those matters, and to perform any and all other acts or activities customary or incident to the management of the Company’s business.

**4.2 Registered Agent.** The name and address of the Company's registered agent is: ${data.agentName || '[Agent Name]'}, ${data.agentAddress || '[Agent Address]'}.

### Article V: Taxation

For federal income tax purposes, the Company shall be treated as a "disregarded entity." The Member shall report all profits and losses of the Company on their personal tax return.

---

**IN WITNESS WHEREOF**, the undersigned Member has executed this Operating Agreement as of the Effective Date.

**Member Signature**

&nbsp;

__________________________  
**${data.partyB || '[Member Name]'}**

**Date**

${formatDate(data.effectiveDate)}
    `;
    };

    const generateBillOfSalePreview = () => {
        return `
# BILL OF SALE

**Date of Sale:** ${formatDate(data.effectiveDate)}

### 1. THE PARTIES

**Seller:**  
**${data.partyA || '[Seller Name]'}**  
${data.partyAAddress?.replace(/\n/g, '  \n') || '[Seller Address]'}  
**Mobile:** ${data.partyAMobile || '[Mobile Number]'}

**Buyer:**  
**${data.partyB || '[Buyer Name]'}**  
${data.partyBAddress?.replace(/\n/g, '  \n') || '[Buyer Address]'}  
**Mobile:** ${data.partyBMobile || '[Mobile Number]'}

### 2. THE ITEM

The Seller hereby sells, transfers, and conveys to the Buyer the following personal property (the "Item"):

**Type:** ${data.itemType || '[Item Type]'}  
**Description:** ${data.itemDescription || '[Description]'}

${data.itemType === 'Vehicle' ? `
**VIN:** ${data.vin || '[VIN]'}  
**Make:** ${data.make || '[Make]'}  
**Model:** ${data.model || '[Model]'}  
**Year:** ${data.year || '[Year]'}
` : ''}

### 3. PURCHASE PRICE

The Buyer agrees to pay the Seller the sum of **${formatCurrency(data.purchasePrice)}** in consideration for the Item.

### 4. WARRANTY

${data.warrantyType === 'As-Is' ?
                `The Item is sold **"AS-IS"** and the Seller makes no warranties, express or implied, regarding the condition of the Item. The Buyer accepts the Item in its current condition.`
                :
                `The Seller guarantees that the Item is free from any liens or encumbrances and that the Seller has the full right and authority to sell the Item.`}

### 5. SIGNATURES

The parties have executed this Bill of Sale as of the date first written above.

&nbsp;

&nbsp;

__________________________  
**Seller Signature**  
${data.partyA || '[Seller Name]'}

&nbsp;

&nbsp;

__________________________  
**Buyer Signature**  
${data.partyB || '[Buyer Name]'}
    `;
    };

    const generateNDAPreview = () => {
        return `
# NON-DISCLOSURE AGREEMENT (MUTUAL)

This Non-Disclosure Agreement (the "Agreement") is entered into as of **${formatDate(data.effectiveDate)}** (the "Effective Date").

**BETWEEN:**

**${data.partyA || '[Disclosing Party]'}**  
Located at: ${data.partyAAddress?.replace(/\n/g, '  \n') || '[Address]'}  
(the "Discloser")

**AND:**

**${data.partyB || '[Receiving Party]'}**  
Located at: ${data.partyBAddress?.replace(/\n/g, '  \n') || '[Address]'}  
(the "Recipient")

---

### 1. CONFIDENTIAL INFORMATION

"Confidential Information" means all non-public information, including but not limited to:

${data.additionalDetails || '* Business plans and strategies\n* Technical specifications and data\n* Financial information\n* Customer lists and pricing\n* Trade secrets and proprietary processes'}

### 2. OBLIGATIONS

The Recipient agrees to:

* Maintain all Confidential Information in strict confidence
* Use the Confidential Information solely for the purpose of evaluating a potential business relationship
* Limit access to employees, contractors, and advisors on a need-to-know basis who are bound by similar confidentiality obligations
* Protect the Confidential Information using the same degree of care used to protect its own confidential information

### 3. EXCLUSIONS

The Recipient shall have no obligations regarding Confidential Information that:

* Was publicly known prior to disclosure
* Is independently developed without use of the Confidential Information
* Is rightfully received from a third party without confidentiality restrictions
* Is required to be disclosed by law or court order

### 4. TERM

This Agreement shall remain in effect for **five (5) years** from the Effective Date, unless earlier terminated by written agreement of both parties.

### 5. GOVERNING LAW

This Agreement shall be governed by the laws of the State of **${data.jurisdictionState}**, without regard to its conflict of law principles.

---

**IN WITNESS WHEREOF**, the parties have executed this Agreement.

**Discloser:** ________________________  
${data.partyA || '[Name]'}

**Recipient:** ________________________  
${data.partyB || '[Name]'}
    `;
    };

    const generatePrivacyPolicyPreview = () => {
        return `
# PRIVACY POLICY

**Effective Date:** ${formatDate(data.effectiveDate)}

**Last Updated:** ${formatDate(data.effectiveDate)}

This Privacy Policy ("Policy") explains how **${data.partyA || '[Company/Website Name]'}** ("we," "us," "our," or "Company") collects, uses, discloses, and otherwise processes information about you through our websites, applications, and services (collectively, the "Services").

### 1. INFORMATION WE COLLECT

We collect information in the following ways:

**Information You Provide Directly:**
* Contact information (name, email, phone number, address)
* Account credentials and profile information
* Payment information and transaction history
* Communication preferences and feedback

**Automatically Collected Information:**
* Browser and device information
* IP addresses and location data
* Cookies and similar tracking technologies
* Usage analytics and browsing patterns

${data.additionalDetails ? `\n**Specific Data Collected:**\n${data.additionalDetails}\n` : ''}

### 2. HOW WE USE YOUR INFORMATION

We use information to:
* Provide, maintain, and improve our Services
* Process transactions and send related information
* Send promotional communications (with your consent)
* Comply with legal and regulatory obligations
* Detect and prevent fraudulent activity
* Analyze usage patterns and service improvements

### 3. COOKIES AND TRACKING TECHNOLOGIES

We use cookies, web beacons, and similar tracking technologies to:
* Remember your preferences
* Understand how you use our Services
* Measure the effectiveness of marketing campaigns
* Enhance your experience

You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our Services.

### 4. DATA SHARING AND DISCLOSURE

We may share your information with:
* Service providers who assist in our operations (under confidentiality agreements)
* Business partners and affiliates
* Legal authorities when required by law
* With your explicit consent

We do not sell your personal information to third parties.

### 5. GDPR AND CCPA COMPLIANCE

**For EU Residents (GDPR):**
You have the right to access, correct, and delete your personal data. We process data with your explicit consent and maintain appropriate safeguards.

**For California Residents (CCPA):**
You have the right to know what personal information is collected, used, shared, and deleted. You may request access to or deletion of your data.

### 6. DATA SECURITY

We implement industry-standard security measures to protect your information, including encryption and secure data transmission. However, no method is 100% secure.

### 7. CONTACT US

For privacy concerns or requests, contact us at:

**Email:** ${data.partyB || '[support@example.com]'}  
**Jurisdiction:** ${data.jurisdictionState}

---

**Last Updated:** ${formatDate(data.effectiveDate)}
    `;
    };

    const generateLeaseAgreementPreview = () => {
        return `
# RESIDENTIAL LEASE AGREEMENT

This Lease Agreement (the "Lease") is entered into as of **${formatDate(data.effectiveDate)}** (the "Effective Date").

**LANDLORD:**
**${data.partyA || '[Landlord Name]'}**  
${data.partyAAddress?.replace(/\n/g, '  \n') || '[Address]'}

**TENANT:**
**${data.partyB || '[Tenant Name]'}**  
${data.partyBAddress?.replace(/\n/g, '  \n') || '[Address]'}

---

### 1. LEASED PROPERTY

The Landlord hereby leases to the Tenant the property located at:

${data.partyAAddress?.replace(/\n/g, '  \n') || '[Property Address]'}

(the "Property")

### 2. LEASE TERM

**Commencement Date:** ${formatDate(data.projectStartDate)}  
**Expiration Date:** ${formatDate(data.projectEndDate)}  
**Lease Duration:** ${data.projectStartDate && data.projectEndDate ? `12 months` : '[Duration]'}

### 3. RENT AND PAYMENT

* **Monthly Rent:** As specified in this Lease
* **Due Date:** The 1st day of each month
* **Payment Method:** [Payment instructions to be provided by Landlord]
* **Late Payment:** Late fees of $[amount] per day will apply to rent received after the 5th of the month

### 4. SECURITY DEPOSIT

The Tenant shall deposit **$[Amount]** as a security deposit. This deposit:
* Will be held in a separate interest-bearing account
* May be applied to unpaid rent, damages, or lease violations
* Will be returned (less applicable deductions) within 30 days of lease termination

### 5. UTILITIES

${data.additionalDetails || 'The Tenant is responsible for the following utilities: water, gas, electricity, and internet. The Landlord will provide trash pickup.'}

### 6. MAINTENANCE AND REPAIRS

**Tenant Responsibilities:**
* Keep the Property clean and sanitary
* Report maintenance issues promptly
* Do not make alterations without Landlord's written consent

**Landlord Responsibilities:**
* Maintain structural integrity and major systems
* Provide a safe, habitable dwelling

### 7. HOUSE RULES

* No pets allowed (or as specified by Landlord)
* No smoking inside the property
* Quiet hours: 10 PM - 8 AM
* No subletting without written consent
* Guests may stay no more than 14 consecutive days

### 8. ENTRY AND INSPECTION

Landlord may enter the Property with 48 hours notice for:
* Repairs and maintenance
* Inspections
* Showing to prospective tenants
* Emergencies

### 9. TERMINATION AND LEASE RENEWAL

* Either party may terminate with **30 days** written notice
* Tenant must leave the Property in clean condition with all keys returned
* Failure to vacate will result in eviction proceedings

### 10. GOVERNING LAW

This Lease is governed by the laws of the State of **${data.jurisdictionState}**.

---

**IN WITNESS WHEREOF**, the parties have executed this Lease.

**LANDLORD:**
________________________  
${data.partyA || '[Name]'}  
Date: _________________

**TENANT:**
________________________  
${data.partyB || '[Name]'}  
Date: _________________
    `;
    };


    // --- V2 GENERATORS (Alternative Templates) ---

    const generateContractorPreviewV2 = () => {
        return `
# LETTER OF AGREEMENT (SERVICES)

**Date:** ${formatDate(data.effectiveDate)}

**FROM:** ${data.partyA || '[Client Name]'} ("Client")  
**TO:** ${data.partyB || '[Contractor Name]'} ("Contractor")

**RE:** Engagement for Services

Dear ${data.partyB || '[Contractor Name]'},

This letter confirms the agreement between Client and Contractor regarding the following services:

**1. Services:**  
Contractor agrees to provide the following services (the "Work"):
${data.services?.map(s => `* ${s || '[Service Description]'}`).join('\n')}

**2. Compensation:**  
Client shall pay Contractor a total of **${data.compensationAmount ? formatCurrency(data.compensationAmount) : '[Amount]'}**. Payment shall be made as follows: ${data.paymentSchedule || '[Payment Schedule]'}.

**3. Relationship:**  
Contractor is an independent contractor and not an employee of Client. Contractor is responsible for all taxes.

**4. Ownership:**  
All work product created by Contractor shall be the exclusive property of Client.

**5. Termination:**  
Either party may terminate this agreement with **${data.noticePeriod || '14'} days** written notice.

Please sign below to accept these terms.

**Accepted and Agreed:**

________________________  
**Client:** ${data.partyA || '[Name]'}

________________________  
**Contractor:** ${data.partyB || '[Name]'}
        `;
    };

    const generateOfferLetterPreviewV2 = () => {
        return `
# EMPLOYMENT OFFER - ${data.partyA || '[Company Name]'}

${formatDate(data.effectiveDate)}

**Strictly Private & Confidential**

To: ${data.partyB || '[Candidate Name]'}

**Re: Offer of Employment**

Hi ${data.partyB?.split(' ')[0] || 'Candidate'},

We are thrilled to offer you the position of **${data.jobTitle || '[Job Title]'}** at **${data.partyA || '[Company Name]'}**. We believe your skills and experience will be an invaluable asset to our team.

**The Details:**
*   **Role:** ${data.jobTitle || '[Job Title]'}
*   **Reporting To:** ${data.reportingTo || '[Manager Name]'}
*   **Start Date:** ${formatDate(data.projectStartDate)}
*   **Base Salary:** ${formatCurrency(data.salary)} per year
*   **Stock Options:** Subject to board approval, you will be granted option to purchase [Number] shares of Common Stock.

**Benefits:**
We offer a comprehensive benefits package detailed in the attached guide, including health insurance and flexible time off.

**At-Will:**
This offer does not constitute a contract of employment for a specific period. Your employment is at-will.

**Next Steps:**
This offer is open for acceptance until **${formatDate(data.offerDeadline)}**. Please sign below to join the team!

Best regards,

________________________  
**${data.senderName || '[Sender Name]'}**  
${data.senderTitle || '[Sender Title]'}

**I accept this offer of employment:**

________________________  
**${data.partyB || '[Candidate Name]'}**  
Date: ____________________
        `;
    };

    const generateLLCPreviewV2 = () => {
        return `
# OPERATING AGREEMENT (MANAGER-MANAGED)
### ${data.partyA || '[LLC Name]'}

**Effective Date:** ${formatDate(data.effectiveDate)}

**1. Formation:**
The Members hereby form a Limited Liability Company ("Company") named **${data.partyA || '[LLC Name]'}** pursuant to the laws of the State of **${data.jurisdictionState}**.

**2. Purpose:**
${data.additionalDetails || '[Business Purpose]'}

**3. Members:**
The sole member of the Company is **${data.partyB || '[Member Name]'}** (the "Member"). Additional members may be admitted with the consent of the Member.

**4. Management:**
The Company shall be **Manager-Managed**. The Member appoints **${data.agentName || '[Manager Name]'}** as the initial Manager. The Manager shall have full authority to manage the day-to-day affairs of the Company.

**5. Registered Agent:**
The Registered Agent is: ${data.agentName || '[Agent Name]'}, ${data.agentAddress || '[Agent Address]'}.

**6. Distributions:**
Distributions of Net Cash Flow shall be made to the Members in proportion to their Percentage Interests at such times as determined by the Manager.

**7. Liability:**
No Member or Manager shall be personally liable for the debts or obligations of the Company.

**IN WITNESS WHEREOF**, the undersigned have executed this Agreement.

________________________  
**Member:** ${data.partyB || '[Member Name]'}

________________________  
**Manager:** ${data.agentName || '[Manager Name]'}
        `;
    };

    const generateBillOfSalePreviewV2 = () => {
        return `
# MOTOR VEHICLE BILL OF SALE
### STATE OF ${data.jurisdictionState.toUpperCase()}

**DATE OF SALE:** ${formatDate(data.effectiveDate)}

**I. THE PARTIES**
*   **SELLER:** ${data.partyA || '[Seller Name]'}  
    Address: ${data.partyAAddress?.replace(/\n/g, ', ') || '[Address]'}  
    Mobile: ${data.partyAMobile || '[Mobile]'}

*   **BUYER:** ${data.partyB || '[Buyer Name]'}  
    Address: ${data.partyBAddress?.replace(/\n/g, ', ') || '[Address]'}  
    Mobile: ${data.partyBMobile || '[Mobile]'}

**II. VEHICLE DESCRIPTION**
The Seller hereby sells and transfers ownership of the following vehicle to the Buyer:
*   Make: **${data.make || '[Make]'}**
*   Model: **${data.model || '[Model]'}**
*   Year: **${data.year || '[Year]'}**
*   VIN: **${data.vin || '[VIN]'}**
*   Description: ${data.itemDescription || '[Description]'}

**III. PURCHASE AMOUNT**
The purchase price is **${formatCurrency(data.purchasePrice)}** USD.

**IV. ODOMETER DISCLOSURE**
The Seller states that the odometer reading is [Reading] miles and reflects the actual mileage of the vehicle to the best of their knowledge.

**V. CERTIFICATION**
The Seller certifies that they are the legal owner of the Vehicle and have the right to sell it. The Vehicle is sold **"${data.warrantyType === 'As-Is' ? 'AS-IS' : 'WITH WARRANTY'}"**.

**SELLER SIGNATURE:** ________________________ Date: ___________

**BUYER SIGNATURE:** ________________________ Date: ___________
        `;
    };

    const generateNDAPreviewV2 = () => {
        return `
# UNILATERAL NON-DISCLOSURE AGREEMENT

**Effective Date:** ${formatDate(data.effectiveDate)}

**BETWEEN:**
**${data.partyA || '[Disclosing Party]'}** ("Discloser")
**AND:**
**${data.partyB || '[Receiving Party]'}** ("Recipient")

**1. Definition of Confidential Information**
"Confidential Information" shall mean any and all technical and non-technical information provided by Discloser to Recipient, including but not limited to: ${data.additionalDetails || '[Description of Secrets]'}.

**2. Obligations of Recipient**
The Recipient agrees to hold the Confidential Information in strict confidence and shall not disclose such information to any third party without the prior written consent of the Discloser.

**3. Use of Information**
Recipient shall use the Confidential Information solely for the purpose of: **Evaluating a business relationship with Discloser**.

**4. Term**
The obligations of confidentiality shall survive for **5 years** from the Effective Date.

**5. Return of Materials**
Upon request, Recipient shall return all materials containing Confidential Information to Discloser.

**Governing Law:** State of ${data.jurisdictionState}.

**Agreed:**

________________________  
**Recipient Signature**  
${data.partyB || '[Name]'}
        `;
    };

    const generatePrivacyPolicyPreviewV2 = () => {
        return `
# SIMPLE PRIVACY POLICY (MOBILE/WEB)

**Last Updated:** ${formatDate(data.effectiveDate)}

Thank you for visiting **${data.partyA || '[App Name]'}**. Your privacy is important to us.

**1. Data We Collect**
We collect minimal data necessary to function, including:
${data.additionalDetails || '* Device information\n* Usage stats\n* Account email'}

**2. How We Use It**
We use your data strictly to improve our app and provide support. We do not sell your data.

**3. Third Parties**
We may use third-party services (like analytics or payment processors) strictly for operational purposes.

**4. Security**
We take reasonable measures to protect your data but cannot guarantee absolute security.

**5. Contact**
If you have questions, email us at: **${data.partyB || '[Email]'}**.
        `;
    };

    const generateLeaseAgreementPreviewV2 = () => {
        return `
# MONTH-TO-MONTH RENTAL AGREEMENT

**Date:** ${formatDate(data.effectiveDate)}

**Landlord:** ${data.partyA || '[Name]'}  
**Tenant:** ${data.partyB || '[Name]'}

**1. Property:**  
The Landlord rents to the Tenant the premises at: ${data.partyAAddress?.replace(/\n/g, ', ') || '[Address]'}

**2. Term:**  
This tenancy is **Month-to-Month**, beginning on **${formatDate(data.projectStartDate)}**. Either party may terminate with **30 days written notice**.

**3. Rent:**  
Tenant agrees to pay rent of **$[Amount]** per month, payable on the **1st** of each month.

**4. Utilities:**  
Tenant covers: ${data.additionalDetails || 'Electricity, Gas, Internet'}. Landlord covers: Water, Trash.

**5. Rules:**  
*   No illegal activity.
*   Quiet enjoyment for neighbors.
*   No pets without approval.

**Signed:**

________________________  
**Landlord**

________________________  
**Tenant**
        `;
    };

    // --- V3 GENERATORS (Professional with Border & Logo) ---

    // Constants for Professional Template
    const BORDER_STYLE = `
        border: 2px solid #334155; 
        padding: 40px; 
        width: 100%;
        background: white;
        position: relative;
    `;

    const LOGO_HTML = data.logo ? `<div style="text-align: left; margin-bottom: 20px;"><img src="${data.logo}" style="max-height: 80px; width: auto;" /></div>` : '';

    const generateProfessionalPreview = (title: string, content: string) => {
        return `
            <div style="${BORDER_STYLE}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px;">
                    <div>${LOGO_HTML}</div>
                    <div style="text-align: right;">
                        <h1 style="margin: 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px; font-size: 24px; color: #0f172a;">
                            ${title}
                        </h1>
                    </div>
                </div>
                
                <div style="font-family: serif; font-size: 14px; line-height: 1.6; color: #334155;">
                    ${content}
                </div>
                
                <div style="margin-top: 50px; border-top: 2px solid #ccc; padding-top: 20px; font-size: 12px; text-align: center; font-style: italic; color: #94a3b8;">
                    Professionally generated by InvoiceCore Hub
                </div>
            </div>
        `;
    };

    // Helper to extract content body from V2 generators to reuse in V3 (simplified logic)
    // Actually, we'll just reconstruct the content body for V3 to ensure it looks good with the border.

    const generateContractorPreviewV3 = () => generateProfessionalPreview(
        "INDEPENDENT CONTRACTOR AGREEMENT",
        `
        <p><strong>This Agreement</strong> is made effective as of <strong>${formatDate(data.effectiveDate)}</strong>.</p>
        
        <p><strong>BETWEEN:</strong><br>
        <strong>${data.partyA || '[Client Name]'}</strong> ("Client")<br>
        <span style="font-size: 0.9em; color: #555;">${data.partyAAddress?.replace(/\n/g, '<br>') || '[Client Address]'}</span></p>

        <p><strong>AND:</strong><br>
        <strong>${data.partyB || '[Contractor Name]'}</strong> ("Contractor")<br>
        <span style="font-size: 0.9em; color: #555;">${data.partyBAddress?.replace(/\n/g, '<br>') || '[Contractor Address]'}</span></p>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">1. Services Provided</h3>
        <p>Contractor agrees to perform the following services with high professional standards:</p>
        <ul>${data.services?.map(s => `<li>${s || '[Service]'}</li>`).join('')}</ul>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">2. Compensation</h3>
        <p>Total compensation for the project shall be <strong>${data.compensationAmount ? formatCurrency(data.compensationAmount) : '[Amount]'}</strong>.</p>
        <p><em>Payment Terms: ${data.paymentSchedule || 'Upon completion'}</em></p>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">3. Signatures</h3>
        <div style="display: flex; justify-content: space-between; margin-top: 40px;">
            <div style="width: 45%;">
                <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                <p><strong>Client:</strong> ${data.partyA || '[Name]'}</p>
            </div>
            <div style="width: 45%;">
                <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                <p><strong>Contractor:</strong> ${data.partyB || '[Name]'}</p>
            </div>
        </div>
        `
    );

    const generateOfferLetterPreviewV3 = () => generateProfessionalPreview(
        "OFFICIAL JOB OFFER",
        `
        <p style="text-align: right;">${formatDate(data.effectiveDate)}</p>
        
        <p><strong>From:</strong><br>
        ${data.partyA || '[Company Name]'}<br>
        <span style="font-size: 0.9em; color: #555;">${data.partyAAddress?.replace(/\n/g, '<br>') || ''}</span></p>

        <p><strong>To:</strong><br>
        ${data.partyB || '[Candidate Name]'}<br>
        <span style="font-size: 0.9em; color: #555;">${data.partyBAddress?.replace(/\n/g, '<br>') || ''}</span></p>

        <p>Dear ${data.partyB?.split(' ')[0] || 'Candidate'},</p>
        <p>We are pleased to offer you the full-time position of <strong>${data.jobTitle || '[Job Title]'}</strong> at ${data.partyA || '[Company Name]'}.</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Compensation:</strong> ${formatCurrency(data.salary)} annually</p>
            <p><strong>Start Date:</strong> ${formatDate(data.projectStartDate)}</p>
            <p><strong>Reporting To:</strong> ${data.reportingTo || '[Manager]'}</p>
        </div>

        <p>This offer is contingent upon successful completion of background checks. This employment is at-will.</p>
        
        <p>Please sign below to accept this offer by <strong>${formatDate(data.offerDeadline)}</strong>.</p>

        <div style="margin-top: 40px;">
            <div style="border-bottom: 1px solid #000; width: 60%; margin-bottom: 5px;"></div>
            <strong>${data.partyB || '[Candidate Name]'}</strong> (Signature)
        </div>
        `
    );

    const generateLLCPreviewV3 = () => generateProfessionalPreview(
        "LLC OPERATING AGREEMENT",
        `
         <p><strong>Company Name:</strong> ${data.partyA || '[LLC Name]'}<br>
         <strong>State of Formation:</strong> ${data.jurisdictionState}<br>
         <strong>Effective Date:</strong> ${formatDate(data.effectiveDate)}</p>
         
         <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Article I: Organization</h3>
         <p>The Member(s) hereby organize the Company as a Limited Liability Company under the laws of the State of ${data.jurisdictionState}.</p>
         
         <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Article II: Management</h3>
         <p>The Company shall be managed by: <strong>${data.agentName || '[Manager Name]'}</strong>.<br>
         <span style="font-size: 0.9em; color: #555;">Address: ${data.agentAddress || '[Agent Address]'}</span></p>
         
         <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Article III: Member</h3>
         <p>The sole member of the Company is: <strong>${data.partyB || '[Member Name]'}</strong>.<br>
         <span style="font-size: 0.9em; color: #555;">Address: ${data.partyBAddress || '[Member Address]'}</span></p>
         
         <div style="margin-top: 50px;">
            <p><strong>IN WITNESS WHEREOF</strong>, the undersigned has executed this Agreement.</p>
            <div style="border-bottom: 1px solid #000; width: 60%; margin-top: 30px; margin-bottom: 5px;"></div>
            Member Signature
         </div>
        `
    );

    const generateBillOfSalePreviewV3 = () => generateProfessionalPreview(
        "CERTIFIED BILL OF SALE",
        `
        <div style="text-align: center; margin-bottom: 20px; font-weight: bold; font-family: sans-serif; color: #555;">
             Date of Sale: ${formatDate(data.effectiveDate)}
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div style="width: 48%; background: #f8fafc; padding: 15px; border-radius: 4px;">
                <strong style="text-transform: uppercase; color: #64748b; font-size: 0.8em; letter-spacing: 1px;">Seller</strong><br>
                <span style="font-weight: bold; font-size: 1.1em;">${data.partyA}</span><br>
                <div style="font-size: 0.9em; color: #555; margin-top: 5px;">
                    ${data.partyAAddress?.replace(/\n/g, '<br>') || ''}<br>
                    ${data.partyAMobile || ''}
                </div>
            </div>
            <div style="width: 48%; background: #f8fafc; padding: 15px; border-radius: 4px;">
                <strong style="text-transform: uppercase; color: #64748b; font-size: 0.8em; letter-spacing: 1px;">Buyer</strong><br>
                <span style="font-weight: bold; font-size: 1.1em;">${data.partyB}</span><br>
                <div style="font-size: 0.9em; color: #555; margin-top: 5px;">
                    ${data.partyBAddress?.replace(/\n/g, '<br>') || ''}<br>
                    ${data.partyBMobile || ''}
                </div>
            </div>
        </div>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Property Description</h3>
        <p><strong>Make:</strong> ${data.make} | <strong>Model:</strong> ${data.model} | <strong>Year:</strong> ${data.year}</p>
        <p><strong>VIN:</strong> ${data.vin}</p>
        
        <div style="background: #f0fdf4; padding: 15px; border: 1px solid #bbf7d0; margin: 20px 0; text-align: center;">
            <strong>SALE PRICE: ${formatCurrency(data.purchasePrice)}</strong>
        </div>

        <p>The Seller certifies that they are the legal owner of the property and have full authority to sell. The property is sold <strong>${data.warrantyType === 'As-Is' ? 'AS-IS' : 'WITH WARRANTY'}</strong>.</p>

        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
             <div style="width: 45%; text-align: center;">
                <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                Seller Signature
            </div>
            <div style="width: 45%; text-align: center;">
                 <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                Buyer Signature
            </div>
        </div>
        `
    );

    const generateNDAPreviewV3 = () => generateProfessionalPreview(
        "NON-DISCLOSURE AGREEMENT",
        `
        <p><strong>Effective Date:</strong> ${formatDate(data.effectiveDate)}</p>
        
        <p><strong>BETWEEN:</strong><br>
        <strong>${data.partyA}</strong> ("Discloser")<br>
        <span style="font-size: 0.9em; color: #555;">${data.partyAAddress?.replace(/\n/g, '<br>') || ''}</span></p>

        <p><strong>AND:</strong><br>
        <strong>${data.partyB}</strong> ("Recipient")<br>
        <span style="font-size: 0.9em; color: #555;">${data.partyBAddress?.replace(/\n/g, '<br>') || ''}</span></p>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">1. Confidentiality</h3>
        <p>Recipient agrees to keep all "Confidential Information" strictly confidential and to not disclose it to any third parties without written consent.</p>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">2. Term</h3>
        <p>This agreement shall remain in effect for a period of 5 years from the Effective Date.</p>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">3. Governing Law</h3>
        <p>This Agreement shall be governed by the laws of the State of ${data.jurisdictionState}.</p>

        <div style="margin-top: 50px;">
            <p><strong>AGREED AND ACCEPTED:</strong></p>
            <div style="border-bottom: 1px solid #000; width: 60%; margin-top: 30px; margin-bottom: 5px;"></div>
            Recipient Signature
         </div>
        `
    );

    const generatePrivacyPolicyV3 = () => generateProfessionalPreview(
        "PRIVACY POLICY STATEMENT",
        `
        <p style="text-align: center; color: #64748b;">Last Updated: ${formatDate(data.effectiveDate)}</p>
        
        <p><strong>${data.partyA}</strong> respects your privacy. This policy outlines how we handle your data.</p>
        
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Data Collection</h3>
        <p>${data.additionalDetails || 'We collect only necessary information to provide our services.'}</p>
        
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Contact Us</h3>
        <p>If you have questions, please contact us at: <strong>${data.partyB}</strong></p>
        `
    );

    const generateLeaseV3 = () => generateProfessionalPreview(
        "RESIDENTIAL LEASE AGREEMENT",
        `
        <p><strong>Landlord:</strong> ${data.partyA}<br>
        <strong>Tenant:</strong> ${data.partyB}</p>
        
        <p><strong>Lease Term:</strong> Starts on ${formatDate(data.projectStartDate)}</p>
        <p><strong>Property Address:</strong> ${data.partyAAddress}</p>
        
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">Rent & Payments</h3>
        <p>The Tenant agrees to pay rent on time. Failure to pay may result in eviction.</p>
        
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">House Rules</h3>
        <p>${data.additionalDetails || 'No pets allowed. Quiet hours after 10 PM.'}</p>
        
        <div style="display: flex; justify-content: space-between; margin-top: 50px;">
            <div style="width: 45%;">
                <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                <p><strong>Landlord</strong></p>
            </div>
            <div style="width: 45%;">
                <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                <p><strong>Tenant</strong></p>
            </div>
        </div>
        `
    );

    // Styles
    const inputClass = "block w-full rounded-lg border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0 text-base sm:text-sm px-3 py-2.5 border transition-all duration-200";
    const labelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide";
    const sectionHeaderClass = "text-lg font-bold text-slate-900 dark:text-white flex items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-700";

    // Content to display
    // Content to display
    const displayContent = isContractorTool ? (template === 'standard' ? generateContractorPreview() : template === 'alternate' ? generateContractorPreviewV2() : generateContractorPreviewV3()) :
        isOfferLetterTool ? (template === 'standard' ? generateOfferLetterPreview() : template === 'alternate' ? generateOfferLetterPreviewV2() : generateOfferLetterPreviewV3()) :
            isLLCTool ? (template === 'standard' ? generateLLCPreview() : template === 'alternate' ? generateLLCPreviewV2() : generateLLCPreviewV3()) :
                isBillOfSaleTool ? (template === 'standard' ? generateBillOfSalePreview() : template === 'alternate' ? generateBillOfSalePreviewV2() : generateBillOfSalePreviewV3()) :
                    isNDATool ? (template === 'standard' ? generateNDAPreview() : template === 'alternate' ? generateNDAPreviewV2() : generateNDAPreviewV3()) :
                        isPrivacyPolicyTool ? (template === 'standard' ? generatePrivacyPolicyPreview() : template === 'alternate' ? generatePrivacyPolicyPreviewV2() : generatePrivacyPolicyV3()) :
                            isLeaseAgreementTool ? (template === 'standard' ? generateLeaseAgreementPreview() : template === 'alternate' ? generateLeaseAgreementPreviewV2() : generateLeaseV3()) :
                                generatedContent;

    const isStructuredTool = isContractorTool || isOfferLetterTool || isLLCTool || isBillOfSaleTool || isNDATool || isPrivacyPolicyTool || isLeaseAgreementTool;

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT COLUMN: Input Form */}
                <div className="lg:w-5/12 space-y-6 no-print">

                    {/* Quick Actions */}
                    {isStructuredTool && (
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                                    <RefreshCw className="w-4 h-4 mr-2 text-primary-600" /> Quick Actions
                                </h2>
                            </div>
                            <div className="p-4">
                                {/* Logo Upload for all tools */}
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                                        Document Logo
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <div
                                            onClick={triggerLogoUpload}
                                            className="h-12 w-12 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors overflow-hidden"
                                        >
                                            {data.logo ? (
                                                <img src={data.logo} alt="Logo" className="w-full h-full object-cover" />
                                            ) : (
                                                <UploadCloud className="h-5 w-5 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <button
                                                onClick={triggerLogoUpload}
                                                className="text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline text-left block"
                                            >
                                                {data.logo ? 'Change Logo' : 'Upload Logo'}
                                            </button>
                                            <p className="text-xs text-slate-500">JPG or PNG, max 1MB</p>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleLogoUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={resetToBlank}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Start with a Blank Form
                                </button>

                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                                        Select Template Style
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setTemplate('standard')}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${template === 'standard' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            Standard
                                        </button>
                                        <button
                                            onClick={() => setTemplate('alternate')}
                                            className={`col-span-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${template === 'alternate' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            Alternate
                                        </button>
                                        <button
                                            onClick={() => setTemplate('professional')}
                                            className={`col-span-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${template === 'professional' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            Professional (Bordered)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-primary-600" />
                                {tool.name} Details
                            </h2>
                        </div>

                        <div className="p-6 space-y-8">
                            {isOfferLetterTool ? (
                                /* --- OFFER LETTER FORM --- */
                                <>
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPdf}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
                                    >
                                        {isGeneratingPdf ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                                        {isGeneratingPdf ? 'Generating PDF...' : 'Download & Share PDF'}
                                    </button>

                                    {/* Inline Share Buttons */}
                                    {pdfBlob && (
                                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 bg-green-500 rounded-full">
                                                    <FileCheck className="h-4 w-4 text-white" />
                                                </div>
                                                <span className="text-sm font-bold text-green-800 dark:text-green-200">PDF Ready! Share via:</span>
                                            </div>
                                            <ShareButtons
                                                fileName={`${tool.name.replace(/\s+/g, '-')}.pdf`}
                                                documentTitle={tool.name}
                                                documentDescription={`Professional ${tool.name.toLowerCase()} created with InvoiceCore Hub.`}
                                                pdfBlob={pdfBlob}
                                                variant="compact"
                                                onShare={(platform) => console.log(`Shared via ${platform}`)}
                                            />
                                        </div>
                                    )}

                                    {/* Company Information */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                                            Parties Involved
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">Enter company and candidate details.</p>
                                        <div className="space-y-4">
                                            <div className="font-semibold text-sm text-primary-600 uppercase tracking-wide">Company Information</div>
                                            <div>
                                                <label className={labelClass}>Company Name</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="Company Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Company Address</label>
                                                <textarea name="partyAAddress" rows={2} value={data.partyAAddress} onChange={handleInputChange} className={inputClass} placeholder="Company Address" />
                                            </div>

                                            <div className="font-semibold text-sm text-primary-600 uppercase tracking-wide pt-2">Candidate Information</div>
                                            <div>
                                                <label className={labelClass}>Candidate's Full Name</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} placeholder="Candidate Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Candidate's Address</label>
                                                <textarea name="partyBAddress" rows={2} value={data.partyBAddress} onChange={handleInputChange} className={inputClass} placeholder="Candidate Address" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Offer Details */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                                            Offer Details
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">Specify the terms of the job offer.</p>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Job Title</label>
                                                <input name="jobTitle" value={data.jobTitle} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Reporting To (Optional)</label>
                                                <input name="reportingTo" value={data.reportingTo} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Salary (Annual)</label>
                                                    <input type="number" name="salary" value={data.salary} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Start Date</label>
                                                    <input type="date" name="projectStartDate" value={data.projectStartDate} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates & Signature */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                            Dates & Signature
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">Finalize the letter.</p>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Offer Deadline</label>
                                                    <input type="date" name="offerDeadline" value={data.offerDeadline} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Letter Date</label>
                                                    <input type="date" name="effectiveDate" value={data.effectiveDate} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Your Name (Sender)</label>
                                                <input name="senderName" value={data.senderName} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Your Title (Sender)</label>
                                                <input name="senderTitle" value={data.senderTitle} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : isContractorTool ? (
                                /* --- CONTRACTOR AGREEMENT FORM --- */
                                <>
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPdf}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
                                    >
                                        {isGeneratingPdf ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                                        {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                                    </button>

                                    {/* Parties Involved */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Users className="w-4 h-4 mr-2 text-slate-400" /> Parties Involved
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Client (Hiring Party)</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="Full Name or Company Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Client Address</label>
                                                <textarea name="partyAAddress" rows={2} value={data.partyAAddress} onChange={handleInputChange} className={inputClass} placeholder="Full Address" />
                                            </div>
                                            <div className="pt-2">
                                                <label className={labelClass}>Contractor (Freelancer)</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} placeholder="Full Name or Company Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Contractor Address</label>
                                                <textarea name="partyBAddress" rows={2} value={data.partyBAddress} onChange={handleInputChange} className={inputClass} placeholder="Full Address" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Agreement Terms */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Calendar className="w-4 h-4 mr-2 text-slate-400" /> Agreement Terms
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Effective Date</label>
                                                <input type="date" name="effectiveDate" value={data.effectiveDate} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Project Start Date</label>
                                                    <input type="date" name="projectStartDate" value={data.projectStartDate} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Project End Date (Optional)</label>
                                                    <input type="date" name="projectEndDate" value={data.projectEndDate} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Termination Notice Period (Days)</label>
                                                <input type="number" name="noticePeriod" value={data.noticePeriod} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scope of Services */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Briefcase className="w-4 h-4 mr-2 text-slate-400" /> Scope of Services
                                        </h3>
                                        <div className="space-y-3">
                                            {data.services?.map((service, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <input
                                                        value={service}
                                                        onChange={(e) => handleServiceChange(index, e.target.value)}
                                                        className={inputClass}
                                                        placeholder="Service Description"
                                                    />
                                                    <button onClick={() => removeService(index)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button onClick={addService} className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center mt-2">
                                                <Plus className="h-4 w-4 mr-1" /> Add Service
                                            </button>
                                        </div>
                                    </div>

                                    {/* Compensation */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>Compensation</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Total Compensation / Rate</label>
                                                <input type="number" name="compensationAmount" value={data.compensationAmount} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Payment Schedule</label>
                                                <textarea name="paymentSchedule" rows={2} value={data.paymentSchedule} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Important Clauses */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>Important Clauses</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Confidentiality Clause</label>
                                                <textarea name="confidentialityClause" rows={4} value={data.confidentialityClause} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Intellectual Property / Ownership Clause</label>
                                                <textarea name="ipClause" rows={4} value={data.ipClause} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Governing Law (State)</label>
                                                <select name="jurisdictionState" value={data.jurisdictionState} onChange={handleInputChange} className={inputClass}>
                                                    {['California', 'Delaware', 'New York', 'Texas', 'Florida', 'Wyoming', 'Washington', 'Nevada'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Jurisdiction (Country)</label>
                                                <input disabled value="USA" className={`${inputClass} bg-slate-100 dark:bg-slate-700`} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : isLLCTool ? (
                                /* --- LLC OPERATING AGREEMENT FORM --- */
                                <>
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPdf}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
                                    >
                                        {isGeneratingPdf ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                                        {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                                    </button>

                                    {/* Company & Member Details */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                                            Company & Member Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>LLC Name</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="My Awesome Business, LLC" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>State of Formation</label>
                                                <select name="jurisdictionState" value={data.jurisdictionState} onChange={handleInputChange} className={inputClass}>
                                                    {['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Agreement Effective Date</label>
                                                <input type="date" name="effectiveDate" value={data.effectiveDate} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Single Member Details */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <User className="w-4 h-4 mr-2 text-slate-400" />
                                            Single Member Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Full Name of Member</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} placeholder="Member Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Member's Address</label>
                                                <textarea name="partyBAddress" rows={2} value={data.partyBAddress} onChange={handleInputChange} className={inputClass} placeholder="Member Address" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Purpose & Registered Agent */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                                            Purpose & Registered Agent
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Business Purpose</label>
                                                <textarea name="additionalDetails" rows={4} value={data.additionalDetails} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div className="font-semibold text-sm text-primary-600 uppercase tracking-wide pt-2">Registered Agent Details</div>
                                            <div>
                                                <label className={labelClass}>Registered Agent Name</label>
                                                <input name="agentName" value={data.agentName} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Registered Agent Address</label>
                                                <textarea name="agentAddress" rows={2} value={data.agentAddress} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : isBillOfSaleTool ? (
                                /* --- BILL OF SALE FORM --- */
                                <>
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPdf}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70"
                                    >
                                        {isGeneratingPdf ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                                        {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                                    </button>

                                    {/* Parties Involved */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Users className="w-4 h-4 mr-2 text-slate-400" />
                                            Parties Involved
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">Who is selling the item, and who is buying it?</p>
                                        <div className="space-y-4">
                                            <div className="font-semibold text-sm text-primary-600 uppercase tracking-wide">Seller</div>
                                            <div>
                                                <label className={labelClass}>Seller's Full Name</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="Seller Name" />
                                            </div>
                                            <div>
                                                <textarea name="partyAAddress" rows={2} value={data.partyAAddress} onChange={handleInputChange} className={inputClass} placeholder="Seller Address" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Seller's Mobile Number</label>
                                                <input name="partyAMobile" value={data.partyAMobile} onChange={handleInputChange} className={inputClass} placeholder="(555) 123-4567" />
                                            </div>

                                            <div className="font-semibold text-sm text-primary-600 uppercase tracking-wide pt-2">Buyer</div>
                                            <div>
                                                <label className={labelClass}>Buyer's Full Name</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} placeholder="Buyer Name" />
                                            </div>
                                            <div>
                                                <textarea name="partyBAddress" rows={2} value={data.partyBAddress} onChange={handleInputChange} className={inputClass} placeholder="Buyer Address" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Buyer's Mobile Number</label>
                                                <input name="partyBMobile" value={data.partyBMobile} onChange={handleInputChange} className={inputClass} placeholder="(555) 987-6543" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item Details */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Tag className="w-4 h-4 mr-2 text-slate-400" />
                                            Item Details
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">Describe the item being sold.</p>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Type of Item</label>
                                                <select name="itemType" value={data.itemType} onChange={handleInputChange} className={inputClass}>
                                                    <option value="Vehicle">Vehicle</option>
                                                    <option value="Boat">Boat</option>
                                                    <option value="General">General Item</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Item Description</label>
                                                <textarea name="itemDescription" rows={3} value={data.itemDescription} onChange={handleInputChange} className={inputClass} placeholder="Detailed description..." />
                                            </div>
                                            {data.itemType === 'Vehicle' && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="col-span-2">
                                                        <label className={labelClass}>VIN</label>
                                                        <input name="vin" value={data.vin} onChange={handleInputChange} className={inputClass} />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Make</label>
                                                        <input name="make" value={data.make} onChange={handleInputChange} className={inputClass} />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Model</label>
                                                        <input name="model" value={data.model} onChange={handleInputChange} className={inputClass} />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>Year</label>
                                                        <input name="year" value={data.year} onChange={handleInputChange} className={inputClass} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sale Details */}
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <ShoppingBag className="w-4 h-4 mr-2 text-slate-400" />
                                            Sale Details
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">Specify the price, date, and warranty terms.</p>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Purchase Price ($)</label>
                                                    <input type="number" name="purchasePrice" value={data.purchasePrice} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Date of Sale</label>
                                                    <input type="date" name="effectiveDate" value={data.effectiveDate} onChange={handleInputChange} className={inputClass} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Warranty</label>
                                                <div className="flex space-x-4 mt-2">
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input type="radio" name="warrantyType" value="As-Is" checked={data.warrantyType === 'As-Is'} onChange={handleInputChange} className="text-primary-600 focus:ring-primary-500" />
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">As-Is (No Warranty)</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2 cursor-pointer">
                                                        <input type="radio" name="warrantyType" value="Warranty" checked={data.warrantyType === 'Warranty'} onChange={handleInputChange} className="text-primary-600 focus:ring-primary-500" />
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">With Warranty</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : isNDATool ? (
                                /* --- NDA FORM --- */
                                <>
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <ShieldCheck className="w-4 h-4 mr-2 text-slate-400" />
                                            Parties
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Disclosing Party Name</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="Company Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Disclosing Party Address</label>
                                                <textarea name="partyAAddress" rows={2} value={data.partyAAddress} onChange={handleInputChange} className={inputClass} placeholder="Full Address" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Receiving Party Name</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} placeholder="Company or Individual Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Receiving Party Address</label>
                                                <textarea name="partyBAddress" rows={2} value={data.partyBAddress} onChange={handleInputChange} className={inputClass} placeholder="Full Address" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                            Agreement Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Effective Date</label>
                                                <input type="date" name="effectiveDate" value={data.effectiveDate} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>State/Jurisdiction</label>
                                                <input name="jurisdictionState" value={data.jurisdictionState} onChange={handleInputChange} className={inputClass} placeholder="e.g. California" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Confidential Information Description</label>
                                                <textarea name="additionalDetails" rows={4} value={data.additionalDetails} onChange={handleInputChange} className={inputClass} placeholder="Describe the type of confidential information..." />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : isPrivacyPolicyTool ? (
                                /* --- PRIVACY POLICY FORM --- */
                                <>
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <FileSignature className="w-4 h-4 mr-2 text-slate-400" />
                                            Company Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Website/Company Name</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="e.g. My Website LLC" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Contact Email</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} type="email" placeholder="support@example.com" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Effective Date</label>
                                                <input type="date" name="effectiveDate" value={data.effectiveDate} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>State/Jurisdiction (for CCPA)</label>
                                                <input name="jurisdictionState" value={data.jurisdictionState} onChange={handleInputChange} className={inputClass} placeholder="e.g. California" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Tag className="w-4 h-4 mr-2 text-slate-400" />
                                            Data Collection
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Specific Data Collected (describe)</label>
                                                <textarea name="additionalDetails" rows={4} value={data.additionalDetails} onChange={handleInputChange} className={inputClass} placeholder="e.g. User account information, browsing history, cookies, payment data..." />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : isLeaseAgreementTool ? (
                                /* --- LEASE AGREEMENT FORM --- */
                                <>
                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                                            Parties to Lease
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Landlord Name</label>
                                                <input name="partyA" value={data.partyA} onChange={handleInputChange} className={inputClass} placeholder="Full Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Landlord Address</label>
                                                <textarea name="partyAAddress" rows={2} value={data.partyAAddress} onChange={handleInputChange} className={inputClass} placeholder="Full Address" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Tenant Name</label>
                                                <input name="partyB" value={data.partyB} onChange={handleInputChange} className={inputClass} placeholder="Full Name" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Tenant Address</label>
                                                <textarea name="partyBAddress" rows={2} value={data.partyBAddress} onChange={handleInputChange} className={inputClass} placeholder="Full Address" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                            Lease Terms
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Lease Commencement Date</label>
                                                <input type="date" name="projectStartDate" value={data.projectStartDate} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Lease End Date</label>
                                                <input type="date" name="projectEndDate" value={data.projectEndDate} onChange={handleInputChange} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>State/Jurisdiction</label>
                                                <input name="jurisdictionState" value={data.jurisdictionState} onChange={handleInputChange} className={inputClass} placeholder="e.g. Massachusetts" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className={sectionHeaderClass}>
                                            <FileText className="w-4 h-4 mr-2 text-slate-400" />
                                            Property & Rules
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Property Details & House Rules</label>
                                                <textarea name="additionalDetails" rows={4} value={data.additionalDetails} onChange={handleInputChange} className={inputClass} placeholder="e.g. No pets, quiet hours 10PM-8AM, monthly rent on 1st..." />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* --- GENERIC AI FORM --- */
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="partyA" className={labelClass}>Party A (Discloser/Seller/Employer)</label>
                                        <input
                                            id="partyA"
                                            type="text"
                                            name="partyA"
                                            placeholder="e.g. Acme Corp"
                                            value={data.partyA}
                                            onChange={handleInputChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="partyB" className={labelClass}>Party B (Recipient/Buyer/Employee)</label>
                                        <input
                                            id="partyB"
                                            type="text"
                                            name="partyB"
                                            placeholder="e.g. John Doe"
                                            value={data.partyB}
                                            onChange={handleInputChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="effectiveDate" className={labelClass}>Effective Date</label>
                                        <input
                                            id="effectiveDate"
                                            type="date"
                                            name="effectiveDate"
                                            value={data.effectiveDate}
                                            onChange={handleInputChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="jurisdictionState" className={labelClass}>State / Jurisdiction</label>
                                        <select
                                            id="jurisdictionState"
                                            name="jurisdictionState"
                                            value={data.jurisdictionState}
                                            onChange={handleInputChange}
                                            className={inputClass}
                                        >
                                            {['California', 'Delaware', 'New York', 'Texas', 'Florida', 'Wyoming', 'Other (USA)'].map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="additionalDetails" className={labelClass}>Specific Details / Terms</label>
                                        <textarea
                                            id="additionalDetails"
                                            name="additionalDetails"
                                            rows={4}
                                            placeholder="Enter specific clauses, payment terms, or descriptions of confidential info..."
                                            value={data.additionalDetails}
                                            onChange={handleInputChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading || !process.env.API_KEY}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <Wand2 className="mr-2 h-5 w-5" />}
                                        Generate Document
                                    </button>
                                    {!process.env.API_KEY && (
                                        <p className="text-xs text-red-500 mt-3 flex items-center justify-center font-medium">
                                            <AlertCircle className="w-3 h-3 mr-1" /> API Key missing in environment
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div >

                {/* RIGHT COLUMN: Output Area */}
                < div className="lg:w-7/12" ref={containerRef} >
                    <div className="sticky top-24">

                        {/* Mobile Swipe Hint */}
                        <div className="mb-4 flex justify-between items-center lg:hidden no-print">
                            <div className="flex items-center text-sm text-slate-500">
                                {scale < 1 ? <ZoomOut className="h-4 w-4 mr-1" /> : <ZoomIn className="h-4 w-4 mr-1" />}
                                {scale < 1 ? 'Scaled to fit screen' : 'Full Size Preview'}
                            </div>
                            {/* For Generic tools, we show download here too */}
                            {!isStructuredTool && (
                                <button onClick={handleDownloadPDF} disabled={isGeneratingPdf} className="text-primary-600 text-sm font-bold hover:underline">Download PDF</button>
                            )}
                        </div>

                        {displayContent ? (
                            <div className="flex flex-col space-y-6">
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 p-4 rounded-xl flex items-start no-print">
                                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                                        <strong>Disclaimer:</strong> This tool provides a basic document for informational purposes. It is not a substitute for professional legal advice.
                                    </p>
                                </div>

                                {/* Print Container Wrapper for Fixed Width Capture */}
                                <div className="bg-white shadow-2xl shadow-slate-200/50 dark:shadow-black/50 rounded-sm print:shadow-none overflow-hidden ring-1 ring-slate-900/5 print:ring-0">
                                    <div
                                        className="w-full origin-top-left transition-transform duration-200 ease-in-out"
                                        style={{
                                            transform: isGeneratingPdf ? 'none !important' : `scale(${scale})`,
                                            width: isGeneratingPdf || scale === 1 ? '100%' : '794px',
                                            height: 'auto',
                                            marginBottom: (isGeneratingPdf || scale === 1) ? '0' : `-${(1 - scale) * 100}%`,
                                            transformOrigin: 'top left'
                                        }}
                                    >
                                        <div id="legal-document-preview" className="text-slate-900 min-w-[750px] md:min-w-[21cm] max-w-[21cm] min-h-[29.7cm] mx-auto p-8 md:p-14 relative flex flex-col font-sans print:p-[20mm] print:font-serif print:leading-relaxed print:text-[11pt]">
                                            <div className="prose prose-slate max-w-none prose-headings:print:page-break-after-avoid prose-h1:print:border-b prose-h1:print:border-blue-600 prose-h1:print:pb-2 prose-p:print:text-justify prose-li:print:page-break-inside-avoid prose-table:print:w-full prose-a:print:text-blue-600 prose-a:print:underline">
                                                {template === 'professional' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: displayContent }} />
                                                ) : (
                                                    <ReactMarkdown>{displayContent}</ReactMarkdown>
                                                )}
                                            </div>

                                            {/* Visual Signatures for Live Preview (Contractor Tool & Others) */}
                                            {(isContractorTool || isOfferLetterTool || isNDATool || isLeaseAgreementTool) && template !== 'professional' && (
                                                <div className="mt-16 pt-12 border-t border-slate-300 print:border-slate-400 flex justify-between text-sm text-slate-600 print:text-slate-800 gap-12 break-inside-avoid print:page-break-inside-avoid">
                                                    <div className="w-1/2">
                                                        <p className="font-bold text-slate-900 print:text-black uppercase tracking-wider mb-8 text-xs">Party A Signature</p>
                                                        <div className="border-b-2 border-slate-900 mb-3 h-12"></div>
                                                        <p className="font-semibold text-slate-900 print:text-black text-xs mb-1">{data.partyA || '[Party A Name]'}</p>
                                                        <p className="text-xs">Date: ___________________</p>
                                                    </div>
                                                    <div className="w-1/2">
                                                        <p className="font-bold text-slate-900 print:text-black uppercase tracking-wider mb-8 text-xs">Party B Signature</p>
                                                        <div className="border-b-2 border-slate-900 mb-3 h-12"></div>
                                                        <p className="font-semibold text-slate-900 print:text-black text-xs mb-1">{data.partyB || '[Party B Name]'}</p>
                                                        <p className="text-xs">Date: ___________________</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute bottom-4 left-0 right-0 flex justify-center pb-4 print:static print:mt-8 print:pt-4 print:border-t print:border-slate-300">
                                                <p className="text-[10px] text-slate-400 print:text-slate-500 font-medium">Generated by InvoiceCore Hub • {new Date().toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Print Button for Generic Tool (Structured tools have it at top) */}
                                {!isStructuredTool && (
                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPdf}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-semibold rounded-xl shadow-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all no-print disabled:opacity-70"
                                    >
                                        {isGeneratingPdf ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
                                        {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                                    </button>
                                )}

                                {/* Share Buttons Component */}
                                {generatedContent && pdfBlob && (
                                    <ShareButtons
                                        fileName={`${tool.name.replace(/\s+/g, '-')}.pdf`}
                                        documentTitle={tool.name}
                                        documentDescription={`Professional ${tool.name.toLowerCase()} created with InvoiceCore Hub. Built to meet US legal standards and requirements.`}
                                        pdfBlob={pdfBlob}
                                        onShare={(platform) => console.log(`Shared via ${platform}`)}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl h-96 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-center p-8">
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-full mb-4">
                                    <Wand2 className="h-8 w-8 opacity-50" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ready to Draft</h3>
                                <p className="mt-2 max-w-sm text-sm">Fill in the details on the left and click "Generate Document" to create your custom {tool.name} using AI.</p>
                            </div>
                        )}
                    </div>
                </div >
            </div >

            {/* Floating Share Bar - Mobile Only */}
            {
                pdfBlob && (
                    <div className="sm:hidden">
                        <ShareButtons
                            fileName={`${tool.name.replace(/\s+/g, '-')}.pdf`}
                            documentTitle={tool.name}
                            documentDescription={`${tool.name} created with InvoiceCore Hub`}
                            pdfBlob={pdfBlob}
                            variant="floating"
                            onShare={(platform) => console.log(`Shared via ${platform}`)}
                        />
                    </div>
                )
            }
        </>
    );
};

export default LegalTool;