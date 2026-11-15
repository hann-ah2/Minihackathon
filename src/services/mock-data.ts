import type { EmergencyReport, MissionStatus, MissionUpdate, Priority, RescueTeam } from '@/models/rescue';
import { supabase } from '@/lib/supabase';
export type ReportInput = Omit<EmergencyReport, 'id' | 'priority' | 'verification_status' | 'status' | 'assigned_team_id' | 'created_at' | 'updated_at'>;
export function provisionalPriority(input: Pick<ReportInput, 'immediate_danger' | 'category'>): Priority {
 if (input.immediate_danger === 'yes') return 'P1';
 if (input.immediate_danger === 'unsure' || ['Medical Assistance', 'Trapped / Rescue', 'Landslide', 'Earthquake'].includes(input.category)) return 'P2';
 if (['Flood', 'Food / Water', 'Shelter'].includes(input.category)) return 'P3';
 return 'P4';
}
const KEY = 'rescuegrid-demo-v1';
type Store = { reports: EmergencyReport[]; teams: RescueTeam[]; updates: MissionUpdate[] };
let store: Store | undefined;
function seed(): Store {
 const rows: [string, string, string, string, number, number, number, Priority, MissionStatus, string | null][] = [
 ['Family trapped by rising floodwater', 'Flood', 'PJS 7 · Bandar Sunway', 'A fictional family is sheltering upstairs as floodwater blocks their exit. Boat evacuation requested.', 3.065, 101.608, 5, 'P1', 'new', null],
 ['Elderly resident needs evacuation', 'Medical Assistance', 'SS 13 · Subang Jaya', 'Fictional elderly resident requires assisted evacuation and mobility support.', 3.077, 101.591, 2, 'P2', 'in_progress', 'bravo'],
 ['Clean drinking water needed', 'Food / Water', 'PJS 9 · Sunway', 'Fictional households need safe drinking water after a local supply disruption.', 3.058, 101.621, 18, 'P3', 'assigned', 'charlie'],
 ['Power disruption across neighborhood', 'Power Outage', 'SS 8 · Petaling Jaya', 'Fictional power disruption. Recovery inspection requested; no immediate danger reported.', 3.093, 101.612, 24, 'P4', 'new', null],
 ['Temporary shelter needs supplies', 'Shelter', 'PJS 11 · Bandar Sunway', 'Fictional shelter requests blankets, drinking water, and essential food supplies.', 3.054, 101.601, 32, 'P3', 'new', null],
 ['Blocked access after slope collapse', 'Landslide', 'SS 9 · Sungai Way', 'Fictional debris blocks a residential access road. Assessment and clearance requested.', 3.089, 101.625, 8, 'P2', 'assigned', 'bravo'],
 ['Post-flood cleanup assistance', 'Other', 'PJS 6 · Kampung Lindungan', 'Fictional residents request help removing water-damaged household debris.', 3.072, 101.635, 6, 'P4', 'resolved', 'charlie'],
 ['Residents stranded at ground floor', 'Trapped / Rescue', 'PJS 8 · Sunway Mentari', 'Fictional residents cannot cross a flooded entrance. Immediate rescue assistance requested.', 3.078, 101.617, 4, 'P1', 'new', null],
 ];
 const now = Date.now();
 const reports = rows.map((r, i): EmergencyReport => ({ id: `RG-${1041+i}`, title: r[0], category: r[1], location_name: r[2], description: r[3], latitude: r[4], longitude: r[5], affected_people: r[6], priority: r[7], status: r[8], assigned_team_id: r[9], immediate_danger: r[7] === 'P1' ? 'yes' : 'no', assistance_needed: r[1], verification_status: i === 1 || i === 2 || i === 6 ? 'verified' : 'unverified', created_at: new Date(now - (i+1)*420000).toISOString(), updated_at: new Date(now - i*240000).toISOString() }));
 return { reports, teams: [{ id: 'alpha', name: 'Team Alpha', status: 'available' }, { id: 'bravo', name: 'Team Bravo', status: 'busy' }, { id: 'charlie', name: 'Team Charlie', status: 'busy' }], updates: reports.filter(r => r.status !== 'new').map(r => ({ id: `update-${r.id}`, report_id: r.id, author_name: 'Demo coordinator', note: r.status === 'resolved' ? 'Recovery completed and confirmed in this fictional scenario.' : 'Mission reviewed and assigned. Team preparing response.', status: r.status, created_at: r.updated_at })) };
}
function read(): Store {
 if (typeof window === 'undefined') throw new Error('Demo service is only available in the browser.');
 if (!store) { try { const saved = localStorage.getItem(KEY); store = saved ? JSON.parse(saved) : seed(); } catch { store = seed(); } }
 return store as Store;
}
function save() { localStorage.setItem(KEY, JSON.stringify(read())); window.dispatchEvent(new Event('rescuegrid-change')); }
function report(id: string) { const r = read().reports.find(r => r.id === id); if (!r) throw new Error('Mission not found.'); return r; }
function log(r: EmergencyReport, note: string) { read().updates.push({ id: crypto.randomUUID(), report_id: r.id, author_name: 'Demo coordinator', note, status: r.status, created_at: new Date().toISOString() }); }
export const mockService = {
 async getReports(): Promise<EmergencyReport[]> {
  if (supabase) {
   const { data, error } = await supabase.from('rescue_reports').select('*').order('created_at', { ascending: false }).limit(500);
   if (error) throw new Error(`Cannot load cloud reports: ${error.message}`);
   return data as EmergencyReport[];
  }
  return structuredClone(read().reports);
 },
 async createReport(input: ReportInput): Promise<EmergencyReport> {
  if (!input.title.trim() || !input.description.trim() || !input.location_name.trim() || !Number.isInteger(input.affected_people) || input.affected_people < 1) throw new Error('Complete all required report fields.');
  const now = new Date().toISOString();
  const r: EmergencyReport = { ...input, title: input.title.trim(), id: `RG-${crypto.randomUUID().slice(0,8).toUpperCase()}`, priority: provisionalPriority(input), verification_status: 'unverified', status: 'new', assigned_team_id: null, created_at: now, updated_at: now };
  if (supabase) {
   const { data, error } = await supabase.from('rescue_reports').insert(r).select().single();
   if (error) throw new Error(`Cannot save report: ${error.message}`);
   window.dispatchEvent(new Event('rescuegrid-change'));
   return data as EmergencyReport;
  }
  read().reports.unshift(r); log(r, 'Resident report received. Provisional priority pending coordinator review.'); save(); return structuredClone(r);
 },
 async updateReport(id: string, updates: Partial<Pick<EmergencyReport, 'verification_status' | 'priority' | 'description'>>) { const r = report(id); Object.assign(r, updates, { updated_at: new Date().toISOString() }); log(r, 'Coordinator reviewed incident details.'); save(); },
 async getTeams() { return read().teams.map(t => ({ ...t, status: read().reports.some(r => r.assigned_team_id === t.id && r.status !== 'resolved') ? 'busy' as const : 'available' as const })); },
 async assignTeam(reportId: string, teamId: string) { const r = report(reportId); if (r.assigned_team_id) throw new Error('Already assigned. Use the explicit Reassign team action.'); return this.reassignTeam(reportId, teamId); },
 async reassignTeam(reportId: string, teamId: string) {
  const r = report(reportId); const t = read().teams.find(t => t.id === teamId); if (!t) throw new Error('Select a valid team.'); if (r.status === 'resolved') throw new Error('Resolved missions cannot be assigned.');
  const old = r.assigned_team_id; r.assigned_team_id = teamId; r.status = 'assigned'; r.updated_at = new Date().toISOString(); log(r, `${old ? 'Explicitly reassigned' : 'Assigned'} to ${t.name}.`); save();
 },
 async updateMissionStatus(reportId: string, status: MissionStatus) {
  const r = report(reportId); const allowed: Record<MissionStatus, MissionStatus[]> = { new: [], assigned: ['in_progress'], in_progress: ['resolved'], resolved: [] };
  if (!allowed[r.status].includes(status)) throw new Error('Complete the mission workflow in order.');
  r.status = status; r.updated_at = new Date().toISOString(); log(r, status === 'resolved' ? 'Coordinator confirmed mission resolution.' : 'Team began the response mission.'); save();
 },
 async getMissionUpdates(reportId: string) { return structuredClone(read().updates.filter(u => u.report_id === reportId)); },
 async addMissionUpdate(input: Omit<MissionUpdate, 'id' | 'created_at'>) { if (!input.note.trim()) throw new Error('Enter a coordination note.'); const r = report(input.report_id); read().updates.push({ ...input, status: r.status, id: crypto.randomUUID(), created_at: new Date().toISOString() }); save(); },
};
