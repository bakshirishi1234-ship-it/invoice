import { LucideIcon } from 'lucide-react';

export enum ToolCategory {
  FINANCIAL = 'Financial',
  LEGAL = 'Legal',
  HR = 'Human Resources',
  GENERAL = 'General'
}

export enum DocumentType {
  INVOICE = 'INVOICE',
  TEXT_GENERATION = 'TEXT_GENERATION',
  CALCULATOR = 'CALCULATOR'
}

export interface ToolDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  type: DocumentType;
  promptTemplate?: string; // For AI tools
  seoParagraphs?: string[]; // Unique paragraphs for SEO
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  hsn?: string; // HSN/SAC Code
}

export interface AdditionalTax {
  id: string;
  name: string;
  rate: number;
}

export interface FinancialFormData {
  logo?: string; // Base64 or URL
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone?: string;
  fromEin?: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  toPhone?: string;
  toEin?: string;
  number: string;
  date: string;
  dueDate?: string;
  paymentTerms?: string;
  items: LineItem[];
  notes: string;
  isTaxEnabled?: boolean;
  taxRate: number;
  additionalTaxes?: AdditionalTax[];
  currency: string;
  discountRate: number;
  discount: number;
  shipping: number;
  authorizedBy: string;

  // Specific to Purchase Orders
  shippingAddress?: string;
  deliveryDate?: string;
}

export interface LegalFormData {
  logo?: string; // Logo Base64
  partyA: string; // Client Name / Discloser / Company Name / LLC Name / Seller Name
  partyB: string; // Contractor Name / Recipient / Candidate Name / Member Name / Buyer Name
  effectiveDate: string; // Letter Date / Date of Sale
  jurisdictionState: string;
  additionalDetails: string; // Purpose / Description

  // Extended fields for specific templates (e.g. Contractor Agreement)
  partyAAddress?: string;
  partyBAddress?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  noticePeriod?: string;
  services?: string[];
  compensationAmount?: string;
  paymentSchedule?: string;
  confidentialityClause?: string;
  ipClause?: string;

  // Offer Letter Specific
  jobTitle?: string;
  reportingTo?: string;
  salary?: string;
  offerDeadline?: string;
  senderName?: string;
  senderTitle?: string;

  // LLC Operating Agreement Specific
  agentName?: string;
  agentAddress?: string;

  // Bill of Sale Specific
  itemType?: string;
  itemDescription?: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: string;
  purchasePrice?: string;
  warrantyType?: 'As-Is' | 'Warranty';
  partyAMobile?: string; // Seller/Party A Mobile
  partyBMobile?: string; // Buyer/Party B Mobile
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  readTime: string;
}