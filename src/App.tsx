import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  User,
  Heartbeat,
  FirstAidKit,
  House,
  ChartBar,
  Pill,
  X,
  Check,
  Clock,
  MagnifyingGlass,
  DotsThree,
  Calendar,
  IdentificationCard,
  Star,
  MapPin,
  Phone,
  VideoCamera,
  ChatText,
  QrCode,
  Syringe,
  Baby,
  ClipboardText,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  PaperPlane,
  Microphone,
  Camera,
  Waveform,
  NotePencil,
  SignOut,
  UserCircle,
  ShieldCheck,
  Plus,
  List,
  Eye,
  Gear,
  FloppyDisk,
  Warning,
  Sliders,
  ArrowLeft,
  Envelope,
  ClockCountdown,
  ThumbsUp,
  AddressBook,
  Heart,
  WifiHigh,
  HandsClapping,
  Users,
} from "@phosphor-icons/react";
import { toast } from "sonner";

import type { UserRole, Appointment, Referral, Notification, Patient, Prescription, Household, MaternalRecord, EMRRecord, Clinic } from "@/types";
import { db } from "@/data/mockData";
import PatientPortal from "@/components/PatientPortal";
import ProviderPortal from "@/components/ProviderPortal";
import GovCommunityPortal from "@/components/GovCommunityPortal";

const roleConfig: { role: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
  { role: "Patient", label: "Patient", icon: <User size={20} />, color: "bg-emerald-500" },
  { role: "Provider", label: "Provider", icon: <Heartbeat size={20} />, color: "bg-indigo-500" },
  { role: "CHW", label: "CHW", icon: <House size={20} />, color: "bg-amber-500" },
  { role: "Pharmacist", label: "Pharmacist", icon: <Pill size={20} />, color: "bg-cyan-500" },
  { role: "Government", label: "Government", icon: <ChartBar size={20} />, color: "bg-violet-500" },
];

function App() {
  const [role, setRole] = useState<UserRole>("Patient");
  const [notifications, setNotifications] = useState<Notification[]>(db.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("afl_appointments");
    return saved ? JSON.parse(saved) : db.appointments;
  });
  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem("afl_referrals");
    return saved ? JSON.parse(saved) : db.referrals;
  });
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem("afl_prescriptions");
    return saved ? JSON.parse(saved) : db.prescriptions;
  });
  const [households, setHouseholds] = useState<Household[]>(() => {
    const saved = localStorage.getItem("afl_households");
    return saved ? JSON.parse(saved) : db.households;
  });
  const [maternalRecords, setMaternalRecords] = useState<MaternalRecord[]>(() => {
    const saved = localStorage.getItem("afl_maternal");
    return saved ? JSON.parse(saved) : db.maternalRecords;
  });
  const [emrRecords, setEmrRecords] = useState<EMRRecord[]>(() => {
    const saved = localStorage.getItem("afl_emr");
    return saved ? JSON.parse(saved) : db.emrRecords;
  });

  // Persist state to localStorage
  useEffect(() => { localStorage.setItem("afl_appointments", JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { localStorage.setItem("afl_referrals", JSON.stringify(referrals)); }, [referrals]);
  useEffect(() => { localStorage.setItem("afl_prescriptions", JSON.stringify(prescriptions)); }, [prescriptions]);
  useEffect(() => { localStorage.setItem("afl_households", JSON.stringify(households)); }, [households]);
  useEffect(() => { localStorage.setItem("afl_maternal", JSON.stringify(maternalRecords)); }, [maternalRecords]);
  useEffect(() => { localStorage.setItem("afl_emr", JSON.stringify(emrRecords)); }, [emrRecords]);

  const addNotification = useCallback((n: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotif: Notification = {
      ...n,
      id: `n${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
    toast.success(n.title, { description: n.message });
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const currentRoleConfig = roleConfig.find(r => r.role === role)!;

  return (
    <div className="min-h-screen bg-[oklch(0.965_0.005_180)] dark:bg-[oklch(0.12_0.005_180)]">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center">
              <Heartbeat size={20} weight="fill" className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">AfyaLink</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Primary Health Connect</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Role indicator */}
            <motion.div
              key={role}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${currentRoleConfig.color}15`, color: currentRoleConfig.color.replace("bg-", "").replace("-500", "") }}
            >
              {currentRoleConfig.icon}
              <span>{currentRoleConfig.label}</span>
            </motion.div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Bell size={20} className="text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                      <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground text-sm">No notifications yet</div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                            <div className="flex items-start gap-2">
                              <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{n.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">
                                  {new Date(n.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {role === "Patient" && (
              <PatientPortal
                appointments={appointments}
                setAppointments={setAppointments}
                addNotification={addNotification}
              />
            )}
            {role === "Provider" && (
              <ProviderPortal
                appointments={appointments}
                setAppointments={setAppointments}
                referrals={referrals}
                setReferrals={setReferrals}
                prescriptions={prescriptions}
                setPrescriptions={setPrescriptions}
                emrRecords={emrRecords}
                setEmrRecords={setEmrRecords}
                addNotification={addNotification}
              />
            )}
            {(role === "CHW" || role === "Government") && (
              <GovCommunityPortal
                role={role}
                households={households}
                setHouseholds={setHouseholds}
                maternalRecords={maternalRecords}
                setMaternalRecords={setMaternalRecords}
                referrals={referrals}
                addNotification={addNotification}
              />
            )}
            {role === "Pharmacist" && (
              <ProviderPortal
                appointments={appointments}
                setAppointments={setAppointments}
                referrals={referrals}
                setReferrals={setReferrals}
                prescriptions={prescriptions}
                setPrescriptions={setPrescriptions}
                emrRecords={emrRecords}
                setEmrRecords={setEmrRecords}
                addNotification={addNotification}
                pharmacistView={true}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Role Switcher */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="glass border border-border/60 rounded-2xl shadow-2xl px-2 py-2 flex items-center gap-1">
            {roleConfig.map((r) => (
              <button
                key={r.role}
                onClick={() => setRole(r.role)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  role === r.role
                    ? "text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {role === r.role && (
                  <motion.div
                    layoutId="activeRole"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: r.color.replace("bg-", "").replace("-500", "") }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {r.icon}
                  <span className="hidden sm:inline">{r.label}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;