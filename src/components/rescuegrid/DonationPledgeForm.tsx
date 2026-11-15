import { useState, type FormEvent } from 'react';
import { donationService } from '@/services/donations';
import { donationCategories, type DonationCategory, type DonationOffer } from '@/models/donation';

type Props = { onSuccess?: (created: DonationOffer) => void };

const field = 'w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400';
const label = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-300';
const moneyCategory: DonationCategory = 'Cash / Bank Transfer';

type GoodsCategory = Exclude<DonationCategory, 'Cash / Bank Transfer'>;

const prompts: Record<GoodsCategory, { question: string; placeholder: string; quantityLabel: string; units: string[] }> = {
    'Food & Water': { question: 'What food or water can you offer?', placeholder: 'e.g. Drinking water, canned food', quantityLabel: 'How many?', units: ['bottles', 'cartons', 'packs', 'boxes', 'kg'] },
    'Shelter & Bedding': { question: 'What shelter supplies can you offer?', placeholder: 'e.g. Blankets, tents, sleeping mats', quantityLabel: 'How many?', units: ['pieces', 'sets', 'tents', 'bags'] },
    'Medical & Hygiene': { question: 'What supplies can you offer?', placeholder: 'e.g. First-aid kits, sanitary products', quantityLabel: 'How many?', units: ['kits', 'packs', 'boxes', 'pieces'] },
    'Clothing': { question: 'What clothing can you offer?', placeholder: 'e.g. Adult jackets, children’s clothing', quantityLabel: 'Number of bags or pieces', units: ['bags', 'pieces', 'boxes'] },
    'Transport': { question: 'What transport can you provide?', placeholder: 'e.g. 4x4 truck, van, pickup truck', quantityLabel: 'Number of vehicles', units: ['vehicles'] },
    'Volunteer Time': { question: 'What kind of volunteer help can you offer?', placeholder: 'e.g. Packing supplies, helping with cleanup', quantityLabel: 'Number of volunteers', units: ['volunteers'] },
    'Other': { question: 'What can you offer?', placeholder: 'Describe your contribution', quantityLabel: 'How many?', units: ['items', 'pieces', 'sets', 'boxes'] },
};

export function DonationPledgeForm({ onSuccess }: Props) {
    const [category, setCategory] = useState<DonationCategory>('Food & Water');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const isMoney = category === moneyCategory;
    const details = isMoney ? null : prompts[category as GoodsCategory];

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setError('');
        setMessage('');
        setBusy(true);
        try {
            const amount = Number(data.get(isMoney ? 'amount' : 'quantity'));
            const currency = String(data.get('currency') || 'MYR');
            const method = String(data.get('method') || 'Bank Transfer');
            const enteredNotes = String(data.get('notes') || '').trim();
            const hours = String(data.get('hours') || '').trim();
            const notes = isMoney
                ? [`Preferred pledge method: ${method}. No payment processed.`, enteredNotes].filter(Boolean).join(' ')
                : category === 'Volunteer Time'
                    ? [`Available hours: ${hours}.`, enteredNotes].filter(Boolean).join(' ')
                    : enteredNotes;

            const created = await donationService.createDonation({
                category,
                donor_name: String(data.get('donor') || ''),
                item_name: isMoney ? `Monetary pledge (${method})` : String(data.get('item') || ''),
                quantity: amount,
                unit: isMoney ? currency : String(data.get('unit') || 'items'),
                location_name: '', // Pickup/drop-off location is not collected in this version.
                notes,
            });
            setMessage(`Demo pledge ${created.id} recorded. No payment has been made.`);
            form.reset();
            setCategory('Food & Water');
            onSuccess?.(created);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to record the donation pledge.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div className="border-b border-slate-700 pb-3">
                <h2 className="text-base font-bold text-white">Community Resource Donation Pledge</h2>
                <p className="mt-1 text-xs text-slate-400">Offer useful supplies, time or a monetary pledge to support the community.</p>
            </div>

            <div>
                <label htmlFor="pledge-category" className={label}>1. Donation Category *</label>
                <select id="pledge-category" value={category} onChange={(e) => setCategory(e.target.value as DonationCategory)} className={field}>
                    {donationCategories.map((name) => <option value={name} key={name}>{name}</option>)}
                </select>
            </div>

            {isMoney ? (
                <>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label htmlFor="pledge-amount" className={label}>2. Donation Amount *</label>
                            <input id="pledge-amount" name="amount" type="number" min="1" max="100000" step="0.01" placeholder="e.g. 50.00" required className={field} />
                        </div>
                        <div>
                            <label htmlFor="pledge-currency" className={label}>Currency *</label>
                            <select id="pledge-currency" name="currency" className={field}>
                                <option value="MYR">MYR — Malaysian Ringgit</option>
                                <option value="USD">USD — US Dollar</option>
                                <option value="SGD">SGD — Singapore Dollar</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="pledge-method" className={label}>3. Preferred Contribution Method *</label>
                        <select id="pledge-method" name="method" className={field}>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                            <option value="E-Wallet">E-Wallet</option>
                        </select>
                    </div>
                    <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
                        This records an intention to donate only. Do not enter bank account numbers, card details, transaction IDs or passwords. No payment is collected or transferred.
                    </p>
                </>
            ) : (
                <>
                    <div>
                        <label htmlFor="pledge-item" className={label}>2. {details?.question} *</label>
                        <input key={category} id="pledge-item" name="item" required maxLength={100} placeholder={details?.placeholder} className={field} />
                    </div>
                    <div className={`grid gap-3 ${details?.units.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div>
                            <label htmlFor="pledge-quantity" className={label}>3. {details?.quantityLabel} *</label>
                            <input key={category} id="pledge-quantity" name="quantity" type="number" min="1" max="100000" step="1" required defaultValue="1" className={field} />
                        </div>
                        {details && details.units.length > 1 ? (
                            <div>
                                <label htmlFor="pledge-unit" className={label}>Measured In *</label>
                                <select key={category} id="pledge-unit" name="unit" className={field}>
                                    {details.units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                                </select>
                            </div>
                        ) : <input type="hidden" name="unit" value={details?.units[0] ?? 'items'} />}
                    </div>
                    {category === 'Volunteer Time' && (
                        <div>
                            <label htmlFor="pledge-hours" className={label}>4. Hours Available per Volunteer *</label>
                            <input id="pledge-hours" name="hours" type="number" min="1" max="168" step="1" required defaultValue="2" className={field} />
                        </div>
                    )}
                </>
            )}

            <div>
                <label htmlFor="pledge-donor" className={label}>Donor / Organization Name (Optional)</label>
                <input id="pledge-donor" name="donor" maxLength={70} placeholder="Community Volunteer" className={field} />
            </div>
            <div>
                <label htmlFor="pledge-notes" className={label}>Additional Details (Optional)</label>
                <textarea id="pledge-notes" name="notes" rows={3} maxLength={400} placeholder="Useful information about the pledge (no private contact or banking details)" className={field} />
            </div>
            <button disabled={busy} type="submit" className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-bold text-white hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-60">
                {busy ? 'Recording pledge…' : isMoney ? 'Pledge Financial Support (Demo)' : 'Register Community Aid Pledge (Demo)'}
            </button>
            <p className="text-xs text-slate-400">Demo only. No actual financial transaction, rescue dispatch or delivery is arranged.</p>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            {message && <p role="status" className="text-sm text-emerald-300">{message}</p>}
        </form>
    );
}
