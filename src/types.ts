export interface Clinic {
  id: string;
  name: string;
  type: "PHC" | "Health Center" | "Referral Hospital";
  region: string;
  location: { lat: number; lng: number };
  services: string[];
  rating: number;
  waitTime: number;
  capacity: { total: number; available: number };
  phone: string;
  image: string;
}

export interface Patient {
  id: string;
  digitalHealthId: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  phone: string;
  email: string;
  address: string;
  emergencyContact: { name: string; phone: string; relation: string };
  nfcEnabled: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  clinicId: string;
  clinicName: string;
  doctorName: string;
  date: string;
  time: string;
  status: "Scheduled" | "Checked In" | "In Progress" | "Completed" | "Cancelled";
  type: string;
  notes?: string;
}

export interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
  oxygenSaturation: number;
  recordedAt: string;
}

export interface Diagnosis {
  code: string;
  description: string;
  date: string;
  doctor: string;
  notes: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientDigitalId: string;
  doctorName: string;
  clinicName: string;
  date: string;
  medications: Medication[];
  status: "Pending" | "Dispensed" | "Partially Dispensed" | "Cancelled";
  refillCount: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  notes?: string;
}

export interface EMRRecord {
  id: string;
  patientId: string;
  patientName: string;
  vitals: VitalSigns[];
  diagnoses: Diagnosis[];
  prescriptions: Prescription[];
  labRequests: string[];
  allergies: string[];
  chronicConditions: string[];
  lastVisit: string;
}

export interface Referral {
  id: string;
  referralCode: string;
  patientId: string;
  patientName: string;
  fromClinic: string;
  toHospital: string;
  priority: "Urgent" | "Routine" | "Emergency";
  reason: string;
  clinicalSummary: string;
  status: "Initiated" | "Accepted" | "Attended" | "Feedback Logged";
  initiatedAt: string;
  acceptedAt?: string;
  attendedAt?: string;
  feedback?: string;
}

export interface Household {
  id: string;
  headName: string;
  address: string;
  region: string;
  members: number;
  childrenUnder5: number;
  pregnantWomen: number;
  lastVisit: string;
  riskLevel: "Low" | "Medium" | "High";
  notes?: string;
}

export interface MaternalRecord {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  trimester: 1 | 2 | 3;
  weeksPregnant: number;
  dueDate: string;
  riskLevel: "Low" | "Medium" | "High";
  ancVisits: number;
  ancCompleted: number;
  vaccinations: string[];
  lastCheckup: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  role: "Patient" | "Provider" | "CHW" | "Pharmacist" | "Government";
}

export type UserRole = "Patient" | "Provider" | "CHW" | "Pharmacist" | "Government";

export interface GovMetric {
  region: string;
  totalFacilities: number;
  activePatients: number;
  malariaCases: number;
  immunizationRate: number;
  maternalMortality: number;
  referralCompletion: number;
  avgWaitTime: number;
  bedOccupancy: number;
}

export interface OutbreakAlert {
  id: string;
  disease: string;
  region: string;
  cases: number;
  trend: "Rising" | "Stable" | "Declining";
  severity: "Low" | "Medium" | "High" | "Critical";
  lastReported: string;
  actionRequired: boolean;
}