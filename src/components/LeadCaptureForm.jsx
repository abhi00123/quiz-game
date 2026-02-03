import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isValidEmail } from '../utils/helpers';

// API function to submit to Bajaj LMS
const submitToLMS = async (data) => {
    console.log("Submitting to LMS:", data);

    const apiUrl = "https://webpartner.bajajallianz.com/EurekaWSNew/service/pushData";

    // Hardcoded values + user input
    const fullPayload = {
        name: data.name,
        age: 30, // Hardcoded
        mobile_no: "9999999999", // Hardcoded
        email_id: data.email_id,
        goal_name: "1",
        param1: null,
        param2: null,
        param3: null,
        param4: "110001", // Hardcoded pincode
        param5: "",
        param13: "",
        param18: "",
        param19: "01-01-1994", // Hardcoded DOB
        param20: "",
        param23: "M", // Hardcoded gender
        param24: "SN", // Hardcoded occupation
        param25: "GR", // Hardcoded education
        param26: "600000", // Hardcoded income
        param36: "manual",
        summary_dtls: "",
        p_user_eml: data.email_id,
        p_data_source: "WS_ETOUCH_BUY",
        p_curr_page_path: "https://www.bajajlifeinsurance.com/etouch/",
        p_ip_addsr: "",
        p_remark_url: data.preferredDateTime || "", // Store preferred date/time in remark
        prodId: "345",
        medium: "",
        contact_number: "",
        content: "",
        campaign: "",
        source: "",
        keyword: "",
        flag: "",
        parameter: "",
        name1: "",
        param28: "",
        param29: "",
        param30: ""
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
        console.log("LMS Response:", result);
        return result;
    } catch (error) {
        console.error("LMS API Error:", error);
        throw error;
    }
};

const LeadCaptureForm = ({ onSubmit, onSkip }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        preferredDate: '',
        preferredTime: ''
    });
    const [errors, setErrors] = useState({});

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!isValidEmail(formData.email)) newErrors.email = "Valid email required";
        if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
        if (!formData.preferredTime) newErrors.preferredTime = "Preferred time is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called with formData:", formData);

        if (!validateForm()) return;

        setIsLoading(true);

        // Map data to LMS JSON structure
        const lmsPayload = {
            name: formData.name,
            email_id: formData.email,
            preferredDateTime: `${formData.preferredDate} ${formData.preferredTime}`
        };

        try {
            await submitToLMS(lmsPayload);
            onSubmit(lmsPayload);
        } catch (error) {
            console.error("Submission error", error);
            setErrors({ submit: "Failed to submit. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="shadow-2xl border-brand-blue/10 dark:border-brand-blue/20">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Schedule a Call
                    </CardTitle>
                    <CardDescription>
                        Our expert will reach out at your preferred time.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="space-y-1">
                            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email ID <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        {/* Preferred Date/Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="preferredDate">Preferred Date <span className="text-red-500">*</span></Label>
                                <Input
                                    id="preferredDate"
                                    type="date"
                                    value={formData.preferredDate}
                                    onChange={(e) => updateField('preferredDate', e.target.value)}
                                    className={errors.preferredDate ? 'border-red-500' : ''}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.preferredDate && <p className="text-red-500 text-xs">{errors.preferredDate}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="preferredTime">Preferred Time <span className="text-red-500">*</span></Label>
                                <Input
                                    id="preferredTime"
                                    type="time"
                                    value={formData.preferredTime}
                                    onChange={(e) => updateField('preferredTime', e.target.value)}
                                    className={errors.preferredTime ? 'border-red-500' : ''}
                                />
                                {errors.preferredTime && <p className="text-red-500 text-xs">{errors.preferredTime}</p>}
                            </div>
                        </div>

                        {errors.submit && (
                            <p className="text-red-500 text-sm text-center">{errors.submit}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-brand-orange hover:bg-orange-600 text-lg text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Schedule Call"}
                        </Button>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="link"
                                className="text-muted-foreground text-xs mt-2"
                                onClick={onSkip}
                            >
                                Skip and restart quiz
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default LeadCaptureForm;
