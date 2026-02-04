// Quiz questions data - 5 GST-related questions
export const quizQuestions = [
        {
                id: 1,
                category: 'GST',
                difficulty: 'medium',
                question: 'How does the 0% GST policy impact life insurance premiums for customers?',
                options: [
                        'Premiums have increased by 18%',
                        'Premiums remain unchanged',
                        'Premiums have become more affordable for customers',
                        'Premiums are now completely free'
                ],
                correctAnswer: 'Premiums have become more affordable for customers',
                explanation: 'The removal of 18% GST directly reduces the premium amount, making life insurance more accessible and affordable for everyone.'
        },
        {
                id: 2,
                category: 'GST',
                difficulty: 'medium',
                question: 'Does the 0% GST exemption apply to riders attached to life insurance policies?',
                options: [
                        'Yes, all riders are also 0% GST',
                        'No, riders still attract 18% GST',
                        'Only critical illness riders are 0% GST',
                        'It depends on the insurance company'
                ],
                correctAnswer: 'Yes, all riders are also 0% GST',
                explanation: 'The 0% GST exemption extends to all riders (critical illness, accidental death, disability) attached to life insurance policies, making them more affordable too.'
        },
        {
                id: 3,
                category: 'GST',
                difficulty: 'easy',
                question: 'If ₹1Cr term insurance cost ₹1000/month with GST, will your premium now be higher or lower?',
                options: [
                        'Lower',
                        'Higher',
                        'Remain the same',
                        'Depends on age'
                ],
                correctAnswer: 'Lower',
                explanation: 'With 0% GST instead of 18%, the total premium you pay out-of-pocket will be lower.'
        },
        {
                id: 4,
                category: 'GST',
                difficulty: 'easy',
                question: 'What is the current GST rate on Life Insurance premiums in India?',
                options: [
                        '5%',
                        '0% (Exempt)',
                        '12%',
                        '18%'
                ],
                correctAnswer: '0% (Exempt)',
                explanation: 'Life insurance premiums in India are now exempt from GST (0%), making insurance more affordable for everyone.'
        },
        {
                id: 5,
                category: 'GST',
                difficulty: 'medium',
                question: 'Which of the following can benefit from the 0% GST exemption on life insurance?',
                options: [
                        'Only individuals buying term insurance',
                        'Only salaried employees',
                        'All customers buying any type of life insurance (term, ULIP, endowment, pension)',
                        'Only customers above 40 years of age'
                ],
                correctAnswer: 'All customers buying any type of life insurance (term, ULIP, endowment, pension)',
                explanation: 'The 0% GST exemption is inclusive and applies to all types of life insurance policies (term, ULIP, endowment, pension) for all categories of customers.'
        }
];

// Shuffle array utility function
export const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
};

// Get shuffled questions with shuffled options
export const getShuffledQuestions = () => {
        const shuffledQuestions = shuffleArray(quizQuestions);
        return shuffledQuestions.map(q => ({
                ...q,
                options: shuffleArray(q.options)
        }));
};

export default quizQuestions;
