import type { Clinic, Patient, Appointment, EMRRecord, Prescription, Referral, Household, MaternalRecord, GovMetric, OutbreakAlert, Notification } from "@/types";

export const clinics: Clinic[] = [
  { id: "c1", name: "Kibera Community Health Centre", type: "Health Center", region: "Nairobi, Kenya", location: { lat: -1.315, lng: 36.785 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Dental", "HIV/TB"], rating: 4.5, waitTime: 12, capacity: { total: 200, available: 45 }, phone: "+254 20 234 5678", image: "" },
  { id: "c2", name: "Mukuru Kwa Njenga PHC", type: "PHC", region: "Nairobi, Kenya", location: { lat: -1.325, lng: 36.865 }, services: ["Maternal Care", "Malaria", "Immunization", "General"], rating: 4.2, waitTime: 8, capacity: { total: 120, available: 30 }, phone: "+254 20 876 5432", image: "" },
  { id: "c3", name: "Kenyatta National Hospital", type: "Referral Hospital", region: "Nairobi, Kenya", location: { lat: -1.275, lng: 36.805 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Dental", "HIV/TB", "Surgery", "Cardiology", "Oncology"], rating: 4.8, waitTime: 45, capacity: { total: 1800, available: 120 }, phone: "+254 20 272 6300", image: "" },
  { id: "c4", name: "Makongeni Health Centre", type: "Health Center", region: "Nairobi, Kenya", location: { lat: -1.305, lng: 36.845 }, services: ["Maternal Care", "General", "Dental", "Immunization"], rating: 4.0, waitTime: 15, capacity: { total: 150, available: 25 }, phone: "+254 20 345 6789", image: "" },
  { id: "c5", name: "Lagos Island General Hospital", type: "Referral Hospital", region: "Lagos, Nigeria", location: { lat: 6.455, lng: 3.395 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Surgery", "Cardiology", "HIV/TB", "Emergency"], rating: 4.6, waitTime: 35, capacity: { total: 500, available: 80 }, phone: "+234 1 263 5478", image: "" },
  { id: "c6", name: "Makoko Community PHC", type: "PHC", region: "Lagos, Nigeria", location: { lat: 6.48, lng: 3.395 }, services: ["Maternal Care", "Malaria", "Immunization", "General"], rating: 3.9, waitTime: 10, capacity: { total: 90, available: 20 }, phone: "+234 1 545 6789", image: "" },
  { id: "c7", name: "Korle Bu Teaching Hospital", type: "Referral Hospital", region: "Accra, Ghana", location: { lat: 5.535, lng: -0.215 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Surgery", "Cardiology", "Oncology", "HIV/TB", "Emergency"], rating: 4.7, waitTime: 40, capacity: { total: 2000, available: 150 }, phone: "+233 302 665 121", image: "" },
  { id: "c8", name: "Jamestown Health Centre", type: "Health Center", region: "Accra, Ghana", location: { lat: 5.535, lng: -0.205 }, services: ["Maternal Care", "General", "Malaria", "Immunization", "Dental"], rating: 4.3, waitTime: 14, capacity: { total: 160, available: 35 }, phone: "+233 302 123 456", image: "" },
  { id: "c9", name: "Mwananyamala Hospital", type: "Referral Hospital", region: "Dar es Salaam, Tanzania", location: { lat: -6.82, lng: 39.27 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Surgery", "HIV/TB"], rating: 4.4, waitTime: 30, capacity: { total: 400, available: 60 }, phone: "+255 22 215 0026", image: "" },
  { id: "c10", name: "Tandale Community PHC", type: "PHC", region: "Dar es Salaam, Tanzania", location: { lat: -6.82, lng: 39.25 }, services: ["Maternal Care", "Malaria", "Immunization", "General"], rating: 4.1, waitTime: 9, capacity: { total: 100, available: 22 }, phone: "+255 22 276 5432", image: "" },
  { id: "c11", name: "Kampala International Hospital", type: "Referral Hospital", region: "Kampala, Uganda", location: { lat: 0.315, lng: 32.585 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Surgery", "Cardiology", "HIV/TB"], rating: 4.5, waitTime: 28, capacity: { total: 450, available: 75 }, phone: "+256 414 345 678", image: "" },
  { id: "c12", name: "Kisenyi Health Centre", type: "Health Center", region: "Kampala, Uganda", location: { lat: 0.315, lng: 32.565 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Dental"], rating: 4.0, waitTime: 11, capacity: { total: 130, available: 28 }, phone: "+256 414 567 890", image: "" },
  { id: "c13", name: "Addis Ababa Black Lion Hospital", type: "Referral Hospital", region: "Addis Ababa, Ethiopia", location: { lat: 9.03, lng: 38.74 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Surgery", "Cardiology", "HIV/TB", "Emergency"], rating: 4.6, waitTime: 38, capacity: { total: 600, available: 90 }, phone: "+251 11 551 2345", image: "" },
  { id: "c14", name: "Bole Community Health Centre", type: "PHC", region: "Addis Ababa, Ethiopia", location: { lat: 9.01, lng: 38.77 }, services: ["Maternal Care", "Malaria", "Immunization", "General"], rating: 4.2, waitTime: 7, capacity: { total: 110, available: 32 }, phone: "+251 11 667 8901", image: "" },
  { id: "c15", name: "Harare Central Hospital", type: "Referral Hospital", region: "Harare, Zimbabwe", location: { lat: -17.825, lng: 31.045 }, services: ["Maternal Care", "Malaria", "Immunization", "General", "Surgery", "HIV/TB"], rating: 4.3, waitTime: 32, capacity: { total: 350, available: 55 }, phone: "+263 4 745 1234", image: "" },
];

export const patients: Patient[] = [
  { id: "p1", digitalHealthId: "AFL-2024-0001", name: "Amina Mwangi", age: 28, gender: "Female", bloodGroup: "O+", phone: "+254 712 345 678", email: "amina.mwangi@email.com", address: "45 Kibera Drive, Nairobi", emergencyContact: { name: "John Mwangi", phone: "+254 722 111 222", relation: "Spouse" }, nfcEnabled: true },
  { id: "p2", digitalHealthId: "AFL-2024-0002", name: "David Ochieng", age: 45, gender: "Male", bloodGroup: "A+", phone: "+254 723 456 789", email: "david.ochieng@email.com", address: "12 Langata Road, Nairobi", emergencyContact: { name: "Grace Ochieng", phone: "+254 733 333 444", relation: "Spouse" }, nfcEnabled: true },
  { id: "p3", digitalHealthId: "AFL-2024-0003", name: "Fatima Abubakar", age: 32, gender: "Female", bloodGroup: "B+", phone: "+234 802 345 6789", email: "fatima.abubakar@email.com", address: "78 Ikeja Way, Lagos", emergencyContact: { name: "Musa Abubakar", phone: "+234 803 555 6666", relation: "Brother" }, nfcEnabled: false },
  { id: "p4", digitalHealthId: "AFL-2024-0004", name: "Kofi Mensah", age: 52, gender: "Male", bloodGroup: "AB+", phone: "+233 244 567 890", email: "kofi.mensah@email.com", address: "23 Osu Street, Accra", emergencyContact: { name: "Esi Mensah", phone: "+233 244 777 888", relation: "Spouse" }, nfcEnabled: true },
  { id: "p5", digitalHealthId: "AFL-2024-0005", name: "Grace Akinyi", age: 6, gender: "Female", bloodGroup: "O-", phone: "+254 734 567 890", email: "grace.akinyi@email.com", address: "89 Mukuru Slums, Nairobi", emergencyContact: { name: "Mary Akinyi", phone: "+254 744 999 000", relation: "Mother" }, nfcEnabled: false },
  { id: "p6", digitalHealthId: "AFL-2024-0006", name: "Dr. Samuel Okafor", age: 38, gender: "Male", bloodGroup: "A-", phone: "+234 805 678 9012", email: "samuel.okafor@email.com", address: "45 Victoria Island, Lagos", emergencyContact: { name: "Chioma Okafor", phone: "+234 806 111 2222", relation: "Spouse" }, nfcEnabled: true },
  { id: "p7", digitalHealthId: "AFL-2024-0007", name: "Neema Hassan", age: 24, gender: "Female", bloodGroup: "B-", phone: "+255 712 345 678", email: "neema.hassan@email.com", address: "23 Kariakoo, Dar es Salaam", emergencyContact: { name: "Rajabu Hassan", phone: "+255 713 555 666", relation: "Father" }, nfcEnabled: true },
  { id: "p8", digitalHealthId: "AFL-2024-0008", name: "Joseph Ssempijja", age: 60, gender: "Male", bloodGroup: "AB-", phone: "+256 772 345 678", email: "joseph.ssempijja@email.com", address: "56 Mengo, Kampala", emergencyContact: { name: "Sarah Ssempijja", phone: "+256 773 777 888", relation: "Spouse" }, nfcEnabled: false },
  { id: "p9", digitalHealthId: "AFL-2024-0009", name: "Tigist Hailemariam", age: 30, gender: "Female", bloodGroup: "O+", phone: "+251 911 234 567", email: "tigist.hailemariam@email.com", address: "12 Bole Road, Addis Ababa", emergencyContact: { name: "Dawit Hailemariam", phone: "+251 912 333 444", relation: "Brother" }, nfcEnabled: true },
  { id: "p10", digitalHealthId: "AFL-2024-0010", name: "Tendai Mukwena", age: 35, gender: "Male", bloodGroup: "A+", phone: "+263 772 345 678", email: "tendai.mukwena@email.com", address: "78 Borrowdale, Harare", emergencyContact: { name: "Rumbi Mukwena", phone: "+263 773 555 666", relation: "Spouse" }, nfcEnabled: true },
];

export const appointments: Appointment[] = [
  { id: "a1", patientId: "p1", patientName: "Amina Mwangi", clinicId: "c1", clinicName: "Kibera Community Health Centre", doctorName: "Dr. Jane Wanjiku", date: "2024-12-18", time: "09:00", status: "Scheduled", type: "Antenatal Checkup", notes: "Routine 28-week checkup" },
  { id: "a2", patientId: "p2", patientName: "David Ochieng", clinicId: "c3", clinicName: "Kenyatta National Hospital", doctorName: "Dr. Peter Kamau", date: "2024-12-18", time: "10:30", status: "Checked In", type: "Cardiology Review", notes: "Follow-up on hypertension" },
  { id: "a3", patientId: "p3", patientName: "Fatima Abubakar", clinicId: "c5", clinicName: "Lagos Island General Hospital", doctorName: "Dr. Adebayo Johnson", date: "2024-12-17", time: "14:00", status: "Completed", type: "General Consultation", notes: "Malaria test results" },
  { id: "a4", patientId: "p4", patientName: "Kofi Mensah", clinicId: "c7", clinicName: "Korle Bu Teaching Hospital", doctorName: "Dr. Akua Asante", date: "2024-12-19", time: "11:00", status: "Scheduled", type: "Diabetes Management", notes: "Quarterly review" },
  { id: "a5", patientId: "p5", patientName: "Grace Akinyi", clinicId: "c2", clinicName: "Mukuru Kwa Njenga PHC", doctorName: "Dr. Esther Nyambura", date: "2024-12-18", time: "08:30", status: "In Progress", type: "Child Immunization", notes: "Measles booster dose" },
  { id: "a6", patientId: "p6", patientName: "Dr. Samuel Okafor", clinicId: "c5", clinicName: "Lagos Island General Hospital", doctorName: "Dr. Funmi Adeyemi", date: "2024-12-20", time: "09:30", status: "Scheduled", type: "Routine Checkup", notes: "Annual physical" },
  { id: "a7", patientId: "p7", patientName: "Neema Hassan", clinicId: "c9", clinicName: "Mwananyamala Hospital", doctorName: "Dr. Juma Mwinyi", date: "2024-12-18", time: "13:00", status: "Scheduled", type: "Prenatal Visit", notes: "First trimester scan" },
  { id: "a8", patientId: "p8", patientName: "Joseph Ssempijja", clinicId: "c11", clinicName: "Kampala International Hospital", doctorName: "Dr. Sarah Nakato", date: "2024-12-19", time: "15:00", status: "Scheduled", type: "Prostate Screening", notes: "PSA test follow-up" },
  { id: "a9", patientId: "p9", patientName: "Tigist Hailemariam", clinicId: "c13", clinicName: "Addis Ababa Black Lion Hospital", doctorName: "Dr. Berhanu Tesfaye", date: "2024-12-17", time: "11:30", status: "Completed", type: "Maternal Care", notes: "Postnatal check" },
  { id: "a10", patientId: "p10", patientName: "Tendai Mukwena", clinicId: "c15", clinicName: "Harare Central Hospital", doctorName: "Dr. Tendai Gumbo", date: "2024-12-20", time: "10:00", status: "Scheduled", type: "HIV/TB Treatment Review", notes: "Monthly ART refill" },
];

export const emrRecords: EMRRecord[] = [
  {
    id: "emr1", patientId: "p1", patientName: "Amina Mwangi",
    vitals: [
      { bloodPressure: "110/70", heartRate: 78, temperature: 36.6, weight: 62, height: 162, oxygenSaturation: 98, recordedAt: "2024-12-01" },
      { bloodPressure: "112/72", heartRate: 80, temperature: 36.8, weight: 63, height: 162, oxygenSaturation: 97, recordedAt: "2024-11-15" },
    ],
    diagnoses: [
      { code: "O10.0", description: "Pre-existing essential hypertension complicating pregnancy", date: "2024-11-15", doctor: "Dr. Jane Wanjiku", notes: "Mild hypertension, monitoring closely" },
    ],
    prescriptions: [
      { id: "rx1", patientId: "p1", patientName: "Amina Mwangi", patientDigitalId: "AFL-2024-0001", doctorName: "Dr. Jane Wanjiku", clinicName: "Kibera Community Health Centre", date: "2024-11-15", medications: [{ name: "Methyldopa", dosage: "250mg", frequency: "Twice daily", duration: "30 days", quantity: 60 }], status: "Dispensed", refillCount: 0 },
    ],
    labRequests: ["Complete Blood Count", "Urinalysis", "Blood Glucose", "HIV Rapid Test"],
    allergies: ["Penicillin"],
    chronicConditions: ["Gestational Hypertension"],
    lastVisit: "2024-12-01",
  },
  {
    id: "emr2", patientId: "p2", patientName: "David Ochieng",
    vitals: [
      { bloodPressure: "145/95", heartRate: 88, temperature: 36.5, weight: 85, height: 175, oxygenSaturation: 96, recordedAt: "2024-12-10" },
      { bloodPressure: "150/98", heartRate: 90, temperature: 36.4, weight: 86, height: 175, oxygenSaturation: 95, recordedAt: "2024-11-20" },
    ],
    diagnoses: [
      { code: "I10", description: "Essential (primary) hypertension", date: "2023-06-15", doctor: "Dr. Peter Kamau", notes: "Stage 2 hypertension, started on medication" },
      { code: "E11", description: "Type 2 diabetes mellitus", date: "2024-03-10", doctor: "Dr. Peter Kamau", notes: "Recently diagnosed, HbA1c 7.8%" },
    ],
    prescriptions: [
      { id: "rx2", patientId: "p2", patientName: "David Ochieng", patientDigitalId: "AFL-2024-0002", doctorName: "Dr. Peter Kamau", clinicName: "Kenyatta National Hospital", date: "2024-12-10", medications: [{ name: "Amlodipine", dosage: "10mg", frequency: "Once daily", duration: "90 days", quantity: 90 }, { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "90 days", quantity: 180 }], status: "Dispensed", refillCount: 2 },
    ],
    labRequests: ["HbA1c", "Lipid Profile", "Serum Creatinine", "Urine Microalbumin"],
    allergies: ["Sulfa drugs"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    lastVisit: "2024-12-10",
  },
  {
    id: "emr3", patientId: "p3", patientName: "Fatima Abubakar",
    vitals: [
      { bloodPressure: "118/76", heartRate: 72, temperature: 38.2, weight: 58, height: 160, oxygenSaturation: 97, recordedAt: "2024-12-17" },
    ],
    diagnoses: [
      { code: "B50", description: "Plasmodium falciparum malaria", date: "2024-12-17", doctor: "Dr. Adebayo Johnson", notes: "Uncomplicated malaria, started on ACT" },
    ],
    prescriptions: [
      { id: "rx3", patientId: "p3", patientName: "Fatima Abubakar", patientDigitalId: "AFL-2024-0003", doctorName: "Dr. Adebayo Johnson", clinicName: "Lagos Island General Hospital", date: "2024-12-17", medications: [{ name: "Artemether/Lumefantrine", dosage: "80/480mg", frequency: "Twice daily", duration: "3 days", quantity: 6 }], status: "Dispensed", refillCount: 0 },
    ],
    labRequests: ["Malaria RDT", "Blood Film for Parasites"],
    allergies: [],
    chronicConditions: [],
    lastVisit: "2024-12-17",
  },
  {
    id: "emr4", patientId: "p4", patientName: "Kofi Mensah",
    vitals: [
      { bloodPressure: "130/85", heartRate: 76, temperature: 36.7, weight: 78, height: 170, oxygenSaturation: 98, recordedAt: "2024-12-05" },
      { bloodPressure: "135/88", heartRate: 78, temperature: 36.6, weight: 78.5, height: 170, oxygenSaturation: 97, recordedAt: "2024-09-05" },
    ],
    diagnoses: [
      { code: "E11", description: "Type 2 diabetes mellitus", date: "2019-04-12", doctor: "Dr. Akua Asante", notes: "Well-controlled on oral hypoglycemics" },
    ],
    prescriptions: [
      { id: "rx4", patientId: "p4", patientName: "Kofi Mensah", patientDigitalId: "AFL-2024-0004", doctorName: "Dr. Akua Asante", clinicName: "Korle Bu Teaching Hospital", date: "2024-12-05", medications: [{ name: "Gliclazide", dosage: "80mg", frequency: "Twice daily", duration: "90 days", quantity: 180 }, { name: "Metformin", dosage: "1000mg", frequency: "Twice daily", duration: "90 days", quantity: 180 }], status: "Dispensed", refillCount: 6 },
    ],
    labRequests: ["HbA1c", "Fasting Blood Glucose", "Renal Function"],
    allergies: ["Aspirin"],
    chronicConditions: ["Type 2 Diabetes"],
    lastVisit: "2024-12-05",
  },
  {
    id: "emr5", patientId: "p5", patientName: "Grace Akinyi",
    vitals: [
      { bloodPressure: "95/60", heartRate: 100, temperature: 36.9, weight: 18, height: 110, oxygenSaturation: 99, recordedAt: "2024-12-18" },
    ],
    diagnoses: [],
    prescriptions: [],
    labRequests: [],
    allergies: ["Eggs"],
    chronicConditions: [],
    lastVisit: "2024-12-18",
  },
];

export const prescriptions: Prescription[] = [
  ...emrRecords.flatMap(r => r.prescriptions),
  { id: "rx5", patientId: "p7", patientName: "Neema Hassan", patientDigitalId: "AFL-2024-0007", doctorName: "Dr. Juma Mwinyi", clinicName: "Mwananyamala Hospital", date: "2024-12-15", medications: [{ name: "Ferrous Sulfate", dosage: "200mg", frequency: "Once daily", duration: "90 days", quantity: 90 }, { name: "Folic Acid", dosage: "5mg", frequency: "Once daily", duration: "90 days", quantity: 90 }], status: "Pending", refillCount: 0 },
  { id: "rx6", patientId: "p8", patientName: "Joseph Ssempijja", patientDigitalId: "AFL-2024-0008", doctorName: "Dr. Sarah Nakato", clinicName: "Kampala International Hospital", date: "2024-12-12", medications: [{ name: "Tamsulosin", dosage: "0.4mg", frequency: "Once daily", duration: "30 days", quantity: 30 }], status: "Pending", refillCount: 0 },
  { id: "rx7", patientId: "p10", patientName: "Tendai Mukwena", patientDigitalId: "AFL-2024-0010", doctorName: "Dr. Tendai Gumbo", clinicName: "Harare Central Hospital", date: "2024-12-10", medications: [{ name: "Tenofovir/Lamivudine/DTG", dosage: "300/300/50mg", frequency: "Once daily", duration: "30 days", quantity: 30 }], status: "Partially Dispensed", refillCount: 0 },
];

export const referrals: Referral[] = [
  { id: "r1", referralCode: "REF-2024-0001", patientId: "p1", patientName: "Amina Mwangi", fromClinic: "Kibera Community Health Centre", toHospital: "Kenyatta National Hospital", priority: "Urgent", reason: "Pre-eclampsia risk assessment", clinicalSummary: "28-week pregnant patient with gestational hypertension. BP 150/95 at last visit. Referred for specialist maternal-fetal medicine review.", status: "Accepted", initiatedAt: "2024-12-10", acceptedAt: "2024-12-11" },
  { id: "r2", referralCode: "REF-2024-0002", patientId: "p2", patientName: "David Ochieng", fromClinic: "Kibera Community Health Centre", toHospital: "Kenyatta National Hospital", priority: "Routine", reason: "Cardiology consultation for uncontrolled hypertension", clinicalSummary: "45-year-old male with hypertension and newly diagnosed diabetes. BP persistently above 140/90 despite dual therapy.", status: "Attended", initiatedAt: "2024-12-01", acceptedAt: "2024-12-02", attendedAt: "2024-12-08" },
  { id: "r3", referralCode: "REF-2024-0003", patientId: "p4", patientName: "Kofi Mensah", fromClinic: "Jamestown Health Centre", toHospital: "Korle Bu Teaching Hospital", priority: "Routine", reason: "Endocrinology review for diabetes management", clinicalSummary: "52-year-old with poorly controlled type 2 diabetes. HbA1c 9.2% on maximal oral therapy. Consider insulin initiation.", status: "Initiated", initiatedAt: "2024-12-15" },
  { id: "r4", referralCode: "REF-2024-0004", patientId: "p8", patientName: "Joseph Ssempijja", fromClinic: "Kisenyi Health Centre", toHospital: "Kampala International Hospital", priority: "Urgent", reason: "Elevated PSA - suspected prostate cancer", clinicalSummary: "60-year-old male with PSA 45 ng/mL. Digital rectal exam reveals firm nodule. Referred for urology evaluation and biopsy.", status: "Initiated", initiatedAt: "2024-12-16" },
  { id: "r5", referralCode: "REF-2024-0005", patientId: "p10", patientName: "Tendai Mukwena", fromClinic: "Harare Central Hospital", toHospital: "Kenyatta National Hospital", priority: "Emergency", reason: "ART resistance - need specialist review", clinicalSummary: "Patient on second-line ART with rising viral load. Need expert consultation for third-line regimen.", status: "Feedback Logged", initiatedAt: "2024-12-05", acceptedAt: "2024-12-06", attendedAt: "2024-12-12", feedback: "Patient evaluated. Started on third-line regimen with dolutegravir-based therapy. Viral load monitoring in 3 months." },
];

export const households: Household[] = [
  { id: "h1", headName: "Mary Akinyi", address: "Plot 7, Mukuru Slums", region: "Nairobi, Kenya", members: 4, childrenUnder5: 2, pregnantWomen: 0, lastVisit: "2024-12-10", riskLevel: "High", notes: "Single mother, unemployed. Children need vaccination catch-up." },
  { id: "h2", headName: "John Mwangi", address: "45 Kibera Drive", region: "Nairobi, Kenya", members: 5, childrenUnder5: 1, pregnantWomen: 1, lastVisit: "2024-12-05", riskLevel: "Medium", notes: "Wife Amina is 28 weeks pregnant. Needs continued antenatal support." },
  { id: "h3", headName: "Halima Yusuf", address: "12 Makoko Waterside", region: "Lagos, Nigeria", members: 6, childrenUnder5: 3, pregnantWomen: 1, lastVisit: "2024-11-28", riskLevel: "High", notes: "Overcrowded housing. Children malnourished. Referred to nutrition program." },
  { id: "h4", headName: "Kwame Asare", address: "34 Jamestown", region: "Accra, Ghana", members: 3, childrenUnder5: 0, pregnantWomen: 0, lastVisit: "2024-12-12", riskLevel: "Low", notes: "Elderly couple with adult son. All in good health." },
  { id: "h5", headName: "Rajabu Hassan", address: "56 Kariakoo", region: "Dar es Salaam, Tanzania", members: 4, childrenUnder5: 1, pregnantWomen: 1, lastVisit: "2024-12-08", riskLevel: "Medium", notes: "Daughter Neema is 24 and pregnant. First trimester." },
  { id: "h6", headName: "Sarah Ssempijja", address: "56 Mengo", region: "Kampala, Uganda", members: 2, childrenUnder5: 0, pregnantWomen: 0, lastVisit: "2024-12-14", riskLevel: "Low", notes: "Caring for elderly husband Joseph. Needs regular check-ins." },
  { id: "h7", headName: "Dawit Hailemariam", address: "12 Bole Road", region: "Addis Ababa, Ethiopia", members: 5, childrenUnder5: 2, pregnantWomen: 0, lastVisit: "2024-12-01", riskLevel: "Medium", notes: "Two young children due for vaccinations." },
  { id: "h8", headName: "Rumbi Mukwena", address: "78 Borrowdale", region: "Harare, Zimbabwe", members: 3, childrenUnder5: 1, pregnantWomen: 0, lastVisit: "2024-12-09", riskLevel: "Low", notes: "Child healthy, vaccinations up to date." },
];

export const maternalRecords: MaternalRecord[] = [
  { id: "m1", patientName: "Amina Mwangi", patientId: "p1", age: 28, trimester: 3, weeksPregnant: 28, dueDate: "2025-03-15", riskLevel: "Medium", ancVisits: 4, ancCompleted: 6, vaccinations: ["Tdap (28 weeks)", "Influenza"], lastCheckup: "2024-12-01", notes: "Gestational hypertension - monitoring closely" },
  { id: "m2", patientName: "Neema Hassan", patientId: "p7", age: 24, trimester: 1, weeksPregnant: 10, dueDate: "2025-07-12", riskLevel: "Low", ancVisits: 1, ancCompleted: 6, vaccinations: [], lastCheckup: "2024-12-08", notes: "First pregnancy, started iron and folic acid" },
  { id: "m3", patientName: "Fatima Abubakar", patientId: "p3", age: 32, trimester: 2, weeksPregnant: 20, dueDate: "2025-05-01", riskLevel: "Low", ancVisits: 3, ancCompleted: 6, vaccinations: ["Tdap"], lastCheckup: "2024-12-10", notes: "Recovered from malaria, now on prophylaxis" },
];

export const govMetrics: GovMetric[] = [
  { region: "Nairobi, Kenya", totalFacilities: 24, activePatients: 45200, malariaCases: 3450, immunizationRate: 78, maternalMortality: 342, referralCompletion: 72, avgWaitTime: 18, bedOccupancy: 82 },
  { region: "Lagos, Nigeria", totalFacilities: 31, activePatients: 67800, malariaCases: 8900, immunizationRate: 65, maternalMortality: 512, referralCompletion: 60, avgWaitTime: 25, bedOccupancy: 88 },
  { region: "Accra, Ghana", totalFacilities: 18, activePatients: 32100, malariaCases: 2100, immunizationRate: 82, maternalMortality: 250, referralCompletion: 78, avgWaitTime: 15, bedOccupancy: 75 },
  { region: "Dar es Salaam, Tanzania", totalFacilities: 15, activePatients: 28900, malariaCases: 5200, immunizationRate: 71, maternalMortality: 398, referralCompletion: 65, avgWaitTime: 20, bedOccupancy: 80 },
  { region: "Kampala, Uganda", totalFacilities: 12, activePatients: 19800, malariaCases: 3800, immunizationRate: 68, maternalMortality: 378, referralCompletion: 68, avgWaitTime: 22, bedOccupancy: 78 },
  { region: "Addis Ababa, Ethiopia", totalFacilities: 20, activePatients: 35400, malariaCases: 1200, immunizationRate: 74, maternalMortality: 401, referralCompletion: 70, avgWaitTime: 16, bedOccupancy: 76 },
  { region: "Harare, Zimbabwe", totalFacilities: 10, activePatients: 15400, malariaCases: 450, immunizationRate: 80, maternalMortality: 280, referralCompletion: 75, avgWaitTime: 14, bedOccupancy: 72 },
];

export const outbreakAlerts: OutbreakAlert[] = [
  { id: "o1", disease: "Cholera", region: "Lagos, Nigeria", cases: 234, trend: "Rising", severity: "High", lastReported: "2024-12-17", actionRequired: true },
  { id: "o2", disease: "Malaria", region: "Dar es Salaam, Tanzania", cases: 5200, trend: "Stable", severity: "Medium", lastReported: "2024-12-16", actionRequired: false },
  { id: "o3", disease: "Measles", region: "Nairobi, Kenya", cases: 89, trend: "Rising", severity: "High", lastReported: "2024-12-15", actionRequired: true },
  { id: "o4", disease: "Dengue Fever", region: "Kampala, Uganda", cases: 45, trend: "Declining", severity: "Low", lastReported: "2024-12-14", actionRequired: false },
  { id: "o5", disease: "Meningitis", region: "Addis Ababa, Ethiopia", cases: 12, trend: "Rising", severity: "Critical", lastReported: "2024-12-17", actionRequired: true },
  { id: "o6", disease: "Cholera", region: "Harare, Zimbabwe", cases: 67, trend: "Rising", severity: "High", lastReported: "2024-12-15", actionRequired: true },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Appointment Confirmed", message: "Your antenatal checkup at Kibera Community Health Centre is confirmed for Dec 18 at 09:00.", type: "success", timestamp: "2024-12-17T08:30:00", read: false, role: "Patient" },
  { id: "n2", title: "Referral Accepted", message: "Referral REF-2024-0001 for Amina Mwangi has been accepted by Kenyatta National Hospital.", type: "info", timestamp: "2024-12-11T14:20:00", read: true, role: "Provider" },
  { id: "n3", title: "Outbreak Alert", message: "Measles outbreak detected in Nairobi region. 89 cases reported. Immediate vaccination campaign recommended.", type: "warning", timestamp: "2024-12-15T10:00:00", read: false, role: "Government" },
  { id: "n4", title: "Prescription Ready", message: "Prescription for Neema Hassan (Iron & Folic Acid) is ready for dispensing at Mwananyamala Hospital.", type: "info", timestamp: "2024-12-16T09:45:00", read: false, role: "Pharmacist" },
  { id: "n5", title: "Household Visit Due", message: "Household h3 (Halima Yusuf) in Makoko is overdue for a visit. Last visit was 28 Nov 2024.", type: "warning", timestamp: "2024-12-17T06:00:00", read: false, role: "CHW" },
  { id: "n6", title: "Referral Feedback Received", message: "Feedback for referral REF-2024-0005 (Tendai Mukwena) has been logged by Kenyatta National Hospital.", type: "success", timestamp: "2024-12-12T16:30:00", read: true, role: "Provider" },
  { id: "n7", title: "Immunization Due", message: "Grace Akinyi is due for Measles booster vaccination. Appointment scheduled for Dec 18.", type: "info", timestamp: "2024-12-17T07:00:00", read: false, role: "CHW" },
  { id: "n8", title: "New Patient Registered", message: "Patient Tendai Mukwena (AFL-2024-0010) has been registered in the system.", type: "success", timestamp: "2024-12-10T11:00:00", read: true, role: "Provider" },
];

export const doctors = [
  { name: "Dr. Jane Wanjiku", specialization: "Obstetrics & Gynecology", clinic: "Kibera Community Health Centre", available: true, rating: 4.7 },
  { name: "Dr. Peter Kamau", specialization: "Cardiology", clinic: "Kenyatta National Hospital", available: true, rating: 4.8 },
  { name: "Dr. Esther Nyambura", specialization: "Pediatrics", clinic: "Mukuru Kwa Njenga PHC", available: true, rating: 4.5 },
  { name: "Dr. Adebayo Johnson", specialization: "General Medicine", clinic: "Lagos Island General Hospital", available: true, rating: 4.4 },
  { name: "Dr. Funmi Adeyemi", specialization: "Internal Medicine", clinic: "Lagos Island General Hospital", available: false, rating: 4.6 },
  { name: "Dr. Akua Asante", specialization: "Endocrinology", clinic: "Korle Bu Teaching Hospital", available: true, rating: 4.9 },
  { name: "Dr. Juma Mwinyi", specialization: "Obstetrics & Gynecology", clinic: "Mwananyamala Hospital", available: true, rating: 4.3 },
  { name: "Dr. Sarah Nakato", specialization: "Urology", clinic: "Kampala International Hospital", available: true, rating: 4.5 },
  { name: "Dr. Berhanu Tesfaye", specialization: "General Medicine", clinic: "Addis Ababa Black Lion Hospital", available: false, rating: 4.6 },
  { name: "Dr. Tendai Gumbo", specialization: "Infectious Disease", clinic: "Harare Central Hospital", available: true, rating: 4.4 },
];

export const currentPatient = patients[0];

export const db = {
  patients: [...patients],
  appointments: [...appointments],
  emrRecords: [...emrRecords],
  prescriptions: [...prescriptions],
  referrals: [...referrals],
  households: [...households],
  maternalRecords: [...maternalRecords],
  clinics: [...clinics],
  notifications: [...notifications],
  doctors: [...doctors],
  govMetrics: [...govMetrics],
  outbreakAlerts: [...outbreakAlerts],
};