
## ✅ `README.md` for the **Mobile Application** (`/mobile/README.md`)

```markdown
# Zencaid – Mobile Application

## Overview

Zencaid is a mobile-first telehealth platform offering video consultations, medical record access, and offline support tailored for the African healthcare system. This repository houses both the **Patient App** and **Doctor App**.

## Apps Covered

### 🧍 Patient App
- Consult booking and video calls
- Prescription & health record access
- Works offline-first

### 🩺 Doctor App
- Calendar and consult scheduling
- Patient record updates
- Prescription uploads

## Tech Stack

| Layer             | Technology                           |
|-------------------|---------------------------------------|
| Mobile Framework  | React Native (Expo + NativeBase)     |
| Offline Storage   | SQLite / Realm                       |
| Real-time Video   | Agora SDK / Twilio                   |
| Push Notifications| Firebase Cloud Messaging (FCM)       |
| CI/CD             | GitHub Actions + Fastlane            |
| Sync Engine       | Custom queue + conflict resolution   |
| Monitoring        | LogRocket, Sentry                    |

## Data Architecture

**Local**: SQLite/Realm  
**Remote**: PostgreSQL with sync

Key tables:
- `appointments`: time, doctor_id, patient_id
- `records`: notes, files, consult metadata
- `transactions`: amount, method, status

## UX Flows

### Patient App
1. Onboarding & KYC
2. Book a Consult
3. Join Video Session
4. Receive Prescription
5. View Records Offline

### Doctor App
1. Log in & View Schedule
2. Start Consultation
3. Update Patient Record
4. Upload Prescription

## Sync Logic

- Queue offline actions
- Conflict resolution (last-write-wins)
- Background sync every 24hrs
- Sync retry with token-based auth

## Compliance

- NDPR-compliant onboarding
- Encrypted local file storage
- API-level access control
- MDCN doctor license verification

## Monetization (Mobile)

- Freemium consult limits
- Premium subscriptions via Paystack/Flutterwave
- Telecom bundles for rural patients

## Roadmap

| Quarter | Milestone |
|---------|-----------|
| Q2 2025 | MVP Android/iOS Launch |
| Q4 2025 | HMO APIs + Voice Consults |
| Q2 2026 | Multilingual & AI Modules |
| 2027+   | NHIS Data Partnerships |

## Repo Structure

```

/mobile
├── /patient-app
│   ├── /screens
│   ├── /services
│   ├── /hooks
├── /doctor-app
│   ├── /screens
│   ├── /components
│   ├── /utils

```

## DevOps & OTA

- OTA updates via Fastlane / Expo
- Error/crash monitoring via Sentry
- Test builds auto-generated with GitHub Actions

## Contribution Guide

1. Fork repository
2. Create a feature branch
3. Run tests and lint checks
4. Submit PR to `develop`
```

---

