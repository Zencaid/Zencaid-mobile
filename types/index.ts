export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin' | 'clinic_staff';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  phoneNumber: string;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalHistory: MedicalRecord[];
  allergies: string[];
  medications: Medication[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  languages: string[];
  consultationFee: number;
  availability: DoctorAvailability[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescriptions: Prescription[];
  notes: string;
  attachments: MedicalAttachment[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy: string;
}

export interface Prescription {
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface MedicalAttachment {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'document' | 'lab_result';
  uploadDate: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledDate: Date;
  duration: number;
  type: 'video' | 'audio' | 'chat' | 'in_person';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  consultationLink?: string;
  fee: number;
}

export interface DoctorAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime?: Date;
  type: 'video' | 'audio' | 'chat';
  status: 'waiting' | 'active' | 'ended';
  roomId: string;
  messages: ConsultationMessage[];
  medicalNotes?: string;
}

export interface ConsultationMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export interface Clinic {
  id: string;
  name: string;
  address: Address;
  phoneNumber: string;
  email: string;
  description: string;
  services: string[];
  doctors: string[];
  operatingHours: OperatingHours[];
  rating: number;
  reviewCount: number;
}

export interface OperatingHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface HealthMetric {
  id: string;
  patientId: string;
  type: 'blood_pressure' | 'heart_rate' | 'weight' | 'temperature' | 'blood_sugar';
  value: number;
  unit: string;
  recordedDate: Date;
  notes?: string;
}