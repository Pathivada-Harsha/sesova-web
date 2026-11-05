// Site content and demo data, ported verbatim from the SeSova design export.

export const NAVY = '#12324F';
export const BLUE = '#2C6FB5';
export const TEAL = '#14707A';
export const DEEP = '#0A3742';
export const GREEN = '#4E9E6A';
export const LIME = '#86C79A';

export const STAGES = [
  { n: '01', label: 'Capital', head: 'Capital with a line of sight to the asset', body: 'Lenders and investors see the commitments, drawdowns and covenants behind every rupee, tied to the projects they fund.', tags: ['Facilities', 'Covenants', 'Commitments', 'Investor reporting'], flow: [{ t: 'Sanctioned facility', s: 'Terms, conditions precedent and security package.' }, { t: 'Drawdown schedule', s: 'Planned against construction milestones.' }, { t: 'Exposure view', s: 'Rolled up by borrower, technology and geography.' }] },
  { n: '02', label: 'Projects', head: 'Every project as one continuous record', body: 'A project carries its capacity, land, approvals, contracts and schedule from origination to operations without changing systems.', tags: ['Capacity', 'Approvals', 'Land', 'Schedule'], flow: [{ t: 'Project charter', s: 'Site, capacity, offtake and target COD.' }, { t: 'Milestone plan', s: 'Linked to disbursement and procurement triggers.' }, { t: 'Document set', s: 'Approvals and contracts held against the project.' }] },
  { n: '03', label: 'Financing', head: 'Appraisal to repayment on one file', body: 'KYC, appraisal, sanction, disbursement and repayment run as stages of the same record, not handoffs between teams.', tags: ['KYC', 'Appraisal', 'Sanction', 'Disbursement'], flow: [{ t: 'Credit appraisal', s: 'Assessed against the live project record.' }, { t: 'Disbursement request', s: 'Released on verified milestone evidence.' }, { t: 'Repayment schedule', s: 'Tracked with DSCR and ageing.' }] },
  { n: '04', label: 'EPC', head: 'Execution measured against the plan', body: 'Estimation, bill of materials, subcontracting and progress billing stay attached to the project they belong to.', tags: ['Estimation', 'BOM', 'Progress billing', 'Subcontractors'], flow: [{ t: 'Estimate and BOM', s: 'Quantities that drive procurement directly.' }, { t: 'Site progress', s: 'Captured against milestones, not spreadsheets.' }, { t: 'Progress invoice', s: 'Raised from measured work.' }] },
  { n: '05', label: 'Procurement', head: 'Demand that begins with the project', body: 'Requirements flow from the bill of materials into RFQs, comparisons and purchase orders with the project always in context.', tags: ['RFQ', 'Comparison', 'Purchase order', 'Inbound'], flow: [{ t: 'RFQ to vendors', s: 'Issued from project requirements.' }, { t: 'Quote comparison', s: 'Price, lead time and terms side by side.' }, { t: 'Purchase order', s: 'Committed value visible to finance.' }] },
  { n: '06', label: 'Suppliers', head: 'Suppliers inside the record, not outside it', body: 'Material suppliers respond to RFQs, confirm deliveries and raise bills in the same architecture their customers plan in.', tags: ['Quotations', 'Deliveries', 'Bills', 'Payments'], flow: [{ t: 'Quotation', s: 'Submitted against a live RFQ.' }, { t: 'Dispatch and delivery', s: 'Confirmed against the purchase order.' }, { t: 'Bill and payment', s: 'Reconciled without re-keying.' }] },
  { n: '07', label: 'Assets', head: 'Commissioning is a transition, not a restart', body: 'The project record becomes the asset record. Warranties, O&M obligations and performance history carry forward intact.', tags: ['Commissioning', 'Warranty', 'O&M', 'Performance'], flow: [{ t: 'Handover pack', s: 'Assembled from the construction record.' }, { t: 'Warranty register', s: 'Tracked by component and vendor.' }, { t: 'Generation data', s: 'Measured against expectation.' }] },
  { n: '08', label: 'Portfolios', head: 'Portfolios that reconcile themselves', body: 'Assets roll into portfolios by owner, lender, technology and geography, with the underlying detail one click away.', tags: ['Roll-ups', 'Cohorts', 'Covenant tracking', 'Reporting'], flow: [{ t: 'Portfolio composition', s: 'By technology, vintage and geography.' }, { t: 'Exposure and returns', s: 'Tied back to the source records.' }, { t: 'Reporting pack', s: 'Generated, not assembled.' }] },
  { n: '09', label: 'Intelligence', head: 'Signals ahead of the consequence', body: 'Because every stage is connected, deviations surface as signals — slipping milestones, thinning cover, drifting performance.', tags: ['Signals', 'Risk indicators', 'Trends', 'Forecasts'], flow: [{ t: 'Deviation signal', s: 'Raised where plan and actual diverge.' }, { t: 'Risk indicator', s: 'Weighted across financing and execution.' }, { t: 'Forecast view', s: 'Projected on the live record.' }] }
];

export const AREAS = ['CRM', 'Finance', 'Projects', 'EPC', 'Procurement', 'Portfolio', 'AI', 'Analytics', 'Enterprise Platform'];

// Seven capability slides for the "What SeSova does" carousel. Presentation
// data only: each slide pairs a capability story with a sample product view.
// Stage tones: blue (in progress), green (positive), amber (attention), grey (waiting).
export const CAROUSEL = [
  {
    id: 'crm', kicker: 'CRM', nav: 'CRM', icon: 'users',
    title: 'Relationships across the whole value chain',
    body: 'Customers, partners, suppliers and internal teams as one account model, with every opportunity tied to the project it belongs to.',
    tags: ['Accounts', 'Opportunities', 'Pipeline', 'Activity'],
    ui: {
      title: 'Pipeline', filter: 'All Projects',
      metrics: [{ k: 'OPEN PIPELINE', v: '₹2,410 Cr', d: '+12%' }, { k: 'QUALIFIED', v: '54', d: '+8%' }],
      cols: ['Company', 'Project', 'Value', 'Stage', 'Updated'],
      rows: [
        ['Aurex Power', 'Solar EPC', '₹380 Cr', ['Proposal', 'blue'], '12 Sep 2026'],
        ['Northline NBFC', 'Term Loan', '₹300 Cr', ['Negotiation', 'amber'], '10 Sep 2026'],
        ['Veltra Infra', 'Hybrid Project', '₹450 Cr', ['Qualified', 'green'], '08 Sep 2026'],
        ['Meridian Capital', 'Refinancing', '₹280 Cr', ['Proposal', 'blue'], '05 Sep 2026']
      ]
    }
  },
  {
    id: 'finance', kicker: 'FINANCE', nav: 'Finance', icon: 'wallet',
    title: 'Appraisal to repayment on one file',
    body: 'Facilities, disbursements, receivables and repayments run as stages of the same record, not handoffs between teams.',
    tags: ['Facilities', 'Disbursement', 'Receivables', 'Covenants'],
    ui: {
      title: 'Facilities', filter: 'All Facilities',
      metrics: [{ k: 'SANCTIONED', v: '₹1,450 Cr', d: '+6%' }, { k: 'DISBURSED', v: '₹1,120 Cr', d: '+9%' }],
      cols: ['Borrower', 'Facility', 'Amount', 'Stage', 'Updated'],
      rows: [
        ['Aurex Power', 'Term Loan', '₹240 Cr', ['Repayment', 'green'], '11 Sep 2026'],
        ['Helix Industries', 'Construction', '₹180 Cr', ['Disbursement', 'blue'], '09 Sep 2026'],
        ['Sunmarg Energy', 'Term Loan', '₹96 Cr', ['Appraisal', 'grey'], '07 Sep 2026'],
        ['Veltra Infra', 'Working Capital', '₹60 Cr', ['Watch', 'amber'], '04 Sep 2026']
      ]
    }
  },
  {
    id: 'projects', kicker: 'PROJECTS', nav: 'Projects', icon: 'layers',
    title: 'Execution measured against the plan',
    body: 'Schedules, milestones and site progress stay attached to the same record that finance and procurement already reference.',
    tags: ['Milestones', 'Schedules', 'Progress', 'Approvals'],
    ui: {
      title: 'Milestones', filter: 'Active Projects',
      metrics: [{ k: 'ACTIVE PROJECTS', v: '46', d: '+4' }, { k: 'ON SCHEDULE', v: '38', d: '83%' }],
      cols: ['Project', 'Milestone', 'Owner', 'Status', 'Due'],
      rows: [
        ['Bikaner Block C', 'Installation', 'R. Iyer', ['On track', 'green'], '12 Sep 2026'],
        ['Kutch Site 4', 'Erection', 'S. Menon', ['Delayed', 'amber'], '28 Aug 2026'],
        ['Hosur Cluster', 'Commissioning', 'A. Kulkarni', ['On track', 'green'], '05 Sep 2026'],
        ['Solapur Hybrid A', 'Land approval', 'D. Rao', ['At risk', 'amber'], '30 Sep 2026']
      ]
    }
  },
  {
    id: 'procurement', kicker: 'PROCUREMENT', nav: 'Procurement', icon: 'cart',
    title: 'Demand that begins with the project',
    body: 'Bills of material flow into RFQs, vendor comparison and purchase orders, with committed value visible to finance.',
    tags: ['RFQs', 'Vendors', 'Purchase Orders', 'Inbound'],
    ui: {
      title: 'Open RFQs', filter: 'All Vendors',
      metrics: [{ k: 'OPEN RFQS', v: '34', d: '+5' }, { k: 'COMMITTED', v: '₹392 Cr', d: '+11%' }],
      cols: ['RFQ', 'Item', 'Best Quote', 'Status', 'Closes'],
      rows: [
        ['RFQ-2026-0412', 'PV modules', '₹14.2 / Wp', ['Comparing', 'blue'], '14 Sep 2026'],
        ['RFQ-2026-0408', 'Inverters', '₹1.86 Cr', ['Approved', 'green'], '09 Sep 2026'],
        ['RFQ-2026-0401', 'Structures', '₹3.10 Cr', ['Awaiting', 'grey'], '18 Sep 2026'],
        ['RFQ-2026-0389', 'Transformers', '₹2.44 Cr', ['Re-quote', 'amber'], '20 Sep 2026']
      ]
    }
  },
  {
    id: 'documents', kicker: 'DOCUMENTS', nav: 'Documents', icon: 'doc',
    title: 'Every document on the record it belongs to',
    body: 'Contracts, approvals and evidence are captured, extracted and linked to the right record automatically, never lost in folders.',
    tags: ['Contracts', 'Approvals', 'Extraction', 'Versions'],
    ui: {
      title: 'Documents', filter: 'All Entities',
      metrics: [{ k: 'DOCUMENTS', v: '12,480', d: '+640' }, { k: 'AUTO-EXTRACTED', v: '94%', d: '+3%' }],
      cols: ['Document', 'Linked To', 'Type', 'Status', 'Updated'],
      rows: [
        ['Supply agreement', 'Aurex Power', 'Contract', ['Verified', 'green'], '12 Sep 2026'],
        ['Sanction letter', 'Helix Industries', 'Finance', ['In review', 'blue'], '10 Sep 2026'],
        ['Site approval', 'Tumakuru Park II', 'Approval', ['Expiring', 'amber'], '08 Sep 2026'],
        ['Warranty certificate', 'Suryan Modules', 'Warranty', ['Verified', 'green'], '03 Sep 2026']
      ]
    }
  },
  {
    id: 'intelligence', kicker: 'PORTFOLIO INTELLIGENCE', nav: 'Portfolio Intelligence', icon: 'chart',
    title: 'Signals ahead of the consequence',
    body: 'Because every function sits on one record, deviations surface as early signals rather than quarterly surprises.',
    tags: ['Roll-ups', 'Signals', 'Cohorts', 'Reporting'],
    ui: {
      title: 'Portfolio', filter: 'All Portfolios',
      metrics: [{ k: 'PORTFOLIO VALUE', v: '₹1,842 Cr', d: '+4%' }, { k: 'RISK SIGNALS', v: '7', d: '−2' }],
      cols: ['Portfolio', 'Segment', 'Value', 'Health', 'Updated'],
      rows: [
        ['Western Cluster', 'Infrastructure', '₹640 Cr', ['Healthy', 'green'], '12 Sep 2026'],
        ['Coastal Phase II', 'Energy', '₹410 Cr', ['Watch', 'amber'], '11 Sep 2026'],
        ['Southern Rooftop', 'Commercial', '₹186 Cr', ['Healthy', 'green'], '09 Sep 2026'],
        ['Central Hybrid I', 'Industrial', '₹392 Cr', ['In appraisal', 'blue'], '06 Sep 2026']
      ]
    }
  },
  {
    id: 'esg', kicker: 'ESG & COMPLIANCE', nav: 'ESG & Compliance', icon: 'leaf',
    title: 'Compliance built into the workflow',
    body: 'Obligations, sustainability data and governance checks are tracked on the same record as the work they relate to.',
    tags: ['Obligations', 'ESG Data', 'Audits', 'Governance'],
    ui: {
      title: 'Compliance', filter: 'All Entities',
      metrics: [{ k: 'OBLIGATIONS MET', v: '96%', d: '+2%' }, { k: 'OPEN ACTIONS', v: '12', d: '−5' }],
      cols: ['Obligation', 'Entity', 'Owner', 'Status', 'Due'],
      rows: [
        ['Emissions report', 'Group', 'S. Menon', ['Submitted', 'green'], '15 Sep 2026'],
        ['Safety audit', 'Kutch Site 4', 'R. Iyer', ['Scheduled', 'blue'], '22 Sep 2026'],
        ['Board ESG review', 'Holding Co.', 'A. Kulkarni', ['In review', 'blue'], '30 Sep 2026'],
        ['Water permit renewal', 'Hosur Cluster', 'D. Rao', ['Due soon', 'amber'], '02 Oct 2026']
      ]
    }
  }
];

export const MARQUEE = [
  { label: 'Accounts & opportunities', c: BLUE }, { label: 'Credit appraisal', c: TEAL },
  { label: 'Sanction & disbursement', c: TEAL }, { label: 'Milestone schedules', c: GREEN },
  { label: 'Bill of materials', c: DEEP }, { label: 'RFQ & vendor comparison', c: DEEP },
  { label: 'Purchase orders', c: DEEP }, { label: 'Progress billing', c: TEAL },
  { label: 'Receivables & ageing', c: TEAL }, { label: 'Warranty register', c: GREEN },
  { label: 'Asset performance', c: GREEN }, { label: 'Portfolio roll-ups', c: BLUE },
  { label: 'Covenant tracking', c: BLUE }, { label: 'Document extraction', c: TEAL },
  { label: 'Risk signals', c: BLUE }, { label: 'Vendor portal', c: GREEN }
];

export const PF_LAYERS = [
  { n: 'L1', label: 'CRM', c: BLUE, indent: '0px', body: 'Accounts, opportunities and relationships across the value chain. Lenders, developers, contractors and suppliers share one account model.', holds: ['Accounts and contacts', 'Opportunities and pipeline', 'Activity and meeting history', 'Relationship ownership'], feeds: [1, 2, 5] },
  { n: 'L2', label: 'Finance', c: TEAL, indent: '18px', body: 'Facilities, disbursements, billing and receivables, tied to the projects and milestones that release them.', holds: ['Facilities and sanction terms', 'Disbursement requests', 'Invoices and receivables', 'Repayment schedules'], feeds: [2, 5, 6] },
  { n: 'L3', label: 'Projects', c: GREEN, indent: '36px', body: 'Schedules, milestones and site execution on the same record that financing and procurement reference.', holds: ['Project charter and capacity', 'Milestone plan', 'Site progress', 'Approvals and permits'], feeds: [1, 3, 4] },
  { n: 'L4', label: 'Procurement', c: DEEP, indent: '54px', body: 'Requirements, RFQs, vendors and purchase orders, starting from the project bill of materials.', holds: ['Bill of materials', 'RFQs and quotations', 'Purchase orders', 'Vendor register'], feeds: [1, 2, 4] },
  { n: 'L5', label: 'Assets', c: GREEN, indent: '36px', body: 'Commissioned plant, warranties and O&M obligations, carried forward intact from the construction record.', holds: ['Asset register', 'Warranty register', 'O&M obligations', 'Performance history'], feeds: [5, 6] },
  { n: 'L6', label: 'Portfolio', c: BLUE, indent: '18px', body: 'Roll-ups by owner, lender, technology and geography, with the underlying detail one click away.', holds: ['Portfolio composition', 'Exposure roll-ups', 'Covenant tracking', 'Reporting packs'], feeds: [6] },
  { n: 'L7', label: 'Intelligence', c: TEAL, indent: '0px', body: 'Signals, risk indicators and forecasts computed on the live record rather than on exported copies.', holds: ['Deviation signals', 'Risk indicators', 'Trend views', 'Forecasts'], feeds: [0, 1, 5] }
];

export const PF_ENT = [
  { label: 'Account', own: 0, refs: [1, 2, 3, 5, 6] },
  { label: 'Project', own: 2, refs: [0, 1, 3, 4, 5, 6] },
  { label: 'Facility', own: 1, refs: [0, 2, 5, 6] },
  { label: 'Purchase order', own: 3, refs: [1, 2, 6] },
  { label: 'Asset', own: 4, refs: [1, 2, 5, 6] },
  { label: 'Document', own: -1, refs: [0, 1, 2, 3, 4, 5, 6] }
];

export const NAV = [
  { id: 'ecosystem', label: 'About', href: '/#ecosystem' },
  { id: 'product', label: 'Products', href: '/#product' },
  { id: 'solutions', label: 'Solutions', href: '/#solutions' },
  // No Industries section exists yet; points at Solutions until one does.
  { id: 'industries', label: 'Industries', href: '/#solutions' },
  { id: 'demo', label: 'Contact', href: '/#demo' }
];

// Product section: six modules, each with one or more screens in public/assets/product/.
export const MODS = [
  { label: 'Dashboard', shots: [{ label: 'Dashboard', file: 'dashboard.webp', desc: 'Order book, billed value, pipeline and active leads, with follow-ups that need attention.' }] },
  { label: 'Reports & Analytics', shots: [{ label: 'Project Reports', file: 'project-reports.webp', desc: 'Project status, value by type and monthly trend, with a filterable list of every project report.' }, { label: 'Lead Analytics', file: 'lead-analytics.webp', desc: 'Leads by source and status, monthly trend, and the industries and users converting best.' }] },
  { label: 'Sales', shots: [{ label: 'Leads', file: 'leads.webp', desc: 'Every enquiry with source, industry, status, owner and last activity.' }, { label: 'Clients', file: 'client.webp', desc: 'Every client with industry, contact, type, status, projects and revenue.' }, { label: 'Invoices', file: 'invoices.webp', desc: 'Invoices with value, paid and pending amounts, due dates and status.' }] },
  { label: 'Projects', shots: [{ label: 'All Projects', file: 'projects.webp', desc: 'Budget, received, spent and progress across every project.' }, { label: 'Cost & Expenses', file: 'expenses.webp', desc: 'Budget against spend, expenses by category and vendor, with approval and payment status.' }, { label: 'Tasks', file: 'tasks.webp', desc: 'A task board and list by project, with priority, status, assignee and progress.' }, { label: 'Access Control', file: 'access.webp', desc: 'A role permission matrix for each project, with roles, assignments and requests.' }] },
  { label: 'Procurement', shots: [{ label: 'Vendors', file: 'vendors.webp', desc: 'Vendors with orders, purchase value and linked project.' }, { label: 'Vendor Profile', file: 'vendor-profile.webp', desc: 'One vendor with contacts, orders, supply mix, performance and purchase history.' }, { label: 'Inventory', file: 'inventory.webp', desc: 'Stock value by category, stock status and movement, and every item across locations.' }] },
  { label: 'Office Use', shots: [{ label: 'User Management', file: 'users.webp', desc: 'Users, departments, roles and activity, with a detail panel for each user.' }] }
];

export const HERO_PILLARS = [
        { k: 'LENDERS', v: 'Exposure to asset' },
        { k: 'DEVELOPERS', v: 'Project to portfolio' },
        { k: 'EPC', v: 'Estimate to billing' },
        { k: 'SUPPLIERS', v: 'RFQ to payment' }
      ];

export const ECOSYSTEM = [
        { n: '01', label: 'Lenders', desc: 'Banks, NBFCs and funds financing capacity.', c: BLUE },
        { n: '02', label: 'Developers', desc: 'IPPs and owners originating projects.', c: TEAL },
        { n: '03', label: 'EPC', desc: 'Contractors building and commissioning.', c: DEEP },
        { n: '04', label: 'Suppliers', desc: 'Manufacturers supplying materials.', c: GREEN },
        { n: '05', label: 'Investors', desc: 'Capital holding long-term portfolios.', c: BLUE },
        { n: '06', label: 'Asset owners', desc: 'Operators accountable for performance.', c: GREEN }
      ];

export const FRAGMENTS = ['Documents in folders', 'Spreadsheet trackers', 'Finance systems', 'Project systems', 'Procurement systems', 'Vendor systems'];

export const RESOLVED = [
        { label: 'One record per project', desc: 'Financing, execution and supply reference the same object.' },
        { label: 'One version of a number', desc: 'Committed, drawn and billed values reconcile by construction.' },
        { label: 'One place evidence lives', desc: 'Approvals and certificates sit against the milestone they release.' },
        { label: 'One view of the portfolio', desc: 'Roll-ups are derived, never assembled by hand.' }
      ];

export const LAYERS = [
        { n: 'L1', label: 'CRM', desc: 'Accounts, opportunities and relationships across the value chain.', c: BLUE, bg: '#fff', indent: '0px' },
        { n: 'L2', label: 'Finance', desc: 'Facilities, disbursements, billing and receivables.', c: TEAL, bg: '#fff', indent: '14px' },
        { n: 'L3', label: 'Projects', desc: 'Schedules, milestones and site execution.', c: GREEN, bg: '#fff', indent: '28px' },
        { n: 'L4', label: 'Procurement', desc: 'Requirements, RFQs, vendors and purchase orders.', c: DEEP, bg: '#fff', indent: '42px' },
        { n: 'L5', label: 'Assets', desc: 'Commissioned plant, warranties and O&M obligations.', c: GREEN, bg: '#fff', indent: '28px' },
        { n: 'L6', label: 'Portfolio', desc: 'Roll-ups by owner, lender, technology and geography.', c: BLUE, bg: '#fff', indent: '14px' },
        { n: 'L7', label: 'Intelligence', desc: 'Signals, risk indicators and forecasts on the live record.', c: TEAL, bg: '#F6FBF7', indent: '0px' }
      ];

export const SIGNAL_FEED = [
        { t: 'Exposure traced to milestone evidence', v: '100%', c: GREEN },
        { t: 'Schedule deviations flagged this week', v: '6', c: '#B4622F' },
        { t: 'Covenant headroom below 1.25x', v: '1 facility', c: '#B4622F' },
        { t: 'Reporting packs generated, not assembled', v: '14', c: BLUE }
      ];

export const INTEL = [
        { n: '01', t: 'Exposure that ties to an asset', s: 'Every rupee of exposure traces to a project, a milestone and a piece of evidence.' },
        { n: '02', t: 'Deviation before consequence', s: 'Schedule slip, thinning cover and performance drift surface as signals, not quarterly surprises.' },
        { n: '03', t: 'Cohorts that explain themselves', s: 'Compare vintages, technologies and geographies with the underlying detail attached.' },
        { n: '04', t: 'Reporting as a by-product', s: 'Lender, board and investor packs are generated from the operating record.' }
      ];

export const CHART = [
        { label: 'Pipeline', v: '₹186 Cr', h: '38%', c: '#DEEAF6', d: '0s' },
        { label: 'Appraisal', v: '₹392 Cr', h: '58%', c: '#BFD9EF', d: '.06s' },
        { label: 'Sanction', v: '₹1,450 Cr', h: '92%', c: BLUE, d: '.12s' },
        { label: 'Drawdown', v: '₹1,120 Cr', h: '76%', c: TEAL, d: '.18s' },
        { label: 'Building', v: '₹864 Cr', h: '64%', c: '#2E8B7C', d: '.24s' },
        { label: 'Handover', v: '₹642 Cr', h: '52%', c: GREEN, d: '.3s' },
        { label: 'Operating', v: '₹1,204 Cr', h: '80%', c: LIME, d: '.36s' },
        { label: 'Repaying', v: '₹468 Cr', h: '44%', c: '#C6E3CF', d: '.42s' }
      ];

export const DEMO_POINTS = [
        { t: 'A tailored walkthrough', d: 'Built around your role in the ecosystem, not a generic tour.' },
        { t: 'Your workflow, your data', d: 'See how your real workflow maps to the SESOVA architecture.' },
        { t: 'Expert guidance', d: 'Deployment, integration and rollout discussed with a specialist.' }
      ];

export const ORG_TYPES = ['Lender / Bank / NBFC', 'Developer / IPP', 'EPC', 'Supplier', 'Enterprise', 'Other'];

export const FOOTER = [
        { title: 'SOLUTIONS', links: [{ label: 'Financing', href: '/#solutions' }, { label: 'Developers', href: '/#solutions' }, { label: 'EPC', href: '/#solutions' }, { label: 'Suppliers', href: '/#solutions' }] },
        { title: 'PRODUCT', links: [{ label: 'Product experience', href: '/#product' }, { label: 'Portfolio intelligence', href: '/#product' }] },
        { title: 'COMPANY', links: [{ label: 'The ecosystem', href: '/#ecosystem' }, { label: 'Contact', href: '/#demo' }, { label: 'Request a demo', href: '/#demo', modal: true }] }
      ];

export const SOLUTIONS = [
        { kicker: 'FINANCING', label: 'Lenders and financiers', desc: 'Underwrite against the live project record and hold exposure, covenants and repayment in one place.', c: BLUE, href: '/#solutions', plate: '#EEF4FA', img: 'assets/product/invoices.webp', pos: '62% 22%', alt: 'Invoices and receivables screen', flow: ['Borrower', 'KYC', 'Appraisal', 'Sanction', 'Disbursement', 'Repayment', 'Risk', 'Portfolio'] },
        { kicker: 'DEVELOPERS', label: 'Developers and IPPs', desc: 'Carry a project from origination through funding, construction and operations without leaving the record.', c: TEAL, href: '/#solutions', plate: '#EAF3F4', img: 'assets/product/projects.webp', pos: '60% 12%', alt: 'All projects screen', flow: ['Projects', 'Funding', 'EPC', 'Procurement', 'Assets', 'Operations', 'Portfolio'] },
        { kicker: 'EPC', label: 'EPC companies', desc: 'Turn estimates into bills of material, procurement and progress billing measured against the plan.', c: DEEP, href: '/#solutions', plate: '#E8EEF0', img: 'assets/product/project-reports.webp', pos: '55% 72%', alt: 'Project billing and procurement report', flow: ['Lead', 'Project', 'Estimation', 'BOM', 'Procurement', 'Vendor', 'Billing'] },
        { kicker: 'SUPPLIERS', label: 'Material suppliers', desc: 'Respond to live demand from developers and EPCs, then track delivery, billing and payment in the same system.', c: GREEN, href: '/#solutions', plate: '#EDF5EF', img: 'assets/product/vendors.webp', pos: '70% 30%', alt: 'Vendor management screen', flow: ['RFQ', 'Quotation', 'Purchase Order', 'Materials', 'Delivery', 'Bills', 'Payments'] }

    ];

export const PF_FOUNDATION = [
        { kicker: 'SECURITY & ACCESS', title: 'Controlled by role', c: BLUE, items: ['Role-based access by entity and layer', 'Single sign-on', 'Full audit trail on every record', 'Party-level data separation'] },
        { kicker: 'DEPLOYMENT', title: 'Where your data must live', c: TEAL, items: ['SeSova cloud', 'Private cloud', 'On-premise for institutional lenders', 'Data residency options'] },
        { kicker: 'INTEGRATIONS', title: 'Connected to what you run', c: GREEN, items: ['ERP and accounting systems', 'Core banking and loan origination', 'SCADA and generation data', 'Open API access'] }
      ];
