import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { Activity, ArrowUpRight, ChevronDown, ClipboardList, Crosshair, FilePlus2, Map, Radio, Shield, Users, Waypoints } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useDemo } from './store';
import type { DemoRole } from '@/models/rescue';
export function AppShell({ children }: { children: ReactNode }) {
 const { role, setRole, teams, teamId, setTeamId } = useDemo(); const navigate = useNavigate(); const pathname = useRouterState({ select: s => s.location.pathname });
 const links = role === 'resident' ? [{to:'/report' as const,label:'Report Emergency',icon:FilePlus2},{to:'/track' as const,label:'Track My Request',icon:Crosshair},{to:'/' as const,label:'Disaster Map',icon:Map}] : [{to:'/' as const,label:'Command Map',icon:Map},{to:'/missions' as const,label:'Recovery Missions',icon:ClipboardList},{to:'/teams' as const,label:'Team Command',icon:Users}];
 function changeRole(value: DemoRole) { setRole(value); void navigate({to:value === 'resident' ? '/report' : value === 'responder' ? '/missions' : '/'}); }
 return <div className="app-shell"><header className="topbar"><Link to="/" className="brand"><span className="brand-mark"><Waypoints size={26}/></span><span>RESCUE<span className="brand-accent">GRID</span><small>COMMUNITY RESPONSE NETWORK</small></span></Link><nav aria-label="Main navigation">{links.map(l => <Button asChild variant="ghost" className={pathname === l.to ? 'nav-active' : ''} key={l.to}><Link to={l.to}><l.icon size={17}/>{l.label}</Link></Button>)}</nav><div className="header-controls"><span className="demo-chip"><span/>DEMO MODE</span><div className="role-select"><Shield size={15}/><select aria-label="Demo role" value={role} onChange={e => changeRole(e.target.value as DemoRole)}><option value="resident">Resident View</option><option value="responder">Responder View</option><option value="coordinator">Coordinator View</option></select><ChevronDown size={13}/></div><span className="avatar">{role === 'coordinator' ? 'CO' : role === 'responder' ? 'RT' : 'RE'}</span></div></header>
 <div className="demo-strip"><div><Radio size={13}/><strong>PROTOTYPE ENVIRONMENT</strong><span className="strip-divider"/><span>Fictional incidents. No real emergency dispatch.</span></div><span className="demo-role-note">Demo role switch · not authentication</span></div>
 {role === 'responder' && <div className="responder-bar"><Activity size={16}/><strong>Responding as</strong><select aria-label="Responder team" value={teamId} onChange={e=>setTeamId(e.target.value)}>{teams.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>}
 <main>{children}</main><footer className="app-footer"><span><span className="online-dot"/>DEMO SYSTEM OPERATIONAL</span><span>RESCUEGRID · Sunway / Petaling Jaya, Malaysia</span><span>Fictional data only <ArrowUpRight size={11}/></span></footer></div>;
}
