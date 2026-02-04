# backend/schema.py

SCHEMA = {
    "app": {
        "title": "Reflection",
        "subtitle": "Longevity and Preparedness Insight Tool",
    },
    "sections": [
        {
            "id": "health",
            "title": "Health Status",
            "evidence": [
                {
                    "title": "Smoking and health outcomes",
                    "url": "https://www.ncbi.nlm.nih.gov/books/NBK62363/",
                },
                {
                    "title": "Sleep duration and mortality",
                    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1172056/",
                },
                {
                    "title": "Alcohol and health outcomes",
                    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7187870/",
                },
                {
                    "title": "Chronic illness and longevity",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/25023914/",
                },
            ],
            "questions": [
                {
                    "id": "smoking",
                    "label": "Do you currently smoke cigarettes or use tobacco products?",
                    "options": [
                        {"value": "no", "label": "No"},
                        {"value": "yes", "label": "Yes"},
                    ],
                },
                {
                    "id": "alcohol",
                    "label": "How often do you consume alcohol?",
                    "options": [
                        {"value": "none", "label": "I do not drink"},
                        {"value": "light", "label": "One to three drinks per week"},
                        {"value": "moderate", "label": "Four to ten drinks per week"},
                        {"value": "heavy", "label": "More than ten drinks per week"},
                    ],
                },
                {
                    "id": "sleep",
                    "label": "How would you describe your sleep most nights?",
                    "options": [
                        {"value": "good", "label": "Consistent and restorative"},
                        {"value": "okay", "label": "Inconsistent or light"},
                        {"value": "poor", "label": "Frequently short or disrupted"},
                    ],
                },
                {
                    "id": "chronic",
                    "label": "Have you been diagnosed with a chronic health condition?",
                    "options": [
                        {"value": "none", "label": "No"},
                        {"value": "one", "label": "Yes, one"},
                        {"value": "two_plus", "label": "Yes, two or more"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
            ],
        },
        {
            "id": "movement",
            "title": "Movement and Exercise",
            "evidence": [
                {
                    "title": "More exercise and longer life",
                    "url": "https://www.health.harvard.edu/heart-health/extra-exercise-may-lead-to-a-longer-life",
                },
                {
                    "title": "Strength training and longevity",
                    "url": "https://www.health.harvard.edu/exercise-and-fitness/adding-strength-training-to-aerobic-exercise-may-fuel-longevity",
                },
            ],
            "questions": [
                {
                    "id": "aerobic",
                    "label": "How often do you engage in aerobic activity?",
                    "options": [
                        {"value": "none", "label": "Rarely"},
                        {"value": "1_2", "label": "One to two days per week"},
                        {"value": "3_4", "label": "Three to four days per week"},
                        {"value": "5_plus", "label": "Five or more days per week"},
                    ],
                },
                {
                    "id": "strength",
                    "label": "How often do you perform strength or resistance training?",
                    "options": [
                        {"value": "none", "label": "Rarely"},
                        {"value": "weekly", "label": "About once per week"},
                        {"value": "twice", "label": "Twice per week"},
                        {"value": "frequent", "label": "Three or more times per week"},
                    ],
                },
                {
                    "id": "sitting",
                    "label": "How much time do you spend sitting each day?",
                    "options": [
                        {"value": "low", "label": "Less than four hours"},
                        {"value": "moderate", "label": "Four to six hours"},
                        {"value": "high", "label": "Six to eight hours"},
                        {"value": "very_high", "label": "More than eight hours"},
                    ],
                },
                {
                    "id": "walking",
                    "label": "Do you walk or move intentionally most days?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "sometimes", "label": "Some days"},
                        {"value": "rarely", "label": "Rarely"},
                    ],
                },
            ],
        },
        {
            "id": "nutrition",
            "title": "Nutrition and Hydration",
            "evidence": [
                {
                    "title": "Mediterranean style diet and health outcomes",
                    "url": "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2819335",
                },
                {
                    "title": "Hydration and long term health",
                    "url": "https://www.thelancet.com/journals/ebiom/article/PIIS2352-3964(22)00586-2/fulltext",
                },
            ],
            "questions": [
                {
                    "id": "diet_quality",
                    "label": "How would you describe your overall diet pattern?",
                    "options": [
                        {"value": "whole", "label": "Mostly whole or minimally processed foods"},
                        {"value": "mixed", "label": "A mix of whole and processed foods"},
                        {"value": "processed", "label": "Mostly processed or packaged foods"},
                    ],
                },
                {
                    "id": "plants",
                    "label": "How often do you consume fruits and vegetables?",
                    "options": [
                        {"value": "daily", "label": "Daily"},
                        {"value": "some", "label": "Several times per week"},
                        {"value": "rarely", "label": "Rarely"},
                    ],
                },
                {
                    "id": "hydration",
                    "label": "How well hydrated do you feel most days?",
                    "options": [
                        {"value": "well", "label": "Well hydrated"},
                        {"value": "variable", "label": "It varies"},
                        {"value": "poor", "label": "Often dehydrated"},
                    ],
                },
                {
                    "id": "sugary_drinks",
                    "label": "How often do you consume sugary drinks?",
                    "options": [
                        {"value": "rare", "label": "Rarely or never"},
                        {"value": "sometimes", "label": "Occasionally"},
                        {"value": "often", "label": "Frequently"},
                    ],
                },
            ],
        },
        {
            "id": "mindset",
            "title": "Stress, Optimism, and Purpose",
            "evidence": [
                {
                    "title": "Optimism linked with longevity",
                    "url": "https://www.nia.nih.gov/news/optimism-linked-longevity-and-well-being-two-recent-studies",
                },
            ],
            "questions": [
                {
                    "id": "stress_level",
                    "label": "How would you describe your current stress level?",
                    "options": [
                        {"value": "low", "label": "Generally manageable"},
                        {"value": "moderate", "label": "Moderate"},
                        {"value": "high", "label": "High or persistent"},
                    ],
                },
                {
                    "id": "coping",
                    "label": "Do you have reliable ways to manage stress?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "sometimes", "label": "Sometimes"},
                        {"value": "no", "label": "Not really"},
                    ],
                },
                {
                    "id": "optimism",
                    "label": "Do you generally feel optimistic about the future?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "neutral", "label": "Neutral"},
                        {"value": "no", "label": "Rarely"},
                    ],
                },
                {
                    "id": "purpose",
                    "label": "Do you feel your life has meaning or direction?",
                    "options": [
                        {"value": "strong", "label": "Strong sense of purpose"},
                        {"value": "some", "label": "Somewhat"},
                        {"value": "low", "label": "Not really"},
                    ],
                },
            ],
        },
        {
            "id": "social",
            "title": "Social Connection",
            "evidence": [
                {
                    "title": "Social activity and longevity",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/36878718/",
                },
            ],
            "questions": [
                {
                    "id": "support",
                    "label": "Do you feel emotionally supported in daily life?",
                    "options": [
                        {"value": "strong", "label": "Strongly supported"},
                        {"value": "some", "label": "Somewhat supported"},
                        {"value": "limited", "label": "Limited support"},
                    ],
                },
                {
                    "id": "belonging",
                    "label": "Do you feel a sense of belonging to a community?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "sometimes", "label": "Sometimes"},
                        {"value": "no", "label": "Not really"},
                    ],
                },
                {
                    "id": "loneliness",
                    "label": "How often do you feel lonely?",
                    "options": [
                        {"value": "rare", "label": "Rarely"},
                        {"value": "sometimes", "label": "Sometimes"},
                        {"value": "often", "label": "Often"},
                    ],
                },
            ],
        },
        {
            "id": "spiritual",
            "title": "Reflective Practice and Community",
            "evidence": [
                {
                    "title": "Religious service attendance and longevity",
                    "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0177618",
                },
            ],
            "questions": [
                {
                    "id": "reflection",
                    "label": "Do you engage in reflective or spiritual practices?",
                    "options": [
                        {"value": "regular", "label": "Regularly"},
                        {"value": "occasional", "label": "Occasionally"},
                        {"value": "none", "label": "Not at all"},
                    ],
                },
                {
                    "id": "community",
                    "label": "Do you participate in a consistent community group?",
                    "options": [
                        {"value": "weekly", "label": "Weekly"},
                        {"value": "monthly", "label": "Monthly"},
                        {"value": "rare", "label": "Rarely"},
                        {"value": "none", "label": "Not at all"},
                    ],
                },
            ],
        },
        {
            "id": "sexual",
            "title": "Sexual Wellbeing",
            "evidence": [
                {
                    "title": "Sexual wellbeing and health outcomes",
                    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9082964/",
                },
            ],
            "questions": [
                {
                    "id": "sexual_wellbeing",
                    "label": "How would you describe your sexual wellbeing overall?",
                    "options": [
                        {"value": "good", "label": "Generally positive"},
                        {"value": "mixed", "label": "Mixed"},
                        {"value": "poor", "label": "Often difficult"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
                {
                    "id": "intimacy",
                    "label": "How supported do you feel in emotional intimacy?",
                    "options": [
                        {"value": "strong", "label": "Strongly supported"},
                        {"value": "some", "label": "Somewhat supported"},
                        {"value": "limited", "label": "Limited"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
            ],
        },
        {
            "id": "preparedness",
            "title": "Preparedness and Planning",
            "evidence": [
                {
                    "title": "Financial fragility and ability to cover unexpected expenses",
                    "url": "https://www.federalreserve.gov/consumerscommunities/shed.htm",
                },
                {
                    "title": "Money as a leading source of stress in the United States",
                    "url": "https://www.apa.org/news/press/releases/stress",
                },
                {
                    "title": "Financial insecurity and health impacts, including stress and delayed care",
                    "url": "https://www.kff.org/",
                },
            ],

            "questions": [
                {
                    "id": "emergency_fund",
                    "label": "Do you have financial reserves for unexpected events?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "some", "label": "Limited"},
                        {"value": "no", "label": "No"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
                {
                    "id": "beneficiaries",
                    "label": "Have you designated beneficiaries for important accounts?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "partial", "label": "Some"},
                        {"value": "no", "label": "No"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
                {
                    "id": "dependents",
                    "label": "Do others depend on you financially?",
                    "options": [
                        {"value": "yes", "label": "Yes"},
                        {"value": "no", "label": "No"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
                {
                    "id": "planning_confidence",
                    "label": "How confident do you feel about your long term preparedness?",
                    "options": [
                        {"value": "confident", "label": "Confident"},
                        {"value": "uncertain", "label": "Uncertain"},
                        {"value": "not_confident", "label": "Not confident"},
                        {"value": "prefer_not", "label": "Prefer not to say"},
                    ],
                },
            ],
        },
    ],
}
