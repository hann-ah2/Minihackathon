import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useDemo } from "./store-5hcFn97k.mjs";
import { n as donationCategories, r as formatDonationContribution, t as DonationPledgeForm } from "./DonationPledgeForm-DXxDIV3m.mjs";
import { b as CircleCheck, c as Search, d as Package, g as Gift, h as HeartHandshake } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/donate-BQxZsuOg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DonationHub() {
	const { donations, reports } = useDemo();
	const [category, setCategory] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [success, setSuccess] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => donations.filter((d) => (category === "all" || d.category === category) && `${d.item_name} ${d.donor_name} ${d.notes}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.created_at.localeCompare(a.created_at)), [
		donations,
		category,
		search
	]);
	const openNeeds = reports.filter((r) => r.status !== "resolved");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "standard-page donation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "donation-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "COMMUNITY DONATION HUB"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Give what you can.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Change what happens next." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Communities recover faster when resources reach the people who need them. Browse requests and pledge supplies or volunteer time." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "donation-metrics",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, { size: 17 }),
							donations.filter((d) => d.status === "available").length,
							" available offers"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 17 }),
							openNeeds.length,
							" open help requests"
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "donation-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "donation-form-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "donation-card-intro",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { size: 24 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "MAKE A CONTRIBUTION"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Offer a donation" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This records fictional pledges only; no payment is collected." })
							] })]
						}),
						success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "donation-success",
							role: "status",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 19 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Offer saved! Reference ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: success.id }),
									". It is now listed below."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSuccess(null),
									"aria-label": "Dismiss confirmation",
									children: "×"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationPledgeForm, { onSuccess: setSuccess })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "donation-catalog",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "donation-catalog-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "COMMUNITY SUPPORT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Available donations" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Fictional offers shared by the community." })
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "donation-filters",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "search-field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Search donations",
									placeholder: "Search offers",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Donation category",
								value: category,
								onChange: (e) => setCategory(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All categories"
								}), donationCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "donation-offer-list",
							children: [filtered.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "donation-offer-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "offer-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 21 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "offer-body",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "offer-top",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `offer-status ${d.status}`,
												children: d.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: d.item_name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											formatDonationContribution(d),
											" pledged · ",
											d.donor_name || "Anonymous contributor"
										] }),
										d.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: d.notes })
									]
								})]
							}, d.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "empty-state",
								children: "No donation offers match your search."
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "needs-preview",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "WHERE HELP IS NEEDED"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Current community needs" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These are fictional requests. Offering an item does not automatically match or deliver it." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "needs-preview-list",
					children: openNeeds.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `preview-dot ${r.priority}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							r.assistance_needed,
							" · ",
							r.location_name
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.priority })
					] }, r.id))
				})]
			})
		]
	});
}
//#endregion
export { DonationHub as component };
