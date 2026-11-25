/* GenCorpus content: deal types. Times are indicative ranges seen in practice, not legal deadlines. */
var GC = window.GC = window.GC || {};

GC.deals = [
{
 id: "spa", n: "Share purchase", g: "M&A",
 sum: "A buyer acquires existing shares from the target's shareholders. The company stays the same and its contracts, licences and liabilities stay with it.",
 when: "The most common way to buy control of a private company. Clean when the target's history is clean.",
 flow: ["NDA and term sheet", "Due diligence", "SPA and disclosure letter", "CPs and approvals", "Closing: price paid, shares transferred", "Post-closing filings and claims"],
 time: "8 to 16 weeks if no CCI or government approval. Add 1 to 5 months when those are needed.",
 approvals: ["Transfer restrictions in the articles and any existing SHA (ROFR, tag-along, consents)", "CCI, if thresholds or the deal value threshold are met and no exemption applies", "Government route approval for restricted sectors or land-border investors", "FC-TRS reporting if a resident sells to a non-resident or the reverse", "Change of control consents under material contracts and loan agreements"],
 docs: ["SPA", "Disclosure letter", "Escrow agreement", "Amended articles", "Resignation and appointment letters", "W&I policy if used"],
 law: [["Companies Act, 2013: ss. 56 and 58", "indiacode"], ["FEM (NDI) Rules, 2019: Rule 21 pricing (non-resident buyer pays at least fair value, non-resident seller receives at most fair value)", "rbi"], ["Competition Act, 2002: ss. 5 and 6", "cci"], ["Indian Stamp Act, 1899: duty on share transfers", "indiacode"]],
 traps: ["Pricing a resident to non-resident transfer below fair value", "Ignoring a change of control clause in the biggest customer contract", "Warranty cap set before diligence is finished", "Tax withholding on the seller's gains not dealt with in the SPA"]
},
{
 id: "pe", n: "PE or VC primary investment", g: "PE and VC",
 sum: "An investor subscribes to new shares, usually compulsorily convertible preference shares (CCPS), and gets governance and exit rights under an SHA.",
 when: "Growth capital for a private company. The money goes to the company, not to the founders.",
 flow: ["Term sheet", "Diligence", "SSA and SHA", "Shareholder approvals, authorised capital and new articles", "Allotment at closing", "PAS-3 and FC-GPR"],
 time: "6 to 12 weeks for a typical round. Faster for follow-ons with existing investors.",
 approvals: ["Special resolution for preferential allotment (s. 62(1)(c)) and private placement process (s. 42, PAS-4 offer letter)", "Increase in authorised capital if needed (s. 61, SH-7)", "Adoption of new articles carrying the SHA rights", "Valuation report for pricing", "FDI sector cap and route check", "Waiver of pre-emption rights by existing investors"],
 docs: ["Term sheet", "SSA", "SHA", "Restated articles", "PAS-4 offer letter", "Valuation report", "Disclosure letter"],
 law: [["Companies Act, 2013: ss. 42, 55 (preference shares), 62(1)(c)", "indiacode"], ["Companies (Share Capital and Debentures) Rules, 2014: Rule 13 (preferential allotment)", "mca"], ["FEM (NDI) Rules, 2019: conversion formula fixed upfront, price at conversion not below fair value at issue", "rbi"], ["Draft FEM (Foreign Investment) Rules, 2026, which may change the conversion floor if notified", "rbi"]],
 traps: ["Anti-dilution protection that FEMA pricing will not allow for a foreign investor", "SHA rights not copied into the articles", "Money received before the offer letter and resolutions are in place", "Allotment more than 60 days after receipt of money (refund obligation under s. 42)"]
},
{
 id: "bta", n: "Business transfer or slump sale", g: "M&A",
 sum: "The buyer acquires a business undertaking, not shares. A slump sale moves the undertaking for a lump sum without values given to individual assets. An itemised sale prices each asset.",
 when: "When the buyer wants one division, or wants to leave historical liabilities behind.",
 flow: ["Identify the undertaking", "Diligence on assets, contracts, employees and licences", "BTA", "Consents, novations and licence transfers", "Closing: transfer of assets and employees", "Post-closing registrations"],
 time: "3 to 6 months, mostly driven by contract novations and licence transfers.",
 approvals: ["Shareholder special resolution for sale of an undertaking (s. 180(1)(a))", "Contract counterparties' consent to novation", "Fresh licences where they cannot be transferred", "Employee transfer on terms not less favourable, and their consent", "Lender consent and release of charges over transferred assets"],
 docs: ["Business transfer agreement", "Conveyance deeds for property", "Novation agreements", "Employee transfer letters", "Transitional services agreement"],
 law: [["Companies Act, 2013: s. 180(1)(a)", "indiacode"], ["Income-tax Act, 2025: slump sale provisions carried over from s. 50B of the 1961 Act (check the new section number)", "it"], ["GST exemption for transfer of a going concern (Notification 12/2017-Central Tax (Rate), entry for transfer of a going concern)", "gazette"], ["Industrial Relations Code, 2020 and labour codes on transfer of employees", "indiacode"], ["State stamp Acts on conveyance of immovable property", "indiacode"]],
 traps: ["Licences that cannot be assigned at all", "Stamp duty on immovable property making the deal uneconomic", "Employees treated as transferred without their consent"]
},
{
 id: "scheme", n: "Merger or demerger by scheme", g: "Restructuring",
 sum: "A court-supervised scheme under ss. 230 to 232 approved by shareholders, creditors and the NCLT. It binds dissenters once sanctioned.",
 when: "Group restructurings, amalgamations, demergers of a division into a separate company, and listed-company mergers.",
 flow: ["Scheme design and valuation", "Board approvals and valuation report", "Stock exchange and SEBI observations if listed", "NCLT first motion: meetings directed or dispensed", "Shareholder and creditor meetings", "Notice to regulators (RD, ROC, OL, Income Tax, and others)", "NCLT second motion: sanction", "Filing the order and effectiveness"],
 time: "6 to 12 months, sometimes longer depending on the bench and objections.",
 approvals: ["Majority in number representing three-fourths in value of each class of creditors and members present and voting", "SEBI observation letter through the stock exchange for listed companies (LODR reg. 37)", "Notices to the Central Government (Regional Director), ROC, Official Liquidator, Income Tax and sectoral regulators", "CCI if thresholds are met (some intra-group mergers are exempt)", "NCLT sanction"],
 docs: ["Scheme of arrangement", "Valuation report and fairness opinion", "Board resolutions", "First and second motion applications", "Explanatory statement", "Auditor's certificate on accounting treatment"],
 law: [["Companies Act, 2013: ss. 230 to 232", "indiacode"], ["Companies (Compromises, Arrangements and Amalgamations) Rules, 2016", "mca"], ["SEBI LODR, reg. 37 and the SEBI master circular on schemes", "sebicirc"], ["Income-tax Act, 2025: tax neutrality conditions for amalgamations and demergers", "it"]],
 traps: ["Appointed date and effective date confused", "Accounting treatment that the auditor will not certify", "Tax neutrality conditions missed for a demerger", "Objections from tax authorities delaying sanction"]
},
{
 id: "fasttrack", n: "Fast-track merger", g: "Restructuring",
 sum: "A merger under s. 233 approved by the Regional Director instead of the NCLT, available only for specified classes of companies.",
 when: "Small companies, holding and wholly owned subsidiaries, start-ups, and other classes MCA has added by amendment.",
 flow: ["Check eligibility under s. 233 and Rule 25", "Notice inviting objections to ROC and Official Liquidator", "Declaration of solvency", "Members' and creditors' approvals", "Filing with the Regional Director", "Confirmation order"],
 time: "3 to 5 months when no objections are raised.",
 approvals: ["Members holding at least 90% of the total number of shares", "Creditors representing nine-tenths in value", "Regional Director confirmation (the RD can refer the scheme to the NCLT)"],
 docs: ["Scheme", "Declaration of solvency (Form CAA.10)", "Notice of objections (CAA.9)", "Application to RD (CAA.11)"],
 law: [["Companies Act, 2013: s. 233", "indiacode"], ["Companies (CAA) Rules, 2016: Rule 25, as amended (classes expanded in 2024 and 2025, check the current list)", "mca"], ["Corporate Laws (Amendment) Bill, 2026 (introduced 23 March 2026) proposes cutting the shareholder approval for such mergers from 90% to 75%. Check whether it has been enacted", "indiacode"]],
 traps: ["Assuming eligibility without checking the latest Rule 25 classes", "90% member approval is by number of shares, which is hard to reach with scattered shareholders"]
},
{
 id: "listed", n: "Listed company acquisition", g: "Public M&A",
 sum: "Acquiring shares or control of a listed company. The takeover code requires an open offer to public shareholders when thresholds are crossed.",
 when: "Strategic or PE acquisitions of listed companies, promoter group consolidation.",
 flow: ["Confidentiality and insider controls", "Due diligence under PIT reg. 3", "Agreement and public announcement on the same day", "Detailed public statement within 5 working days", "Draft letter of offer to SEBI", "SEBI comments", "Tendering period", "Payment and post-offer disclosures"],
 time: "3 to 5 months for the open offer, longer if CCI or other approvals are needed.",
 approvals: ["Open offer for at least 26% of total shares (reg. 7) when acquiring 25% or more (reg. 3(1)), more than 5% in a financial year by a 25%+ holder (reg. 3(2)), or control (reg. 4)", "Offer price under reg. 8, the highest of several benchmarks. Since 2 January 2026, valuations under the code are done by an independent registered valuer", "Escrow for the offer consideration (reg. 17)", "CCI if applicable", "Minimum public shareholding of 25% after the deal (SCRR rule 19A)"],
 docs: ["Share purchase or subscription agreement", "Public announcement", "Detailed public statement", "Letter of offer", "Escrow agreement", "Board's reasoned recommendation from independent directors"],
 law: [["SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011", "sebi"], ["SEBI (Prohibition of Insider Trading) Regulations, 2015", "sebi"], ["SEBI LODR Regulations, 2015", "sebi"], ["Securities Contracts (Regulation) Rules, 1957: rule 19A", "indiacode"]],
 traps: ["Agreeing control rights in an SHA that trigger reg. 4 without meaning to", "Price paid in the SPA becomes the floor for the open offer", "Creeping acquisition limit counted gross, not net"]
},
{
 id: "jv", n: "Joint venture", g: "M&A",
 sum: "Two or more parties own and run a company together. Everything turns on the SHA: control, deadlock and exit.",
 when: "Foreign partner entering India, two businesses combining capabilities, sector caps that require an Indian partner.",
 flow: ["Term sheet on contributions and control", "Diligence on each other's contributed assets", "SHA, articles and ancillary agreements", "Approvals", "Incorporation or entry into an existing company", "Operations under reserved matters"],
 time: "3 to 6 months.",
 approvals: ["FDI route and sector cap", "CCI if a combination, and s. 3 review of the JV's scope", "Board and shareholder approvals of each party"],
 docs: ["JV agreement or SHA", "Articles", "Technology licence or brand licence", "Supply and services agreements", "Deadlock and exit schedule"],
 law: [["Companies Act, 2013", "indiacode"], ["Competition Act, 2002: s. 3 (anti-competitive agreements) and ss. 5 and 6", "cci"], ["FEM (NDI) Rules, 2019", "rbi"]],
 traps: ["Deadlock clause that ends in nothing", "Non-compete that is wider than the JV's business", "Brand licence that dies with the JV, leaving the business without a name"]
},
{
 id: "landborder", n: "Investment from a land-border country", g: "Foreign investment",
 sum: "Investment by an entity of a country sharing a land border with India, or where the beneficial owner is situated in or is a citizen of such a country, needs government approval.",
 when: "Investors with Chinese, Hong Kong-routed or other land-border beneficial ownership, including indirect holdings through funds.",
 flow: ["Beneficial ownership analysis", "Approval application on the National Single Window System", "Inter-ministerial consultation", "Approval with conditions", "Investment and reporting"],
 time: "Often 3 to 9 months for approval. Plan the long-stop date accordingly.",
 approvals: ["Government approval under the proviso to Rule 6(a) of the NDI Rules", "Approval also needed for a later transfer that brings in such beneficial ownership"],
 docs: ["Beneficial ownership declaration", "Approval application", "Conditional SSA or SPA with a long long-stop date"],
 law: [["FEM (NDI) Rules, 2019: Rule 6(a) proviso, as amended on 1 May 2026", "rbi"], ["Press Note 3 of 2020 and Press Note 2 of 2026", "dpiit"]],
 traps: ["Assuming a small minority stake is exempt without reading the current beneficial ownership test", "Funds with land-border limited partners", "Closing before approval and having to unwind"]
},
{
 id: "odi", n: "Outbound investment", g: "Foreign investment",
 sum: "An Indian company invests abroad by setting up or acquiring an overseas entity. Governed by the Overseas Investment framework of 2022.",
 when: "Indian groups acquiring foreign companies or setting up foreign subsidiaries.",
 flow: ["Structure and financial commitment check", "Valuation of the foreign target", "Board approval", "Remittance through the authorised dealer bank", "Reporting in Form ODI and annual performance reports"],
 time: "Weeks, unless prior RBI approval is needed.",
 approvals: ["Financial commitment within limits under the automatic route (generally up to 400% of net worth)", "Prohibited activities such as real estate business and gambling", "Restriction on structures with more than two layers of subsidiaries for round-tripping"],
 docs: ["Board resolution", "Valuation report", "Form ODI filings", "Annual performance report"],
 law: [["FEM (Overseas Investment) Rules, 2022 and Regulations, 2022", "rbi"], ["Master Direction on Overseas Investment", "rbi"]],
 traps: ["ODI that comes back into India as FDI in a structure the rules restrict", "Late reporting fees"]
},
{
 id: "ibc", n: "Acquisition under insolvency", g: "Distressed",
 sum: "Buying a company in CIRP through a resolution plan approved by the committee of creditors and the NCLT. The approved plan gives a clean slate for past offences.",
 when: "Distressed assets where the buyer wants protection from past liabilities.",
 flow: ["Expression of interest", "Eligibility check under s. 29A", "Access to the information memorandum and data room", "Resolution plan submission", "CoC evaluation and vote", "NCLT approval", "Implementation"],
 time: "CIRP has an outer limit of 330 days including litigation, though many run longer.",
 approvals: ["CoC approval by at least 66% of voting share (s. 30(4))", "NCLT approval (s. 31)", "CCI approval where needed, before CoC approval in many cases", "Sectoral approvals"],
 docs: ["Resolution plan", "Performance guarantee", "Eligibility affidavit under s. 29A", "Implementation monitoring arrangements"],
 law: [["Insolvency and Bankruptcy Code, 2016: ss. 29A, 30, 31 and 32A, as amended by the IBC (Amendment) Act, 2026 (two-stage approval under s. 31, withdrawal under s. 12A only with 90% CoC approval, in force from 26 May 2026)", "ibbi"], ["IBBI (Insolvency Resolution Process for Corporate Persons) Regulations, 2016", "ibbi"]],
 traps: ["A connected person making the bidder ineligible under s. 29A", "Plan conditions that the NCLT will not accept", "Assuming claims not in the plan survive (they do not, after the Supreme Court's ruling in Ghanashyam Mishra)"]
},
{
 id: "ipo", n: "IPO (company and selling shareholders)", g: "Capital markets",
 sum: "A private company lists by offering shares to the public. Transaction lawyers act for the company, selling shareholders or the book running lead managers.",
 when: "Growth companies raising capital, or investors exiting through an offer for sale.",
 flow: ["Eligibility and restructuring of the cap table", "Due diligence and DRHP drafting", "Filing DRHP with SEBI and stock exchanges", "SEBI observations", "RHP and roadshow", "Price band, bid and allotment", "Listing"],
 time: "6 to 12 months from kick-off to listing.",
 approvals: ["SEBI observations on the DRHP", "In-principle approval of stock exchanges", "Shareholder special resolution for the issue", "Conversion of all CCPS before filing the RHP, subject to exceptions"],
 docs: ["DRHP and RHP", "Legal due diligence report", "Offer agreement", "Underwriting agreement", "Legal opinions and 10b-5 letters for international tranches"],
 law: [["SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018", "sebi"], ["Companies Act, 2013: Part I of Chapter III (prospectus)", "indiacode"]],
 traps: ["Investor special rights in the articles that must fall away on listing", "Promoter definitions and lock-in surprises", "Disclosure gaps that come back as liability"]
},
{
 id: "buyback", n: "Buy-back", g: "Capital markets",
 sum: "A company purchases its own shares from shareholders, within limits on size and leverage.",
 when: "Returning cash, consolidating holdings, giving a partial exit.",
 flow: ["Check limits and free reserves", "Board or shareholder approval", "Letter of offer (listed) or offer to all shareholders (unlisted)", "Tender and acceptance", "Extinguishment of shares", "Return of buy-back filing"],
 time: "6 to 10 weeks.",
 approvals: ["Board approval up to 10% of paid-up capital and free reserves", "Special resolution up to 25%", "Debt to equity not more than 2:1 after buy-back", "No further buy-back for one year"],
 docs: ["Board and shareholder resolutions", "Declaration of solvency (SH-9)", "Letter of offer", "Return of buy-back (SH-11)"],
 law: [["Companies Act, 2013: ss. 68 to 70", "indiacode"], ["SEBI (Buy-back of Securities) Regulations, 2018 for listed companies, as amended in 2026 (stock exchange route reinstated, direct shareholder intimation, optional merchant banker)", "sebi"], ["Income-tax Act, 2025: since 1 October 2024 buy-back proceeds are taxed in the shareholders' hands as dividend", "it"]],
 traps: ["Using the buy-back for a selective exit, which the law does not allow", "Tax treatment assumed from before October 2024"]
},
{
 id: "delist", n: "Delisting", g: "Capital markets",
 sum: "Taking a listed company private. The acquirer must reach 90% shareholding through a reverse book building or, where eligible, a fixed price offer.",
 when: "Promoters or a parent consolidating full ownership.",
 flow: ["Initial public announcement", "Board and peer review by a company secretary", "Shareholder approval by special resolution (votes of public shareholders in favour at least twice those against)", "Stock exchange in-principle approval", "Bidding", "Acceptance or counter-offer", "Final delisting"],
 time: "3 to 6 months.",
 approvals: ["Special resolution with the public shareholder condition", "Stock exchange approval", "Success threshold of 90% post-offer holding"],
 docs: ["Initial public announcement", "Detailed public announcement", "Letter of offer"],
 law: [["SEBI (Delisting of Equity Shares) Regulations, 2021, as amended in 2024", "sebi"]],
 traps: ["Discovered price higher than the acquirer expected", "Failing the public shareholder voting condition"]
},
{
 id: "notes", n: "Convertible notes and startup instruments", g: "PE and VC",
 sum: "Early-stage funding through convertible notes, CCDs or CCPS, before a priced round.",
 when: "Seed and pre-seed rounds where valuation is deferred.",
 flow: ["Choose instrument", "Check startup eligibility", "Issue documents", "Board and shareholder approvals", "Conversion at the next round"],
 time: "2 to 4 weeks.",
 approvals: ["Convertible notes from non-residents only by DPIIT-recognised startups, at least Rs 25 lakh in a single tranche, convertible or repayable within 10 years", "Private placement rules for CCDs and CCPS", "Deposit rules for amounts that are not share capital"],
 docs: ["Note purchase agreement", "Side letter on conversion terms"],
 law: [["FEM (NDI) Rules, 2019: Rule 8 (convertible notes)", "rbi"], ["Companies (Acceptance of Deposits) Rules, 2014: exemption for convertible notes of startups", "mca"]],
 traps: ["Valuation cap and discount drafted so that conversion breaches pricing rules", "Treating an unrecognised company as a startup"]
}
];
