// src/components/loanApplication/MultiStepForm.jsx
import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import FinancialInfoForm from './FinancialInfoForm';
import LoanDetailsForm from './LoanDetailsForm';
import DocumentUploadForm from './DocumentUploadForm';
import ReviewSubmitForm from './ReviewSubmitForm';
// Import other steps later

const MultiStepForm = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    switch (step) {
        case 1:
            return (
                <PersonalInfoForm formData={formData} handleChange={handleChange} nextStep={nextStep} />
            );

        case 2:
            return (
                <FinancialInfoForm formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep} />
            );
        case 3:
            return (
                <LoanDetailsForm formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep} />
            )
        case 4:
            return (
                <DocumentUploadForm formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep} />
            )
        case 5:
            return(
                <ReviewSubmitForm  formData={formData}
                    setFormData={setFormData}
                    prevStep={prevStep}/>
            )
        default:
            return <div className="text-white">Unknown step</div>;
    }
};

export default MultiStepForm;
