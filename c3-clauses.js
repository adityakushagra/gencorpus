/* GenCorpus content: clause lab. Sample wording written for teaching. It is not a precedent and must not be used in a real transaction. */
var GC = window.GC = window.GC || {};

/* Segment format: plain string, or [side+op, text] where side is a or b and op is + (insert) or - (delete). */
GC.clauses = [
{
 id: "cp", n: "Conditions precedent", g: "SPA", a: "Buyer", b: "Seller",
 why: "Lists what must happen before the buyer has to close. Every CP is a way for one side to walk away, so each one is negotiated.",
 text: ["The obligation of the Buyer to complete the Acquisition is conditional on the satisfaction of the conditions set out in Schedule 3 ", ["a+", "to the satisfaction of the Buyer, acting reasonably, "], ["b+", "(or their waiver by the Buyer) "], "on or before the Long Stop Date. The Seller shall use ", ["a-", "reasonable"], ["a+", "all"], ["b-", "reasonable"], ["b+", "commercially reasonable"], " endeavours to ensure the satisfaction of the conditions ", ["b+", "within its control "], "as soon as practicable. ", ["a+", "The Buyer may waive any condition in whole or in part by written notice."], ["b+", " The conditions relating to CCI approval may not be waived."]],
 points: ["Who decides a CP is satisfied: objective test, or one party's discretion", "Effort standard: reasonable, all reasonable, or best endeavours", "Which CPs each party may waive", "Regulatory CPs that cannot legally be waived (closing without CCI approval breaches s. 6(2A))", "Hell or high water: must the buyer accept remedies the regulator asks for?"],
 law: [["Indian Contract Act, 1872: ss. 31 and 32 (contingent contracts)", "indiacode"], ["Competition Act, 2002: s. 6(2A)", "cci"]],
 trap: "A CP to the buyer's 'satisfaction' with no reasonableness standard is close to a free option."
},
{
 id: "longstop", n: "Long-stop date and termination", g: "SPA", a: "Buyer", b: "Seller",
 why: "The date after which either side can walk if CPs are not met. Too short and regulatory delay kills the deal. Too long and the seller's business is frozen.",
 text: ["If the Conditions are not satisfied or waived on or before ", ["a-", "the date falling 90 days after the date of this Agreement"], ["a+", "the date falling 180 days after the date of this Agreement"], ["b+", " (which may be extended once by 30 days at the Seller's option if only regulatory Conditions remain outstanding)"], ", either Party may terminate this Agreement by notice to the other", ["b+", ", provided that a Party whose breach caused the failure of the Condition may not terminate"], ". Termination shall not affect accrued rights", ["a+", " or the Seller's obligation to pay the Break Fee"], "."],
 points: ["Length measured against realistic CCI and government approval times", "Automatic extension if only regulatory CPs remain", "Reverse break fee if the buyer fails to obtain its approvals", "Which clauses survive termination"],
 law: [["Indian Contract Act, 1872: s. 74 (break fees are tested as liquidated damages or penalty)", "indiacode"]],
 trap: "A 90-day long-stop on a deal needing government approval for a land-border investor."
},
{
 id: "mac", n: "Material adverse change", g: "SPA", a: "Buyer", b: "Seller",
 why: "Lets the buyer walk if something seriously bad happens to the target between signing and closing. In practice it is hard to rely on, so the carve-outs matter more.",
 text: ["\"Material Adverse Change\" means any event ", ["a+", "or circumstance "], "which has, or would reasonably be expected to have, a material adverse effect on the business, ", ["a+", "prospects, "], "assets or financial condition of the Company", ["b+", ", taken as a whole, and which results in a reduction in EBITDA of more than 20% compared with the Business Plan"], ", other than any event arising from ", ["b+", "changes in general economic, market or political conditions, changes in law or accounting standards, pandemics, war, acts of God, "], "matters Disclosed", ["a+", " to the extent fairly disclosed"], "."],
 points: ["'Prospects' widens the buyer's walk right a lot", "Quantitative trigger (revenue or EBITDA drop) versus qualitative test", "General carve-outs and whether they apply if the target is hit harder than its peers", "Whether MAC is a CP, a warranty repeated at closing, or both"],
 law: [["Indian Contract Act, 1872: s. 56 (frustration) sits in the background but is narrow", "indiacode"]],
 trap: "Relying on a MAC clause for an industry-wide downturn the carve-outs exclude."
},
{
 id: "warr", n: "Warranties and disclosure", g: "SPA", a: "Buyer", b: "Seller",
 why: "Statements of fact about the target. If untrue, the buyer claims damages. The disclosure letter qualifies them, so fair disclosure is the real fight.",
 text: ["The Seller warrants to the Buyer that each of the Warranties is true and accurate ", ["a+", "and not misleading "], "at the date of this Agreement ", ["a+", "and will be true and accurate at Completion by reference to the facts then existing"], ". The Warranties are qualified by matters fairly disclosed in the Disclosure Letter ", ["a+", "with sufficient detail to enable the Buyer to assess their nature and scope"], ["b+", " and by any matter contained in the Data Room"], ".", ["b+", " The Seller gives the Warranties marked as knowledge warranties only so far as it is aware, having made due enquiry of the Key Managers."]],
 points: ["General disclosure of the whole data room versus specific disclosure", "Repetition at closing and whether new matters can be disclosed", "Knowledge qualifiers and whose knowledge counts", "Fundamental warranties (title, capacity, capital) with higher caps"],
 law: [["Indian Contract Act, 1872: ss. 73 and 124", "indiacode"]],
 trap: "Agreeing to general disclosure of a data room the buyer never fully reviewed."
},
{
 id: "indem", n: "Indemnity, caps, baskets and time limits", g: "SPA", a: "Buyer", b: "Seller",
 why: "Indian deals usually frame warranty breaches as indemnity claims, rupee for rupee. The limitation schedule decides how much any claim is worth.",
 text: ["The Seller shall indemnify the Buyer ", ["a+", "and the Company "], "against all Losses arising from any breach of the Warranties. The Seller shall not be liable for any claim unless ", ["b-", "the amount of all claims exceeds Rs 50,00,000"], ["b+", "the amount of all claims exceeds 1% of the Purchase Price, in which case the Seller is liable only for the excess"], ". The aggregate liability of the Seller shall not exceed ", ["a-", "20%"], ["b-", "20%"], ["a+", "100%"], ["b+", "10%"], " of the Purchase Price, save for claims under the Fundamental Warranties", ["a+", " or arising from fraud"], ". No claim may be brought unless notified within ", ["a-", "24 months"], ["b-", "24 months"], ["a+", "36 months"], ["b+", "12 months"], " of Completion."],
 points: ["De minimis per claim, basket threshold, tipping basket versus deductible", "Cap on general warranties versus fundamental warranties and tax", "Time limits, and longer periods for tax claims", "Whether 'Losses' includes indirect and consequential loss and diminution in value", "Indemnity to the company as well as the buyer, and grossing up"],
 law: [["Indian Contract Act, 1872: s. 124 (indemnity), s. 73 (remoteness)", "indiacode"], ["Limitation Act, 1963", "indiacode"]],
 trap: "Indemnity payments by the company to a foreign shareholder can raise FEMA questions. Structure through the seller."
},
{
 id: "spind", n: "Specific indemnity", g: "SPA", a: "Buyer", b: "Seller",
 why: "Covers a known problem found in diligence, usually outside the general caps and baskets, because the buyer already knows it exists.",
 text: ["The Seller shall indemnify the Buyer against all Losses arising from the tax demand described in paragraph 4 of the Disclosure Letter", ["a+", ", whether or not Disclosed and irrespective of any limitation in Schedule 6"], ["b+", ", up to a maximum of the amount of that demand plus interest, and only to the extent finally determined to be payable"], ".", ["b+", " The Seller shall have conduct of the proceedings."]],
 points: ["Excluded from caps and disclosure, or not", "Conduct of the dispute, and who controls settlement", "Escrow or holdback sized to the exposure", "When the claim is 'finally determined'"],
 law: [["Indian Contract Act, 1872: s. 124", "indiacode"]],
 trap: "A specific indemnity with no escrow, against a seller who distributes the price."
},
{
 id: "price", n: "Price mechanism: locked box or completion accounts", g: "SPA", a: "Buyer", b: "Seller",
 why: "Locked box fixes the price on historical accounts and protects against leakage. Completion accounts adjust the price after closing to actual cash, debt and working capital.",
 text: ["The Purchase Price is ", ["a-", "Rs 500 crore"], ["b-", "Rs 500 crore"], ["a+", "Rs 500 crore, adjusted on a cash-free debt-free basis by reference to the Completion Accounts"], ["b+", "Rs 500 crore, being a fixed price by reference to the Locked Box Accounts, with no adjustment save for Leakage"], ".", ["b+", " The Seller shall pay to the Buyer an amount equal to any Leakage, other than Permitted Leakage, notified within 6 months of Completion."]],
 points: ["Definition of leakage and permitted leakage (salaries, ordinary course payments)", "Locked box date and interest on the price to closing", "Working capital target and how it was set", "Expert determination for completion accounts disputes"],
 law: [["FEM (NDI) Rules, 2019: deferred consideration for non-residents (up to 25% within 18 months) and pricing at each payment", "rbi"]],
 trap: "Completion accounts adjustment that pushes the price for a foreign buyer below fair value."
},
{
 id: "escrow", n: "Escrow and holdback", g: "SPA", a: "Buyer", b: "Seller",
 why: "Part of the price is held back to secure claims. For foreign parties, FEMA limits how much and how long.",
 text: ["At Completion, the Buyer shall deposit ", ["a-", "10%"], ["b-", "10%"], ["a+", "15%"], ["b+", "5%"], " of the Purchase Price with the Escrow Agent, to be released to the Seller ", ["a-", "12 months"], ["a+", "18 months"], " after Completion less the amount of any claims notified by the Buyer before that date", ["b+", ", provided such claims are supported by reasonable detail and commenced within 60 days"], "."],
 points: ["Size and duration against FEMA limits for non-resident deals", "Release mechanics and joint instructions", "Interest on escrowed funds", "Escrow as the buyer's sole recourse or just security"],
 law: [["FEM (NDI) Rules, 2019 and Master Direction on Foreign Investment: escrow up to 25% of total consideration for up to 18 months", "rbi"]],
 trap: "Escrow longer than 18 months on a resident to non-resident sale."
},
{
 id: "conduct", n: "Conduct of business before closing", g: "SPA", a: "Buyer", b: "Seller",
 why: "Freezes the target in its ordinary course between signing and closing. Must not hand the buyer control before CCI approval.",
 text: ["Until Completion, the Seller shall procure that the Company carries on its business in the ordinary course ", ["a+", "consistent with past practice "], "and does not, without the Buyer's prior written consent", ["b+", " (not to be unreasonably withheld or delayed, and deemed given if no response within 5 Business Days)"], ", incur capital expenditure above ", ["a-", "Rs 5 crore"], ["b-", "Rs 5 crore"], ["a+", "Rs 1 crore"], ["b+", "Rs 10 crore"], ", enter into any material contract, or issue any shares."],
 points: ["Consent standard and deemed consent", "Thresholds tied to the budget", "Gun-jumping: covenants so tight that the buyer controls the business before CCI approval", "Information flows only through a clean team for competitors"],
 law: [["Competition Act, 2002: s. 6(2A) and CCI's approach to gun-jumping penalties under s. 43A", "cci"]],
 trap: "Buyer's approval of routine hiring, which looks like control before approval."
},
{
 id: "noncompete", n: "Non-compete and non-solicit", g: "SPA and SHA", a: "Buyer", b: "Seller",
 why: "Protects the goodwill the buyer paid for. In India, s. 27 voids restraints of trade, except a seller of goodwill who agrees within reasonable limits.",
 text: ["For ", ["a-", "3 years"], ["b-", "3 years"], ["a+", "5 years"], ["b+", "2 years"], " after Completion, the Seller shall not, ", ["a+", "directly or indirectly, "], "carry on ", ["b+", "in India "], "any business that competes with the Business ", ["a+", "anywhere in the world"], ", or solicit any Key Employee.", ["b+", " Holding up to 2% of a listed company is not a breach."]],
 points: ["Duration and geography tied to the goodwill sold", "Separate consideration for the non-compete (also a tax question)", "Employees and founders who are not selling goodwill: post-employment restraints are generally void", "Non-solicit is more enforceable than non-compete"],
 law: [["Indian Contract Act, 1872: s. 27 and its exception for sale of goodwill", "indiacode"], ["Competition Act, 2002: CCI guidance on non-competes ancillary to combinations", "cci"]],
 trap: "A 5-year worldwide non-compete on an employee founder with no goodwill sold."
},
{
 id: "antidil", n: "Anti-dilution", g: "SHA", a: "Investor", b: "Founder",
 why: "Adjusts the investor's conversion price if a later round is priced lower. Use the calculator in Tools to see it in rupees.",
 text: ["If the Company issues New Securities at a price per share lower than the Conversion Price, the Conversion Price shall be adjusted ", ["a-", "on a broad-based weighted average basis"], ["b-", "on a broad-based weighted average basis"], ["a+", "to that lower price (full ratchet)"], ["b+", "on a broad-based weighted average basis, counting all shares, options and the ESOP pool as outstanding"], ", ", ["a+", "and the Founders shall transfer shares to the Investor to give effect to the adjustment if conversion is not possible"], ["b+", "provided that no adjustment applies to issues under the ESOP or approved by the Investor"], ". Any adjustment is subject to Applicable Law, including pricing guidelines under FEMA."],
 points: ["Full ratchet versus broad or narrow-based weighted average", "Who is counted in 'A' (outstanding shares)", "Carve-outs: ESOP, strategic issues, investor-approved rounds", "FEMA floor: conversion price for a non-resident cannot drop below fair value at issue under current rules"],
 law: [["FEM (NDI) Rules, 2019: Rule 21 and its Explanation", "rbi"], ["Companies Act, 2013: s. 62 (further issue)", "indiacode"]],
 trap: "Founder share transfers to make good anti-dilution can trigger pricing and tax problems."
},
{
 id: "preempt", n: "Pre-emption rights", g: "SHA", a: "Investor", b: "Founder",
 why: "Lets existing shareholders keep their percentage when new shares are issued.",
 text: ["If the Company proposes to issue New Securities, it shall first offer them to the Shareholders pro rata to their shareholding", ["a+", " on a fully diluted basis, with a right to take up any securities not subscribed by others"], ["b+", ", excluding issues under the ESOP, on conversion, or in an IPO"], ". The offer shall remain open for ", ["a-", "21 days"], ["b-", "21 days"], ["a+", "30 days"], ["b+", "15 days"], "."],
 points: ["Pro rata on a fully diluted basis", "Over-allotment of unsubscribed shares", "Carve-outs", "Interaction with s. 62(1)(a) rights issue and s. 62(1)(c) preferential issue"],
 law: [["Companies Act, 2013: s. 62", "indiacode"]],
 trap: "Pre-emption in the SHA but not in the articles, so the company can ignore it."
},
{
 id: "rofr", n: "Right of first refusal and first offer", g: "SHA", a: "Investor", b: "Founder",
 why: "Controls who can become a shareholder. ROFR matches a third party's offer. ROFO lets the holder make the first offer before the seller goes to market.",
 text: ["Subject to the Lock-in, if a Founder proposes to transfer any Shares, the Investor shall have a right of ", ["a-", "first offer"], ["a+", "first refusal"], " exercisable within ", ["a-", "30 days"], ["b-", "30 days"], ["a+", "45 days"], ["b+", "21 days"], " of the Transfer Notice.", ["b+", " If the Investor does not exercise, the Founder may transfer to any third party at a price not lower than the price offered to the Investor within 90 days."]],
 points: ["ROFR chills third-party buyers, ROFO does not", "Timelines", "Exempt transfers to affiliates and family trusts", "Enforceability in public companies under s. 58(2)"],
 law: [["Companies Act, 2013: s. 58(2) proviso (contracts between shareholders on transfer are enforceable)", "indiacode"]],
 trap: "A ROFR that applies to transfers to the investor's own affiliates."
},
{
 id: "tag", n: "Tag-along", g: "SHA", a: "Investor", b: "Founder",
 why: "If the founder sells, the investor can sell alongside on the same terms.",
 text: ["If a Founder proposes to transfer Shares", ["a+", " of any number"], ["b+", " resulting in a change of Control"], ", the Investor may require the purchaser to acquire ", ["b-", "all"], ["b+", "a pro rata proportion"], " of the Investor's Shares on the same terms", ["b+", ", provided the Investor gives the same warranties and indemnities as the Founder pro rata"], "."],
 points: ["Full tag versus pro rata tag", "Trigger: any sale or only change of control", "Warranties the investor must give (investors give title and capacity only)", "FEMA pricing for a non-resident tagging into a sale to a resident"],
 law: [["FEM (NDI) Rules, 2019: Rule 21", "rbi"]],
 trap: "Tag that requires the investor to give business warranties."
},
{
 id: "drag", n: "Drag-along", g: "SHA", a: "Investor", b: "Founder",
 why: "Lets a majority, or the investor after a deadline, force others to sell so a buyer can get 100%. The investor's main exit lever.",
 text: ["If no Qualified IPO has occurred by ", ["a-", "the seventh anniversary"], ["a+", "the fifth anniversary"], " of Completion, the Investor may require the Founders to sell all their Shares to a bona fide third-party purchaser", ["b+", " at a price not lower than the Fair Market Value determined by an independent valuer, and the Founders shall first have a right of first offer"], ".", ["a+", " The Founders shall give such warranties as the purchaser reasonably requires."]],
 points: ["Trigger date and conditions", "Price floor for dragged shareholders", "ROFO for founders before the drag", "Warranties and indemnities from dragged parties", "Enforceability against a company that is not a party"],
 law: [["Companies Act, 2013: s. 58(2) and s. 235 (acquiring minority on a 90% scheme)", "indiacode"]],
 trap: "Drag mechanics only in the SHA and not the articles, so the company will not register the transfer."
},
{
 id: "reserved", n: "Reserved matters and affirmative votes", g: "SHA", a: "Investor", b: "Founder",
 why: "Lists decisions that need the investor's consent. The longer the list, the closer the investor comes to joint control, which matters for CCI and the takeover code.",
 text: ["The Company shall not take any of the actions in Schedule 4 without the prior written consent of the Investor", ["a+", ", including approval of the annual business plan and budget, appointment or removal of key managerial personnel, and any capital expenditure exceeding Rs 2 crore"], ["b+", ", which shall be limited to amendments to the Articles adversely affecting the Investor, changes to the rights of its Shares, liquidation and related party transactions"], "."],
 points: ["Protective rights (the investor's economic interest) versus participative rights (running the business)", "Budget and business plan vetoes usually amount to control", "Board level versus shareholder level consent", "Deemed consent and timelines"],
 law: [["Competition Act, 2002: definition of control and the 'material influence' standard", "cci"], ["SEBI SAST Regulations: reg. 2(1)(e) definition of control", "sebi"]],
 trap: "Budget veto that makes the investor's acquisition a notifiable change of control."
},
{
 id: "board", n: "Board and nominee directors", g: "SHA", a: "Investor", b: "Founder",
 why: "Gives the investor a seat and sometimes a quorum right. Nominee directors still owe duties to the company under s. 166.",
 text: ["The Investor shall be entitled to nominate ", ["a-", "one Director"], ["a+", "two Directors"], " and one observer. No quorum of a Board meeting shall exist unless an Investor Director is present", ["b+", ", provided that if quorum fails for that reason, the adjourned meeting shall be quorate without the Investor Director"], ". The Investor Director shall not be liable for ", ["b-", "any non-compliance by the Company"], ["b+", "non-compliance of which they had no knowledge"], "."],
 points: ["Quorum rights and adjourned meetings", "Nominee director liability (s. 149(12) limits liability of non-executive directors)", "Observer rights and confidentiality", "D&O insurance"],
 law: [["Companies Act, 2013: ss. 149(12), 161(3) (nominee directors), 166, 174 (quorum)", "indiacode"]],
 trap: "Quorum right with no adjourned meeting mechanism, letting one investor block the board."
},
{
 id: "exit", n: "Exit: IPO, put option and buy-back", g: "SHA", a: "Investor", b: "Founder",
 why: "The investor needs a way out. A put option is the strongest right, but FEMA bars assured returns for foreign investors.",
 text: ["If a Qualified IPO has not occurred by the fifth anniversary of Completion, the Investor may require ", ["b-", "the Founders"], ["b+", "the Company, to the extent permitted by law,"], ["a+", " jointly and severally"], " to purchase the Investor's Shares at ", ["a-", "the Subscription Price plus an IRR of 18%"], ["b-", "the Subscription Price plus an IRR of 18%"], ["a+", "the higher of the Subscription Price and Fair Market Value"], ["b+", "Fair Market Value"], ", subject to Applicable Law."],
 points: ["Assured return (fixed IRR) is not allowed for non-residents", "Minimum lock-in of one year for optionality under FEMA", "Who buys: company (limited by s. 68) or founders (capacity to pay)", "Fallback if the put is not honoured: drag, step-up rights, damages"],
 law: [["FEM (NDI) Rules, 2019: optionality clauses permitted with a one-year lock-in and exit at fair value, without assured return", "rbi"], ["Companies Act, 2013: s. 68", "indiacode"]],
 trap: "An IRR-based put to a foreign investor that FEMA will not allow to be honoured."
},
{
 id: "liqpref", n: "Liquidation preference", g: "SHA", a: "Investor", b: "Founder",
 why: "Decides who gets paid first on a sale or winding up. Participating preference pays the investor twice.",
 text: ["On a Liquidation Event, the Investor shall receive, in priority to all other Shareholders, ", ["a-", "its Investment Amount"], ["b-", "its Investment Amount"], ["a+", "an amount equal to 1x its Investment Amount plus declared but unpaid dividends, and shall thereafter participate pro rata with other Shareholders in the remaining proceeds"], ["b+", "the higher of 1x its Investment Amount and its pro rata share of the proceeds on an as-converted basis (non-participating)"], "."],
 points: ["Multiple (1x is standard in India)", "Participating versus non-participating", "Definition of Liquidation Event (does a sale of assets count?)", "Enforceability in a winding up, where statute fixes the order"],
 law: [["Companies Act, 2013: s. 43 (preference capital), s. 55", "indiacode"], ["Insolvency and Bankruptcy Code, 2016: s. 53 (waterfall in liquidation)", "ibbi"]],
 trap: "Assuming the SHA waterfall applies in a statutory liquidation. It applies between shareholders, not against creditors."
},
{
 id: "info", n: "Information and inspection rights", g: "SHA", a: "Investor", b: "Founder",
 why: "The investor's right to see the numbers. In listed companies it collides with insider trading rules.",
 text: ["The Company shall provide the Investor with ", ["a-", "quarterly management accounts within 45 days of quarter end"], ["a+", "monthly management accounts within 15 days of month end"], ", annual audited accounts within 120 days of year end, and such other information as the Investor may ", ["a-", "reasonably "], "request", ["b+", " for its fund reporting obligations"], "."],
 points: ["Frequency and form", "Audit and inspection rights", "Sharing with the investor's own investors and lenders", "UPSI controls if the company lists"],
 law: [["SEBI PIT Regulations, 2015", "sebi"]],
 trap: "Information rights surviving an IPO that breach insider trading rules."
},
{
 id: "vesting", n: "Founder lock-in and reverse vesting", g: "SHA", a: "Investor", b: "Founder",
 why: "Keeps founders in the company. Reverse vesting means a founder who leaves early loses part of their shares.",
 text: ["The Founders shall not transfer any Shares until ", ["a-", "the fourth anniversary"], ["b-", "the fourth anniversary"], ["a+", "the earlier of a Qualified IPO and the fifth anniversary"], ["b+", "the third anniversary"], " of Completion. If a Founder ceases to be employed ", ["b+", "as a Bad Leaver "], "before the fourth anniversary, the unvested Shares shall be transferred to ", ["a-", "the Company's ESOP trust"], ["a+", "the Investor or its nominee"], " at ", ["a-", "fair market value"], ["b-", "fair market value"], ["a+", "face value"], ["b+", "the lower of cost and fair market value"], "."],
 points: ["Good leaver and bad leaver definitions", "Who receives the shares and at what price (FEMA and tax limits)", "Acceleration on change of control", "Interaction with s. 58 and any lock-in under ICDR on IPO"],
 law: [["Companies Act, 2013: s. 58", "indiacode"], ["FEM (NDI) Rules, 2019: Rule 21 if a non-resident is a party", "rbi"]],
 trap: "Compulsory transfer at face value to a foreign investor, below fair value."
},
{
 id: "law", n: "Governing law and dispute resolution", g: "SPA and SHA", a: "Buyer", b: "Seller",
 why: "Where disputes go and which law applies. Indian-seated arbitration gives access to Indian courts for interim relief. Foreign seats give neutrality but complicate enforcement against Indian assets.",
 text: ["This Agreement is governed by the laws of India. Any dispute shall be finally resolved by arbitration under the ", ["a-", "rules of the Mumbai Centre for International Arbitration, seated in Mumbai"], ["a+", "SIAC Rules, seated in Singapore"], ", by ", ["a-", "a sole arbitrator"], ["a+", "three arbitrators"], ". The Parties may seek interim relief from Indian courts under Section 9 of the Arbitration and Conciliation Act, 1996."],
 points: ["Seat versus venue", "Two Indian parties choosing a foreign seat (permitted after PASL Wind Solutions, 2021)", "Section 9 relief for foreign-seated arbitrations under the proviso to s. 2(2)", "Emergency arbitrator orders and their enforceability", "Number of arbitrators and appointment"],
 law: [["Arbitration and Conciliation Act, 1996: ss. 2(2), 9, 29A, Part II", "indiacode"]],
 trap: "Writing 'venue' when the parties meant 'seat'."
}
];
