import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isValidEmail, isValidPhone } from '../utils/helpers';

// API function to submit to Bajaj LMS
const submitToLMS = async (data) => {
    const apiUrl = "https://webpartner.bajajallianz.com/EurekaWSNew/service/pushData";

    // Complete payload with hardcoded values and dynamic user inputs
    const fullPayload = {
        // Dynamic fields from user input
        name: data.name,
        mobile_no: data.mobile_no,
        email_id: data.email_id,
        p_user_eml: data.email_id,

        // Hardcoded fields
        age: 25,
        goal_name: "1",
        param1: null,
        param2: null,
        param3: null,
        param4: "411111", // pincode
        param5: data.preferredDateTime || "", // Store preferred date/time here
        param13: "",
        param18: "",
        param19: "01-01-1999", // DOB
        param20: "",
        param23: "M", // gender
        param24: "SG", // occupation
        param25: "GR", // education
        param26: "1200000", // income
        param28: "",
        param29: "",
        param30: "",
        param36: "manual",
        summary_dtls: "",
        p_data_source: "WS_ETOUCH_BUY",
        p_curr_page_path: "https://www.bajajlifeinsurance.com/etouch/",
        p_ip_addsr: "",
        p_remark_url: "",
        prodId: "345",
        medium: "",
        contact_number: "",
        content: "",
        campaign: "",
        source: "",
        keyword: "",
        flag: "",
        parameter: "",
        name1: ""
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Origin": "https://www.bajajlifeinsurance.com",
                "Referer": "https://www.bajajlifeinsurance.com/"
            },
            body: JSON.stringify(fullPayload)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

const LeadCaptureForm = ({ onSubmit, onSkip }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        preferredDateTime: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Mobile validation
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!isValidPhone(formData.mobile)) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Preferred date/time validation
        if (!formData.preferredDateTime) {
            newErrors.preferredDateTime = 'Please select your preferred date and time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Prepare data for API
            const apiData = {
                name: formData.name.trim(),
                mobile_no: formData.mobile.trim(),
                email_id: formData.email.trim(),
                preferredDateTime: formData.preferredDateTime
            };

            // Submit to LMS API
            await submitToLMS(apiData);

            // Call parent onSubmit with form data
            onSubmit(apiData);
        } catch (error) {
            setErrors({ submit: 'Failed to submit. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="game-board text-left">
                <div className="pb-1 pt-3 text-center border-b-2 border-brand-blue/10 mb-4">
                    <h3 className="text-xl font-black text-brand-blue uppercase tracking-tight">
                        Just a few details
                    </h3>
                    <p className="text-xs text-brand-blue mt-1">
                        We need this to calculate your personalized quote.
                    </p>
                </div>
                <div className="pt-2 pb-3 px-1">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="space-y-0.5">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="As per Govt ID"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`rounded-none border-2 h-10 bg-white text-gray-900 ${errors.name ? 'border-brand-orange bg-red-50' : 'border-brand-blue focus:ring-brand-orange'}`}
                            />
                            {errors.name && <p className="text-xs text-blue-600">{errors.name}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div className="space-y-0.5">
                            <Label htmlFor="mobile">Mobile Number *</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value="+91"
                                    disabled
                                    className="w-16 bg-gray-100 border-2 border-brand-blue rounded-none h-10 text-gray-900"
                                />
                                <Input
                                    id="mobile"
                                    type="tel"
                                    placeholder="9876543210"
                                    value={formData.mobile}
                                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className={`rounded-none border-2 h-10 bg-white text-gray-900 ${errors.mobile ? 'border-brand-orange bg-red-50' : 'border-brand-blue focus:ring-brand-orange'}`}
                                />
                            </div>
                            {errors.mobile && <p className="text-xs text-blue-600">{errors.mobile}</p>}
                        </div>

                        {/* Email ID */}
                        <div className="space-y-0.5">
                            <Label htmlFor="email">Email ID *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`rounded-none border-2 h-10 bg-white text-gray-900 ${errors.email ? 'border-brand-orange bg-red-50' : 'border-brand-blue focus:ring-brand-orange'}`}
                            />
                            {errors.email && <p className="text-xs text-blue-600">{errors.email}</p>}
                        </div>

                        {/* Preferred Date & Time */}
                        <div className="space-y-0.5">
                            <Label htmlFor="preferredDateTime">Preferred Date & Time *</Label>
                            <Input
                                id="preferredDateTime"
                                type="datetime-local"
                                value={formData.preferredDateTime}
                                onChange={(e) => handleInputChange('preferredDateTime', e.target.value)}
                                className={`rounded-none border-2 h-10 bg-white text-gray-900 ${errors.preferredDateTime ? 'border-brand-orange bg-red-50' : 'border-brand-blue focus:ring-brand-orange'}`}
                                min={new Date().toISOString().slice(0, 16)}
                            />
                            {errors.preferredDateTime && <p className="text-xs text-blue-600">{errors.preferredDateTime}</p>}
                        </div>

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="text-xs text-blue-600 text-center">{errors.submit}</div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full mt-4 game-btn-orange text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Proceed 🚀'}
                        </button>

                        {/* Skip Link */}
                        <button
                            type="button"
                            onClick={onSkip}
                            className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
                        >
                            Skip and restart quiz
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default LeadCaptureForm;
