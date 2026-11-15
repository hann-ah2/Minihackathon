import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUpRight, HeartHandshake, LifeBuoy, MapPinned, Radio, Waypoints } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
const links = [
    { to: "/" as const, label: "Report Emergency", icon: LifeBuoy },
];
export function AppShell({ children }: { children: ReactNode }) {
    const pathname = useRouterState({ select: s => s.location.pathname });
    return <div className="app-shell support-shell">
        <header className="topbar"><Link to="/" className="brand"><span className="brand-mark"><Waypoints size={26} /></span><span>RESCUE<span className="brand-accent">GRID</span><small>COMMUNITY HELP NETWORK</small></span></Link>
            <nav aria-label="Main navigation">{links.map(l => <Button asChild variant="ghost" className={pathname === l.to ? 'nav-active' : ''} key={l.to}><Link to={l.to}><l.icon size={17} />{l.label}</Link></Button>)}</nav>
            <div className="header-controls"><span className="demo-chip"><span />DEMO MODE</span></div>
        </header>
        <div className="demo-strip"><div><Radio size={13} /><strong>PROTOTYPE ENVIRONMENT</strong><span className="strip-divider" /><span>Fictional reports & donation pledges. Not an emergency service.</span></div><span className="demo-role-note">Do not enter sensitive personal information</span></div>
        <main>{children}</main>
        <footer className="app-footer"><span><span className="online-dot" />LOCAL DEMONSTRATION DATA</span><span>RESCUEGRID · Help requests & community donations</span><span>Not connected to emergency services <ArrowUpRight size={11} /></span></footer>
    </div>;
}
