export interface ToolGuide {
  whenToUse: string;
  include: string[];
  mistakes: string[];
  steps: string[];
  related: string[]; // article ids
}

export const TOOL_GUIDES: Record<string, ToolGuide> = {
  'invoice-generator': {
    whenToUse:
      'Use an invoice whenever you have delivered work or goods and need to ask for payment. It is the document your client\'s accounts team processes, and the one your own bookkeeping and tax return depend on. Issue it as soon as the work is done or a milestone is reached, because payment terms normally run from the invoice date.',
    include: [
      'Your business name, address and contact details, plus any tax registration number',
      'The client\'s name and billing address, and a purchase order number if they use one',
      'A unique invoice number and the issue and due dates',
      'Itemized lines with a clear description, quantity or hours, rate and amount',
      'Tax shown on its own line with the rate applied, and any discount',
      'The total due and exactly how the client can pay you',
    ],
    mistakes: [
      'Sending the invoice weeks after the work, which delays payment by the same amount',
      'Vague descriptions such as "services" that force the client to ask questions before approving',
      'Leaving out a due date or payment instructions',
      'Reusing or skipping invoice numbers, which makes your records hard to reconcile',
    ],
    steps: [
      'Enter your business details and, if you have one, upload your logo',
      'Add the client\'s details and set the invoice number and dates',
      'List each item or service with its quantity and price, and add tax or discounts',
      'Review the totals, then download the PDF and keep a copy for your records',
    ],
    related: ['how-to-create-professional-invoices', 'invoice-payment-terms-explained', 'freelancer-invoicing-mistakes'],
  },
  'estimate-generator': {
    whenToUse:
      'Send an estimate before work begins, when a client wants to know roughly what a job will cost. An estimate is an approximation based on what you know today, which makes it the right document when the scope can still change. If you can commit to a fixed price for a clearly defined scope, you are really offering a quote, so label the document accordingly.',
    include: [
      'A short description of the work and the assumptions behind the price',
      'Itemized tasks or materials with quantities and unit prices',
      'The basis of the price, such as an hourly rate or a per-unit cost',
      'An expiry date, since your costs and availability can change',
      'A clear statement that the figure is an estimate and what could change it',
    ],
    mistakes: [
      'Calling an estimate a quote, which can lead a client to expect a fixed price',
      'Leaving out exclusions such as travel, materials or additional revisions',
      'Not recording the client\'s written acceptance',
    ],
    steps: [
      'Fill in your details and the client\'s details',
      'Add each task or material with its price, plus any tax',
      'Set a validity date and note your assumptions',
      'Download the PDF, send it and ask the client to confirm in writing',
    ],
    related: ['estimate-vs-quote-vs-invoice', 'how-to-price-your-freelance-services', 'how-to-write-a-freelance-contract'],
  },
  'plumbing-invoice': {
    whenToUse:
      'Plumbers and other tradespeople can use this invoice to bill for call-outs, repairs and installations straight from the job site. Itemizing labor, parts and travel separately shows the customer exactly what they are paying for, which helps avoid disputes over the final bill.',
    include: [
      'The job address and a short description of the work carried out',
      'Labor, shown as hours at a stated rate or as a fixed call-out charge',
      'Parts and materials listed individually with quantities and prices',
      'Travel or disposal charges, if you apply them',
      'Tax where it applies, and your license or registration number if your area requires it',
      'Payment terms and the methods you accept',
    ],
    mistakes: [
      'Lumping labor and materials into one figure, which invites questions',
      'Forgetting to record changes the customer approved during the job',
      'Not stating whether the quoted price included parts',
    ],
    steps: [
      'Enter your business details and the customer\'s details and job address',
      'List labor and each part as a separate line',
      'Add tax and any deposit already paid',
      'Download the PDF and send it before you leave or the same day',
    ],
    related: ['how-to-create-professional-invoices', 'invoice-payment-terms-explained', 'deductible-expenses-for-freelancers'],
  },
  'credit-note': {
    whenToUse:
      'A credit note reduces or cancels an invoice you have already issued. Use one when goods are returned, you overcharged, a discount is agreed afterwards or part of the work is not delivered. Issuing a credit note, instead of deleting or editing the original invoice, keeps your numbering and tax records accurate.',
    include: [
      'A unique credit note number and its date',
      'The number and date of the invoice it relates to',
      'The reason for the credit, described briefly',
      'The items or amounts being credited, with any tax adjusted to match',
      'How the credit will be applied: refund, or offset against a future invoice',
    ],
    mistakes: [
      'Editing or deleting the original invoice, which breaks your record trail',
      'Forgetting to reverse the tax on the credited amount',
      'Not telling the client how the credit will be settled',
    ],
    steps: [
      'Enter your details and the client\'s details',
      'Reference the original invoice number and date',
      'List the credited items and the reason',
      'Download the PDF and file it next to the original invoice',
    ],
    related: ['freelancer-invoicing-mistakes', 'sales-tax-gst-vat-on-invoices-explained', 'small-business-record-keeping'],
  },
  'debit-note': {
    whenToUse:
      'A debit note adds to what a customer owes after an invoice has been issued, for example when you undercharged, additional costs came up or a price changed after delivery. Buyers also issue debit notes to tell a supplier that they are returning goods or disputing an amount.',
    include: [
      'A unique debit note number and the issue date',
      'The invoice or order it refers to',
      'The reason for the additional charge or adjustment',
      'The amount, with tax calculated in the same way as the original invoice',
      'Any payment instructions and the due date for the extra amount',
    ],
    mistakes: [
      'Adding charges without explaining why',
      'Not referencing the original invoice',
      'Charging tax differently from the original invoice',
    ],
    steps: [
      'Enter both parties\' details',
      'Reference the original invoice and state the reason',
      'List the additional amounts and tax',
      'Download the PDF and send it with a short explanation',
    ],
    related: ['freelancer-invoicing-mistakes', 'sales-tax-gst-vat-on-invoices-explained', 'small-business-record-keeping'],
  },
  'purchase-order': {
    whenToUse:
      'A buyer issues a purchase order to authorize a purchase from a supplier before any goods or services are delivered. It records what was agreed, at what price and by when, and it gives the supplier a number to quote on their invoice. Use one for purchases above a threshold you set, or whenever several people can spend company money.',
    include: [
      'A unique PO number and the date',
      'Buyer and supplier names and addresses',
      'Itemized goods or services with quantities, unit prices and totals',
      'Delivery address, requested delivery date and shipping terms',
      'Payment terms such as Net 30',
      'Authorization from the person permitted to commit funds',
    ],
    mistakes: [
      'Placing orders verbally and relying on memory later',
      'Changing quantities or prices without issuing a revised PO',
      'Paying an invoice without matching it against the PO and the delivery',
    ],
    steps: [
      'Enter the buyer and supplier details',
      'List each item with quantity and price',
      'Add delivery details and payment terms',
      'Download the PDF, send it to the supplier and keep a copy',
    ],
    related: ['purchase-order-best-practices', 'estimate-vs-quote-vs-invoice', 'small-business-record-keeping'],
  },
  'delivery-challan': {
    whenToUse:
      'A delivery challan travels with goods to record what was sent, in what quantity and to whom, without asking for payment. Use one when goods are moved before the invoice is raised, when sending goods for job work or repair, or when moving stock between locations. The recipient can check the delivery against it on arrival.',
    include: [
      'A unique challan number and the dispatch date',
      'Sender and recipient names and addresses',
      'A description of each item, its quantity and unit',
      'Vehicle or transporter details when relevant',
      'The reason for the movement, such as supply, job work or return',
      'Space for the recipient to sign and date on receipt',
    ],
    mistakes: [
      'Sending goods with no document, which causes disputes about quantities',
      'Not getting a signed copy back as proof of delivery',
      'Forgetting to issue the invoice after delivery',
    ],
    steps: [
      'Enter the sender, recipient and transport details',
      'List each item with quantity and unit',
      'Add the reason for movement',
      'Download the PDF, print it and send it with the goods',
    ],
    related: ['purchase-order-best-practices', 'estimate-vs-quote-vs-invoice', 'small-business-record-keeping'],
  },
  'bill-of-sale': {
    whenToUse:
      'A bill of sale is a written record that ownership of an item has been transferred from a seller to a buyer. It is commonly used for vehicles, equipment, boats and other valuable personal property, and can be needed to register the item or to prove ownership later. It protects both parties by recording the price, the condition and the date of transfer.',
    include: [
      'Full names and addresses of the seller and the buyer',
      'A clear description of the item, including make, model, serial or identification number',
      'The sale price and how it was paid',
      'The date of sale and of transfer',
      'The condition of the item and whether it is sold as is or with a warranty',
      'Signatures of both parties, and a witness or notary if your state requires it',
    ],
    mistakes: [
      'Leaving out the serial or identification number',
      'Not stating whether the item is sold as is',
      'Skipping a notary or witness where local rules require one',
    ],
    steps: [
      'Enter the seller and buyer details',
      'Describe the item and state the price and date',
      'Add any conditions or warranties',
      'Download the PDF, have both parties sign and keep a copy each',
    ],
    related: ['small-business-record-keeping', 'how-to-write-a-freelance-contract', 'estimate-vs-quote-vs-invoice'],
  },
  'bill-of-lading': {
    whenToUse:
      'A bill of lading is issued by a carrier to acknowledge that goods have been received for shipment. It works as a receipt for the cargo, a record of the shipping contract and, in some cases, a document of title. Shippers use it for freight movements so that everyone involved can see what was loaded and where it is going.',
    include: [
      'Shipper, consignee and carrier names and addresses',
      'A description of the goods, number of packages, weight and any marks',
      'Pickup and delivery locations and dates',
      'Freight charges and who pays them',
      'Special handling instructions',
      'Signatures acknowledging receipt by the carrier',
    ],
    mistakes: [
      'Describing goods vaguely, which complicates claims for loss or damage',
      'Not noting damage visible at pickup',
      'Using a different consignee name from the one on the invoice',
    ],
    steps: [
      'Enter the shipper, consignee and carrier details',
      'Describe the goods, packages and weights',
      'Add the route, freight terms and handling notes',
      'Download the PDF and have the carrier sign it at pickup',
    ],
    related: ['purchase-order-best-practices', 'small-business-record-keeping', 'estimate-vs-quote-vs-invoice'],
  },
  'lease-agreement': {
    whenToUse:
      'A lease agreement sets out the terms under which a landlord lets a property to a tenant for a defined period. Having it in writing clarifies rent, deposits, responsibilities and what happens if something goes wrong. Landlord and tenant law varies a lot by state and country, so treat a generated lease as a draft to check against local rules.',
    include: [
      'Names of the landlord and every tenant, and the property address',
      'The lease term with start and end dates',
      'Rent amount, due date, accepted payment methods and late fees',
      'The security deposit and the conditions for returning it',
      'Who pays utilities and who handles maintenance and repairs',
      'Rules on pets, subletting, guests and entry by the landlord',
      'How and when either side can end the lease',
    ],
    mistakes: [
      'Using a template that ignores local rules on deposits and notice periods',
      'Not documenting the condition of the property at move-in',
      'Leaving out how rent increases or renewals are handled',
    ],
    steps: [
      'Enter the landlord, tenant and property details',
      'Set the term, rent and deposit',
      'Add the rules and responsibilities that apply',
      'Download the PDF, review it against local law and sign it',
    ],
    related: ['how-to-write-a-freelance-contract', 'small-business-record-keeping', 'understanding-llc-operating-agreements'],
  },
  'nda-generator': {
    whenToUse:
      'Use a non-disclosure agreement before you share information that you need the other party to keep confidential, such as business plans, customer data, source code or product designs. It is common when hiring contractors, talking to potential partners or showing a prototype. Do not ask for an NDA over information that is already public or not really sensitive.',
    include: [
      'The names of the parties, and whether the agreement is one-way or mutual',
      'A definition of what counts as confidential information',
      'The permitted purpose for using it',
      'Exclusions, such as information that is already public',
      'How long the confidentiality obligation lasts',
      'What must happen to the materials when the relationship ends',
      'Governing law and how disputes will be handled',
    ],
    mistakes: [
      'A definition so broad or vague that it is hard to enforce',
      'Forgetting an end date or return-of-materials clause',
      'Relying on an NDA alone instead of limiting who can see the information',
    ],
    steps: [
      'Enter the parties and choose one-way or mutual',
      'Describe the confidential information and its purpose',
      'Set the term and governing law',
      'Download the PDF, review it and have both parties sign',
    ],
    related: ['when-to-use-an-nda', 'how-to-write-a-freelance-contract', 'independent-contractor-vs-employee'],
  },
  'contractor-agreement': {
    whenToUse:
      'An independent contractor agreement sets the terms when you hire someone who is not an employee, or when you work as a freelancer for a client. It defines the work, the pay, who owns the result and how either side can end the arrangement. A written agreement also shows that you intend the relationship to be a contracting one, though the real working arrangement is what authorities look at.',
    include: [
      'The parties and the effective date',
      'A specific scope of work and deliverables',
      'The timeline, milestones and the client\'s responsibilities',
      'Fees, invoicing schedule, payment terms and expenses',
      'Ownership of the finished work and any licensed materials',
      'Confidentiality terms',
      'A statement that the contractor is responsible for their own taxes and insurance',
      'Termination, notice and dispute resolution',
    ],
    mistakes: [
      'A vague scope that leaves room for disagreement about what was promised',
      'Controlling hours and methods in a way that looks like employment',
      'Not saying who owns the work product',
    ],
    steps: [
      'Enter the client and contractor details',
      'Describe the scope, timeline and fees',
      'Add ownership, confidentiality and termination terms',
      'Download the PDF, review it and have both sides sign',
    ],
    related: ['independent-contractor-vs-employee', 'how-to-write-a-freelance-contract', 'freelancer-tax-guide-us'],
  },
  'llc-operating-agreement': {
    whenToUse:
      'An operating agreement records how a limited liability company is owned and run. Create one when you form the LLC, and update it when members join or leave or when the way you share profits changes. Even a single-member LLC benefits from one, because it documents the separation between you and the company and is often requested by banks.',
    include: [
      'The company name, state of formation, address and purpose',
      'Each member\'s name, ownership percentage and capital contribution',
      'Whether the LLC is member-managed or manager-managed',
      'Voting rights and which decisions need which level of approval',
      'How profits, losses and distributions are shared',
      'Rules on transferring interests and admitting new members',
      'What happens on a member\'s exit, death or a dissolution',
    ],
    mistakes: [
      'Signing a generic template without checking that it matches your actual arrangement',
      'Never updating it after the ownership changes',
      'Mixing personal and company money, which can weaken liability protection',
    ],
    steps: [
      'Enter the company details and the members',
      'Set the management structure and profit sharing',
      'Add the transfer and exit rules',
      'Download the PDF, have every member sign and keep it with your formation papers',
    ],
    related: ['understanding-llc-operating-agreements', 'freelancer-tax-guide-us', 'small-business-record-keeping'],
  },
  'privacy-policy': {
    whenToUse:
      'A privacy policy tells visitors what personal information your website or app collects, why, how it is used and shared, and what rights people have. Most places require one if you collect any personal data, which includes email addresses, contact form entries, analytics identifiers and advertising cookies. Services such as advertising and analytics providers also require you to have one.',
    include: [
      'What data you collect, such as contact details, usage data and cookies',
      'Why you collect it and the legal basis where one is required',
      'Which third parties receive it, for example analytics and advertising partners',
      'How long you keep the data and how you protect it',
      'The rights visitors have, such as access, correction and deletion',
      'How to contact you with privacy questions',
      'The date the policy was last updated',
    ],
    mistakes: [
      'Copying a policy that describes practices your site does not actually have',
      'Not mentioning cookies or third-party advertising services you use',
      'Forgetting to update it when you add new tools',
    ],
    steps: [
      'Enter your business name, website and contact email',
      'Select the types of data and services that apply to you',
      'Review the generated text and edit anything that does not match your site',
      'Download the policy and publish it on a page linked from your footer',
    ],
    related: ['small-business-record-keeping', 'how-to-write-a-freelance-contract', 'understanding-llc-operating-agreements'],
  },
  'offer-letter': {
    whenToUse:
      'An offer letter formally offers a job to a chosen candidate and sets out the main terms before they start. Send one after you have decided to hire, and ask the candidate to sign and return a copy. It reduces misunderstandings about pay, duties and start date, though it is not a replacement for a full employment contract where one is required.',
    include: [
      'The job title, department and who the employee reports to',
      'The start date and work location',
      'Pay, pay frequency and any bonus or commission',
      'Benefits, leave and any probation period',
      'Whether the role is at-will or fixed term, where that applies',
      'Any conditions of the offer, such as background checks or signed agreements',
      'A deadline for accepting and a space for signatures',
    ],
    mistakes: [
      'Promising terms that differ from the later employment contract',
      'Leaving out the conditions that the offer depends on',
      'Not checking local employment law on required terms',
    ],
    steps: [
      'Enter the company and candidate details',
      'Add the role, pay and benefits',
      'Set conditions and the acceptance deadline',
      'Download the PDF, have it reviewed if needed and send it for signature',
    ],
    related: ['independent-contractor-vs-employee', 'when-to-use-an-nda', 'small-business-record-keeping'],
  },
};
