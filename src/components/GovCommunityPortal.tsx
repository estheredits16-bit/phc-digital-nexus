import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House, ChartBar, User, Calendar, MagnifyingGlass, MapPin, Phone,
  Clock, Check, X, Bell, ArrowRight, ArrowUp, ArrowDown, Warning,
  Star, DotsThree, Plus, List, Eye, Gear, Sliders, ArrowLeft, Envelope,
  ClockCountdown, ThumbsUp, AddressBook, Heart, WifiHigh, HandsClapping,
  Waveform, Camera, Microphone, PaperPlane, SignOut, UserCircle, FloppyDisk,
  Baby, FirstAidKit, Syringe, Pill, ClipboardText, QrCode, IdentificationCard,
  ShieldCheck, Users, AlertCircle,
} from "@phosphor-icons/react";
import type { Household, MaternalRecord, Referral, UserRole } from "@/types";
import { households as initialHouseholds, maternalRecords as initialMaternal, outbreakAlerts, govMetrics } from "@/data/mockData";

interface GovCommunityPortalProps {
  role: "CHW" | "Government";
  households: Household[];
  setHouseholds: React.Dispatch<React.SetStateAction<Household[]>>;
  maternalRecords: MaternalRecord[];
  setMaternalRecords: React.Dispatch<React.SetStateAction<MaternalRecord[]>>;
  referrals: Referral[];
  addNotification: (n: { title: string; message: string; type: "info" | "success" | "warning" | "error"; role: UserRole }) => void;
}

type Tab = "dashboard" | "households" | "maternal" | "outbreaks" | "metrics" | "referrals";

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
    Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Critical: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Rising: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Stable: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Declining: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Initiated: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Accepted: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Attended: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    "Feedback Logged": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    true: "bg-red-100 text-red-700",
    false: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[status] || "bg-zinc-100 text-zinc-500"}`}>
      {status}
    </span>
  );
}

export default function GovCommunityPortal({
  role, households, setHouseholds, maternalRecords, setMaternalRecords,
  referrals, addNotification,
}: GovCommunityPortalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const isGov = role === "Government";

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = isGov
    ? [
        { id: "dashboard", label: "Dashboard", icon: <ChartBar size={18} /> },
        { id: "metrics", label: "Health Metrics", icon: <ChartBar size={18} /> },
        { id: "outbreaks", label: "Outbreaks", icon: <Warning size={18} /> },
        { id: "referrals", label: "Referrals", icon: <ArrowRight size={18} /> },
        { id: "households", label: "Households", icon: <House size={18} /> },
      ]
    : [
        { id: "dashboard", label: "Dashboard", icon: <House size={18} /> },
        { id: "households", label: "Households", icon: <AddressBook size={18} /> },
        { id: "maternal", label: "Maternal", icon: <Baby size={18} /> },
        { id: "referrals", label: "Referrals", icon: <ArrowRight size={18} /> },
      ];

  const highRiskHouseholds = households.filter(h => h.riskLevel === "High");
  const overdueHouseholds = households.filter(h => {
    const daysSince = Math.floor((Date.now() - new Date(h.lastVisit).getTime()) / (1000 * 60 * 60 * 24));
    return daysSince > 30;
  });
  const activeOutbreaks = outbreakAlerts.filter(o => o.actionRequired);
  const highSeverityAlerts = outbreakAlerts.filter(o => o.severity === "High" || o.severity === "Critical");

  const filteredHouseholds = useMemo(() => {
    return households.filter(h =>
      h.headName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, households]);

  const handleVisitLog = (id: string) => {
    setHouseholds(prev => prev.map(h =>
      h.id === id ? { ...h, lastVisit: new Date().toISOString().split("T")[0] } : h
    ));
    addNotification({
      title: "Visit Logged",
      message: `Home visit recorded for household ${id}.`,
      type: "success",
      role,
    });
  };

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
                  {isGov ? "Government Health Dashboard" : "Community Health Worker Dashboard"}
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  {isGov
                    ? "Monitor population health metrics, track outbreaks, and manage regional healthcare KPIs."
                    : "Track household visits, maternal health follow-ups, and community outreach."}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {isGov ? (
                  <>
                    <StatCard icon={<Warning size={18} className="text-white" />} label="Active Outbreaks" value={activeOutbreaks.length} sub={highSeverityAlerts.length > 0 ? `${highSeverityAlerts.length} high severity` : "monitoring"} color="bg-red-500" />
                    <StatCard icon={<House size={18} className="text-white" />} label="Regions Covered" value={govMetrics.length} sub="across Africa" color="bg-emerald-500" />
                    <StatCard icon={<Users size={18} className="text-white" />} label="Active Patients" value="242,700" sub="in 7 regions" color="bg-indigo-500" />
                    <StatCard icon={<ChartBar size={18} className="text-white" />} label="Avg Immunization" value="74%" sub="across all regions" color="bg-amber-500" />
                  </>
                ) : (
                  <>
                    <StatCard icon={<House size={18} className="text-white" />} label="Households" value={households.length} sub={`${highRiskHouseholds.length} high risk`} color="bg-emerald-500" />
                    <StatCard icon={<Baby size={18} className="text-white" />} label="Maternal Cases" value={maternalRecords.length} sub="active pregnancies" color="bg-indigo-500" />
                    <StatCard icon={<Clock size={18} className="text-white" />} label="Overdue Visits" value={overdueHouseholds.length} sub=">30 days" color="bg-amber-500" />
                    <StatCard icon={<MapPin size={18} className="text-white" />} label="High Risk" value={highRiskHouseholds.length} sub="needs immediate attention" color="bg-red-500" />
                  </>
                )}
              </div>

              {/* Overdue Households (CHW) / Outbreak Alerts (Gov) */}
              {!isGov && overdueHouseholds.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Overdue Household Visits</h3>
                    <button onClick={() => setActiveTab("households")} className="text-xs text-primary hover:underline flex items-center gap-1">
                      View all <ArrowRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {overdueHouseholds.slice(0, 3).map(h => (
                      <div key={h.id} className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{h.headName}</p>
                          <p className="text-xs text-muted-foreground">{h.address}</p>
                          <p className="text-[10px] text-muted-foreground/60">
                            {h.members} members · {h.childrenUnder5} under 5 · Last visit: {h.lastVisit}
                          </p>
                          <StatusBadge status={h.riskLevel} />
                        </div>
                        <button
                          onClick={() => handleVisitLog(h.id)}
                          className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Log Visit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isGov && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold">Active Outbreak Alerts</h3>
                    <button onClick={() => setActiveTab("outbreaks")} className="text-xs text-primary hover:underline flex items-center gap-1">
                      View all <ArrowRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {activeOutbreaks.slice(0, 3).map(o => (
                      <div key={o.id} className="bg-card border border-border rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <Warning size={16} className="text-red-500" weight="fill" />
                            <p className="text-sm font-semibold">{o.disease}</p>
                          </div>
                          <StatusBadge status={o.severity} />
                        </div>
                        <p className="text-xs text-muted-foreground">{o.region} · {o.cases} cases</p>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge status={o.trend} />
                          <span className="text-[10px] text-muted-foreground">Last: {o.lastReported}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* HOUSEHOLDS */}
          {activeTab === "households" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search households by name, address, or region..."
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
                {filteredHouseholds.map(h => {
                  const daysSince = Math.floor((Date.now() - new Date(h.lastVisit).getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={h.id} className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold">{h.headName}</h3>
                            <StatusBadge status={h.riskLevel} />
                          </div>
                          <p className="text-xs text-muted-foreground">{h.address}</p>
                          <p className="text-xs text-muted-foreground">{h.region}</p>
                          <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                            <span><Users size={11} className="inline mr-1" />{h.members} members</span>
                            <span><Baby size={11} className="inline mr-1" />{h.childrenUnder5} under 5</span>
                            {h.pregnantWomen > 0 && <span className="text-amber-600">🤰 {h.pregnantWomen} pregnant</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-muted-foreground">Last visit: {h.lastVisit}</span>
                            {daysSince > 30 && (
                              <span className="text-[10px] text-red-500 font-medium">
                                ({daysSince} days overdue)
                              </span>
                            )}
                          </div>
                          {h.notes && (
                            <p className="text-[11px] text-muted-foreground/60 mt-2 italic">{h.notes}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          {!isGov && (
                            <button
                              onClick={() => handleVisitLog(h.id)}
                              className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors"
                            >
                              Log Visit
                            </button>
                          )}
                          <button className="px-3 py-1.5 border border-border text-xs rounded-lg hover:bg-muted transition-colors">
                            <Eye size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MATERNAL */}
          {activeTab === "maternal" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Maternal Health Records</h2>
              <div className="space-y-2">
                {maternalRecords.map(m => (
                  <div key={m.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold">{m.patientName}</h3>
                          <StatusBadge status={m.riskLevel} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {m.age} yrs · Trimester {m.trimester} · Week {m.weeksPregnant}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Due: {m.dueDate} · ANC: {m.ancVisits}/{m.ancCompleted} visits
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {m.vaccinations.map((v, i) => (
                            <span key={i} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] rounded-full">
                              <Syringe size={9} className="inline mr-0.5" />{v}
                            </span>
                          ))}
                        </div>
                        {m.notes && (
                          <p className="text-[11px] text-muted-foreground/60 mt-2">{m.notes}</p>
                        )}
                      </div>
                      <button className="px-3 py-1.5 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-600 transition-colors">
                        <NotePencil size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OUTBREAKS */}
          {activeTab === "outbreaks" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Disease Outbreak Monitoring</h2>
              <div className="space-y-2">
                {outbreakAlerts.map(o => (
                  <div key={o.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Warning size={18} className={o.severity === "Critical" ? "text-purple-500" : o.severity === "High" ? "text-red-500" : "text-amber-500"} weight="fill" />
                          <h3 className="text-sm font-semibold">{o.disease}</h3>
                          <StatusBadge status={o.severity} />
                        </div>
                        <p className="text-xs text-muted-foreground">{o.region}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold">{o.cases.toLocaleString()} cases</span>
                          <StatusBadge status={o.trend} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">Last reported: {o.lastReported}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        {o.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-medium rounded-lg text-center">
                            Action Required
                          </span>
                        )}
                        <button className="px-3 py-1.5 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors">
                          Respond
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* METRICS */}
          {activeTab === "metrics" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Regional Health Metrics</h2>
              <div className="space-y-2">
                {govMetrics.map(m => (
                  <div key={m.region} className="bg-card border border-border rounded-xl p-4">
                    <h3 className="text-sm font-semibold mb-3">{m.region}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Facilities</p>
                        <p className="text-lg font-bold">{m.totalFacilities}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Patients</p>
                        <p className="text-lg font-bold">{m.activePatients.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Malaria Cases</p>
                        <p className="text-lg font-bold text-amber-600">{m.malariaCases.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Immunization</p>
                        <p className="text-lg font-bold">{m.immunizationRate}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Maternal Mortality</p>
                        <p className="text-lg font-bold text-red-500">{m.maternalMortality}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Referral Completion</p>
                        <p className="text-lg font-bold">{m.referralCompletion}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Wait Time</p>
                        <p className="text-lg font-bold">{m.avgWaitTime} min</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Bed Occupancy</p>
                        <p className="text-lg font-bold">{m.bedOccupancy}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REFERRALS */}
          {activeTab === "referrals" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">
                {isGov ? "Cross-Region Referrals" : "Referral Tracking"}
              </h2>
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
                            <p className="text-[11px] text-emerald-700 dark:text-emerald-300">{r.feedback}</p>
                          </div>
                        )}
                      </div>
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