import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { n as donationService } from "./store-5hcFn97k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DonationPledgeForm-DXxDIV3m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var donationCategories = [
	"Food & Water",
	"Shelter & Bedding",
	"Medical & Hygiene",
	"Clothing",
	"Transport",
	"Volunteer Time",
	"Other",
	"Cash / Bank Transfer"
];
function formatDonationContribution(offer) {
	return offer.category === "Cash / Bank Transfer" ? `${offer.unit} ${offer.quantity.toLocaleString(void 0, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}` : `${offer.quantity} ${offer.unit}`;
}
var field = "w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400";
var label = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-300";
var moneyCategory = "Cash / Bank Transfer";
var prompts = {
	"Food & Water": {
		question: "What food or water can you offer?",
		placeholder: "e.g. Drinking water, canned food",
		quantityLabel: "How many?",
		units: [
			"bottles",
			"cartons",
			"packs",
			"boxes",
			"kg"
		]
	},
	"Shelter & Bedding": {
		question: "What shelter supplies can you offer?",
		placeholder: "e.g. Blankets, tents, sleeping mats",
		quantityLabel: "How many?",
		units: [
			"pieces",
			"sets",
			"tents",
			"bags"
		]
	},
	"Medical & Hygiene": {
		question: "What supplies can you offer?",
		placeholder: "e.g. First-aid kits, sanitary products",
		quantityLabel: "How many?",
		units: [
			"kits",
			"packs",
			"boxes",
			"pieces"
		]
	},
	"Clothing": {
		question: "What clothing can you offer?",
		placeholder: "e.g. Adult jackets, children’s clothing",
		quantityLabel: "Number of bags or pieces",
		units: [
			"bags",
			"pieces",
			"boxes"
		]
	},
	"Transport": {
		question: "What transport can you provide?",
		placeholder: "e.g. 4x4 truck, van, pickup truck",
		quantityLabel: "Number of vehicles",
		units: ["vehicles"]
	},
	"Volunteer Time": {
		question: "What kind of volunteer help can you offer?",
		placeholder: "e.g. Packing supplies, helping with cleanup",
		quantityLabel: "Number of volunteers",
		units: ["volunteers"]
	},
	"Other": {
		question: "What can you offer?",
		placeholder: "Describe your contribution",
		quantityLabel: "How many?",
		units: [
			"items",
			"pieces",
			"sets",
			"boxes"
		]
	}
};
function DonationPledgeForm({ onSuccess }) {
	const [category, setCategory] = (0, import_react.useState)("Food & Water");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const isMoney = category === moneyCategory;
	const details = isMoney ? null : prompts[category];
	async function handleSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		setError("");
		setMessage("");
		setBusy(true);
		try {
			const amount = Number(data.get(isMoney ? "amount" : "quantity"));
			const currency = String(data.get("currency") || "MYR");
			const method = String(data.get("method") || "Bank Transfer");
			const enteredNotes = String(data.get("notes") || "").trim();
			const hours = String(data.get("hours") || "").trim();
			const notes = isMoney ? [`Preferred pledge method: ${method}. No payment processed.`, enteredNotes].filter(Boolean).join(" ") : category === "Volunteer Time" ? [`Available hours: ${hours}.`, enteredNotes].filter(Boolean).join(" ") : enteredNotes;
			const created = await donationService.createDonation({
				category,
				donor_name: String(data.get("donor") || ""),
				item_name: isMoney ? `Monetary pledge (${method})` : String(data.get("item") || ""),
				quantity: amount,
				unit: isMoney ? currency : String(data.get("unit") || "items"),
				location_name: "",
				notes
			});
			setMessage(`Demo pledge ${created.id} recorded. No payment has been made.`);
			form.reset();
			setCategory("Food & Water");
			onSuccess?.(created);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to record the donation pledge.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-4 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-slate-700 pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold text-white",
					children: "Community Resource Donation Pledge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-slate-400",
					children: "Offer useful supplies, time or a monetary pledge to support the community."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pledge-category",
				className: label,
				children: "1. Donation Category *"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "pledge-category",
				value: category,
				onChange: (e) => setCategory(e.target.value),
				className: field,
				children: donationCategories.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: name,
					children: name
				}, name))
			})] }),
			isMoney ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "pledge-amount",
						className: label,
						children: "2. Donation Amount *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "pledge-amount",
						name: "amount",
						type: "number",
						min: "1",
						max: "100000",
						step: "0.01",
						placeholder: "e.g. 50.00",
						required: true,
						className: field
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "pledge-currency",
						className: label,
						children: "Currency *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "pledge-currency",
						name: "currency",
						className: field,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "MYR",
								children: "MYR — Malaysian Ringgit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "USD",
								children: "USD — US Dollar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SGD",
								children: "SGD — Singapore Dollar"
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "pledge-method",
					className: label,
					children: "3. Preferred Contribution Method *"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					id: "pledge-method",
					name: "method",
					className: field,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Bank Transfer",
							children: "Bank Transfer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Cash",
							children: "Cash"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "E-Wallet",
							children: "E-Wallet"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200",
					children: "This records an intention to donate only. Do not enter bank account numbers, card details, transaction IDs or passwords. No payment is collected or transferred."
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: "pledge-item",
					className: label,
					children: [
						"2. ",
						details?.question,
						" *"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "pledge-item",
					name: "item",
					required: true,
					maxLength: 100,
					placeholder: details?.placeholder,
					className: field
				}, category)] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `grid gap-3 ${details?.units.length === 1 ? "grid-cols-1" : "grid-cols-2"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: "pledge-quantity",
						className: label,
						children: [
							"3. ",
							details?.quantityLabel,
							" *"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "pledge-quantity",
						name: "quantity",
						type: "number",
						min: "1",
						max: "100000",
						step: "1",
						required: true,
						defaultValue: "1",
						className: field
					}, category)] }), details && details.units.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "pledge-unit",
						className: label,
						children: "Measured In *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "pledge-unit",
						name: "unit",
						className: field,
						children: details.units.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: unit,
							children: unit
						}, unit))
					}, category)] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "hidden",
						name: "unit",
						value: details?.units[0] ?? "items"
					})]
				}),
				category === "Volunteer Time" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "pledge-hours",
					className: label,
					children: "4. Hours Available per Volunteer *"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "pledge-hours",
					name: "hours",
					type: "number",
					min: "1",
					max: "168",
					step: "1",
					required: true,
					defaultValue: "2",
					className: field
				})] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pledge-donor",
				className: label,
				children: "Donor / Organization Name (Optional)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "pledge-donor",
				name: "donor",
				maxLength: 70,
				placeholder: "Community Volunteer",
				className: field
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "pledge-notes",
				className: label,
				children: "Additional Details (Optional)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: "pledge-notes",
				name: "notes",
				rows: 3,
				maxLength: 400,
				placeholder: "Useful information about the pledge (no private contact or banking details)",
				className: field
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: busy,
				type: "submit",
				className: "w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-bold text-white hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-60",
				children: busy ? "Recording pledge…" : isMoney ? "Pledge Financial Support (Demo)" : "Register Community Aid Pledge (Demo)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-slate-400",
				children: "Demo only. No actual financial transaction, rescue dispatch or delivery is arranged."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-red-400",
				children: error
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "text-sm text-emerald-300",
				children: message
			})
		]
	});
}
//#endregion
export { donationCategories as n, formatDonationContribution as r, DonationPledgeForm as t };
