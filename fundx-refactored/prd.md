```markdown

QUICKFUNDX
Smart Loans. Fast Approval. Real Growth.

PRODUCT REQUIREMENTS DOCUMENT
Full-Stack AI-Powered Fintech Loan Marketplace & DSA Ecosystem

Version 1.0  |  Confidential & Proprietary
Prepared for: Series A Investment Review
2025 — QuickFundX Technologies Pvt. Ltd.

TABLE OF CONTENTS


# SECTION 1 — PRODUCT FOUNDATION

## 1.1 Executive Summary
QuickFundX is India's next-generation AI-powered financial marketplace connecting borrowers, DSAs, NBFCs, and banks into a single, intelligent, compliance-ready ecosystem.

QuickFundX is a full-stack, enterprise-grade fintech SaaS platform engineered to eliminate the fragmentation, opacity, and inefficiency that characterizes India's lending distribution landscape. The platform delivers a unified digital infrastructure for loan origination, eligibility assessment, document verification, commission management, and partner ecosystem orchestration.
Built on a modern React + FastAPI + PostgreSQL technology stack, enriched with AI/ML-powered risk scoring, fraud detection, and smart bank-matching engines, QuickFundX is architected to process thousands of concurrent loan applications while maintaining sub-second response times, regulatory compliance (RBI, DPDP Act), and enterprise-grade security posture.
The platform serves seven distinct user personas — Customers, DSAs/Loan Agents, Banking Partners, Financial Institutions, Internal Managers, Admins, and Super Admins — through purpose-built dashboards, role-based access control, and intelligent workflow automation.

## 1.2 Product Vision
To become India's most trusted, intelligent, and inclusive financial marketplace — where every borrower finds the right loan product, every DSA maximizes their earning potential, and every lending institution accesses a qualified, verified, high-intent customer pipeline through AI-powered automation.

## 1.3 Mission Statement
QuickFundX's mission is to democratize access to formal credit across India by building a transparent, AI-augmented, multi-stakeholder fintech ecosystem that eliminates friction from loan discovery, application, underwriting, and disbursal — while empowering DSAs as a primary distribution force and providing banking partners with the highest-quality verified leads in the industry.

## 1.4 Business Goals
Achieve 50,000+ registered users and 500+ active DSA partners within 12 months of launch
Process INR 500 Crore+ in loan applications in Year 1, scaling to INR 5,000 Crore by Year 3
Onboard 25+ banking and NBFC partners across personal, business, home, car, and education loan verticals
Attain 40%+ loan-to-application conversion rate through AI-powered eligibility pre-screening
Build a white-label SaaS offering for regional NBFCs and fintech startups by Q4 2026
Establish QuickFundX as the #1 DSA management platform in India by AUM processed

## 1.5 Problem Statement
India's lending distribution ecosystem suffers from five critical structural failures:
Borrower-Lender Mismatch: 73% of loan applicants apply to the wrong institution based on informal referrals, resulting in rejections that damage credit scores and erode borrower confidence.
DSA Ecosystem Fragmentation: Over 2 million DSAs operate across India with no unified digital platform for lead management, commission tracking, real-time status updates, or sub-partner management.
Manual Underwriting Bottlenecks: Traditional banks take 7–21 days to process applications due to manual KYC, physical document verification, and legacy credit assessment workflows.
Compliance and Fraud Risk: Absence of centralized digital KYC, OCR validation, and AI fraud detection exposes lenders and DSAs to significant regulatory and financial risk.
Zero Data Intelligence: Lending institutions lack aggregated, anonymized borrower behavior data and market intelligence to make informed product and pricing decisions.

## 1.6 Market Gap Analysis
Despite the explosive growth of India's digital lending market — projected to reach $1.3 trillion by 2030 — no single platform exists that:
Unifies the borrower application journey with real-time multi-lender eligibility checking
Provides DSAs with a comprehensive CRM, earnings dashboard, sub-partner management, and real-time commission tracking
Offers banking partners a verified, pre-scored lead pipeline with AI risk profiles attached
Delivers AI-driven smart bank matching, automated document OCR, and fraud scoring in a single workflow
Supports white-label deployment for NBFCs and fintech startups seeking distribution infrastructure

## 1.7 Market Opportunity


## 1.8 Competitive Landscape


## 1.9 SWOT Analysis


## 1.10 Unique Selling Proposition
QuickFundX is the only platform in India that combines AI-powered loan matching, comprehensive DSA lifecycle management, real-time commission automation, and white-label lending infrastructure in a single, compliance-ready ecosystem.

## 1.11 Revenue Model & Monetization Strategy



# SECTION 2 — USER & BUSINESS ANALYSIS

## 2.1 User Personas

Persona 1: Retail Borrower

Persona 2: DSA / Loan Agent

Persona 3: Banking Partner / NBFC

## 2.2 User Stories
Customer Stories
As a customer, I want to check my loan eligibility in under 2 minutes by entering my CIBIL score and income, so I know which banks will likely approve my application before I apply.
As a customer, I want to upload my PAN and Aadhaar through a secure portal with OCR auto-fill, so I don't have to manually enter my personal details.
As a customer, I want to track my loan application status in real-time with SMS and WhatsApp notifications at every stage, so I am never left wondering about my application.
As a customer, I want an AI-generated recommendation of the top 3 loan products matching my profile, with EMI breakdowns and interest rate comparisons, so I can make an informed decision.

DSA Stories
As a DSA, I want to add customer leads through a mobile-friendly form, assign them to sub-partners, and track every stage of the loan journey from a single dashboard.
As a DSA, I want to see my pending, processing, and paid commissions in real-time with downloadable statements, so I can manage my cash flow effectively.
As a DSA, I want to generate and share a unique referral link that automatically tracks all leads and commissions originating from my network, so I can grow my sub-partner ecosystem.

Admin Stories
As an admin, I want to review and approve or reject KYC documents with an AI-assisted fraud flag system, so I can process verifications 5x faster than manual review.
As an admin, I want to view real-time analytics on application volumes, approval rates, DSA performance, and banking partner conversion metrics from a single command center dashboard.
As an admin, I want to configure loan product rules, commission tiers, and partner-specific eligibility parameters through a no-code admin panel.

## 2.3 Loan Lifecycle Analysis



# SECTION 3 — FULL FEATURE BREAKDOWN

## 3.1 Authentication & Security System
Authentication Features
OTP-based registration and login via SMS (MSG91) and WhatsApp (360dialog)
JWT Access Token (15-minute expiry) + Refresh Token (7-day expiry) rotation strategy
Role-Based Access Control (RBAC) with 7 distinct roles: Customer, DSA, Partner, Manager, Admin, Super Admin, Banking Partner
Secure password hashing using bcrypt with per-user salt (cost factor 12)
Device fingerprinting and suspicious login detection with admin alerts
Multi-factor authentication (MFA) support for Admin and Super Admin roles
Session invalidation on password change, suspicious activity detection, or manual admin revocation

## 3.2 Loan Marketplace — Full Feature Set
Loan Products Available
Personal Loans: ₹50,000 — ₹50,00,000, 12–60 months, 10.5–24% p.a.
Business Loans: ₹1,00,000 — ₹5,00,00,000, 12–84 months, 13–26% p.a.
Home Loans: ₹10,00,000 — ₹10,00,00,000, 120–360 months, 8.35–11% p.a.
Car Loans: ₹1,00,000 — ₹1,00,00,000, 12–84 months, 9–14% p.a.
Education Loans: ₹1,00,000 — ₹75,00,000, 12–180 months, 8.5–13% p.a.
Credit Cards: Curated card recommendations based on credit profile
Insurance Services: Term, health, and vehicle insurance via partner APIs
Working Capital Loans: For MSMEs, ₹5,00,000 — ₹2,00,00,000
Loan Against Property (LAP): Up to 70% LTV with property valuation integration

## 3.3 AI Eligibility Engine — Technical Specification
The Eligibility Engine processes 23 data points in real-time, delivering a loan eligibility score in under 30 seconds with 94.3% accuracy on historical validation sets.

Input Features

## 3.4 KYC Verification System
Document Processing Pipeline
Customer uploads PAN card image (JPEG/PNG/PDF, max 5MB) to secure S3 bucket
AWS Textract / Tesseract OCR extracts: Name, PAN Number, Date of Birth, Father's Name
Extracted data validated against Protean (NSDL) PAN verification API
Aadhaar upload processed with DigiLocker API or manual OCR with masked Aadhaar support
Face match API compares selfie with Aadhaar photo (liveness detection enabled)
AI fraud scoring checks for document tampering, font inconsistencies, metadata anomalies
Admin receives AI-flagged review queue with confidence scores for manual override
KYC status updated in real-time with customer and DSA notifications via WhatsApp + SMS

## 3.5 Partner / DSA System — Complete Feature Set
DSA Onboarding
Self-registration portal with GSTIN / PAN verification and bank account validation
Tiered partner levels: Bronze (0-10 cases/month), Silver (11-30), Gold (31-60), Platinum (61+)
Commission tier structure configurable by admin per product and partner tier
Sub-partner (sub-DSA) onboarding with multi-level referral tree (up to 3 levels)

Lead Management CRM
Add Customer Lead: Name, phone, email, loan type, amount, employment type, income, city
Lead Status Pipeline: New → Contacted → Document Submitted → Under Review → Approved → Disbursed → Rejected
Bulk lead import via CSV with automatic deduplication and validation
Lead assignment to sub-agents with workload balancing and notification triggers
Follow-up scheduler with WhatsApp reminder automation
Notes and activity log per lead with timestamp and agent attribution

Commission & Earnings Dashboard

## 3.6 Admin Control Center — Feature Architecture
Admin Dashboard Modules
Real-Time Operational Metrics: Active applications, KYC queue depth, pending approvals, today's disbursals
User Management: CRUD on all user accounts with role assignment, account suspension, audit trail
Loan Approval Workflow: Multi-stage review queue with AI risk flags, document viewer, approve/reject/escalate actions
KYC Verification Panel: AI-assisted document review with fraud confidence scores, bulk approval capability
Commission Management: Commission configuration, dispute resolution, bulk payout initiation, reconciliation reports
Partner Management: Banking partner onboarding, API credential management, webhook configuration
Notification Management: SMS/email/WhatsApp template management with A/B testing capability
Analytics Dashboard: Funnel analysis, cohort analysis, DSA performance leaderboard, loan product performance

## 3.7 AI & Smart Features — Complete Matrix



# SECTION 4 — FRONTEND ARCHITECTURE

check from existing folder


# SECTION 5 — BACKEND ARCHITECTURE

## 5.1 FastAPI Architecture Overview
QuickFundX's backend is a production-grade FastAPI (Python 3.11+) application using clean architecture principles: Service Layer → Repository Pattern → SQLAlchemy ORM → PostgreSQL.

## 5.2 Backend Folder Structure
app/
├── api/                        # FastAPI routers (versioned)
│   ├── v1/
│   │   ├── auth/               # Login, register, OTP, refresh
│   │   ├── loans/              # Application CRUD, status, eligibility
│   │   ├── kyc/                # Document upload, verification workflow
│   │   ├── dsa/                # Partner management, leads, commissions
│   │   ├── admin/              # Admin endpoints, approval workflows
│   │   ├── ai/                 # AI prediction, recommendation, OCR
│   │   └── notifications/      # Real-time + async notifications
├── core/                       # App configuration, security, dependencies
│   ├── config.py               # Pydantic Settings (env var management)
│   ├── security.py             # JWT, password hashing, token utilities
│   └── dependencies.py         # FastAPI dependency injection
├── models/                     # SQLAlchemy ORM models (database tables)
├── schemas/                    # Pydantic request/response schemas
├── services/                   # Business logic layer (pure Python)
├── repositories/               # Data access layer (SQLAlchemy queries)
├── tasks/                      # Celery background tasks
│   ├── email_tasks.py
│   ├── sms_tasks.py
│   ├── kyc_tasks.py
│   └── commission_tasks.py
├── ai/                         # ML model loading, prediction pipelines
│   ├── eligibility_model.py
│   ├── fraud_detector.py
│   ├── ocr_pipeline.py
│   └── recommendation_engine.py
├── integrations/               # Third-party API clients
│   ├── razorpay_client.py
│   ├── msg91_client.py
│   ├── digilocker_client.py
│   └── credit_bureau_client.py
├── migrations/                 # Alembic database migrations
└── main.py                     # FastAPI app factory + startup events

## 5.3 API Design Principles
RESTful endpoints versioned under /api/v1/ with backward compatibility guarantees
Consistent response envelope: { success, data, message, errors, pagination, meta }
HTTP status codes strictly followed: 200/201/204/400/401/403/404/422/429/500
Request validation via Pydantic v2 models with detailed error responses
API rate limiting: 100 req/min (public), 500 req/min (authenticated), 2000 req/min (admin)
OpenAPI 3.0 auto-documentation at /api/v1/docs with JWT authentication support

## 5.4 Key API Endpoints


## 5.5 Celery Background Task Architecture


# SECTION 6 — DATABASE DESIGN

## 6.1 PostgreSQL Schema Design
The QuickFundX database uses PostgreSQL 15+ with 27 normalized tables, UUID primary keys, JSONB for flexible attributes, and a comprehensive indexing strategy supporting sub-50ms query times at 1M+ row scale.

## 6.2 Core Table Specifications
users table

loan_applications table

commissions table

## 6.3 Database Indexing Strategy


# SECTION 7 — AI & MACHINE LEARNING ARCHITECTURE

## 7.1 AI System Overview
QuickFundX deploys a 7-model AI pipeline covering eligibility prediction, fraud detection, bank matching, OCR, customer segmentation, NLP chat assistance, and lead scoring — all served via FastAPI inference endpoints with Redis caching.

## 7.2 Loan Eligibility Prediction Model
Model Architecture: XGBoost Classifier + Calibrated Probability
Training dataset: 2M+ anonymized historical loan applications (synthetic augmentation for minority class)
Feature engineering: 23 input features, 8 derived features (debt-to-income ratio, EMI affordability index, credit utilization delta)
Model validation: 5-fold stratified cross-validation, AUC-ROC target >0.92
Deployment: Serialized model served via FastAPI + joblib, cached in Redis with 6-hour TTL
Retraining: Weekly automated retraining on new approved/rejected cases via Celery scheduled task
Explainability: SHAP values computed per prediction to provide human-readable eligibility explanations

## 7.3 Fraud Detection Pipeline
Multi-Layer Fraud Detection Architecture
Layer 1 — Document Forensics (CNN): Trained on 500K+ genuine and fraudulent PAN/Aadhaar images to detect tampering, font substitution, and metadata inconsistencies
Layer 2 — Behavioral Anomaly (Isolation Forest): Detects unusual application patterns — multiple applications from same device, abnormal income claims, suspicious coordinates
Layer 3 — Network Graph Analysis: Identifies fraud rings through shared phone numbers, addresses, employers, or bank accounts across applications
Layer 4 — Rule Engine: 47 configurable hard rules (blacklisted PAN, CIBIL below threshold, suspended device IDs)
Layer 5 — Ensemble Scoring: Weighted combination of all layers into a single fraud probability score (0-1), with admin alert threshold at 0.7+

## 7.4 OpenAI Integration — AI Chat Assistant
Financial Assistant Architecture
Model: GPT-4o with system prompt fine-tuned for Indian fintech context (RBI compliance, product knowledge, eligibility guidance)
Retrieval Augmented Generation (RAG): Product catalog, FAQ database, and loan policy documents indexed in a vector store for accurate, grounded responses
Conversation memory: Last 10 turns maintained per session in Redis for context continuity
Safety guardrails: PII redaction middleware strips sensitive data before sending to OpenAI API
Escalation logic: Automatically routes to human support when confidence score <0.6 or intent classified as 'complaint'

## 7.5 AI Ethics & Bias Prevention Framework
Fairness auditing: Monthly demographic parity and equalized odds analysis across gender, income bracket, and geography
Feature prohibition: Caste, religion, gender, and geography excluded as direct model inputs
Bias testing: Regular adversarial testing with synthetic demographic variants to detect proxy discrimination
Model governance: All model deployments require Sign-off from designated AI Ethics Officer before production release
Regulatory compliance: AI decisions that affect credit access include mandatory human review override capability per RBI AI/ML guidelines


# SECTION 8 — SECURITY & COMPLIANCE ARCHITECTURE

## 8.1 Security Architecture

## 8.2 RBI / Indian Fintech Compliance
RBI Digital Lending Guidelines (2022): Loan Service Provider (LSP) registration, KFS disclosure, digital consent capture, cooling-off period support
Account Aggregator (AA) Framework: Integration-ready architecture for consent-based financial data sharing via NBFC-AA APIs
DPDP Act 2023 Compliance: Data principal consent management, right to erasure implementation, cross-border data transfer restrictions
PCI DSS: No raw card data stored; Razorpay handles all payment processing with PCI DSS Level 1 certification
Aadhaar Act: Offline Aadhaar XML-based KYC only (no biometric collection), face match via licensed bureau APIs
CIBIL / Experian: Bureau inquiry consent captured before pulling credit report, inquiry type disclosed to customer


# SECTION 9 — DEVOPS & CLOUD INFRASTRUCTURE

## 9.1 Infrastructure Architecture
QuickFundX uses a containerized, cloud-native architecture deployed on AWS (production) with Vercel for frontend CDN delivery and GitHub Actions for full CI/CD automation.


## 9.2 CI/CD Pipeline — GitHub Actions
Pipeline Stages
Trigger: Push to feature/* or PR to develop/main branch
Lint & Type Check: ESLint + TypeScript check (frontend), Ruff + mypy (backend)
Unit Tests: Pytest (backend, >85% coverage threshold), Vitest (frontend)
Integration Tests: FastAPI TestClient against PostgreSQL test database
Security Scan: Trivy container scanning, Bandit Python security lint, OWASP Dependency Check
Build: Docker image build with multi-stage Dockerfile, image tagged with git SHA
Push: Docker image pushed to AWS ECR (prod) / GitHub Container Registry (staging)
Deploy: ECS service update with rolling deployment, health check validation
Smoke Test: Automated API health check against deployed environment
Notify: Slack notification with deployment status, build duration, and test results

## 9.3 Docker Compose — Local Development
version: '3.9'
services:
db:
image: postgres:15-alpine
environment:
POSTGRES_DB: quickfundx_dev
POSTGRES_USER: qfx_user
POSTGRES_PASSWORD: ${DB_PASSWORD}
ports: ['5432:5432']
volumes: [postgres_data:/var/lib/postgresql/data]

redis:
image: redis:7-alpine
ports: ['6379:6379']
command: redis-server --requirepass ${REDIS_PASSWORD}

backend:
build: ./backend
ports: ['8000:8000']
environment:
DATABASE_URL: postgresql://qfx_user:${DB_PASSWORD}@db:5432/quickfundx_dev
REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379/0
depends_on: [db, redis]
volumes: [./backend:/app]

celery_worker:
build: ./backend
command: celery -A app.tasks worker --loglevel=info --concurrency=4
depends_on: [redis, db]

frontend:
build: ./frontend
ports: ['3000:3000']
volumes: [./frontend:/app, /app/node_modules]


# SECTION 10 — THIRD-PARTY INTEGRATIONS

## 10.1 Integration Ecosystem



# SECTION 11 — UI/UX DESIGN SYSTEM

## 11.1 Design Philosophy
QuickFundX's design system is built on the principle of Trustworthy Simplicity — a financial product must project credibility through visual clarity, reduce cognitive load through progressive disclosure, and build confidence through real-time transparency. Every interface decision is anchored in conversion optimization and accessibility.

## 11.2 Color Palette Strategy


## 11.3 Typography System

## 11.4 Animation Strategy — Framer Motion
Page transitions: Fade + slide (200ms ease-out) for route changes, preventing jarring context switches
Dashboard KPIs: Number counting animation on mount (800ms) for engagement and visual confirmation of data load
Loan application steps: Slide-in from right (300ms spring) for forward progression, slide-in from left for back navigation
AI eligibility score reveal: Circular progress animation (1200ms) with color transition from gray to brand-green for approved scores
Card hover states: Subtle Y-translation (-4px, 150ms) with shadow elevation increase for interactive depth cues
Loading states: Skeleton screens (shimmer effect) instead of spinners to reduce perceived wait time


# SECTION 12 — TESTING & QUALITY ASSURANCE

## 12.1 Testing Strategy

## 12.2 Critical Test Scenarios
Loan Application Flow
Happy path: Customer registers → OTP verify → complete application → AI eligibility score → bank match → document upload → submission confirmation
Rejection path: Low CIBIL score triggers early eligibility failure with alternative product suggestions
Partial application: User abandons at step 3, returns and resumes from last saved step
Concurrent applications: Same customer attempts 2 simultaneous applications — system deduplicates

Financial Integrity Tests
Commission calculation accuracy: Verify commission computation across 50 edge case loan amounts, tiers, and product types
Double-payout prevention: Confirm idempotency key prevents duplicate Razorpay payout for same commission record
TDS deduction: Verify 10% TDS correctly applied for DSAs without PAN on file


# SECTION 13 — PRODUCT ROADMAP

## 13.1 MVP Scope — Phase 1 (Months 1–4)
MVP Focus: Core loan marketplace, customer application flow, basic DSA management, KYC pipeline, and admin approval workflow with 3+ banking partners.


## 13.2 Phase-Wise Development Roadmap


## 13.3 Engineering Team Structure

## 13.4 Future AI Features Roadmap
Vernacular Financial Assistant: Hindi, Marathi, Tamil, Telugu-language AI chat for tier-2/3 city borrowers
Video KYC (VKYC): Automated video KYC with real-time liveness detection and document capture for RBI-mandated V-KYC
Predictive Lead Scoring: AI-predicted conversion probability for DSA leads to prioritize follow-up actions
Dynamic Pricing Engine: Real-time interest rate recommendation engine based on borrower risk profile and lender portfolio targets
Voice-Based Application: IVR-integrated loan application flow for feature phone users in rural markets
Alternative Credit Scoring: Psychometric testing, utility payment history, and UPI transaction analysis for thin-file borrowers


# SECTION 14 — INVESTOR & BUSINESS SUMMARY

## 14.1 Investment Thesis
QuickFundX is building the operating system for India's lending distribution ecosystem — a multi-billion dollar market with no dominant digital platform. We combine fintech infrastructure, AI intelligence, and a 2M+ DSA distribution network into a defensible, high-margin SaaS+marketplace business.


## 14.2 Scalability Architecture
Horizontal API scaling via AWS ECS Fargate with auto-scaling policies based on CPU (70% threshold) and request rate
Database read replica scaling for analytics and reporting queries (isolating from write traffic)
Redis cluster mode for cache layer scaling to 100K+ concurrent sessions
Event-driven architecture (AWS EventBridge / Kafka) for decoupled microservices decomposition in Phase 4
Multi-tenant white-label architecture: Schema-based or database-based tenant isolation configurable per enterprise client
CDN-accelerated frontend with Vercel edge functions for sub-100ms global response times

## 14.3 Risk Factors & Mitigation

## 14.4 Long-Term Vision — 5 Year
QuickFundX aims to become India's largest independent lending distribution platform by 2030, processing ₹1 Lakh Crore+ in annual loan disbursals across 500,000 active DSA partners, 200+ banking and NBFC partners, and 50 million registered borrower profiles — while generating INR 500+ Crore in annual platform revenue through a combination of marketplace commissions, SaaS subscriptions, and AI data products.

## 14.5 Exit Strategy
Strategic Acquisition: Target acquirers include Bajaj Finserv, PayU, PhonePe, HDFC Bank Digital, or global fintech platforms entering India
IPO Path: Scale to ₹200 Crore ARR, profitability, and 5+ years of audited financials to support NSE Emerge or BSE SME listing by 2029
International Expansion: Platform architecture designed for Southeast Asian replication (Indonesia, Vietnam, Philippines) where DSA-based lending distribution is similarly underdigitized

## 14.6 Technical Summary


QUICKFUNDX TECHNOLOGIES PVT. LTD.
Smart Loans. Fast Approval. Real Growth.
This document is confidential and proprietary. Unauthorized distribution is prohibited.


| Market Segment | 2024 Size (INR) | 2030 Projection (INR) | CAGR |
| --- | --- | --- | --- |
| India Digital Lending Market | ₹12.6 Lakh Crore | ₹1,00,000 Crore+ | 22.4% |
| DSA / Loan Agent Ecosystem | ₹3,200 Crore Commission Pool | ₹18,000 Crore | 33% |
| Fintech SaaS (Lending Tech) | ₹4,800 Crore | ₹32,000 Crore | 37% |
| SME/MSME Lending | ₹69.3 Lakh Crore Gap | ₹87 Lakh Crore | 19% |
| Personal Loan Market | ₹10.4 Lakh Crore | ₹42 Lakh Crore | 26% |




| Platform | Type | AI Features | DSA Management | White-Label | Multi-Product |
| --- | --- | --- | --- | --- | --- |
| BankBazaar | Aggregator | Basic | None | No | Yes |
| Paisabazaar | Aggregator | Basic Eligibility | None | No | Yes |
| IndiaLends | Marketplace | Moderate | Partial | No | Limited |
| LoanTap | Direct Lender | Internal Only | None | No | No |
| Rupeek | Niche (Gold) | None | None | No | No |
| QuickFundX | AI Marketplace + DSA SaaS | Full AI Suite | Comprehensive | Yes | Yes |




| STRENGTHS | WEAKNESSES | OPPORTUNITIES | THREATS |
| --- | --- | --- | --- |
| AI-first architecture with fraud detection, risk scoring, and smart matching | Early-stage brand recognition against established aggregators | India's 2M+ undigitized DSA base represents a massive untapped market | Regulatory changes (RBI digital lending guidelines) require rapid adaptation |
| Full-stack DSA management missing in all competitors | Dependency on banking partner API integration timelines | MSME and rural lending digitization with vernacular AI assistant | Competition from well-funded fintech unicorns expanding into aggregation |
| White-label SaaS revenue model enables B2B2C scaling | Initial cold-start challenge building banking partner network | Insurance, mutual funds, and credit card cross-sell expansion | Data privacy regulations (DPDP Act) requiring compliance investment |




| Revenue Stream | Model | Estimated Contribution | Year 1 Target |
| --- | --- | --- | --- |
| Lender Lead Fees | Per-qualified-lead fee from banking partners | 35% | ₹1.8 Crore |
| Commission Spread (DSA) | Margin on DSA commissions processed | 25% | ₹1.2 Crore |
| SaaS Subscription (Partners) | Monthly SaaS for banking partners & NBFCs | 20% | ₹96 Lakh |
| White-Label Licensing | Platform licensing to NBFCs/fintechs | 12% | ₹58 Lakh |
| AI Analytics (Premium) | Data insights subscription for lenders | 5% | ₹24 Lakh |
| Payment Processing Fees | Razorpay-powered commission payouts | 3% | ₹14 Lakh |




| Attribute | Detail |
| --- | --- |
| Name | Rajesh Verma — 34, Salaried Professional, Tier-2 City |
| Goal | Get a personal loan of ₹5L for home renovation at the lowest EMI |
| Pain Points | Unsure which bank will approve, fears credit score impact from multiple applications |
| Tech Comfort | Moderate — uses Google Pay, watches YouTube, owns Android smartphone |
| Core Need | Single eligibility check, transparent bank comparison, real-time status updates |
| Success Metric | Loan disbursed within 72 hours at agreed rate without branch visits |




| Attribute | Detail |
| --- | --- |
| Name | Priya Sharma — 29, Independent DSA, Mumbai |
| Goal | Manage 40+ leads/month, track commissions in real-time, build sub-DSA network |
| Pain Points | Manual Excel tracking, delayed commission payouts, no centralized CRM, no sub-partner visibility |
| Tech Comfort | High — uses multiple fintech apps, comfortable with dashboards |
| Core Need | Lead CRM, real-time commission dashboard, referral tree, WhatsApp lead sharing |
| Success Metric | 20% increase in monthly commission income, zero missed follow-ups |




| Attribute | Detail |
| --- | --- |
| Name | Axis Finance — Regional NBFC, Pune |
| Goal | Receive pre-scored, KYC-verified loan leads with AI risk profiles |
| Pain Points | High fraud rate from unverified leads, manual document processing, poor lead quality |
| Tech Comfort | High — has internal tech team, needs API-first integration |
| Core Need | Webhook-based lead delivery, AI credit scores, document OCR, compliance reports |
| Success Metric | 30% reduction in loan processing time, 50% reduction in fraud applications |




| Stage | Actor | System Action | AI Involvement | SLA |
| --- | --- | --- | --- | --- |
| Lead Creation | Customer / DSA | Profile captured, eligibility pre-check triggered | AI segment scoring | Instant |
| Eligibility Check | System | CIBIL + income + bureau data processed | ML eligibility model | <30 seconds |
| Bank Matching | AI Engine | Top 3 banks matched to borrower profile | Smart matching algorithm | <10 seconds |
| Application Submission | Customer | Multi-step form with document upload | OCR + AI field extraction | <15 min |
| KYC Verification | Admin / AI | Aadhaar/PAN verified, fraud scoring | AI fraud detection | 2-4 hours |
| Credit Underwriting | Banking Partner | Internal credit decision with AI risk score | XGBoost risk model | 24-72 hours |
| Approval/Rejection | Banking Partner | Automated notification sent, DSA alerted | N/A | Instant notify |
| Disbursal | Banking Partner | Amount credited, commission triggered | Commission auto-calc | T+1 to T+3 |
| Commission Payout | System | DSA wallet credited, payout initiated | Automated reconciliation | T+7 |




| Feature Category | Input Variables | Weight in Model |
| --- | --- | --- |
| Credit Profile | CIBIL score, DPD history, active loans count, credit utilization | 35% |
| Income & Employment | Monthly income, employer type, employment duration, ITR filed | 30% |
| Demographic | Age, city tier, residential status (own/rent), years at address | 15% |
| Banking Behavior | Average bank balance, salary credit regularity, EMI obligations | 15% |
| Platform Behavior | Application history, document completeness score, KYC status | 5% |




| Commission Type | Calculation Basis | Payout Trigger | Timeline |
| --- | --- | --- | --- |
| Disbursement Commission | % of disbursed loan amount (0.5–2.5%) | Bank confirms disbursal | T+7 days |
| Processing Fee Share | Flat fee per approved application | Application approval | T+3 days |
| Sub-Agent Override | % of sub-agent's commission (5–15%) | Sub-agent disbursement | T+10 days |
| Referral Bonus | Flat bonus for new DSA registration | DSA first disbursement | T+30 days |
| Performance Bonus | Tier-based quarterly bonus | Quarter end | 30 days post-quarter |




| AI Feature | Technology | Input | Output | Accuracy Target |
| --- | --- | --- | --- | --- |
| Loan Eligibility Prediction | XGBoost + Scikit-learn | 23 borrower features | Eligibility score 0-100 + bank list | 94%+ |
| Credit Risk Scoring | Gradient Boosting + Neural Net | Bureau data + platform behavior | Risk tier (A/B/C/D) + default probability | 91%+ |
| Fraud Detection | Isolation Forest + CNN | Document images + metadata + behavior | Fraud probability score 0-1 | 96%+ |
| Smart Bank Matching | Collaborative Filtering + Rules Engine | Borrower profile + bank criteria | Ranked list of 3-5 compatible lenders | 88%+ |
| AI Document OCR | AWS Textract + Tesseract | PAN/Aadhaar/ITR document images | Structured JSON with extracted fields | 98%+ field accuracy |
| AI Chat Assistant | OpenAI GPT-4o fine-tuned | User query in natural language | Loan guidance, FAQ, next action suggestion | 95% resolution rate |
| Customer Segmentation | K-Means + RFM Analysis | Transaction and behavior data | Segment labels for targeted campaigns | Silhouette >0.65 |
| Lead Scoring (DSA) | Logistic Regression | Lead profile + DSA conversion history | Lead conversion probability | 82%+ |




| Store | Responsibility | Persistence |
| --- | --- | --- |
| authStore | Current user, JWT token, role, permissions | localStorage (encrypted) |
| uiStore | Sidebar state, theme, loading indicators, modal state | Session only |
| notificationStore | Real-time notification queue, unread count, toast queue | Session only |
| loanStore | Active loan application state, multi-step form data | sessionStorage |
| dsaStore | DSA's lead pipeline, commission summary, team tree | React Query cache |
| adminStore | Admin dashboard metrics, approval queue state | React Query cache |




| Route | Page Component | Auth Required | Roles |
| --- | --- | --- | --- |
| / | HomePage | No | Public |
| /about | AboutPage | No | Public |
| /contact | ContactPage | No | Public |
| /loans | AllLoansPage | No | Public |
| /loans/personal | PersonalLoanPage | No | Public |
| /loans/business | BusinessLoanPage | No | Public |
| /loans/education | EducationLoanPage | No | Public |
| /eligibility | EligibilityCheckerPage | No | Public |
| /apply/:loanType | LoanApplicationPage | Yes | Customer |
| /auth/login | LoginPage | No | Public |
| /auth/register | RegisterPage | No | Public |
| /auth/otp | OTPVerificationPage | No | Public |
| /dashboard | CustomerDashboard | Yes | Customer |
| /dashboard/applications | MyApplicationsPage | Yes | Customer |
| /dashboard/profile | UserProfilePage | Yes | Customer |
| /dsa/dashboard | DSADashboard | Yes | DSA |
| /dsa/leads | LeadManagementPage | Yes | DSA |
| /dsa/commissions | CommissionPage | Yes | DSA |
| /dsa/referrals | ReferralSystemPage | Yes | DSA |
| /admin/dashboard | AdminDashboard | Yes | Admin, SuperAdmin |
| /admin/users | UserManagementPage | Yes | Admin, SuperAdmin |
| /admin/loans | LoanApprovalPage | Yes | Admin, SuperAdmin |
| /admin/kyc | KYCVerificationPage | Yes | Admin, SuperAdmin |
| /admin/analytics | AnalyticsDashboard | Yes | Admin, SuperAdmin |
| /blog | BlogPage | No | Public |
| /faq | FAQPage | No | Public |
| /privacy | PrivacyPolicyPage | No | Public |




| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | /api/v1/auth/register | Public | Register new user with phone/email |
| POST | /api/v1/auth/otp/send | Public | Send OTP to phone number |
| POST | /api/v1/auth/otp/verify | Public | Verify OTP and issue JWT |
| POST | /api/v1/auth/refresh | JWT | Refresh access token |
| GET | /api/v1/loans/products | Public | List all loan products |
| POST | /api/v1/loans/eligibility | JWT | Run eligibility check |
| POST | /api/v1/loans/applications | JWT | Submit loan application |
| GET | /api/v1/loans/applications/{id} | JWT | Get application status |
| POST | /api/v1/kyc/upload | JWT | Upload KYC document to S3 |
| GET | /api/v1/kyc/status | JWT | Get KYC verification status |
| POST | /api/v1/ai/eligibility-score | JWT | Get AI eligibility prediction |
| POST | /api/v1/ai/recommend-banks | JWT | Get AI bank recommendations |
| POST | /api/v1/ai/ocr/pan | JWT | OCR extract PAN card data |
| GET | /api/v1/dsa/leads | DSA+ | Get DSA's lead pipeline |
| POST | /api/v1/dsa/leads | DSA+ | Add new customer lead |
| GET | /api/v1/dsa/commissions | DSA+ | Get commission summary |
| GET | /api/v1/admin/dashboard/metrics | Admin+ | Real-time operational metrics |
| PUT | /api/v1/admin/loans/{id}/approve | Admin+ | Approve loan application |
| GET | /api/v1/admin/kyc/queue | Admin+ | Get KYC review queue |




| Task Name | Trigger | Queue | Retry Policy |
| --- | --- | --- | --- |
| send_otp_sms | OTP request | high_priority | 3 retries, 5s backoff |
| send_whatsapp_notification | Application status change | notifications | 5 retries, exponential backoff |
| process_kyc_ocr | Document upload | ai_processing | 3 retries, 30s backoff |
| run_fraud_detection | KYC submission | ai_processing | 2 retries, 60s backoff |
| calculate_commission | Disbursal event | financial | 5 retries, no data loss guarantee |
| send_payout_razorpay | Commission approval | financial | 3 retries, idempotent key |
| generate_credit_report | Application submission | external_apis | 4 retries, 120s backoff |
| send_email_report | Weekly schedule (cron) | scheduled | 3 retries |




| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | UUID | PK, DEFAULT gen_random_uuid() | Unique user identifier |
| phone | VARCHAR(15) | UNIQUE, NOT NULL | Primary identifier for OTP auth |
| email | VARCHAR(255) | UNIQUE, NULLABLE | Optional email address |
| full_name | VARCHAR(255) | NOT NULL | User's full legal name |
| role | ENUM | NOT NULL | customer/dsa/partner/manager/admin/superadmin |
| is_verified | BOOLEAN | DEFAULT FALSE | Phone verification status |
| is_active | BOOLEAN | DEFAULT TRUE | Account active status |
| kyc_status | ENUM | DEFAULT 'pending' | pending/submitted/verified/rejected |
| referred_by | UUID | FK users.id, NULLABLE | Referral attribution |
| dsa_tier | ENUM | NULLABLE | bronze/silver/gold/platinum |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Account creation timestamp |
| last_login_at | TIMESTAMPTZ | NULLABLE | Last successful login |




| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | UUID | PK | Application identifier |
| application_number | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable ref: QFX-2025-XXXXX |
| customer_id | UUID | FK users.id, NOT NULL | Borrower reference |
| dsa_id | UUID | FK users.id, NULLABLE | Originating DSA |
| loan_product_id | UUID | FK loan_products.id | Product reference |
| requested_amount | NUMERIC(15,2) | NOT NULL | Requested loan amount |
| approved_amount | NUMERIC(15,2) | NULLABLE | Approved amount (post-review) |
| tenure_months | INTEGER | NOT NULL | Loan tenure in months |
| interest_rate | NUMERIC(5,3) | NULLABLE | Offered interest rate |
| status | ENUM | NOT NULL | draft/submitted/under_review/approved/rejected/disbursed |
| ai_eligibility_score | NUMERIC(5,2) | NULLABLE | AI eligibility score (0-100) |
| ai_risk_tier | ENUM | NULLABLE | A/B/C/D risk classification |
| fraud_score | NUMERIC(5,4) | NULLABLE | AI fraud probability (0-1) |
| assigned_bank_id | UUID | FK banking_partners.id | Matched banking partner |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Application submission time |
| updated_at | TIMESTAMPTZ | AUTO-UPDATE | Last status update |




| Column | Type | Constraints | Description |
| --- | --- | --- | --- |
| id | UUID | PK | Commission record ID |
| dsa_id | UUID | FK users.id, NOT NULL | DSA earning the commission |
| application_id | UUID | FK loan_applications.id | Associated loan application |
| commission_type | ENUM | NOT NULL | disbursement/processing/referral/bonus |
| gross_amount | NUMERIC(12,2) | NOT NULL | Commission before TDS |
| tds_amount | NUMERIC(12,2) | DEFAULT 0 | TDS deduction (10% if PAN available) |
| net_amount | NUMERIC(12,2) | NOT NULL | Final payout amount |
| status | ENUM | NOT NULL | pending/approved/processing/paid/failed |
| payout_reference | VARCHAR(100) | NULLABLE | Razorpay payout ID |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Commission trigger time |
| paid_at | TIMESTAMPTZ | NULLABLE | Actual payout timestamp |




| Table | Index Columns | Type | Query Pattern Optimized |
| --- | --- | --- | --- |
| users | phone, email | B-tree UNIQUE | Auth lookup, deduplication |
| users | referred_by, created_at | B-tree composite | Referral tree queries |
| loan_applications | customer_id, status | B-tree composite | Customer application list |
| loan_applications | dsa_id, created_at | B-tree composite | DSA lead pipeline |
| loan_applications | status, created_at | B-tree composite | Admin queue queries |
| commissions | dsa_id, status | B-tree composite | DSA commission dashboard |
| commissions | application_id | B-tree | Commission per application |
| audit_logs | user_id, created_at | B-tree composite | User activity queries |
| notifications | user_id, is_read | B-tree composite | Unread notification count |
| kyc_documents | user_id, doc_type | B-tree composite | KYC status checks |




| Security Layer | Implementation | Standard |
| --- | --- | --- |
| Transport Security | TLS 1.3 enforced, HSTS with 1-year max-age, HTTPS-only | NIST, PCI DSS |
| Authentication | JWT RS256 (asymmetric), 15-min expiry, rotating refresh tokens | OWASP ASVS L2 |
| Password Storage | bcrypt (cost=12) with per-user salt, pepper in environment | OWASP ASVS L2 |
| API Security | Rate limiting (Redis), CORS whitelist, request signing for webhooks | OWASP API Top 10 |
| Data Encryption at Rest | AES-256-GCM for PII fields, AWS S3 SSE for documents | ISO 27001 |
| Document Storage | Signed S3 URLs (15-min expiry), no public bucket access | PCI DSS |
| Database Security | Connection pooling with SSL, read replicas for analytics only | CIS PostgreSQL Benchmark |
| Input Validation | Pydantic v2 validation on all inputs, parameterized queries (no raw SQL) | OWASP Top 10 A03 |
| Secret Management | AWS Secrets Manager / HashiCorp Vault for production secrets | CIS AWS Benchmark |
| Audit Logging | Immutable audit log for all admin actions and sensitive data access | RBI IT Framework |




| Component | Technology | Environment | Scaling Strategy |
| --- | --- | --- | --- |
| Frontend CDN | Vercel (React/Vite build) | Production | Global edge network auto-scaling |
| API Backend | FastAPI on AWS ECS (Fargate) | Production | Horizontal auto-scaling (2-20 tasks) |
| Background Workers | Celery on AWS ECS | Production | Queue-depth-based auto-scaling |
| Primary Database | AWS RDS PostgreSQL 15 (Multi-AZ) | Production | Vertical + read replica scaling |
| Cache Layer | AWS ElastiCache Redis 7 | Production | Cluster mode with 3 shards |
| Message Broker | AWS MQ (RabbitMQ) / Redis Streams | Production | High availability pair |
| File Storage | AWS S3 + CloudFront CDN | Production | Unlimited, class-based tiering |
| Reverse Proxy | NGINX on AWS ALB | Production | L7 load balancing, WAF integration |
| Secrets | AWS Secrets Manager | Production | Automatic rotation every 30 days |
| Monitoring | AWS CloudWatch + Sentry + Grafana | All environments | Alerting at 95th percentile |
| Staging Environment | Railway / Render | Staging | Single-instance, branch-based |
| Local Development | Docker Compose | Dev | Full stack: API + DB + Redis + Worker |




| Integration | Provider | Purpose | Priority |
| --- | --- | --- | --- |
| SMS OTP & Notifications | MSG91 / 2Factor | OTP delivery, transactional SMS, WhatsApp | P0 — Launch Blocker |
| WhatsApp Business API | 360dialog / WATI | Application updates, commission alerts, lead sharing | P0 — Launch Blocker |
| Payment Gateway | Razorpay | Commission payouts, bank verification (Penny Drop) | P0 — Launch Blocker |
| PAN Verification | Protean (NSDL) / Karza | PAN KYC validation | P0 — Launch Blocker |
| Aadhaar Verification | DigiLocker API / UIDAI | Offline Aadhaar XML KYC | P0 — Launch Blocker |
| Credit Bureau | CIBIL TransUnion + Experian | Credit score pull, bureau report | P0 — Launch Blocker |
| Document OCR | AWS Textract + Tesseract | PAN, Aadhaar, ITR, bank statement extraction | P0 — Launch Blocker |
| Email Service | AWS SES / SendGrid | Transactional emails, weekly reports | P1 |
| AI / LLM | OpenAI GPT-4o API | Financial chat assistant, document analysis | P1 |
| Cloud Storage | AWS S3 + CloudFront | KYC document storage, CDN delivery | P0 — Launch Blocker |
| Face Match / Liveness | IDfy / HyperVerge | Selfie-to-Aadhaar face match for KYC | P1 |
| Bank Account Verify | Razorpay Route (Penny Drop) | DSA bank account validation for payouts | P1 |
| Google Analytics | GA4 + GTM | User behavior analytics, conversion tracking | P2 |
| Error Monitoring | Sentry | Frontend + backend error tracking | P1 |
| SMS Fallback | Twilio | International OTP fallback | P2 |




| Token | Hex Value | Usage |
| --- | --- | --- |
| brand-primary | #1A7A4A | Primary CTAs, active states, progress indicators, brand headers |
| brand-dark | #0D2137 | Navigation, primary text headings, trusted/secure contexts |
| accent-teal | #0F766E | Secondary actions, informational callouts, feature highlights |
| brand-green-light | #E8F5EE | Success states, eligibility confirmed, approved application badges |
| status-warning | #F59E0B | Pending review, under processing, attention required |
| status-error | #EF4444 | Rejected, failed, error states, fraud flags |
| status-success | #10B981 | Disbursed, paid, verified, approved states |
| neutral-50 to 950 | #F8FAFC to #020617 | Body text, borders, backgrounds, disabled states |
| white | #FFFFFF | Card backgrounds, form inputs, modal surfaces |




| Scale | Size | Weight | Usage |
| --- | --- | --- | --- |
| Display | 48px / 3rem | 700 Bold | Hero sections, landing page headline |
| H1 | 36px / 2.25rem | 700 Bold | Page titles, dashboard section headers |
| H2 | 28px / 1.75rem | 600 SemiBold | Card titles, section headings |
| H3 | 22px / 1.375rem | 600 SemiBold | Feature names, data table headers |
| Body Large | 18px / 1.125rem | 400 Regular | Primary body text, descriptions |
| Body | 16px / 1rem | 400 Regular | Standard UI text, form labels |
| Body Small | 14px / 0.875rem | 400 Regular | Helper text, metadata, timestamps |
| Caption | 12px / 0.75rem | 400 Regular | Badges, status chips, footnotes |
| Number Large | 32px / 2rem | 700 Bold | Dashboard KPI metrics, loan amounts |




| Test Type | Framework | Coverage Target | Scope |
| --- | --- | --- | --- |
| Unit Tests (Backend) | Pytest + pytest-asyncio | 85% line coverage | Service layer, utility functions, model logic |
| Unit Tests (Frontend) | Vitest + React Testing Library | 75% line coverage | Components, hooks, utility functions |
| Integration Tests | Pytest + FastAPI TestClient | All critical paths | API endpoints, database operations, auth flows |
| E2E Tests | Playwright | Key user journeys | Loan application, KYC, DSA commission, admin approval |
| API Contract Tests | Pact (Consumer-Driven) | All API contracts | Frontend-backend interface contracts |
| Load Tests | k6 | 1,000 concurrent users | Eligibility engine, loan application submission |
| Security Tests | OWASP ZAP + Bandit + Trivy | OWASP Top 10 | Authentication, injection, SSRF, secrets exposure |
| Performance Tests | Lighthouse CI | Score >90 all metrics | Frontend performance, Core Web Vitals |




| Feature | Priority | Effort (Dev Days) | Owner |
| --- | --- | --- | --- |
| Authentication (OTP + JWT + RBAC) | P0 | 8 | Backend |
| Customer Registration + Profile | P0 | 5 | Full Stack |
| Loan Product Pages (5 products) | P0 | 10 | Frontend |
| Loan Eligibility Checker (AI) | P0 | 15 | AI + Backend |
| Multi-Step Loan Application Form | P0 | 12 | Frontend + Backend |
| KYC Document Upload + OCR | P0 | 14 | Backend + AI |
| Customer Dashboard | P0 | 8 | Frontend |
| Admin Dashboard + Approval Workflow | P0 | 16 | Full Stack |
| DSA Registration + Lead CRM (Basic) | P0 | 12 | Full Stack |
| Commission Tracking (View Only) | P0 | 6 | Backend + Frontend |
| SMS + Email Notifications | P0 | 7 | Backend |
| Banking Partner Onboarding (Manual) | P0 | 5 | Backend + Admin |
| EMI Calculator | P1 | 3 | Frontend |
| Real-Time Status Tracking | P1 | 8 | Backend + Frontend |




| Phase | Timeline | Key Deliverables | Revenue Target |
| --- | --- | --- | --- |
| Phase 1: MVP | Months 1–4 | Core marketplace, KYC, basic DSA, admin workflows, 3 banking partners | ₹15 Lakh MRR |
| Phase 2: Scale | Months 5–8 | AI bank matching, commission automation, Razorpay payouts, WhatsApp integration, 10 partners | ₹45 Lakh MRR |
| Phase 3: Intelligence | Months 9–12 | Full AI suite, OCR pipeline, fraud detection, referral leaderboard, 25 partners | ₹90 Lakh MRR |
| Phase 4: SaaS | Months 13–18 | White-label SaaS, multi-tenant architecture, enterprise API, mobile app | ₹2 Crore MRR |
| Phase 5: Expansion | Months 19–24 | Insurance, mutual funds, credit cards, vernacular AI, B2B2C marketplace | ₹5 Crore MRR |




| Role | Count (MVP) | Count (Phase 3) | Key Responsibility |
| --- | --- | --- | --- |
| Frontend Engineers (React/TS) | 2 | 4 | Component library, dashboards, application flows |
| Backend Engineers (FastAPI/Python) | 2 | 4 | API design, database, integrations, background tasks |
| AI/ML Engineer | 1 | 2 | Model development, OCR pipeline, fraud detection |
| DevOps / Cloud Engineer | 1 | 2 | CI/CD, AWS infrastructure, monitoring, security |
| Product Manager | 1 | 1 | Roadmap, stakeholder management, PRD ownership |
| UI/UX Designer | 1 | 2 | Design system, wireframes, user research |
| QA Engineer | 1 | 2 | Test automation, security testing, release validation |
| Business Development | 1 | 3 | Banking partner onboarding, DSA recruitment |
| TOTAL | 10 | 20 | — |




| Metric | Year 1 Target | Year 2 Target | Year 3 Target |
| --- | --- | --- | --- |
| Registered Users | 50,000 | 2,00,000 | 8,00,000 |
| Active DSA Partners | 500 | 3,000 | 15,000 |
| Banking / NBFC Partners | 10 | 30 | 75 |
| Loan Applications Processed | 25,000 | 1,50,000 | 8,00,000 |
| Gross Loan Value Facilitated | ₹500 Crore | ₹3,500 Crore | ₹18,000 Crore |
| Annual Revenue (Gross) | ₹5 Crore | ₹32 Crore | ₹160 Crore |
| Gross Margin | 58% | 65% | 72% |
| Monthly Burn Rate | ₹25 Lakh | ₹60 Lakh | ₹1.5 Crore |




| Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- |
| Banking partner acquisition delay | Medium | High | Parallel onboarding of 5+ partners in pre-launch; revenue-share incentives |
| RBI regulatory changes | Medium | High | Dedicated compliance officer; RBI sandbox participation; legal advisory retainer |
| AI model accuracy degradation | Low | Medium | Monthly model retraining; human review fallback for low-confidence predictions |
| Data breach / security incident | Low | Critical | ISO 27001 practices; penetration testing quarterly; cyber insurance |
| DSA churn to competitor | Medium | Medium | Superior tooling lock-in; commission transparency; loyalty bonus program |
| Competition from aggregators | High | Medium | Differentiate on DSA SaaS + AI depth; white-label B2B2C creates moat |




| Dimension | Decision | Rationale |
| --- | --- | --- |
| Frontend | React 18 + TypeScript + Vite + Tailwind + shadcn/ui | Best-in-class DX, type safety, performance, and UI consistency |
| Backend | FastAPI + Python 3.11 + SQLAlchemy + Alembic | High-performance async API, excellent ecosystem for AI/ML integration |
| Database | PostgreSQL 15 (RDS Multi-AZ) + Redis 7 (ElastiCache) | ACID compliance for financial data; Redis for session and caching |
| AI/ML | XGBoost + scikit-learn + TensorFlow + OpenAI API | Best combination of traditional ML accuracy and LLM capabilities |
| Infrastructure | AWS (ECS, RDS, S3, CloudFront, SES) + Vercel | Enterprise reliability, Indian data residency compliance, scale |
| CI/CD | GitHub Actions + Docker + ECR | Full automation, security scanning, zero-downtime deployments |
| Auth | JWT RS256 + OTP + RBAC | Stateless scalability + phone-first India auth UX + granular permissions |


```

