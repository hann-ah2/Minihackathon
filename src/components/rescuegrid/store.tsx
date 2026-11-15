import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { mockService } from '@/services/mock-data';
import { donationService } from '@/services/donations';
import type { EmergencyReport } from '@/models/rescue';
import type { DonationOffer } from '@/models/donation';

type AppStore = { reports: EmergencyReport[]; donations: DonationOffer[]; loading: boolean; refresh: () => Promise<void> };
const Context = createContext<AppStore | null>(null);
export function DemoProvider({children}:{children:ReactNode}) {
 const [reports,setReports]=useState<EmergencyReport[]>([]);
 const [donations,setDonations]=useState<DonationOffer[]>([]);
 const [loading,setLoading]=useState(true);
 async function refresh(){ const [r,d]=await Promise.all([mockService.getReports(),donationService.getDonations()]);setReports(r);setDonations(d);setLoading(false); }
 useEffect(()=>{void refresh(); const changed=()=>{void refresh();}; window.addEventListener('rescuegrid-change',changed);window.addEventListener('storage',changed);return()=>{window.removeEventListener('rescuegrid-change',changed);window.removeEventListener('storage',changed);};},[]);
 return <Context.Provider value={{reports,donations,loading,refresh}}>{children}</Context.Provider>;
}
export function useDemo(){const context=useContext(Context);if(!context)throw new Error('Missing demo provider');return context;}
