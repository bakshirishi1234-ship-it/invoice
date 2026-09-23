import { useState, useRef, useEffect } from 'react';
import { ToolDef, FinancialFormData, LineItem, AdditionalTax } from '../types';
import { Plus, Trash2, Download, RefreshCw, Image as ImageIcon, Settings, ChevronDown, FileCheck, ArrowRight, UploadCloud, Star, Loader2, ZoomIn, ZoomOut } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface FinancialToolProps {
  tool: ToolDef;
}

const DEFAULT_SAMPLE_DATA: FinancialFormData = {
  logo: '',
  fromName: 'Your Company Inc.',
  fromEmail: 'contact@yourcompany.com',
  fromAddress: '123 Innovation Drive\nSuite 101\nTech City, TX 75001',
  fromPhone: '123-456-7890',
  fromEin: '',
  toName: 'Client Name',
  toEmail: 'client@example.com',
  toAddress: '456 Client Avenue\nBusiness Bay\nNew York, NY 10001',
  toPhone: '098-765-4321',
  toEin: '',
  number: 'INV-2025-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: 'Net 30',
  items: [
    { id: '1', description: 'Web Development Services', quantity: 20, price: 150, hsn: '-' },
    { id: '2', description: 'UI/UX Design Consultation', quantity: 1, price: 1200, hsn: '-' }
  ],
  notes: 'Thank you for your business. Please make payment within 30 days.\nDisclaimer: This generated invoice is for billing purposes. It is recommended to consult a financial advisor for legal compliance.',
  taxRate: 8.25,
  isTaxEnabled: true,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: ''
};

const PLUMBING_SAMPLE_DATA: FinancialFormData = {
  logo: '',
  fromName: "John's Plumbing Services",
  fromEmail: 'contact@johnsplumbing.com',
  fromAddress: '123 Pipe Lane\nWatertown, WA 98001',
  fromPhone: '555-123-4567',
  fromEin: '',
  toName: 'Homeowner Name',
  toEmail: 'client@email.com',
  toAddress: '456 Client Residence\nWatertown, WA 98002',
  toPhone: '555-987-6543',
  toEin: '',
  number: 'INV-2025-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: 'Net 14',
  items: [
    { id: '1', description: 'Emergency leak repair in kitchen sink', quantity: 1.5, price: 90, hsn: '-' },
    { id: '2', description: 'Drain cleaning service for master bathroom', quantity: 1, price: 250, hsn: '-' },
    { id: '3', description: 'Copper Pipe (10 ft)', quantity: 2, price: 45, hsn: '-' }
  ],
  notes: 'Thank you for choosing our services. Please make payment within 14 days. 5% late fee applies to overdue invoices.\nDisclaimer: This generated invoice is for billing purposes. It is recommended to consult a financial advisor for legal compliance.',
  taxRate: 6.5,
  isTaxEnabled: true,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: ''
};

const PO_SAMPLE_DATA: FinancialFormData = {
  logo: '',
  fromName: 'Retail Biz Inc.',
  fromEmail: '',
  fromAddress: '123 Main Street\nAnytown, USA 12345',
  fromPhone: '',
  fromEin: '',
  toName: 'Global Supplies LLC',
  toEmail: '',
  toAddress: '789 Vendor Way\nIndustrial Park, USA 54321',
  toPhone: '',
  toEin: '',
  number: 'PO-2025-001',
  date: '2025-12-04',
  deliveryDate: '2025-12-18',
  shippingAddress: '123 Main Street\nWarehouse A\nAnytown, USA 12345',
  paymentTerms: '',
  items: [
    { id: '1', description: 'Product A - Blue', quantity: 50, price: 15.5, hsn: '-' },
    { id: '2', description: 'Product B - Red', quantity: 100, price: 10, hsn: '-' }
  ],
  notes: 'Please reference this PO number on the invoice. Delivery between 9 AM - 5 PM.\nThis is a legally binding document once accepted by the vendor. Ensure all details are correct.',
  taxRate: 0,
  isTaxEnabled: false,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: 'John Smith, Purchasing Manager'
};

const CREDIT_NOTE_DATA: FinancialFormData = {
  logo: '',
  fromName: 'Tech Solutions Inc.',
  fromEmail: 'accounts@techsolutions.com',
  fromAddress: '456 Tech Park\nSilicon Valley, CA 94000',
  fromPhone: '555-0199',
  fromEin: '',
  toName: 'Client Systems Co.',
  toEmail: 'billing@clientsystems.com',
  toAddress: '789 Business Rd\nAustin, TX 78701',
  toPhone: '555-0123',
  toEin: '',
  number: 'CN-2025-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: 'Immediate',
  items: [
    { id: '1', description: 'Refund for Service Outage', quantity: 1, price: 150, hsn: '-' },
    { id: '2', description: 'Adjustment for Invoice #INV-001', quantity: 1, price: 50, hsn: '-' }
  ],
  notes: 'This credit note can be applied to future invoices. Please contact support if you prefer a direct refund.',
  taxRate: 8.25,
  isTaxEnabled: true,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: 'Billing Dept'
};

const DEBIT_NOTE_DATA: FinancialFormData = {
  logo: '',
  fromName: 'Global Traders Ltd.',
  fromEmail: 'finance@globaltraders.com',
  fromAddress: '101 Commerce Blvd.\nNew York, NY 10001',
  fromPhone: '212-555-1000',
  fromEin: '',
  toName: 'Supplier Corp.',
  toEmail: 'sales@suppliercorp.com',
  toAddress: '202 Factory Lane\nChicago, IL 60601',
  toPhone: '312-555-2000',
  toEin: '',
  number: 'DN-2025-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: 'Net 15',
  items: [
    { id: '1', description: 'Undercharge on Invoice #INV-999', quantity: 1, price: 200, hsn: '-' },
    { id: '2', description: 'Late Payment Fee', quantity: 1, price: 25, hsn: '-' }
  ],
  notes: 'Please acknowledge receipt of this debit note. The amount will be debited from our account balance.',
  taxRate: 0,
  isTaxEnabled: false,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: 'Finance Manager'
};

const CHALLAN_DATA: FinancialFormData = {
  logo: '',
  fromName: 'Logistics Pro',
  fromEmail: 'dispatch@logisticspro.com',
  fromAddress: 'Warehouse 5\nIndustrial Zone, FL 33101',
  fromPhone: '305-555-5000',
  fromEin: '',
  toName: 'Retail Store #42',
  toEmail: 'store42@retailchain.com',
  toAddress: '88 High Street\nMiami, FL 33101',
  toPhone: '305-555-6000',
  toEin: '',
  number: 'DC-2025-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date().toISOString().split('T')[0],
  paymentTerms: 'N/A',
  items: [
    { id: '1', description: 'Box of Widgets (Large)', quantity: 10, price: 0, hsn: '-' },
    { id: '2', description: 'Display Stand', quantity: 1, price: 0, hsn: '-' }
  ],
  notes: 'Goods received in good condition. Please sign and return one copy.',
  taxRate: 0,
  isTaxEnabled: false,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: 'Dispatch Officer'
};

const BOL_DATA: FinancialFormData = {
  logo: '',
  fromName: 'Ocean Freight Int.',
  fromEmail: 'ops@oceanfreight.com',
  fromAddress: 'Port Terminal A\nSeattle, WA 98101',
  fromPhone: '206-555-9000',
  fromEin: '',
  toName: 'Overseas Importers',
  toEmail: 'import@overseas.com',
  toAddress: 'Target Port Address\nShanghai, China',
  toPhone: '',
  toEin: '',
  number: 'BOL-2025-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: 'Freight Prepaid',
  items: [
    { id: '1', description: 'Container: 40ft HC - Electronics', quantity: 1, price: 0, hsn: '8500' },
    { id: '2', description: 'Pallets of Accessories', quantity: 12, price: 0, hsn: '-' }
  ],
  notes: 'Carrier is not responsible for loss or damage caused by improper packing by shipper. Subject to standard terms of carriage.',
  taxRate: 0,
  isTaxEnabled: false,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: 'Ship Master'
};

const BLANK_DATA: FinancialFormData = {
  logo: '',
  fromName: '',
  fromEmail: '',
  fromAddress: '',
  fromPhone: '',
  fromEin: '',
  toName: '',
  toEmail: '',
  toAddress: '',
  toPhone: '',
  toEin: '',
  number: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: '',
  paymentTerms: '',
  items: [{ id: '1', description: '', quantity: 1, price: 0, hsn: '' }],
  notes: '',
  taxRate: 0,
  isTaxEnabled: false,
  additionalTaxes: [],
  currency: 'USD',
  discountRate: 0,
  discount: 0,
  shipping: 0,
  authorizedBy: ''
};

const FinancialTool: React.FC<FinancialToolProps> = ({ tool }) => {
  const isPlumbing = tool.id === 'plumbing-invoice';
  const isPurchaseOrder = tool.id === 'purchase-order';
  const isEstimate = tool.id === 'estimate-generator';
  const isCreditNote = tool.id === 'credit-note';
  const isDebitNote = tool.id === 'debit-note';
  const isChallan = tool.id === 'delivery-challan';
  const isBillOfLading = tool.id === 'bill-of-lading';

  const [data, setData] = useState<FinancialFormData>(
    isPlumbing ? PLUMBING_SAMPLE_DATA :
      isPurchaseOrder ? PO_SAMPLE_DATA :
        isCreditNote ? CREDIT_NOTE_DATA :
          isDebitNote ? DEBIT_NOTE_DATA :
            isChallan ? CHALLAN_DATA :
              isBillOfLading ? BOL_DATA :
                DEFAULT_SAMPLE_DATA
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [template, setTemplate] = useState<'modern' | 'classic' | 'professional'>('modern');
  const containerRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  // Update data if tool changes
  useEffect(() => {
    setData(
      isPlumbing ? PLUMBING_SAMPLE_DATA :
        isPurchaseOrder ? PO_SAMPLE_DATA :
          isCreditNote ? CREDIT_NOTE_DATA :
            isDebitNote ? DEBIT_NOTE_DATA :
              isChallan ? CHALLAN_DATA :
                isBillOfLading ? BOL_DATA :
                  DEFAULT_SAMPLE_DATA
    );
  }, [tool.id, isPlumbing, isPurchaseOrder, isCreditNote, isDebitNote, isChallan, isBillOfLading]);

  // Handle responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Standard A4 width at 96dpi is approx 794px. 
        // We add some buffer to prevent edge touching.
        const requiredWidth = 820;

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const reviews = isPlumbing
    ? { score: '4.9', count: '150' }
    : { score: '4.8', count: '451' };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), description: '', quantity: 1, price: 0, hsn: '' }]
    }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPG).');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Please upload an image under 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 300;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.9);
            setData(prev => ({ ...prev, logo: dataUrl }));
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const resetToBlank = () => {
    if (window.confirm('Are you sure you want to clear all data and start fresh?')) {
      const prefix = isEstimate ? 'EST' : isPurchaseOrder ? 'PO' : 'INV';
      setData({
        ...BLANK_DATA,
        number: `${prefix}-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const addAdditionalTax = () => {
    setData(prev => ({
      ...prev,
      additionalTaxes: [...(prev.additionalTaxes || []), { id: Date.now().toString(), name: '', rate: 0 }]
    }));
  };

  const removeAdditionalTax = (id: string) => {
    setData(prev => ({
      ...prev,
      additionalTaxes: (prev.additionalTaxes || []).filter(t => t.id !== id)
    }));
  };

  const handleAdditionalTaxChange = (id: string, field: keyof AdditionalTax, value: string | number) => {
    setData(prev => ({
      ...prev,
      additionalTaxes: (prev.additionalTaxes || []).map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    }));
  };

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.price)), 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * ((Number(data.discountRate) || 0) / 100);
  };

  const calculateTax = () => {
    if (!data.isTaxEnabled) return 0;
    return (calculateSubtotal() - calculateDiscount()) * (Number(data.taxRate) / 100);
  };

  const calculateAdditionalTax = () => {
    const subtotal = calculateSubtotal() - calculateDiscount();
    return (data.additionalTaxes || []).reduce((acc, tax) => {
      return acc + (subtotal * (Number(tax.rate) / 100));
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    const additionalTax = calculateAdditionalTax();
    const shipping = Number(data.shipping) || 0;
    return Math.max(0, subtotal - discount + tax + additionalTax + shipping);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      return `${currencyCode} ${amount.toFixed(2)}`;
    }
  };

  const scrollToDownloadButton = () => {
    if (downloadButtonRef.current) {
      downloadButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the button after scroll completes
      setTimeout(() => {
        downloadButtonRef.current?.focus();
      }, 500);
    }
  };

  const renderClassicTemplate = () => (
    <div className="font-serif text-black p-8 max-w-[21cm] mx-auto bg-white">
      {/* Classic Header */}
      <div className="border-b-2 border-slate-900 pb-6 mb-8">
        <div className="flex justify-between items-start leading-tight">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-widest mb-1 text-slate-900">
              {isEstimate ? 'Estimate' :
                isPurchaseOrder ? 'Purchase Order' :
                  isCreditNote ? 'Credit Note' :
                    isDebitNote ? 'Debit Note' :
                      isChallan ? 'Delivery Challan' :
                        isBillOfLading ? 'Bill of Lading' :
                          'Invoice'}
            </h1>
            <p className="text-xl font-bold text-slate-700">#{data.number}</p>
          </div>
          <div className="text-right text-slate-900">
            <h2 className="text-2xl font-bold mb-1">{data.fromName}</h2>
            <div className="text-sm whitespace-pre-line text-slate-600">{data.fromAddress}</div>
            <div className="text-sm text-slate-600">{data.fromEmail}</div>
            <div className="text-sm text-slate-600">{data.fromPhone}</div>
          </div>
        </div>
      </div>

      {/* Classic Vendor/Client Info */}
      <div className="flex justify-between gap-12 mb-8">
        <div className="w-1/2">
          <h3 className="font-bold border-b border-slate-400 mb-2 uppercase text-xs tracking-wider text-slate-500">
            {isPurchaseOrder ? 'Vendor' : 'Bill To'}
          </h3>
          <div className="font-bold text-lg text-slate-900">{data.toName}</div>
          <div className="whitespace-pre-line text-sm text-slate-700 mt-1">{data.toAddress}</div>
          <div className="text-sm text-slate-700">{data.toEmail}</div>
          <div className="text-sm text-slate-700">{data.toPhone}</div>
        </div>
        <div className="w-1/2 text-right">
          <div className="space-y-1">
            <div className="flex justify-between border-b border-dashed border-slate-200 py-1">
              <span className="font-bold text-slate-600 text-sm">Date:</span>
              <span className="text-slate-900">{data.date}</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-200 py-1">
              <span className="font-bold text-slate-600 text-sm">{isEstimate ? 'Valid Until:' : 'Due Date:'}</span>
              <span className="text-slate-900">{data.dueDate}</span>
            </div>
            {isPurchaseOrder && data.deliveryDate && (
              <div className="flex justify-between border-b border-dashed border-slate-200 py-1">
                <span className="font-bold text-slate-600 text-sm">Delivery Date:</span>
                <span className="text-slate-900">{data.deliveryDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Classic Table */}
      <table className="w-full mb-8 border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-900">
            <th className="text-left py-2 font-bold uppercase text-xs tracking-wider text-slate-900">Item</th>
            <th className="text-center py-2 font-bold uppercase text-xs tracking-wider text-slate-900 w-20">Qty</th>
            <th className="text-right py-2 font-bold uppercase text-xs tracking-wider text-slate-900 w-32">Price</th>
            <th className="text-right py-2 font-bold uppercase text-xs tracking-wider text-slate-900 w-32">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-slate-200">
              <td className="py-3 text-sm text-slate-800 font-medium">{item.description}</td>
              <td className="py-3 text-center text-sm text-slate-600">{item.quantity}</td>
              <td className="py-3 text-right text-sm text-slate-600">{formatCurrency(item.price, data.currency)}</td>
              <td className="py-3 text-right text-sm font-bold text-slate-900">{formatCurrency(item.quantity * item.price, data.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Classic Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-1/2 md:w-5/12 space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(calculateSubtotal(), data.currency)}</span>
          </div>
          {data.isTaxEnabled && (
            <div className="flex justify-between text-sm text-slate-600">
              <span>Tax ({data.taxRate}%)</span>
              <span>{formatCurrency(calculateTax(), data.currency)}</span>
            </div>
          )}
          {data.additionalTaxes?.map(tax => (
            <div key={tax.id} className="flex justify-between text-sm text-slate-600">
              <span>{tax.name || 'Tax'} ({tax.rate}%)</span>
              <span>{formatCurrency((calculateSubtotal() - calculateDiscount()) * (Number(tax.rate) / 100), data.currency)}</span>
            </div>
          ))}
          {data.discountRate > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({data.discountRate}%)</span>
              <span>-{formatCurrency(calculateDiscount(), data.currency)}</span>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t-2 border-slate-900 text-lg font-bold text-slate-900 mt-2">
            <span>Total</span>
            <span>{formatCurrency(calculateTotal(), data.currency)}</span>
          </div>
        </div>
      </div>

      {/* Classic Notes */}
      {(data.notes || data.authorizedBy) && (
        <div className="grid grid-cols-2 gap-8 border-t border-slate-300 pt-6">
          <div>
            <h4 className="font-bold text-xs uppercase mb-2 text-slate-500">Notes & Terms</h4>
            <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{data.notes}</p>
          </div>
          {data.authorizedBy && (
            <div className="text-center pt-8">
              <div className="border-b border-slate-400 w-3/4 mx-auto mb-2"></div>
              <p className="font-bold text-slate-900">{data.authorizedBy}</p>
              <p className="text-xs uppercase text-slate-500">Authorized Signature</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderProfessionalTemplate = () => (
    <div className='w-full bg-white relative font-sans text-slate-900'>
      {/* Border Container */}
      <div className="border-[3px] border-slate-800 p-8 w-full">
        {/* Header with Logo */}
        <div className="flex justify-between items-start mb-12 border-b-2 border-slate-200 pb-8">
          <div className="w-1/2">
            {data.logo ? (
              <img src={data.logo} alt="Company Logo" className="max-h-24 max-w-[200px] object-contain mb-4" />
            ) : (
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight uppercase">{data.fromName || 'YOUR COMPANY'}</h2>
            )}
            <div className="text-sm text-slate-600 space-y-1 mt-2">
              <p className="whitespace-pre-line font-medium text-slate-700">{data.fromAddress}</p>
              <p>{data.fromEmail}</p>
              <p>{data.fromPhone}</p>
            </div>
          </div>
          <div className="text-right w-1/2">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2 uppercase">
              {isEstimate ? 'ESTIMATE' :
                isPurchaseOrder ? 'PURCHASE ORDER' :
                  isCreditNote ? 'CREDIT NOTE' :
                    isDebitNote ? 'DEBIT NOTE' :
                      isChallan ? 'DELIVERY CHALLAN' :
                        isBillOfLading ? 'BILL OF LADING' :
                          'INVOICE'}
            </h1>
            <p className="text-xl font-bold bg-slate-900 text-white inline-block px-4 py-1 rounded">#{data.number}</p>
            <div className="mt-4 space-y-1 text-right">
              <div className="flex justify-end items-center gap-4">
                <span className="text-xs font-bold uppercase text-slate-500">Date Issued</span>
                <span className="font-bold">{data.date}</span>
              </div>
              <div className="flex justify-end items-center gap-4">
                <span className="text-xs font-bold uppercase text-slate-500">{isEstimate ? 'Valid Until' : 'Date Due'}</span>
                <span className="font-bold">{data.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client / Vendor Section */}
        <div className="bg-slate-50 rounded-lg p-6 mb-10 flex justify-between items-start border border-slate-200">
          <div className="w-1/2 md:pr-4">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Build To</h3>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{data.toName}</h2>
            <div className="text-sm text-slate-600 whitespace-pre-line">{data.toAddress}</div>
            <div className="text-sm text-slate-600 mt-1">{data.toEmail}</div>
          </div>
          {isPurchaseOrder && data.shippingAddress && (
            <div className="w-1/2 md:pl-4 border-l border-slate-200 pl-6">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Ship To</h3>
              <div className="text-sm text-slate-600 whitespace-pre-line">{data.shippingAddress}</div>
            </div>
          )}
        </div>

        {/* Items Table - Professional Striped */}
        <div className="mb-10 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider">Item Description</th>
                <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider w-20">Qty</th>
                <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider w-32">Price</th>
                <th className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.items.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="py-3 px-4 text-sm font-medium text-slate-800">{item.description}</td>
                  <td className="py-3 px-4 text-center text-sm text-slate-600">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-sm text-slate-600">{formatCurrency(item.price, data.currency)}</td>
                  <td className="py-3 px-4 text-right text-sm font-bold text-slate-900">{formatCurrency(item.quantity * item.price, data.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Totals */}
        <div className="flex justify-end">
          <div className="w-5/12 bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(calculateSubtotal(), data.currency)}</span>
              </div>
              {data.isTaxEnabled && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax ({data.taxRate}%)</span>
                  <span className="font-medium">{formatCurrency(calculateTax(), data.currency)}</span>
                </div>
              )}
              {data.additionalTaxes?.map(tax => (
                <div key={tax.id} className="flex justify-between text-sm text-slate-600">
                  <span>{tax.name || 'Tax'} ({tax.rate}%)</span>
                  <span className="font-medium">{formatCurrency((calculateSubtotal() - calculateDiscount()) * (Number(tax.rate) / 100), data.currency)}</span>
                </div>
              ))}
              {data.discountRate > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({data.discountRate}%)</span>
                  <span className="font-bold">-{formatCurrency(calculateDiscount(), data.currency)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 mt-3 border-t border-slate-300">
                <span className="text-lg font-black text-slate-900 uppercase">Total</span>
                <span className="text-xl font-black text-slate-900">{formatCurrency(calculateTotal(), data.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        {(data.notes || data.authorizedBy) && (
          <div className="mt-12 pt-8 border-t-2 border-slate-100 flex justify-between items-end">
            <div className="w-2/3 pr-8">
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Terms & Conditions</h4>
              <p className="text-xs text-slate-500 whitespace-pre-wrap leading-relaxed">{data.notes}</p>
            </div>
            {data.authorizedBy && (
              <div className="text-center w-1/3">
                <p className="font-bold font-signature text-2xl text-slate-800 mb-2">{data.authorizedBy}</p>
                <div className="border-t border-slate-300 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Authorized Signature</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-area');
    if (!element) return;

    setIsGenerating(true);

    // We can access html2pdf from window since we loaded via CDN
    // @ts-ignore
    if (typeof window.html2pdf === 'undefined') {
      alert('PDF generator is loading. Please try again in a moment.');
      setIsGenerating(false);
      return;
    }

    const filename = `${data.number || 'document'}.pdf`;

    // Clone the element to avoid modifying the original
    const cloneElement = element.cloneNode(true) as HTMLElement;

    // Remove potentially conflicting layout classes
    cloneElement.classList.remove('mx-auto', 'w-full', 'min-w-[750px]', 'md:min-w-[21cm]', 'max-w-[21cm]', 'shadow-2xl');

    // Force explicit dimensions for A4 (approx 794px at 96dpi)
    cloneElement.style.width = '794px';
    cloneElement.style.maxWidth = '794px';
    cloneElement.style.minWidth = '794px';
    cloneElement.style.height = 'auto';
    cloneElement.style.margin = '0';
    cloneElement.style.padding = '40px'; // Consistent padding for PDF
    cloneElement.style.backgroundColor = 'white';

    // Hide the absolute footer to prevent overflow issues
    const footer = cloneElement.querySelector('.absolute.bottom-4');
    if (footer) {
      (footer as HTMLElement).style.display = 'none';
    }

    const generatedFooter = cloneElement.querySelector('.generated-footer');
    if (generatedFooter) {
      (generatedFooter as HTMLElement).style.display = 'none';
    }

    // Configure PDF options
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: 794,
        width: 794,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    let tempContainer: HTMLDivElement | null = null;

    try {
      // Create a temporary container to hold the clone
      // We place it onscreen but hidden to ensure proper rendering
      tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed'; // Use fixed to ignore scroll
      tempContainer.style.left = '0';
      tempContainer.style.top = '0';
      tempContainer.style.width = '794px';
      tempContainer.style.zIndex = '-9999';
      tempContainer.style.opacity = '0';
      tempContainer.style.background = 'white';
      tempContainer.style.overflow = 'hidden';

      tempContainer.appendChild(cloneElement);
      document.body.appendChild(tempContainer);

      // Generate Blob
      // @ts-ignore
      const worker = window.html2pdf().set(opt).from(cloneElement);

      const blob = await worker.output('blob');
      setPdfBlob(blob);
      console.log('PDF blob generated successfully');

      // Scroll to share buttons
      setTimeout(() => {
        const shareSection = document.getElementById('share-section');
        if (shareSection) {
          shareSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      console.error('PDF Generation Error:', error);
      const fallbackBlob = new Blob(['PDF generated'], { type: 'application/pdf' });
      setPdfBlob(fallbackBlob);
      alert('PDF generated! You can now share or save it.');
    } finally {
      if (tempContainer && document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
      setIsGenerating(false);
    }
  };

  const inputClass = "block w-full rounded-lg border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0 text-base sm:text-sm px-3 py-2.5 border transition-all duration-200";
  const labelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide";
  const sectionHeaderClass = "text-lg font-bold text-slate-900 dark:text-white flex items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-700";

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* LEFT COLUMN: Editor Form */}
      <div className="xl:w-5/12 space-y-6 no-print">

        {/* Quick Actions Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-primary-600" />
                Quick Actions
              </h2>
              {isPlumbing && (
                <div className="flex items-center gap-1 text-xs font-semibold text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-yellow-500" /> {reviews.score} / 5
                </div>
              )}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <button
              onClick={resetToBlank}
              className="w-full flex items-center justify-center px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:border-primary-500 hover:text-primary-600"
            >
              Start with a Blank Form
            </button>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                Template Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTemplate('modern')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${template === 'modern' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setTemplate('classic')}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${template === 'classic' ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  Classic
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

        {/* Main Editor Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 sm:p-6 space-y-8">

            <button
              ref={downloadButtonRef}
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-70 disabled:cursor-wait"
            >
              {isGenerating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Download className="mr-2 h-5 w-5" />}
              {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
            </button>

            {/* Share Buttons - Shows after PDF is generated */}
            {pdfBlob && (
              <div id="share-section" className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-green-500 rounded-full">
                    <FileCheck className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-green-800 dark:text-green-200">PDF Ready! Share Now:</span>
                </div>
                <ShareButtons
                  fileName={`${data.number || 'document'}.pdf`}
                  documentTitle={`${isEstimate ? 'Estimate' : isPurchaseOrder ? 'Purchase Order' : isCreditNote ? 'Credit Note' : isDebitNote ? 'Debit Note' : isChallan ? 'Delivery Challan' : 'Invoice'} - ${data.number || 'Document'}`}
                  documentDescription={`Professional ${isEstimate ? 'estimate' : isPurchaseOrder ? 'purchase order' : 'document'} created with InvoiceCore Hub.`}
                  pdfBlob={pdfBlob}
                  variant="compact"
                  onShare={(platform) => console.log(`Shared via ${platform}`)}
                />
              </div>
            )}

            {/* Brand & Style */}
            <div>
              <h3 className={sectionHeaderClass}>
                {isPurchaseOrder ? 'From (Your Company)' : 'Brand & Style'}
              </h3>
              <div
                onClick={triggerLogoUpload}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerLogoUpload(); }}
                className="group relative flex flex-col justify-center items-center px-6 py-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 bg-slate-50 dark:bg-slate-800/30 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 mb-6"
              >
                {data.logo ? (
                  <img src={data.logo} alt="Logo" className="h-16 object-contain mb-2" />
                ) : (
                  <UploadCloud className="h-10 w-10 text-slate-400 mb-2 group-hover:text-primary-500 transition-colors" />
                )}
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary-600">
                  {data.logo ? 'Change Logo' : 'Company Logo'}
                </span>
                <span className="text-xs text-slate-500 mt-1">Click to upload or drag & drop</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>

              {/* Sender Details */}
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input type="text" name="fromName" value={data.fromName} onChange={handleInputChange} className={inputClass} placeholder="Your Company Inc." />
                </div>
                <div>
                  <label className={labelClass}>{isPurchaseOrder ? 'Billing Address' : 'Your Address'}</label>
                  <textarea name="fromAddress" rows={3} value={data.fromAddress} onChange={handleInputChange} className={inputClass} placeholder="Street, City, State, Zip" />
                </div>
                {!isPurchaseOrder && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Your Email</label>
                      <input type="email" name="fromEmail" value={data.fromEmail} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="text" name="fromPhone" value={data.fromPhone} onChange={handleInputChange} className={inputClass} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* To Section */}
            <div>
              <h3 className={sectionHeaderClass}>
                {isPurchaseOrder ? 'To (Vendor/Supplier)' : 'To'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>{isPurchaseOrder ? 'Vendor Name' : "Client's Name/Company"}</label>
                  <input type="text" name="toName" value={data.toName} onChange={handleInputChange} className={inputClass} placeholder="Recipient Name" />
                </div>
                <div>
                  <label className={labelClass}>{isPurchaseOrder ? 'Vendor Address' : "Client's Address"}</label>
                  <textarea name="toAddress" rows={3} value={data.toAddress} onChange={handleInputChange} className={inputClass} placeholder="Street, City, State, Zip" />
                </div>
                {!isPurchaseOrder && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Client's Email</label>
                      <input type="email" name="toEmail" value={data.toEmail} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="text" name="toPhone" value={data.toPhone} onChange={handleInputChange} className={inputClass} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Document Details */}
            <div>
              <h3 className={sectionHeaderClass}>
                {isPurchaseOrder ? 'Order Details' : 'Invoice Details'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>{isEstimate ? 'Estimate Number' : isPurchaseOrder ? 'PO Number' : 'Invoice Number'}</label>
                  <input type="text" name="number" value={data.number} onChange={handleInputChange} className={inputClass} />
                </div>

                {/* Currency Selector moved here for PO */}
                <div>
                  <label className={labelClass}>Currency</label>
                  <div className="relative">
                    <select
                      name="currency"
                      value={data.currency}
                      onChange={handleInputChange}
                      className={inputClass}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Issue Date</label>
                    <input type="date" name="date" value={data.date} onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{isEstimate ? 'Valid Until' : isPurchaseOrder ? 'Expected Delivery Date' : 'Due Date'}</label>
                    <input type="date" name={isPurchaseOrder ? 'deliveryDate' : 'dueDate'} value={isPurchaseOrder ? data.deliveryDate : data.dueDate} onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>

                {isPurchaseOrder && (
                  <div>
                    <label className={labelClass}>Shipping Address</label>
                    <textarea name="shippingAddress" rows={3} value={data.shippingAddress} onChange={handleInputChange} className={inputClass} placeholder="Where to ship items..." />
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isPurchaseOrder ? 'Ordered Items' : 'Items'}
                </h3>
              </div>

              <div className="space-y-4">
                {data.items.map((item, index) => (
                  <div key={item.id} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 group transition-colors hover:border-slate-300 dark:hover:border-slate-600 relative">
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Description</label>
                        <input
                          className={inputClass}
                          placeholder="Item description"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Qty</label>
                          <input
                            type="number"
                            className={inputClass}
                            placeholder="0"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">{isPurchaseOrder ? 'Unit Price' : 'Price'}</label>
                          <input
                            type="number"
                            className={inputClass}
                            placeholder="0.00"
                            value={item.price}
                            onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        {!isPurchaseOrder && (
                          <div className="col-span-1">
                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">HSN/SAC</label>
                            <input
                              type="text"
                              className={inputClass}
                              placeholder="-"
                              value={item.hsn || '-'}
                              onChange={(e) => handleItemChange(item.id, 'hsn', e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addItem}
                  className="w-full py-3 border border-dashed border-primary-300 dark:border-slate-600 rounded-xl text-sm text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 font-bold flex items-center justify-center transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </button>
              </div>
            </div>

            {/* Final Details / Authorization */}
            <div>
              <h3 className={sectionHeaderClass}>
                {isPurchaseOrder ? 'Authorization & Notes' : 'Final Details'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Discount (%)</label>
                  <input
                    type="number"
                    name="discountRate"
                    value={data.discountRate || ''}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
                {isPurchaseOrder && (
                  <div>
                    <label className={labelClass}>Authorized By</label>
                    <input type="text" name="authorizedBy" value={data.authorizedBy} onChange={handleInputChange} className={inputClass} placeholder="Manager Name" />
                  </div>
                )}
                {!isPurchaseOrder && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={labelClass}>Tax Rate (%)</label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={data.isTaxEnabled ?? true}
                            onChange={(e) => setData(prev => ({ ...prev, isTaxEnabled: e.target.checked }))}
                            className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500 mr-2"
                            id="tax-enabled-toggle"
                          />
                          <label htmlFor="tax-enabled-toggle" className="text-xs text-slate-600 cursor-pointer select-none">Enable Tax</label>
                        </div>
                      </div>
                      <input
                        type="number"
                        name="taxRate"
                        value={data.taxRate}
                        onChange={handleInputChange}
                        className={`${inputClass} ${!data.isTaxEnabled ? 'opacity-50 pointer-events-none bg-slate-100' : ''}`}
                        disabled={!data.isTaxEnabled}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Additional Taxes</label>
                      <div className="space-y-3 mb-3">
                        {data.additionalTaxes?.map((tax) => (
                          <div key={tax.id} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Tax Name"
                              value={tax.name}
                              onChange={(e) => handleAdditionalTaxChange(tax.id, 'name', e.target.value)}
                              className={inputClass}
                            />
                            <input
                              type="number"
                              placeholder="%"
                              value={tax.rate}
                              onChange={(e) => handleAdditionalTaxChange(tax.id, 'rate', parseFloat(e.target.value) || 0)}
                              className={`${inputClass} w-24`}
                            />
                            <button
                              onClick={() => removeAdditionalTax(tax.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={addAdditionalTax}
                        className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add Other Tax
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <label className={labelClass}>{isPurchaseOrder ? 'Notes / Terms & Conditions' : 'Notes'}</label>
                  <textarea name="notes" rows={4} value={data.notes} onChange={handleInputChange} className={inputClass} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview / Printable Area */}
      <div className="xl:w-7/12" ref={containerRef}>
        <div className="sticky top-24">
          {/* Print Controls hint for mobile */}
          <div className="mb-4 flex justify-between items-center xl:hidden no-print">
            <div className="flex items-center text-sm text-slate-500">
              {scale < 1 ? <ZoomOut className="h-4 w-4 mr-1" /> : <ZoomIn className="h-4 w-4 mr-1" />}
              {scale < 1 ? 'Scaled to fit screen' : 'Full Size Preview'}
            </div>
            <button onClick={handleDownloadPDF} className="text-primary-600 text-sm font-bold hover:underline">Export PDF</button>
          </div>

          {/* Document Container */}
          <div className="bg-white shadow-2xl shadow-slate-200/50 dark:shadow-black/50 print:shadow-none rounded-sm overflow-hidden ring-1 ring-slate-900/5 print:ring-0 print:rounded-none">
            {/* 
                   We use a transform to scale the preview down on mobile so it fits the screen width.
                   When isGenerating is true, we force scale to 1 so html2pdf captures high-res output.
                */}
            <div
              className="w-full origin-top-left transition-transform duration-200 ease-in-out print:transform-none"
              style={{
                transform: isGenerating ? 'none' : `scale(${scale})`,
                width: isGenerating || scale === 1 ? '100%' : '794px', // Force width to standard A4 px when scaled
                height: isGenerating || scale === 1 ? 'auto' : 'auto',
                marginBottom: isGenerating ? 0 : `-${(1 - scale) * 100}%`, // Compensate for vertical whitespace caused by scaling
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0
              }}
            >
              <div id="printable-area" className="print-container text-slate-900 w-full min-w-[750px] md:min-w-[21cm] max-w-[21cm] mx-auto p-8 md:p-14 relative flex flex-col font-sans bg-white">

                {template === 'classic' ? renderClassicTemplate() : template === 'professional' ? renderProfessionalTemplate() : isPurchaseOrder ? (
                  /* --- PURCHASE ORDER SPECIFIC PREVIEW --- */
                  <>
                    {/* PO Header */}
                    <div className="flex justify-between items-start mb-10 border-b-2 border-slate-900 pb-6">
                      <div className="w-1/2 pr-6">
                        <h2 className="font-bold text-2xl text-slate-900 mb-2">{data.fromName}</h2>
                        <p className="text-sm text-slate-600 whitespace-pre-line">{data.fromAddress}</p>
                      </div>
                      <div className="w-1/2 text-right">
                        <h1 className="text-4xl font-light text-slate-800 uppercase tracking-tight mb-2">Purchase Order</h1>
                        <p className="text-lg font-bold text-slate-900">{data.number}</p>
                      </div>
                    </div>

                    {/* PO Vendor & Ship To */}
                    <div className="flex justify-between gap-12 mb-10">
                      <div className="w-1/2">
                        <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-sm border-b border-slate-200 pb-1">Vendor</h3>
                        <p className="font-bold text-lg text-slate-800">{data.toName}</p>
                        <p className="text-sm text-slate-600 whitespace-pre-line mt-1">{data.toAddress}</p>
                      </div>
                      <div className="w-1/2">
                        <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-sm border-b border-slate-200 pb-1">Ship To</h3>
                        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{data.shippingAddress}</p>
                      </div>
                    </div>

                    {/* PO Dates */}
                    <div className="flex gap-12 mb-10">
                      <div className="w-1/2">
                        <div className="flex justify-between border-b border-slate-100 py-2">
                          <span className="font-bold text-sm text-slate-500">PO Date:</span>
                          <span className="font-medium text-slate-900">{data.date}</span>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="flex justify-between border-b border-slate-100 py-2">
                          <span className="font-bold text-sm text-slate-500">Delivery Date:</span>
                          <span className="font-medium text-slate-900">{data.deliveryDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* PO Table */}
                    <div className="mb-10">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-300">
                            <th className="py-2 pl-2 text-left text-xs font-bold text-slate-800 uppercase tracking-wider">Item</th>
                            <th className="py-2 text-center text-xs font-bold text-slate-800 uppercase tracking-wider w-20">Qty</th>
                            <th className="py-2 text-right text-xs font-bold text-slate-800 uppercase tracking-wider w-32">Price</th>
                            <th className="py-2 pr-2 text-right text-xs font-bold text-slate-800 uppercase tracking-wider w-32">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.items.map((item, index) => (
                            <tr key={item.id} className="border-b border-slate-200">
                              <td className="py-3 pl-2 text-sm text-slate-900 font-medium align-top">{item.description}</td>
                              <td className="py-3 text-sm text-slate-600 text-center align-top">{item.quantity}</td>
                              <td className="py-3 text-sm text-slate-600 text-right align-top">{formatCurrency(item.price, data.currency)}</td>
                              <td className="py-3 pr-2 text-sm text-slate-900 font-bold text-right align-top">
                                {formatCurrency(item.quantity * item.price, data.currency)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* PO Footer */}
                    <div className="flex justify-between items-start print-break-avoid mt-auto">
                      <div className="w-7/12 pr-8">
                        <h5 className="text-sm font-bold text-slate-800 mb-1">Notes / Terms</h5>
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">{data.notes}</p>
                      </div>
                      <div className="w-4/12">
                        <div className="space-y-2 mb-2">
                          <div className="flex justify-between text-sm text-slate-600">
                            <span>Subtotal</span>
                            <span>{formatCurrency(calculateSubtotal(), data.currency)}</span>
                          </div>
                          {data.discountRate > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Discount ({data.discountRate}%)</span>
                              <span>-{formatCurrency(calculateDiscount(), data.currency)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center py-2 border-t-2 border-slate-900">
                          <span className="text-lg font-bold text-slate-900">Total</span>
                          <span className="text-xl font-bold text-slate-900">{formatCurrency(calculateTotal(), data.currency)}</span>
                        </div>
                      </div>
                    </div>

                    {/* PO Authorization */}
                    {data.authorizedBy && (
                      <div className="mt-16 pt-8 border-t border-slate-300 w-1/2 print-break-avoid">
                        <p className="font-bold text-lg text-slate-900">{data.authorizedBy}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Authorized Signature</p>
                      </div>
                    )}
                  </>
                ) : (
                  /* --- STANDARD INVOICE PREVIEW --- */
                  <>
                    {/* 1. Header Row: Vendor Left, Invoice Info Right */}
                    <div className="flex justify-between items-start mb-12">
                      {/* Left: Vendor */}
                      <div className="w-7/12 pr-8">
                        {data.logo && (
                          <img src={data.logo} alt="Company Logo" className="max-h-24 max-w-[200px] object-contain mb-6" />
                        )}
                        <div className="text-slate-900 space-y-1">
                          <h2 className="font-bold text-xl">{data.fromName || 'Your Company Inc.'}</h2>
                          <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{data.fromAddress}</p>
                          <p className="text-sm text-slate-600">{data.fromEmail}</p>
                          <p className="text-sm text-slate-600">{data.fromPhone}</p>
                          {data.fromEin && <p className="text-xs text-slate-500 mt-1">EIN: {data.fromEin}</p>}
                        </div>
                      </div>

                      {/* Right: Invoice Label */}
                      <div className="w-5/12 text-right">
                        <h1 className="text-5xl font-light text-slate-800 tracking-wide mb-2 uppercase">
                          {isEstimate ? 'ESTIMATE' :
                            isCreditNote ? 'CREDIT NOTE' :
                              isDebitNote ? 'DEBIT NOTE' :
                                isChallan ? 'DELIVERY CHALLAN' :
                                  isBillOfLading ? 'BILL OF LADING' :
                                    'INVOICE'}
                        </h1>
                        <p className="text-lg font-bold text-slate-700">#{data.number}</p>
                      </div>
                    </div>

                    {/* 2. Bill To & Dates Row */}
                    <div className="flex justify-between items-start mb-16">
                      {/* Left: Bill To */}
                      <div className="w-1/2">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</h3>
                        <div className="text-slate-900 space-y-1">
                          <h4 className="font-bold text-lg">{data.toName || 'Client Name'}</h4>
                          <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{data.toAddress}</p>
                          <p className="text-sm text-slate-600">{data.toEmail}</p>
                          <p className="text-sm text-slate-600">{data.toPhone}</p>
                          {data.toEin && <p className="text-xs text-slate-500 mt-1">EIN: {data.toEin}</p>}
                        </div>
                      </div>

                      {/* Right: Dates */}
                      <div className="w-1/3 text-right space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                          <span className="text-sm font-bold text-slate-500 uppercase">Issue Date:</span>
                          <span className="text-base font-semibold text-slate-900">{data.date}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                          <span className="text-sm font-bold text-slate-500 uppercase">
                            {isEstimate ? 'Valid Until:' : 'Due Date:'}
                          </span>
                          <span className="text-base font-semibold text-slate-900">{data.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Items Table */}
                    <div className="mb-10">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-slate-800">
                            <th className="py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider w-12">Sr.</th>
                            <th className="py-3 text-left text-xs font-bold text-slate-800 uppercase tracking-wider">Item</th>
                            {!isPurchaseOrder && <th className="py-3 text-center text-xs font-bold text-slate-800 uppercase tracking-wider w-24">HSN/SAC</th>}
                            <th className="py-3 text-center text-xs font-bold text-slate-800 uppercase tracking-wider w-16">Qty</th>
                            <th className="py-3 text-right text-xs font-bold text-slate-800 uppercase tracking-wider w-24">Price</th>
                            <th className="py-3 text-right text-xs font-bold text-slate-800 uppercase tracking-wider w-32">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.items.map((item, index) => (
                            <tr key={item.id} className="border-b border-slate-200">
                              <td className="py-4 text-sm text-slate-600 font-medium align-top">{index + 1}</td>
                              <td className="py-4 text-sm text-slate-900 font-bold align-top">{item.description}</td>
                              {!isPurchaseOrder && <td className="py-4 text-sm text-slate-600 text-center align-top">{item.hsn || '-'}</td>}
                              <td className="py-4 text-sm text-slate-600 text-center align-top">{item.quantity}</td>
                              <td className="py-4 text-sm text-slate-600 text-right align-top">{formatCurrency(item.price, data.currency)}</td>
                              <td className="py-4 text-sm text-slate-900 font-bold text-right align-top">
                                {formatCurrency(item.quantity * item.price, data.currency)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* 4. Footer: Notes & Totals */}
                    <div className="flex justify-between items-start print-break-avoid">
                      {/* Left: Notes */}
                      <div className="w-1/2 pr-12">
                        <h5 className="text-sm font-bold text-slate-800 mb-2">Notes</h5>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                          {data.notes}
                        </p>
                      </div>

                      {/* Right: Totals */}
                      <div className="w-5/12">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-slate-600">Subtotal</span>
                            <span className="font-bold text-slate-900">{formatCurrency(calculateSubtotal(), data.currency)}</span>
                          </div>
                          {data.isTaxEnabled && (
                            <div className="flex justify-between text-sm">
                              <span className="font-semibold text-slate-600">Tax ({data.taxRate}%)</span>
                              <span className="font-bold text-slate-900">{formatCurrency(calculateTax(), data.currency)}</span>
                            </div>
                          )}
                          {data.additionalTaxes?.map(tax => (
                            <div key={tax.id} className="flex justify-between text-sm">
                              <span className="font-semibold text-slate-600">{tax.name || 'Tax'} ({tax.rate}%)</span>
                              <span className="font-bold text-slate-900">{formatCurrency((calculateSubtotal() - calculateDiscount()) * (Number(tax.rate) / 100), data.currency)}</span>
                            </div>
                          ))}
                          {data.discountRate > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span className="font-semibold">Discount ({data.discountRate}%)</span>
                              <span className="font-bold">- {formatCurrency(calculateDiscount(), data.currency)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-slate-800">
                            <span className="text-xl font-bold text-slate-900">Total</span>
                            <span className="text-2xl font-bold text-slate-900">{formatCurrency(calculateTotal(), data.currency)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Fixed Print Footer for PDF */}
                <div className="print:hidden text-center mt-8 pb-4 generated-footer">
                  <p className="text-[10px] text-slate-400 font-medium">Generated by InvoiceCore Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Signal / Rating */}
          {isPlumbing && (
            <div className="mt-8 flex items-center justify-center space-x-2 text-slate-500 no-print">
              <div className="flex items-center text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm font-medium">{reviews.score} / 5 ({reviews.count} reviews)</span>
            </div>
          )}

          {/* Share Buttons Component - Desktop/Tablet */}
          {pdfBlob && (
            <div className="hidden sm:block">
              <ShareButtons
                fileName={`${data.number || 'document'}.pdf`}
                documentTitle={`${isEstimate ? 'Estimate' : isPurchaseOrder ? 'Purchase Order' : isCreditNote ? 'Credit Note' : isDebitNote ? 'Debit Note' : isChallan ? 'Delivery Challan' : 'Invoice'} - ${data.number || 'Document'}`}
                documentDescription={`Professional ${isEstimate ? 'estimate' : isPurchaseOrder ? 'purchase order' : 'document'} created with InvoiceCore Hub. Prepared for ${data.toName || 'client'}.`}
                pdfBlob={pdfBlob}
                onShare={(platform) => console.log(`Shared via ${platform}`)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Floating Share Bar - Mobile Only */}
      {
        pdfBlob && (
          <div className="sm:hidden">
            <ShareButtons
              fileName={`${data.number || 'document'}.pdf`}
              documentTitle={`${isEstimate ? 'Estimate' : isPurchaseOrder ? 'Purchase Order' : isCreditNote ? 'Credit Note' : isDebitNote ? 'Debit Note' : isChallan ? 'Delivery Challan' : 'Invoice'}`}
              documentDescription={`Professional ${isEstimate ? 'estimate' : isPurchaseOrder ? 'purchase order' : 'document'} created with InvoiceCore Hub`}
              pdfBlob={pdfBlob}
              variant="floating"
              onShare={(platform) => console.log(`Shared via ${platform}`)}
            />
          </div>
        )
      }
    </div >
  );
};

export default FinancialTool;