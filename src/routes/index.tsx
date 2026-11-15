import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState, type FormEvent } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { MapView } from '@/components/rescuegrid/MapView';
import { useDemo } from '@/components/rescuegrid/store';
import { mockService } from '@/services/mock-data';
import { DonationPledgeForm } from '@/components/rescuegrid/DonationPledgeForm';
import { formatDonationContribution } from '@/models/donation';
import { priorityLabels, type Priority } from '@/models/rescue';

export const Route = createFileRoute('/')({
    head: () => ({ meta: [{ title: 'RESCUEGRID | Community Emergency & Aid' }] }),
    component: CommunityDashboard,
});

type FormMode = 'report' | 'donate';
type FeedMode = 'reports' | 'donations';
type Danger = 'yes' | 'no' | 'unsure';

const incidents = [
    { name: 'Trapped / Rescue', label: 'Trapped Persons', emoji: '🆘', help: 'Evacuation / Rescue' },
    { name: 'Medical Assistance', label: 'Medical Help', emoji: '🩺', help: 'Medical support' },
    { name: 'Flood', label: 'Flooding', emoji: '🌊', help: 'Evacuation / Rescue' },
    { name: 'Landslide', label: 'Landslide', emoji: '⛰️', help: 'Recovery / Cleanup' },
    { name: 'Power Outage', label: 'Power Outage', emoji: '⚡', help: 'Essential supplies' },
    { name: 'Shelter', label: 'Shelter Needs', emoji: '⛺', help: 'Temporary shelter' },
];
const resources = [
    'Evacuation / Rescue', 'Medical support', 'Food / Drinking water',
    'Temporary shelter', 'Essential supplies', 'Recovery / Cleanup', 'Other assistance',
];
const priorities: Priority[] = ['P1', 'P2', 'P3', 'P4'];
const colors: Record<Priority, string> = { P1: 'bg-red-500', P2: 'bg-orange-500', P3: 'bg-yellow-400', P4: 'bg-green-500' };
const field = 'w-full rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400';
const label = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-300';

function CommunityDashboard() {
    const { reports, donations, loading } = useDemo();
    const [formMode, setFormMode] = useState<FormMode>('report');
    const [feedMode, setFeedMode] = useState<FeedMode>('reports');
    const [category, setCategory] = useState('Trapped / Rescue');
    const [assistance, setAssistance] = useState('Evacuation / Rescue');
    const [danger, setDanger] = useState<Danger>('unsure');
    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const filtered = useMemo(() => reports
        .filter(r => priorityFilter === 'all' || r.priority === priorityFilter)
        .sort((a, b) => a.priority.localeCompare(b.priority) || b.created_at.localeCompare(a.created_at)),
        [reports, priorityFilter]);
    const selectedReport = reports.find(r => r.id === selectedId);

    async function submitReport(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(''); setMessage('');
        if (!coords) { setError('Click the real map to select the report location first.'); return; }
        const form = e.currentTarget;
        setBusy(true);
        try {
            // The existing demo data model requires these values. Derive them from
            // the selected category, required assistance, danger level and map pin.
            const created = await mockService.createReport({
                title: `${category} - ${assistance}`,
                category,
                description: `Assistance requested: ${assistance}. Immediate danger: ${danger}.`,
                location_name: `Pinned on map (${coords[0].toFixed(5)}, ${coords[1].toFixed(5)})`,
                latitude: coords[0],
                longitude: coords[1],
                affected_people: 1, // Temporary demo placeholder required by the existing data model.
                immediate_danger: danger,
                assistance_needed: assistance,
            });
            setMessage(`Demo report ${created.id} saved. It is now shown on the real map.`);
            setPriorityFilter('all'); setFeedMode('reports'); setSelectedId(created.id);
            form.reset(); setCoords(null); setDanger('unsure');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not save this report.');
        } finally { setBusy(false); }
    }


    return (
        <main className="rescue-dashboard mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 p-4 lg:grid-cols-12 lg:p-6">
            {/* LEFT: same two-tab form panel as the reference */}
            <section className="flex min-w-0 flex-col gap-4 lg:col-span-5">
                <div className="overflow-hidden rounded-xl border border-[#334155] bg-[#1e293b] shadow-xl">
                    <div className="grid grid-cols-2 gap-1.5 border-b border-[#334155] bg-[#0f172a] p-1.5">
                        <button type="button" onClick={() => { setFormMode('report'); setError(''); setMessage(''); }}
                            className={`rounded-lg px-2 py-3 text-xs font-bold sm:text-sm ${formMode === 'report' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}>
                            🆘 Report Emergency
                        </button>
                        <button type="button" onClick={() => { setFormMode('donate'); setError(''); setMessage(''); }}
                            className={`rounded-lg px-2 py-3 text-xs font-bold sm:text-sm ${formMode === 'donate' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                            ♡ Pledge Aid (Donor)
                        </button>
                    </div>
                    {formMode === 'report' ? (
                        <form onSubmit={submitReport} className="space-y-4 p-5">
                            <div className="border-b border-slate-700 pb-3">
                                <h2 className="text-base font-bold text-white">Emergency SOS & Resource Request</h2>
                                <p className="mt-1 text-xs text-slate-400">Report a fictional emergency and select its position on the map.</p>
                            </div>
                            <div>
                                <label className={label}>1. Select Disaster Type *</label>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {incidents.map(item => <button key={item.name} type="button" onClick={() => { setCategory(item.name); setAssistance(item.help); }}
                                        className={`flex h-17 flex-col justify-between rounded-lg p-2.5 text-left text-xs ${category === item.name ? 'border-2 border-red-500 bg-red-500/20 text-white' : 'border border-[#334155] bg-[#0f172a] text-slate-300 hover:border-slate-500'}`}>
                                        <span className="text-lg">{item.emoji}</span><strong>{item.label}</strong>
                                    </button>)}
                                </div>
                            </div>
                            <div><label htmlFor="rescue-resource" className={label}>2. Emergency Resource Needed *</label>
                                <select id="rescue-resource" value={assistance} onChange={e => setAssistance(e.target.value)} className={field}>
                                    {resources.map(x => <option key={x}>{x}</option>)}
                                </select>
                            </div>
                            <fieldset><legend className={label}>3. Is Anyone in Immediate Danger? *</legend>
                                <div className="grid grid-cols-3 gap-2">
                                    {([['yes', 'Yes · Critical'], ['unsure', 'Unsure'], ['no', 'No']] as const).map(([value, text]) =>
                                        <button type="button" key={value} onClick={() => setDanger(value)}
                                            className={`rounded-lg border px-1 py-2.5 text-xs font-bold ${danger === value ? 'border-red-500 bg-red-500/20 text-white' : 'border-[#334155] bg-[#0f172a] text-slate-400'}`}>{text}</button>)}
                                </div>
                                <p className="mt-1.5 text-[11px] text-slate-400">Urgency is provisional; professional triage is not performed.</p>
                            </fieldset>
                            <div className="rounded-lg border border-[#334155] bg-[#0f172a] p-3">
                                <p className={label}>4. Pin Your Location on the Map *</p>
                                <p className="text-xs text-sky-400">Click anywhere on the real map to place your location pin. You can click again to move it.</p>
                                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                    <div className="rounded border border-slate-700 bg-[#1e293b] p-2">Latitude <strong className="block font-mono text-sky-300">{coords ? coords[0].toFixed(5) : 'Not selected'}</strong></div>
                                    <div className="rounded border border-slate-700 bg-[#1e293b] p-2">Longitude <strong className="block font-mono text-sky-300">{coords ? coords[1].toFixed(5) : 'Not selected'}</strong></div>
                                </div>
                            </div>
                            <button disabled={busy} type="submit" className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 font-bold text-white hover:from-red-500 hover:to-red-400 disabled:opacity-60">
                                {busy ? 'Saving…' : 'Submit Emergency SOS (Demo)'}
                            </button>
                            <p className="text-xs text-slate-400">Not a live dispatch service. For actual emergencies in Malaysia, call 999.</p>
                            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                            {message && <p role="status" className="text-sm text-emerald-300">{message}</p>}
                        </form>
                    ) : (
                        <DonationPledgeForm onSuccess={() => { setFeedMode('donations'); setError(''); setMessage(''); }} />
                    )}
                </div>
                <div className="rounded-xl border border-[#334155] bg-[#1e293b]/80 p-4 text-xs text-slate-300">
                    <strong className="mb-1 block uppercase tracking-wider text-sky-400">Community Support Network</strong>
                    Request assistance or pledge useful supplies. All data shown here is fictional.
                </div>
            </section>

            {/* RIGHT: existing Leaflet map, unchanged */}
            <section className="flex min-w-0 flex-col gap-5 lg:col-span-7">
                <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-4 shadow-xl">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div><h2 className="text-base font-bold text-white">Community Emergency Map</h2>
                            <p className="mt-1 text-xs text-slate-400">Real OpenStreetMap tiles · select a pin, or click the map to set report coordinates.</p></div>
                        <span className="rounded border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-[11px] text-sky-300">Sunway / Petaling Jaya</span>
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-2 border-t border-slate-700 pt-3">
                        <span className="mr-1 text-[11px] uppercase text-slate-400">Filter Pins:</span>
                        <button type="button" onClick={() => setPriorityFilter('all')} className={`rounded-full px-3 py-1 text-xs font-bold ${priorityFilter === 'all' ? 'bg-sky-500 text-slate-950' : 'border border-[#334155] bg-[#0f172a] text-slate-300'}`}>All</button>
                        {priorities.map(p => <button key={p} type="button" onClick={() => setPriorityFilter(p)}
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${priorityFilter === p ? 'border-sky-400 bg-slate-700 text-white' : 'border-[#334155] bg-[#0f172a] text-slate-300'}`}>
                            <i className={`h-2 w-2 rounded-full ${colors[p]}`} />{priorityLabels[p]}
                        </button>)}
                    </div>
                    <div className="community-map-wrap relative h-[430px] overflow-hidden rounded-xl border-2 border-[#334155] bg-[#0b1325]">
                        <MapView reports={filtered} selectedId={selectedId ?? undefined} onSelect={setSelectedId} onPick={setCoords} position={coords ?? undefined} />
                        <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-[10px] text-slate-200">REAL MAP · FICTIONAL INCIDENTS</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-300">
                        {priorities.map(p => <span key={p} className="flex items-center gap-2"><i className={`h-2.5 w-2.5 rounded-full ${colors[p]}`} />{priorityLabels[p]}</span>)}
                        <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-slate-500" />Resolved</span>
                    </div>
                    {selectedReport && <div className="mt-3 rounded-lg border border-slate-600 bg-slate-900 p-3 text-xs">
                        <div className="flex items-center justify-between gap-3"><strong className="text-sm text-white">{selectedReport.title}</strong><button onClick={() => setSelectedId(null)} aria-label="Close details"><X size={16} /></button></div>
                        <p className="mt-1 text-slate-300">{selectedReport.description}</p>
                        <p className="mt-1 text-sky-300">{selectedReport.location_name} · {selectedReport.assistance_needed}</p>
                    </div>}
                </div>

                <div className="min-w-0 overflow-hidden rounded-xl border border-[#334155] bg-[#1e293b] shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#334155] bg-[#0f172a] px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => setFeedMode('reports')} className={`rounded-lg px-3 py-2 text-xs font-bold ${feedMode === 'reports' ? 'border border-red-500/40 bg-red-500/20 text-red-300' : 'text-slate-400'}`}>Active Emergency Reports ({reports.length})</button>
                            <button type="button" onClick={() => setFeedMode('donations')} className={`rounded-lg px-3 py-2 text-xs font-bold ${feedMode === 'donations' ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300' : 'text-slate-400'}`}>Community Donations Inventory ({donations.length})</button>
                        </div>
                        <span className="text-[11px] text-slate-400">LOCAL DEMO DATA</span>
                    </div>
                    <div className="max-h-[290px] overflow-auto p-4">
                        {loading ? <p className="text-sm text-slate-400">Loading demo data…</p> : feedMode === 'reports' ? (
                            <table className="w-full min-w-[580px] text-left text-xs">
                                <thead className="border-b border-slate-700 text-[11px] uppercase text-slate-400"><tr><th className="pb-3">ID</th><th className="pb-3">Disaster Type</th><th className="pb-3">Resource Needed</th><th className="pb-3">Criticality</th><th className="pb-3">Coordinates</th></tr></thead>
                                <tbody>{filtered.map(r => <tr key={r.id} onClick={() => setSelectedId(r.id)} className="cursor-pointer border-b border-slate-700/50 hover:bg-slate-700/30">
                                    <td className="py-3 pr-2 font-mono text-slate-400">{r.id}</td><td className="pr-2 font-semibold text-white">{r.category}</td>
                                    <td className="pr-2 text-slate-300">{r.assistance_needed}</td><td className="pr-2"><span className="inline-flex items-center gap-1.5"><i className={`h-2 w-2 rounded-full ${r.status === 'resolved' ? 'bg-slate-500' : colors[r.priority]}`} />{r.status === 'resolved' ? 'Resolved' : priorityLabels[r.priority]}</span></td>
                                    <td className="font-mono text-[11px] text-slate-400">{r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}</td>
                                </tr>)}</tbody>
                            </table>
                        ) : (
                            <table className="w-full min-w-[550px] text-left text-xs">
                                <thead className="border-b border-slate-700 text-[11px] uppercase text-slate-400"><tr><th className="pb-3">ID</th><th className="pb-3">Category</th><th className="pb-3">Contribution</th><th className="pb-3">Donor</th><th className="pb-3">Status</th></tr></thead>
                                <tbody>{donations.map(d => <tr key={d.id} className="border-b border-slate-700/50">
                                    <td className="py-3 pr-2 font-mono text-emerald-400">{d.id}</td><td className="pr-2 text-white">{d.category}</td>
                                    <td className="pr-2 text-slate-300">{formatDonationContribution(d)}</td><td className="pr-2 text-slate-300">{d.donor_name}</td>
                                    <td className="font-semibold text-emerald-400">{d.status}</td>
                                </tr>)}</tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-400"><ShieldAlert size={17} className="mt-0.5 shrink-0 text-amber-400" />
                    <span>Prototype only. No emergency service is contacted. The map pins are fictional, and donation pledges are simulated. For actual emergencies in Malaysia, call 999.</span>
                </div>
            </section>
        </main>
    );
}
