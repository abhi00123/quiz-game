import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MessageCircle, RotateCcw, AlertTriangle, Phone, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import ScoreCard from './ScoreCard';
import Confetti from './Confetti';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { isValidPhone } from '../utils/helpers';

// API function to submit to Bajaj LMS
const submitToLMS = async (data) => {
    const apiUrl = "https://webpartner.bajajallianz.com/EurekaWSNew/service/pushData";
    const fullPayload = {
        name: data.name,
        mobile_no: data.mobile_no,
        email_id: "",
        p_user_eml: "",
        age: "",
        goal_name: "",
        param1: "",
        param2: "",
        param3: "",
        param4: "",
        param5: "",
        param13: "",
        param18: "",
        param19: "",
        param20: "",
        param23: "",
        param24: "",
        param25: "",
        param26: "",
        param28: "",
        param29: "",
        param30: "",
        param36: "ONLINE_SALES",
        summary_dtls: "",
        p_data_source: "WS_BUY_GAME1",
        p_curr_page_path: "",
        p_ip_addsr: "",
        p_remark_url: "",
        prodId: "",
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
        return await response.json();
    } catch (error) {
        console.error('❌ API Error:', error);
        throw error;
    }
};

const ResultsScreen = ({ score, total, onRestart, onFormSubmit }) => {
    const percentage = (score / total) * 100;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', mobile: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile is required';
        } else if (!isValidPhone(formData.mobile)) {
            newErrors.mobile = 'Enter valid 10-digit number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            await submitToLMS({
                name: formData.name.trim(),
                mobile_no: formData.mobile.trim()
            });
            if (onFormSubmit) {
                onFormSubmit(formData.name.trim());
            }
        } catch (error) {
            setErrors({ submit: 'Failed to submit. Try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    // Custom title based on score
    const getResultTitle = (currentScore) => {
        if (currentScore === 5) return "YOU ARE A GST EXPERT";
        if (currentScore === 4) return "Almost There!";
        if (currentScore === 3) return "Good Progress!";
        if (currentScore === 2) return "Getting Started!";
        if (currentScore === 1) return "LEARNING BEGINS";
        return "Don't Give Up!";
    };

    // Custom motivational message based on score
    const getMotivationalMessage = (currentScore) => {
        if (currentScore === 5) return "Outstanding! Perfect score! You know everything about GST!";
        if (currentScore === 4) return "Almost perfect! You're nearly an expert.";
        if (currentScore === 3) return "Halfway there! Good understanding of the basics.";
        if (currentScore === 2) return "Getting started! Time to dive deeper into GST.";
        if (currentScore === 1) return "No Worries Lets help you";
        return "Don't give up! Every expert was once a beginner.";
    };

    return (
        <motion.div
            className="w-full h-full sm:max-w-lg sm:h-auto mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            {percentage >= 40 && <Confetti />}

            <div className="game-board py-4 px-6">
                <div className="mb-4 flex justify-center">
                    <motion.div
                        animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="p-3 bg-blue-50 border-4 border-brand-orange shadow-[4px_4px_0px_0px_rgba(245,130,32,0.3)]"
                    >
                        <Trophy className="w-12 h-12 text-brand-orange" strokeWidth={1.5} />
                    </motion.div>
                </div>

                <h2 className="text-2xl font-black text-brand-blue mb-1 uppercase tracking-tight leading-tight">
                    {getResultTitle(score)}
                </h2>
                <div className="bg-brand-orange text-white text-xs font-bold py-1 px-3 inline-block mb-4 uppercase tracking-wider">
                    {getMotivationalMessage(score)}
                </div>

                <ScoreCard score={score} total={total} percentage={percentage} />

                <div className="mt-6 space-y-3">
                    {/* Call Button */}
                    <a
                        href="tel:18002097272"
                        className="w-full game-btn-orange text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(194,65,12,1)]"
                    >
                        <Phone className="w-5 h-5 flex-shrink-0" />
                        <span>CALL US NOW</span>
                    </a>

                    {/* OR Separator */}
                    <div className="flex items-center gap-3 my-2">
                        <div className="h-[2px] flex-1 bg-brand-blue/10"></div>
                        <span className="text-[10px] font-black text-brand-blue/40 tracking-widest uppercase">OR</span>
                        <div className="h-[2px] flex-1 bg-brand-blue/10"></div>
                    </div>

                    {/* Talk to Expert Collapsible */}
                    <div className="overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full game-btn text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                            <MessageCircle className="w-5 h-5 flex-shrink-0" />
                            <span>TALK TO EXPERT</span>
                            {isExpanded ? <ChevronUp className="w-5 h-5 ml-1" /> : <ChevronDown className="w-5 h-5 ml-1" />}
                        </button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4 bg-white border-x-2 border-b-2 border-brand-blue"
                                >
                                    <form onSubmit={handleFormSubmit} className="pt-4 space-y-3 text-left">
                                        <div>
                                            <Label htmlFor="name" className="text-[10px] uppercase font-bold text-brand-blue">Full Name *</Label>
                                            <Input
                                                id="name"
                                                placeholder="As per Govt ID"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={`rounded-none border-2 h-9 text-sm bg-white ${errors.name ? 'border-brand-orange bg-red-50' : 'border-brand-blue'}`}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="mobile" className="text-[10px] uppercase font-bold text-brand-blue">Mobile Number *</Label>
                                            <div className="flex gap-2">
                                                <div className="w-12 h-9 flex items-center justify-center bg-white border-2 border-brand-blue text-xs font-bold">+91</div>
                                                <Input
                                                    id="mobile"
                                                    placeholder="9876543210"
                                                    value={formData.mobile}
                                                    onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    className={`flex-1 rounded-none border-2 h-9 text-sm bg-white ${errors.mobile ? 'border-brand-orange bg-red-50' : 'border-brand-blue'}`}
                                                />
                                            </div>
                                            {errors.mobile && <p className="text-[10px] text-brand-orange mt-1 font-bold italic">{errors.mobile}</p>}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full game-btn-orange text-sm shadow-[4px_4px_0px_0px_rgba(194,65,12,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(194,65,12,1)] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
                                        >
                                            {isLoading ? 'Processing...' : 'Proceed'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={onRestart}
                        className="w-full py-3 bg-white text-brand-blue font-bold border-2 border-brand-blue hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>PLAY AGAIN</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultsScreen;
