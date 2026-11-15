import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { mockService } from '@/services/mock-data';
import type { DemoRole, EmergencyReport, RescueTeam } from '@/models/rescue';
type AppStore = { reports: EmergencyReport[]; teams: RescueTeam[]; role: DemoRole; setRole: (role: DemoRole) => void; teamId: string; setTeamId: (id: string) => void; loading: boolean; refresh: () => Promise<void> };
const Context = createContext<AppStore | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
 const [reports, setReports] = useState<EmergencyReport[]>([]); const [teams, setTeams] = useState<RescueTeam[]>([]); const [role, setRole] = useState<DemoRole>('coordinator'); const [teamId, setTeamId] = useState('alpha'); const [loading, setLoading] = useState(true);
 async function refresh() { const [r,t] = await Promise.all([mockService.getReports(), mockService.getTeams()]); setReports(r); setTeams(t); setLoading(false); }
 useEffect(() => { void refresh(); const changed = () => { void refresh(); }; window.addEventListener('rescuegrid-change', changed); window.addEventListener('storage', changed); return () => { window.removeEventListener('rescuegrid-change', changed); window.removeEventListener('storage', changed); }; }, []);
 return <Context.Provider value={{ reports, teams, role, setRole, teamId, setTeamId, loading, refresh }}>{children}</Context.Provider>;
}
export function useDemo() { const context = useContext(Context); if (!context) throw new Error('Missing demo provider'); return context; }
