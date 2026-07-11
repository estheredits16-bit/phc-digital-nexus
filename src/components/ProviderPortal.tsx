import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heartbeat, Calendar, MagnifyingGlass, User, Clock, Check, X, Bell,
  Pill, Syringe, ClipboardText, ArrowRight, ArrowUp, ArrowDown,
  NotePencil, Warning, Star, MapPin, Phone, VideoCamera, ChatText,
  DotsThree, Plus, List, Eye, Gear, Sliders, ArrowLeft, Envelope,
  ClockCountdown, ThumbsUp, AddressBook, Heart, WifiHigh, HandsClapping,
  Waveform, Camera, Microphone, PaperPlane, SignOut, UserCircle,
  FloppyDisk, Users, QrCode, FirstAidKit, House, Baby, IdentificationCard,
  ShieldCheck, AlertCircle,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import type { Appointment, Referral, Prescription, EMRRecord, UserRole, Patient, Medication } from "@/types";
import { patients, doctors, clinics } from "@/data/mockData";

interface ProviderPortalProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  referrals: Referral[];
  setReferrals: React.Dispatch<React.SetStateAction<Referral[]>>;
  prescriptions: Prescription[];
  setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>;
  emrRecords: EMRRecord[];
  setEmrRecords: React.Dispatch<React.SetStateAction<EMRRecord[]>>;
  addNotification: (n: { title: string; message: string; type: "info" | "success" | "warning" | "error"; role: UserRole }) => void;
  pharmacistView?: boolean;
}

type Tab = "dashboard" | "queue" | "referrals" | "prescriptions" | "patients" | "records";

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Checked In": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "In Progress": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/30 dark:text-zinc-400",
    Initiated: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Accepted: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Attended: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    "Feedback Logged": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Dispensed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Partially Dispensed": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Routine: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Emergency: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Low": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Medium": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "High": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "Critical": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Rising": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "Stable": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Declining": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[status] || "bg-zinc-100 text-zinc-500"}`}>
      {status}
    </span>
  );
}

export default function ProviderPortal({
  appointments, setAppointments, referrals, setReferrals,
  prescriptions, setPrescriptions, emrRecords, setEmrRecords,
  addNotification, pharmacistView = false,
}: ProviderPortalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = pharmacistView
    ? [
        { id: "dashboard", label: "Dashboard", icon: <Pill size={18} /> },
        { id: "prescriptions", label: "Prescriptions", icon: <ClipboardText size={18} /> },
        { id: "patients", label: "Patients", icon: <User size={18} /> },
      ]
    : [
        { id: "dashboard", label: "Dashboard", icon: <Heartbeat size={18} /> },
        { id: "queue", label: "Queue", icon: <Users size={18} /> },
        { id: "referrals", label: "Referrals", icon: <ArrowRight size={18} /> },
        { id: "prescriptions", label: "Rx", icon: <Pill size={18} /> },
        { id: "patients", label: "Patients", icon: <User size={18} /> },
        { id: "records", label: "Records", icon: <ClipboardText size={18} /> },
      ];

  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return appointments.filter(a => a.date === today);
  }, [appointments]);

  const pendingReferrals = referrals.filter(r => r.status === "Initiated");
  const pendingPrescriptions = prescriptions.filter(p => p.status === "Pending" || p.status === "Partially Dispensed");

  const handleStatusChange = (id: string, type: "appointment" | "referral" | "prescription", newStatus: string) => {
    if (type === "appointment") {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as Appointment["status"] } : a));
    } else if (type === "referral") {
      setReferrals(prev => {
        const updated = prev.map(r => {
          if (r.id !== id) return r;
          const now = new Date().toISOString().split("T")[0];
          if (newStatus === "Accepted") return { ...r, status: "Accepted" as const, acceptedAt: now };
          if (newStatus === "Attended") return { ...r, status: "Attended" as const, attendedAt: now };
          if (newStatus === "Feedback Logged") return { ...r, status: "Feedback Logged" as const, feedback: "Patient evaluated and managed." };
          return r;
        });
        addNotification({ title: "Referral Updated", message: `Referral ${id} status changed to ${newStatus}`, type: "info", role: pharmacistView ? "Pharmacist" : "Provider" });
        return updated;
      });
    } else if (type === "prescription") {
      setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as Prescription["status"] } : p));
      addNotification({ title: "Prescription Updated", message: `Prescription ${id} marked as ${newStatus}`, type: "success", role: pharmacistView ? "Pharmacist" : "Provider" });
    }
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.digitalHealthId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === t.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold">
                  {pharmacistView ? "Pharmacy Dashboard" : "Provider Dashboard"}
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  {pharmacistView
                    ? "Manage prescriptions, dispense medications, and track inventory."
                    : "Manage patient queue, referrals, and clinical workflows."}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard icon={<Calendar size={18} className="text-white" />} label="Today's Appointments" value={todayAppointments.length} color="bg-emerald-500" />
                <StatCard icon={<ArrowRight size={18} className="text-white" />} label="Pending Referrals" value={pendingReferrals.length} color="bg-indigo-500" />
                <StatCard icon={<Pill size={18} className="text-white" />} label="Rx to Fill" value={pendingPrescriptions.length} color="bg-amber-500" />
                <StatCard icon={<Users size={18} className="text-white" />} label="Total Patients" value={patients.length} color="bg-rose-500" />
              </div>

              {/* Today's Queue */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Today's Clinic Queue</h3>
                  <button onClick={() => setActiveTab("queue")} className="text-xs text-primary hover:underline flex items-center gap-1">
                    View all <ArrowRight size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  {todayAppointments.slice(0, 5).map(a => (
                    <div key={a.id} className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{a.patientName}</p>
                        <p className="text-xs text-muted-foreground">{a.doctorName} — {a.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={a.status} />
                        {a.status === "Checked In" && (
                          <button
                            onClick={() => handleStatusChange(a.id, "appointment", "In Progress")}
                            className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-lg"
                          >
                            Start
                          </button>
                        )}
                        {a.status === "Scheduled" && (
                          <button
                            onClick={() => handleStatusChange(a.id, "appointment", "Checked In")}
                            className="px-2 py-1 bg-emerald-500 text-white text-xs rounded-lg"
                          >
                            Check In
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {todayAppointments.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No appointments scheduled for today.</p>
                  )}
                </div>
              </div>

              {/* Pending Referrals */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Pending Referrals</h3>
                  <button onClick={() => setActiveTab("referrals")} className="text-xs text-primary hover:underline flex items-center gap-1">
                    View all <ArrowRight size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  {pendingReferrals.slice(0, 3).map(r => (
                    <div key={r.id} className="bg-card border border-border rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{r.patientName}</p>
                        <StatusBadge status={r.priority} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {r.fromClinic} → {r.toHospital}
                      </p>
                      <p className="text-[11px] text-muted-foreground/60 mt-1 line-clamp-1">{r.reason}</p>
                    </div>
                  ))}
                  {pendingReferrals.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No pending referrals.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* QUEUE */}
          {activeTab === "queue" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Patient Queue</h2>
              <div className="space-y-2">
                {todayAppointments.map(a => (
                  <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={a.status} />
                        <span className="text-[10px] text-muted-foreground">{a.type}</span>
                      </div>
                      <p className="text-sm font-semibold">{a.patientName}</p>
                      <p className="text-xs text-muted-foreground">{a.doctorName} — {a.time}</p>
                      {a.notes && <p className="text-[11px] text-muted-foreground/60 mt-1">{a.notes}</p>}
                    </div>
                    <div className="flex flex-col gap-1 ml-3">
                      {a.status === "Scheduled" && (
                        <button onClick={() => handleStatusChange(a.id, "appointment", "Checked In")} className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg">Check In</button>
                      )}
                      {a.status === "Checked In" && (
                        <button onClick={() => handleStatusChange(a.id, "appointment", "In Progress")} className="px-3 py-1.5 bg-indigo-500 text-white text-xs rounded-lg">Start</button>
                      )}
                      {a.status === "In Progress" && (
                        <button onClick={() => handleStatusChange(a.id, "appointment", "Completed")} className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg">Complete</button>
                      )}
                    </div>
                  </div>
                ))}
                {todayAppointments.length === 0 && (
                  <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <Users size={40} className="mx-auto text-muted-foreground/40 mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">Queue is empty</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">No patients scheduled for today.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* REFERRALS */}
          {activeTab === "referrals" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Referrals Management</h2>
              <div className="space-y-2">
                {referrals.map(r => (
                  <div key={r.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={r.status} />
                          <StatusBadge status={r.priority} />
                          <span className="text-[10px] text-muted-foreground">{r.referralCode}</span>
                        </div>
                        <h3 className="text-sm font-semibold">{r.patientName}</h3>
                        <p className="text-xs text-muted-foreground">{r.fromClinic} → {r.toHospital}</p>
                        <p className="text-xs mt-1">{r.reason}</p>
                        {r.feedback && (
                          <div className="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">Feedback:</p>
                            <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">{r.feedback}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {r.status === "Initiated" && (
                          <button onClick={() => handleStatusChange(r.id, "referral", "Accepted")} className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg">Accept</button>
                        )}
                        {r.status === "Accepted" && (
                          <button onClick={() => handleStatusChange(r.id, "referral", "Attended")} className="px-3 py-1.5 bg-indigo-500 text-white text-xs rounded-lg">Mark Attended</button>
                        )}
                        {r.status === "Attended" && (
                          <button onClick={() => handleStatusChange(r.id, "referral", "Feedback Logged")} className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg">Log Feedback</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRESCRIPTIONS */}
          {activeTab === "prescriptions" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">{pharmacistView ? "Prescriptions to Fill" : "Prescriptions"}</h2>
              <div className="space-y-2">
                {prescriptions.map(p => (
                  <div key={p.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={p.status} />
                          <span className="text-[10px] text-muted-foreground">{p.date}</span>
                        </div>
                        <h3 className="text-sm font-semibold">{p.patientName}</h3>
                        <p className="text-xs text-muted-foreground">Dr. {p.doctorName} — {p.clinicName}</p>
                        <p className="text-[10px] text-muted-foreground/60">Digital ID: {p.patientDigitalId}</p>
                        <div className="mt-2 space-y-1">
                          {p.medications.map((m, i) => (
                            <div key={i} className="text-xs flex items-center gap-2">
                              <Pill size={12} className="text-muted-foreground" />
                              <span className="font-medium">{m.name}</span>
                              <span className="text-muted-foreground">{m.dosage}</span>
                              <span className="text-muted-foreground/60">{m.frequency}</span>
                              <span className="text-muted-foreground/60">×{m.quantity}</span>
                            </div>
                          ))}
                        </div>
                        {p.refillCount > 0 && (
                          <p className="text-[10px] text-muted-foreground/60 mt-2">Refills: {p.refillCount}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        {(p.status === "Pending" || p.status === "Partially Dispensed") && (
                          <button onClick={() => handleStatusChange(p.id, "prescription", "Dispensed")} className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg">
                            {pharmacistView ? "Dispense" : "Mark Dispensed"}
                          </button>
                        )}
                        {p.status === "Pending" && pharmacistView && (
                          <button onClick={() => handleStatusChange(p.id, "prescription", "Partially Dispensed")} className="px-3 py-1.5 border border-border text-xs text-muted-foreground rounded-lg">
                            Partial
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PATIENTS */}
          {activeTab === "patients" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search patients by name or ID..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium">
                  <Plus size={14} className="inline mr-1" />Register
                </button>
              </div>
              <div className="space-y-2">
                {filteredPatients.map(p => (
                  <div key={p.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center shrink-0">
                      <User size={18} weight="fill" className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.digitalHealthId} · {p.age} yrs · {p.bloodGroup}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone size={10} />{p.phone}</span>
                    </div>
                    <button className="px-3 py-1.5 border border-border text-xs rounded-lg hover:bg-muted transition-colors">
                      <Eye size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECORDS */}
          {activeTab === "records" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">EMR Records</h2>
              <div className="space-y-2">
                {emrRecords.map(emr => (
                  <div key={emr.id} className="bg-card border border-border rounded-xl p-4">
                    <h3 className="text-sm font-semibold mb-2">{emr.patientName}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {emr.vitals.length > 0 && (
                        <>
                          <div className="text-xs"><span className="text-muted-foreground">BP</span> <span className="font-medium">{emr.vitals[0].bloodPressure}</span></div>
                          <div className="text-xs"><span className="text-muted-foreground">HR</span> <span className="font-medium">{emr.vitals[0].heartRate}</span></div>
                          <div className="text-xs"><span className="text-muted-foreground">Temp</span> <span className="font-medium">{emr.vitals[0].temperature}°C</span></div>
                          <div className="text-xs"><span className="text-muted-foreground">SpO2</span> <span className="font-medium">{emr.vitals[0].oxygenSaturation}%</span></div>
                        </>
                      )}
                    </div>
                    {emr.diagnoses.length > 0 && (
                      <div className="mb-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Diagnoses</p>
                        {emr.diagnoses.map((d, i) => (
                          <p key={i} className="text-xs"><span className="text-muted-foreground">{d.code}</span> — {d.description}</p>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {emr.allergies.map((a, i) => (
                        <span key={i} className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[9px] rounded-full">⚠ {a}</span>
                      ))}
                      {emr.chronicConditions.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[9px] rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}