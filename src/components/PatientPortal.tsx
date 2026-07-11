import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Heartbeat, Calendar, MagnifyingGlass, MapPin, Phone, VideoCamera,
  ChatText, QrCode, Star, Clock, Check, X, CaretRight, CaretDown,
  Warning, Bell, Syringe, Pill, House, FirstAidKit, ClockCountdown,
  ArrowRight, Baby, IdentificationCard, NotePencil, ShieldCheck, Users,
  AddressBook, ThumbsUp, Envelope, DotsThree, Eye, Gear, Plus, List,
  ArrowLeft, Sliders, Heart, WifiHigh, HandsClapping, Waveform, Camera,
  Microphone, PaperPlane, SignOut, UserCircle, FloppyDisk, WarningCircle,
} from "@phosphor-icons/react";
import type { Appointment, Clinic, Patient, UserRole } from "@/types";
import { clinics, patients, doctors, currentPatient } from "@/data/mockData";

interface PatientPortalProps {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  addNotification: (n: { title: string; message: string; type: "info" | "success" | "warning" | "error"; role: UserRole }) => void;
}

type Tab = "dashboard" | "appointments" | "clinics" | "records" | "profile" | "telehealth" | "pharmacy";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <Heartbeat size={18} /> },
  { id: "appointments", label: "Appointments", icon: <Calendar size={18} /> },
  { id: "clinics", label: "Clinics", icon: <House size={18} /> },
  { id: "records", label: "Records", icon: <ClipboardText size={18} /> },
  { id: "telehealth", label: "Telehealth", icon: <VideoCamera size={18} /> },
  { id: "pharmacy", label: "Pharmacy", icon: <Pill size={18} /> },
  { id: "profile", label: "Profile", icon: <User size={18} /> },
];

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-4 flex items-start gap-3"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

function AppointmentCard({ a, onAction }: { a: Appointment; onAction: (id: string, action: "cancel" | "checkin") => void }) {
  const statusColors: Record<string, string> = {
    Scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Checked In": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "In Progress": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/30 dark:text-zinc-400",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>
              {a.status}
            </span>
            <span className="text-[10px] text-muted-foreground">{a.type}</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground">{a.doctorName}</h3>
          <p className="text-xs text-muted-foreground">{a.clinicName}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar size={12} />{a.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{a.time}</span>
          </div>
          {a.notes && <p className="text-[11px] text-muted-foreground/60 mt-1 italic">{a.notes}</p>}
        </div>
        <div className="flex flex-col gap-1">
          {a.status === "Scheduled" && (
            <>
              <button
                onClick={() => onAction(a.id, "checkin")}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs rounded-lg transition-colors"
              >
                Check In
              </button>
              <button
                onClick={() => onAction(a.id, "cancel")}
                className="px-3 py-1.5 border border-border hover:bg-destructive/10 text-xs text-muted-foreground hover:text-destructive rounded-lg transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ClinicCard({ c }: { c: Clinic }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-indigo-100 dark:from-emerald-900/30 dark:to-indigo-900/30 flex items-center justify-center shrink-0">
          <House size={20} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin size={10} />{c.region}
          </p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Star size={11} weight="fill" className="text-amber-500" />{c.rating}</span>
            <span className="flex items-center gap-1"><Clock size={11} />~{c.waitTime} min</span>
            <span className="flex items-center gap-1"><Users size={11} />{c.capacity.available} free</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {c.services.slice(0, 4).map(s => (
              <span key={s} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-[9px] rounded-full">{s}</span>
            ))}
            {c.services.length > 4 && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[9px] rounded-full">+{c.services.length - 4}</span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-2 flex items-center gap-1">
            <Phone size={10} />{c.phone}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PatientPortal({ appointments, setAppointments, addNotification }: PatientPortalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const patient = currentPatient;

  const handleAppointmentAction = (id: string, action: "cancel" | "checkin") => {
    setAppointments(prev =>
      prev.map(a => {
        if (a.id !== id) return a;
        if (action === "cancel") {
          addNotification({ title: "Appointment Cancelled", message: `Your appointment with ${a.doctorName} on ${a.date} has been cancelled.`, type: "warning", role: "Patient" });
          return { ...a, status: "Cancelled" as const };
        }
        if (action === "checkin") {
          addNotification({ title: "Checked In", message: `You've checked in for your appointment at ${a.clinicName}.`, type: "success", role: "Patient" });
          return { ...a, status: "Checked In" as const };
        }
        return a;
      })
    );
  };

  const filteredClinics = useMemo(() => {
    return clinics.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const myAppointments = appointments.filter(a => a.patientId === patient.id);
  const upcomingAppts = myAppointments.filter(a => a.status === "Scheduled" || a.status === "Checked In" || a.status === "In Progress");
  const pastAppts = myAppointments.filter(a => a.status === "Completed" || a.status === "Cancelled");

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
              {/* Welcome */}
              <div className="bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Welcome back,</p>
                    <h2 className="text-2xl font-bold">{patient.name}</h2>
                    <p className="text-xs opacity-70 mt-1 flex items-center gap-1">
                      <IdentificationCard size={12} weight="fill" />
                      Digital ID: {patient.digitalHealthId}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={32} weight="fill" className="text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                    <span className="flex items-center gap-1"><ShieldCheck size={12} weight="fill" />{patient.bloodGroup}</span>
                  </span>
                  {patient.nfcEnabled && (
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                      <span className="flex items-center gap-1"><WifiHigh size={12} weight="fill" />NFC Enabled</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <StatCard icon={<Calendar size={18} className="text-white" />} label="Upcoming" value={upcomingAppts.length} sub="appointments" color="bg-emerald-500" />
                <StatCard icon={<ClockCountdown size={18} className="text-white" />} label="Past" value={pastAppts.length} sub="appointments" color="bg-indigo-500" />
                <StatCard icon={<FirstAidKit size={18} className="text-white" />} label="Clinics" value={clinics.length} sub="near you" color="bg-amber-500" />
                <StatCard icon={<Star size={18} className="text-white" />} label="Avg Rating" value="4.2" sub="across visits" color="bg-rose-500" />
              </div>

              {/* Upcoming Appointments */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Upcoming Appointments</h3>
                  <button onClick={() => setActiveTab("appointments")} className="text-xs text-primary hover:underline flex items-center gap-1">
                    View all <ArrowRight size={12} />
                  </button>
                </div>
                <div className="space-y-2">
                  {upcomingAppts.slice(0, 3).map(a => (
                    <AppointmentCard key={a.id} a={a} onAction={handleAppointmentAction} />
                  ))}
                  {upcomingAppts.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming appointments. Book one now!</p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: <Calendar size={20} />, label: "Book Appointment", color: "from-emerald-500 to-emerald-600", onClick: () => setActiveTab("appointments") },
                    { icon: <VideoCamera size={20} />, label: "Telehealth", color: "from-indigo-500 to-indigo-600", onClick: () => setActiveTab("telehealth") },
                    { icon: <MapPin size={20} />, label: "Find Clinic", color: "from-amber-500 to-amber-600", onClick: () => setActiveTab("clinics") },
                    { icon: <Pill size={20} />, label: "Refill Rx", color: "from-cyan-500 to-cyan-600", onClick: () => setActiveTab("pharmacy") },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={item.onClick}
                      className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-white text-center`}
                    >
                      <div className="flex justify-center mb-1">{item.icon}</div>
                      <span className="text-[11px] font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">My Appointments</h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
                  <Plus size={14} className="inline mr-1" />Book New
                </button>
              </div>
              {upcomingAppts.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Upcoming ({upcomingAppts.length})</h3>
                  <div className="space-y-2">
                    {upcomingAppts.map(a => <AppointmentCard key={a.id} a={a} onAction={handleAppointmentAction} />)}
                  </div>
                </div>
              )}
              {pastAppts.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">Past ({pastAppts.length})</h3>
                  <div className="space-y-2">
                    {pastAppts.map(a => <AppointmentCard key={a.id} a={a} onAction={handleAppointmentAction} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CLINICS */}
          {activeTab === "clinics" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search clinics, services, or regions..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {filteredClinics.map(c => <ClinicCard key={c.id} c={c} />)}
              </div>
              {filteredClinics.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No clinics found matching your search.</p>
              )}
            </div>
          )}

          {/* RECORDS */}
          {activeTab === "records" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Medical Records</h2>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <ClipboardText size={40} className="mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">Your complete medical records are available offline via NFC.</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Tap your wristband or card at any AfyaLink facility.</p>
                <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium inline-flex items-center gap-1">
                  <QrCode size={14} /> View My Health ID
                </button>
              </div>
            </div>
          )}

          {/* TELEHEALTH */}
          {activeTab === "telehealth" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Telehealth Services</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <motion.div whileHover={{ y: -2 }} className="bg-card border border-border rounded-xl p-5">
                  <VideoCamera size={28} className="text-emerald-500 mb-3" />
                  <h3 className="text-sm font-semibold mb-1">Video Consultation</h3>
                  <p className="text-xs text-muted-foreground mb-3">Connect with a doctor via video call from home.</p>
                  <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors">Start Now</button>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} className="bg-card border border-border rounded-xl p-5">
                  <ChatText size={28} className="text-indigo-500 mb-3" />
                  <h3 className="text-sm font-semibold mb-1">Chat with Provider</h3>
                  <p className="text-xs text-muted-foreground mb-3">Send a message to your healthcare provider.</p>
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-medium hover:bg-indigo-600 transition-colors">Open Chat</button>
                </motion.div>
              </div>
            </div>
          )}

          {/* PHARMACY */}
          {activeTab === "pharmacy" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Pharmacy</h2>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Pill size={40} className="mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm font-medium">No active prescriptions</p>
                <p className="text-xs text-muted-foreground mt-1">Prescriptions from your doctor will appear here for refill.</p>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">My Profile</h2>
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center">
                    <User size={32} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{patient.name}</h3>
                    <p className="text-xs text-muted-foreground">{patient.digitalHealthId}</p>
                    <p className="text-xs text-muted-foreground">{patient.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Age", value: `${patient.age} years` },
                    { label: "Gender", value: patient.gender },
                    { label: "Blood Group", value: patient.bloodGroup },
                    { label: "Phone", value: patient.phone },
                    { label: "Address", value: patient.address },
                    { label: "NFC", value: patient.nfcEnabled ? "Enabled" : "Disabled" },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-border/50 pb-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold mb-2">Emergency Contact</h4>
                  <p className="text-sm">{patient.emergencyContact.name} ({patient.emergencyContact.relation})</p>
                  <p className="text-xs text-muted-foreground">{patient.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}