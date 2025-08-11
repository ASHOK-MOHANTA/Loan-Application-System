# Loan Application System

An intuitive **Loan Application System** built with **React, Firebase, HTML, CSS, and JavaScript** that enables users to apply for loans through a guided multi-step form and allows managers to review, approve, or reject applications. The system includes a role-based login, loan calculators, payment tracking, and an admin approval process for manager accounts.

---

## 🚀 Features

### **User Features**
- **Multi-Step Loan Application Form**:
  1. Personal Info
  2. Financial Info (Income, Employment, Expenses, Credit Score)
  3. Loan Details
  4. Document Upload
  5. Review & Submit
- **Dashboard** with quick navigation:
  - New Loan Application
  - Loan Calculator
  - Payment Tracking
- **Real-time Status Tracking** for submitted applications.
- **Loan Calculator** with dynamic calculations.
- **Payment Section** to manage repayments.

---

### **Manager Features**
- Role-based **Manager Dashboard**.
- **Pending Applications Review** with options to:
  - Approve Application
  - Reject Application
- Manager profile approval required from Admin before accessing all features.

---

### **Admin Features**
- **Admin Dashboard** to:
  - Approve/Reject Manager Accounts.
  - Oversee submitted loan applications.
- Manage all users and roles in the system.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), HTML, CSS, Tailwind CSS, styled-components, JavaScript (ES6+)
- **Backend & Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Role-based: User, Manager, Admin)
- **Hosting**: Vercel
- **State Management**: React Hooks
- **Form Handling**: Controlled components with real-time validation

---
## Portal Login Credential:-
 -**User Login**: email: login@gmail.com , Password: login@123
 -**Manager Login**: email: manager1@gmail.com , Password : manager@123
--**Admin Login**: Email : admin1@gmail.com , Password : admin@123

---

## 📂 Project Structure
```
src/
├── auth/                   # Authentication components (Login, Signup)
├── components/
│   ├── loanApplication/    # Loan application step forms
│   └── common/             # Reusable UI components
├── pages/
│   ├── LoanCalculator.jsx
│   ├── Payments.jsx
├── service/
│   └── firebaseConfig.js   # Firebase configuration
├── user/
│   └── UserDashboard.jsx
├── manager/
│   └── ManagerDashboard.jsx
├── admin/
│   └── AdminDashboard.jsx
```


---

## ⚙️ How It Works

1. **Authentication & Role Assignment**  
   - Users, Managers, and Admins have different dashboard views and access permissions.
   - Managers must be approved by Admin before gaining full access.

2. **Multi-Step Loan Application Form**  
   - Saves form data step-by-step and validates inputs before proceeding.
   - Final submission stores data in Firebase Firestore.

3. **Manager Application Review**  
   - Pending loan applications are displayed to managers for approval/rejection.

4. **Admin Approval System**  
   - Admin verifies and approves manager accounts.
   - Admin has access to all submitted loan applications.

---

## 🖥️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/loan-application-system.git


