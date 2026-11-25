/* GenCorpus content: sources and the deal map. Law stated as at 26 November 2026. */
var GC = window.GC = window.GC || {};

GC.src = {
  indiacode: {n: "India Code (all central Acts)", u: "https://www.indiacode.nic.in/"},
  mca: {n: "Ministry of Corporate Affairs", u: "https://www.mca.gov.in/"},
  sebi: {n: "SEBI regulations", u: "https://www.sebi.gov.in/legal/regulations"},
  sebicirc: {n: "SEBI circulars", u: "https://www.sebi.gov.in/legal/circulars"},
  rbi: {n: "RBI master directions", u: "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx"},
  rbinot: {n: "RBI notifications", u: "https://www.rbi.org.in/Scripts/NotificationUser.aspx"},
  dpiit: {n: "DPIIT FDI policy and press notes", u: "https://dpiit.gov.in/"},
  cci: {n: "Competition Commission of India", u: "https://www.cci.gov.in/"},
  nclt: {n: "NCLT", u: "https://nclt.gov.in/"},
  ibbi: {n: "IBBI (insolvency)", u: "https://ibbi.gov.in/"},
  it: {n: "Income Tax Department (Income-tax Act, 2025)", u: "https://www.incometaxindia.gov.in/"},
  gazette: {n: "e-Gazette of India", u: "https://egazette.gov.in/"},
  ifsca: {n: "IFSCA (GIFT City)", u: "https://www.ifsca.gov.in/"},
  nse: {n: "NSE listing compliance", u: "https://www.nseindia.com/companies-listing/corporate-filings-announcements"},
  bse: {n: "BSE corporate filings", u: "https://www.bseindia.com/corporates/ann.html"},
  firms: {n: "RBI FIRMS portal (FDI reporting)", u: "https://firms.rbi.org.in/"},
  meity: {n: "MeitY (DPDP Act)", u: "https://www.meity.gov.in/"},
  icai: {n: "ICAI (Ind AS)", u: "https://www.icai.org/"}
};

GC.seats = [
  {id: "t", n: "Trainee and first year", s: "Accuracy, speed, and knowing where everything is"},
  {id: "a", n: "Associate", s: "Owning a workstream end to end"},
  {id: "s", n: "Senior and principal associate", s: "Running the deal day to day"},
  {id: "p", n: "Counsel and partner", s: "Judgement, the client, and the risk call"}
];

GC.map = [
{
 id: "mandate", k: "Mandate", t: "Mandate, conflicts and engagement",
 sum: "Before any work, the firm checks it can act, agrees scope and fees, and learns what the client actually wants from the deal.",
 what: [
  "Conflict check against every party, their group and any known bidder. A conflict found late can cost the mandate and the relationship.",
  "Engagement letter: scope (which jurisdictions, which workstreams), assumptions, fee basis (fixed, capped or hourly), and what is excluded, such as tax or valuation.",
  "Kick-off call: deal rationale, timetable the client is promising its board, deal-breakers, and who signs off on what.",
  "Team staffing and a working group list with roles, emails and time zones."
 ],
 docs: ["Engagement letter", "Working group list", "Indicative timetable", "Conflict clearance note"],
 law: [
  ["Bar Council of India Rules, Part VI, Chapter II (standards of professional conduct, including duties to clients and Rule 36 on advertising)", "indiacode"],
  ["Advocates Act, 1961", "indiacode"],
  ["SEBI (Prohibition of Insider Trading) Regulations, 2015, for listed targets: you become an insider the moment you hold UPSI", "sebi"]
 ],
 check: ["Conflict search run on all parties and group entities", "Engagement letter signed and scope written down", "Working group list circulated", "Insider list or confidentiality undertaking in place if a listed company is involved", "Timetable sent to client with assumptions"],
 seat: {
  t: "Build the working group list, open the matter folder structure, and keep the first version of the timetable. Learn who every person on the list is.",
  a: "Draft the engagement letter scope from the kick-off notes. Flag what has been left out, such as tax structuring or a foreign law opinion.",
  s: "Turn the client's goals into workstreams and a realistic timetable. Spot the regulatory long poles on day one.",
  p: "Win and price the mandate, clear conflicts that need judgement, and set expectations with the client's GC on time and cost."
 },
 trap: "Fee estimates that assume a clean data room and one round of markups. Write the assumptions down."
},
{
 id: "structure", k: "Structure", t: "Structuring the deal",
 sum: "Choosing how the deal is done: buy shares or the business, issue new shares or buy existing ones, merge by scheme or acquire. The structure decides the approvals, the tax and the timeline.",
 what: [
  "Share acquisition versus business transfer (slump sale or itemised asset sale) versus merger or demerger under a court-approved scheme.",
  "Primary (new money into the company) versus secondary (money to selling shareholders), and the instrument: equity, CCPS, CCDs.",
  "Regulatory map: FDI sector caps and routes, land-border investor rules, CCI notifiability, SEBI takeover code if listed, sectoral regulators (RBI for NBFCs, IRDAI, TRAI and so on).",
  "Tax: capital gains on the seller, withholding by the buyer, stamp duty, and whether a scheme is tax-neutral. Tax is usually advised by a separate team, so coordinate early.",
  "Holding structure: direct, through an Indian holding company, or from an offshore vehicle. Treaty and GAAR questions sit here."
 ],
 docs: ["Structure paper with options compared", "Step plan", "Regulatory approvals matrix", "Tax memo (usually from tax advisers)"],
 law: [
  ["Companies Act, 2013: ss. 42 and 62 (issue of shares), 56 and 58 (transfer), 230 to 234 (schemes and mergers), 186 (loans and investments)", "indiacode"],
  ["FEMA, 1999 and the FEM (Non-debt Instruments) Rules, 2019, as amended in 2026. The draft FEM (Foreign Investment) Rules, 2026 are not yet notified", "rbi"],
  ["Consolidated FDI Policy and Press Notes, including Press Note 2 of 2026 on land-border investment", "dpiit"],
  ["Competition Act, 2002: ss. 5 and 6", "cci"],
  ["Income-tax Act, 2025 (in force from 1 April 2026, replacing the 1961 Act). Check new section numbers before citing", "it"]
 ],
 check: ["Options compared on approvals, tax, time and cost", "Sector cap and entry route confirmed for any foreign investor", "Land-border beneficial ownership checked", "CCI threshold test done", "Listed-company triggers checked (takeover code, LODR disclosures)", "Stamp duty estimated by state"],
 seat: {
  t: "Pull the sector entry in the FDI policy, the target's shareholding pattern and its charter documents. Build the approvals matrix template.",
  a: "Write the regulatory section of the structure paper with every approval, who files it, and how long it takes.",
  s: "Compare structures for the client in one table they can take to their board. Coordinate tax and foreign counsel.",
  p: "Recommend the structure and own the risk call where the law is unsettled."
 },
 trap: "Structuring around tax alone and discovering a sectoral approval adds four months."
},
{
 id: "termsheet", k: "Term sheet", t: "NDA, term sheet and exclusivity",
 sum: "The parties agree confidentiality, then the commercial heads of terms. Most of the term sheet is non-binding, but confidentiality, exclusivity, costs and governing law usually bind.",
 what: [
  "NDA: definition of confidential information, permitted recipients (advisers, financiers), non-solicit of employees, standstill for listed targets, return or destruction.",
  "Term sheet: price and price mechanism, instrument, CPs, key reps, indemnity caps, board and veto rights, transfer restrictions, exit.",
  "Exclusivity: a period where the seller cannot talk to others. Watch the length and what counts as a breach.",
  "Binding and non-binding split stated clearly, so that a court does not treat the whole document as a contract."
 ],
 docs: ["NDA or confidentiality agreement", "Term sheet or LOI", "Exclusivity letter", "Process letter in auctions"],
 law: [
  ["Indian Contract Act, 1872: s. 10 (what makes a contract), s. 27 (restraint of trade, which affects non-competes)", "indiacode"],
  ["SEBI PIT Regulations, 2015: regs. 3(3) and 3(4) on sharing UPSI for transactions, with a confidentiality agreement and board approval", "sebi"]
 ],
 check: ["NDA covers advisers and financiers", "Binding clauses listed by number", "Exclusivity period and carve-outs agreed", "Every commercial point that will be fought over later is at least mentioned"],
 seat: {
  t: "Run the NDA against the firm's standard and produce a short issues list.",
  a: "Draft the term sheet from the client's points and keep a list of what is still open.",
  s: "Push for clarity on the terms that drive the long form: price mechanism, CPs, indemnity and veto rights.",
  p: "Negotiate the headline terms principal to principal, and decide what to leave for the long form."
 },
 trap: "A vague term sheet saves a week now and costs a month in the SPA."
},
{
 id: "dd", k: "Diligence", t: "Legal due diligence",
 sum: "Reviewing the target's documents to find what affects value, the structure, or the drafting. A good DD report is a list of decisions for the client, not a summary of documents.",
 what: [
  "Request list sent, virtual data room opened, Q&A log run alongside.",
  "Review areas: corporate records and capital history, material contracts and change of control clauses, licences, real estate, employment, litigation, IP, data protection, indebtedness and security, compliance and anti-corruption, related party dealings.",
  "Red flag report first, then a full report if the client wants one. Each issue gets a severity and a fix: price, CP, specific indemnity, covenant, or walk.",
  "Findings feed straight into the SPA: disclosure letter, specific indemnities, CPs and pre-closing covenants."
 ],
 docs: ["Request list", "Q&A tracker", "Red flag report", "Full DD report", "Issues to SPA mapping"],
 law: [
  ["Companies Act, 2013: share capital history (ss. 23, 42, 62), registers (s. 88), charges (s. 77), related party transactions (s. 188)", "indiacode"],
  ["FEMA reporting history of past foreign investment on the FIRMS portal", "firms"],
  ["Digital Personal Data Protection Act, 2023, for personal data in the data room and the target's own compliance", "meity"],
  ["Prevention of Corruption Act, 1988 and the Prevention of Money-laundering Act, 2002, for compliance review", "indiacode"]
 ],
 check: ["Request list tailored to the sector", "Every allotment traced to a board resolution, shareholder approval and filing", "Change of control and consent clauses listed by contract", "Litigation checked against court and tribunal records, not just the target's list", "Each red flag has a recommended fix", "Personal data in the data room minimised"],
 seat: {
  t: "Review a defined set of documents, log every issue in the tracker with the document reference, and never skip a page because it looks routine.",
  a: "Own a chapter. Turn findings into severity-rated issues with fixes, and chase the target for missing documents through Q&A.",
  s: "Edit the red flag report so the client can act on it in ten minutes. Map issues to SPA protections.",
  p: "Tell the client what the issues mean for price and whether to proceed."
 },
 trap: "Reporting that a document was not provided, without saying what risk that leaves."
},
{
 id: "docs", k: "Documents", t: "Transaction documents",
 sum: "Drafting and negotiating the long form documents. The SPA or SSA moves the shares, the SHA governs life afterwards, and ancillary documents carry everything else.",
 what: [
  "Buyer usually holds the pen on the SPA. Investor usually holds the pen on the SSA and SHA.",
  "Markups go back and forth with an issues list. Calls resolve the points that matter, and the rest are traded.",
  "Disclosure letter qualifies the warranties. Its quality decides how much the warranties are worth.",
  "Ancillaries: amended articles, escrow agreement, transitional services, IP assignment, employment and non-compete agreements, legal opinions.",
  "Version control and a clear document list are part of the job, not admin."
 ],
 docs: ["SPA or SSA", "SHA", "Restated articles of association", "Disclosure letter", "Escrow agreement", "Issues list", "Document list"],
 law: [
  ["Indian Contract Act, 1872: ss. 73 and 74 (damages and liquidated damages), s. 124 (indemnity), s. 27 (restraint of trade)", "indiacode"],
  ["Specific Relief Act, 1963 as amended in 2018 (specific performance as the general rule)", "indiacode"],
  ["Companies Act, 2013: s. 58 (transfer restrictions in public companies), s. 6 (Act overrides the articles), s. 14 (alteration of articles)", "indiacode"],
  ["FEM (NDI) Rules, 2019: pricing guidelines (Rule 21) and optionality for exit rights", "rbi"],
  ["Arbitration and Conciliation Act, 1996: seat, interim relief (s. 9), enforcement of foreign awards (Part II)", "indiacode"]
 ],
 check: ["Every DD issue mapped to a clause", "Investor rights carried into the articles, not only the SHA", "Exit rights tested against FEMA pricing", "Non-compete tested against s. 27", "Definitions checked against each other", "Document list and version numbers current"],
 seat: {
  t: "Run comparisons, conform definitions, and keep the document list. Proofread schedules, which is where deals break.",
  a: "Draft ancillaries and first cuts of the main documents. Prepare the issues list after each markup.",
  s: "Hold the pen on the main agreement, run the negotiation calls, and decide which points to concede.",
  p: "Settle the commercial points with the other side's partner and the client."
 },
 trap: "Rights agreed in the SHA but never written into the articles, which binds only the parties, not the company."
},
{
 id: "cps", k: "Approvals", t: "Regulatory approvals and conditions precedent",
 sum: "Everything that must happen between signing and closing. The CP tracker is the most-read document on any deal.",
 what: [
  "Regulatory CPs: CCI approval, government approval for restricted FDI or land-border investors, sectoral regulators, SEBI observations on schemes.",
  "Corporate CPs: board and shareholder resolutions, increase in authorised capital, adoption of new articles, waivers of pre-emption and tag rights.",
  "Third-party CPs: lender and landlord consents, change of control waivers.",
  "Business CPs: no material adverse change, key employees signed, specific DD fixes completed.",
  "Long-stop date: if CPs are not met by then, either party may terminate."
 ],
 docs: ["CP tracker", "CP satisfaction certificate", "Regulatory filings (CCI Form I or II, FDI approval application)", "Board and shareholder resolutions"],
 law: [
  ["Competition Act, 2002: s. 6(2A) (no consummation before approval or 150 days), Combination Regulations, 2024", "cci"],
  ["FEM (NDI) Rules, 2019: Rule 6(a) proviso and Press Note 2 of 2026 for land-border investment", "dpiit"],
  ["SEBI LODR Regulations, 2015: reg. 37 (schemes need a stock exchange observation letter)", "sebi"],
  ["Companies Act, 2013: s. 61 (alteration of capital), s. 64 (SH-7 filing), s. 117 (MGT-14 filing)", "indiacode"]
 ],
 check: ["Each CP has an owner, evidence of satisfaction and a target date", "Regulatory filings drafted early", "Gun-jumping risk understood: no integration or control before approval", "Long-stop date tested against realistic approval times", "Waivable and non-waivable CPs identified"],
 seat: {
  t: "Update the CP tracker daily, collect evidence for each CP, and prepare draft resolutions.",
  a: "Own groups of CPs, draft regulatory filings, and chase third-party consents.",
  s: "Manage the critical path. Escalate CPs that threaten the long-stop date.",
  p: "Deal with regulators at the senior level and advise on waiving CPs."
 },
 trap: "Buyer starts integration planning that looks like control before CCI approval. That is gun-jumping."
},
{
 id: "sign", k: "Signing", t: "Signing",
 sum: "Execution of the documents. Signing binds the parties, while closing actually transfers ownership. In a simultaneous deal both happen together.",
 what: [
  "Signing checklist: final versions, authorised signatories with board resolutions, stamp duty paid on the right instrument before or at execution.",
  "Execution formalities: wet ink or electronic, counterparts, signature pages held in escrow until release.",
  "Listed company disclosures under LODR and, if triggered, the public announcement under the takeover code.",
  "Press release and internal communication timed with any stock exchange disclosure."
 ],
 docs: ["Signing checklist", "Execution versions", "Board resolutions authorising signatories", "Stamp paper or e-stamp certificates", "Stock exchange disclosure"],
 law: [
  ["Indian Stamp Act, 1899 and state stamp Acts (stamp duty is state-specific and an unstamped instrument has evidentiary problems)", "indiacode"],
  ["Information Technology Act, 2000: s. 5 (electronic signatures), with the exclusions in its First Schedule", "indiacode"],
  ["SEBI LODR, reg. 30 and Schedule III (disclosure of material events)", "sebi"],
  ["SEBI SAST Regulations, 2011: reg. 13 (timing of the public announcement)", "sebi"]
 ],
 check: ["Execution versions frozen and compared", "Signatory authority evidenced", "Stamp duty computed and paid in the right state", "Disclosure drafted and timed", "Signature pages collected and held"],
 seat: {
  t: "Build the signing checklist, collect signature pages, and run the final compare.",
  a: "Confirm authority documents and stamp duty. Prepare execution versions.",
  s: "Run the signing call. Make sure nothing changes in the final hours without the client knowing.",
  p: "Confirm the client is ready to be bound."
 },
 trap: "Signing an agreement stamped in the wrong state, or under-stamped."
},
{
 id: "close", k: "Closing", t: "Closing",
 sum: "The day ownership changes. Every closing action happens in an agreed order, and money moves only when everything else is ready.",
 what: [
  "Closing agenda: each action, who does it, in what order, and what evidence proves it.",
  "Typical order: CP satisfaction confirmed, buyer pays (or funds released from escrow), seller delivers share transfer (demat instruction or physical transfer forms), board meeting records the transfer or allotment, resignations and appointments, new articles take effect.",
  "Closing memorandum records what happened and when.",
  "Bring-down of warranties: warranties repeated at closing, with any new disclosures."
 ],
 docs: ["Closing agenda", "Closing memorandum", "Board resolutions at closing", "Share transfer instructions or SH-4", "Resignation and appointment letters", "Funds flow memo"],
 law: [
  ["Companies Act, 2013: s. 56 (transfer of shares), s. 39(4) and Rule 12 (return of allotment, PAS-3, within 15 days)", "indiacode"],
  ["Companies (Prospectus and Allotment of Securities) Rules, 2014: Rule 9A (dematerialisation for unlisted public companies), Rule 9B for certain private companies", "mca"],
  ["FEM (Mode of Payment and Reporting of Non-Debt Instruments) Regulations, 2019", "rbi"]
 ],
 check: ["Funds flow memo agreed with bank details verified by phone", "Closing agenda circulated the day before", "Depository participant instructions ready", "Board meeting scheduled with quorum", "Closing deliverables collected"],
 seat: {
  t: "Prepare the closing agenda and collect every deliverable. Tick each step as it happens.",
  a: "Draft closing board resolutions and the closing memorandum. Coordinate with the depository participant and bank.",
  s: "Run the closing call in order and refuse to skip steps.",
  p: "Confirm release of funds with the client."
 },
 trap: "Bank details changed by email on closing day. Always verify by phone with a known contact."
},
{
 id: "post", k: "Post-closing", t: "Post-closing",
 sum: "Filings, reporting and housekeeping. Most deadlines run from closing and some carry late submission fees or compounding.",
 what: [
  "Corporate filings: PAS-3 for allotments, MGT-14 for special resolutions, DIR-12 for director changes, SH-7 for capital changes, updated registers.",
  "FEMA reporting on the FIRMS portal: FC-GPR for issue of shares to a foreign investor, FC-TRS for transfers between residents and non-residents.",
  "Listed companies: takeover code disclosures and continual disclosures.",
  "Purchase price adjustments: completion accounts or locked box leakage claims.",
  "Bible: a complete indexed set of the final executed documents."
 ],
 docs: ["Post-closing filing tracker", "FC-GPR or FC-TRS", "Closing bible", "Completion accounts"],
 law: [
  ["Companies Act, 2013: s. 39(4) PAS-3 (15 days), s. 117 MGT-14 (30 days), s. 170 DIR-12 (30 days), s. 64 SH-7 (30 days)", "indiacode"],
  ["FEM (Mode of Payment and Reporting) Regulations, 2019: FC-GPR within 30 days of issue, FC-TRS within 60 days of transfer or receipt of funds, whichever is earlier", "firms"],
  ["SEBI SAST Regulations, 2011: reg. 29 disclosures within 2 working days", "sebi"]
 ],
 check: ["Filing tracker with statutory deadline and owner for each filing", "FEMA reporting done and acknowledged", "Registers updated", "Bible indexed and sent", "Price adjustment timetable diarised"],
 seat: {
  t: "Prepare forms and the bible. Keep the deadline tracker.",
  a: "Check every filing against the resolution and the documents before it goes in.",
  s: "Make sure nothing lapses. Manage price adjustment and warranty claim timelines.",
  p: "Close out the matter with the client and keep the relationship warm."
 },
 trap: "FC-TRS deadlines missed because the transfer was between two foreign parties and someone assumed no reporting was needed. Check the rule for each leg."
},
{
 id: "after", k: "After the deal", t: "Life after the deal: claims, governance and exits",
 sum: "Warranty and indemnity claims, investor rights in board meetings, and exits through IPO, strategic sale, put options or buy-backs.",
 what: [
  "Claims: notice requirements, time limits, caps and baskets in the SPA decide whether a claim survives.",
  "Investor governance: reserved matters, information rights, nominee directors and their duties under s. 166.",
  "Exits: IPO (ICDR lock-in and promoter rules), drag-along sale, put option (FEMA pricing applies), buy-back (s. 68 limits).",
  "Disputes: arbitration under the SHA, emergency arbitrator relief, s. 9 interim relief in Indian courts, enforcement of foreign awards."
 ],
 docs: ["Claim notice", "Board packs and reserved matter consents", "Exit notices", "Arbitration notice"],
 law: [
  ["Companies Act, 2013: s. 166 (directors' duties), s. 68 (buy-back), s. 241 (oppression and mismanagement)", "indiacode"],
  ["SEBI ICDR Regulations, 2018: lock-in and offer for sale rules", "sebi"],
  ["Arbitration and Conciliation Act, 1996", "indiacode"],
  ["Limitation Act, 1963", "indiacode"]
 ],
 check: ["Claim notice periods diarised from closing", "Reserved matter list kept by the company secretary", "Exit mechanics tested against current FEMA and SEBI rules before triggering"],
 seat: {
  t: "Maintain the reserved matters tracker and draft consent letters.",
  a: "Draft claim notices and exit notices that comply exactly with the notice clause.",
  s: "Advise on whether a claim is in time and within the caps.",
  p: "Run the dispute strategy or the exit negotiation."
 },
 trap: "A claim notice sent by email when the notice clause requires courier to a named address."
}
];
