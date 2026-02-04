# backend/scoring.py

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Any, List, Tuple


@dataclass(frozen=True)
class Insight:
    topic: str
    fact: str
    note: str


def _clamp(x: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, x))


def _color_for_score(score: int) -> str:
    if score >= 3:
        return "green"
    if score >= 0:
        return "yellow"
    return "red"


def _status_for_color(color: str) -> str:
    return {
        "green": "protective",
        "yellow": "mixed",
        "red": "risk_associated",
    }[color]


def evaluate(answers: Dict[str, str]) -> Dict[str, Any]:
    # Higher is more protective.
    weights: Dict[str, Dict[str, int]] = {
        # Health
        "smoking": {"no": 2, "yes": -3},
        "alcohol": {"none": 1, "light": 1, "moderate": -1, "heavy": -2},
        "sleep": {"good": 2, "okay": 0, "poor": -2},
        "chronic": {"none": 1, "one": -1, "two_plus": -2, "prefer_not": 0},

        # Movement
        "aerobic": {"none": -2, "1_2": 0, "3_4": 1, "5_plus": 2},
        "strength": {"none": -1, "weekly": 0, "twice": 1, "frequent": 2},
        "sitting": {"low": 1, "moderate": 0, "high": -1, "very_high": -2},
        "walking": {"yes": 1, "sometimes": 0, "rarely": -1},

        # Nutrition
        "diet_quality": {"whole": 2, "mixed": 0, "processed": -2},
        "plants": {"daily": 1, "some": 0, "rarely": -1},
        "hydration": {"well": 1, "variable": 0, "poor": -1},
        "sugary_drinks": {"rare": 1, "sometimes": 0, "often": -1},

        # Mindset
        "stress_level": {"low": 1, "moderate": 0, "high": -1},
        "coping": {"yes": 1, "sometimes": 0, "no": -1},
        "optimism": {"yes": 1, "neutral": 0, "no": -1},
        "purpose": {"strong": 1, "some": 0, "low": -1},

        # Social
        "support": {"strong": 1, "some": 0, "limited": -1},
        "belonging": {"yes": 1, "sometimes": 0, "no": -1},
        "loneliness": {"rare": 1, "sometimes": 0, "often": -1},

        # Spiritual
        "reflection": {"regular": 1, "occasional": 0, "none": -1},
        "community": {"weekly": 1, "monthly": 0, "rare": -1, "none": -1},

        # Sexual wellbeing
        "sexual_wellbeing": {"good": 1, "mixed": 0, "poor": -1, "prefer_not": 0},
        "intimacy": {"strong": 1, "some": 0, "limited": -1, "prefer_not": 0},

        # Preparedness
        "emergency_fund": {"yes": 2, "some": 0, "no": -2, "prefer_not": 0},
        "beneficiaries": {"yes": 1, "partial": 0, "no": -1, "prefer_not": 0},
        "dependents": {"yes": 0, "no": 0, "prefer_not": 0},
        "planning_confidence": {"confident": 2, "uncertain": 0, "not_confident": -2, "prefer_not": 0},
    }

    # Expanded facts so each question can generate an insight.
    facts: Dict[Tuple[str, str], Insight] = {
        # Smoking
        ("smoking", "yes"): Insight(
            topic="Smoking",
            fact="Tobacco use is associated with higher rates of cardiovascular disease, cancer, and respiratory illness in population studies.",
            note="This describes population patterns and does not predict individual outcomes.",
        ),
        ("smoking", "no"): Insight(
            topic="Smoking",
            fact="Not using tobacco is associated with lower long term risk across many chronic disease categories in population studies.",
            note="Protective factors influence probability, not certainty.",
        ),

        # Alcohol
        ("alcohol", "none"): Insight(
            topic="Alcohol",
            fact="Lower or no alcohol intake is associated with lower risk of several alcohol-related harms in population studies.",
            note="This is educational and not medical advice.",
        ),
        ("alcohol", "light"): Insight(
            topic="Alcohol",
            fact="Lower intake tends to carry less health risk than heavier patterns in population studies.",
            note="This does not imply alcohol is necessary for health.",
        ),
        ("alcohol", "moderate"): Insight(
            topic="Alcohol",
            fact="Moderate drinking can be associated with increased risk depending on pattern and individual context.",
            note="If you drink, consider discussing personal risk with a clinician.",
        ),
        ("alcohol", "heavy"): Insight(
            topic="Alcohol",
            fact="Higher alcohol intake is associated with increased risk of liver disease and other adverse outcomes in population studies.",
            note="This is an educational association, not an individual prediction.",
        ),

        # Sleep
        ("sleep", "good"): Insight(
            topic="Sleep",
            fact="Consistent, restorative sleep is associated with better cardiometabolic and mental health outcomes in long term research.",
            note="Sleep needs vary, but consistency often matters as much as duration.",
        ),
        ("sleep", "okay"): Insight(
            topic="Sleep",
            fact="Inconsistent sleep can contribute to higher stress load and reduced recovery over time.",
            note="Small improvements in sleep routine can be high leverage.",
        ),
        ("sleep", "poor"): Insight(
            topic="Sleep",
            fact="Short or disrupted sleep is associated with worse health outcomes and higher stress load in many long term studies.",
            note="Improving sleep can be meaningful, but results vary by person.",
        ),

        # Chronic conditions
        ("chronic", "none"): Insight(
            topic="Chronic conditions",
            fact="Having no known chronic condition today is a protective signal, especially when paired with routine screening and healthy habits.",
            note="This does not replace preventive care or screenings.",
        ),
        ("chronic", "one"): Insight(
            topic="Chronic conditions",
            fact="Chronic conditions can increase long term health risk, especially when uncontrolled.",
            note="Many risks can be reduced through management and follow up care.",
        ),
        ("chronic", "two_plus"): Insight(
            topic="Chronic conditions",
            fact="Multiple chronic conditions are associated with higher long term health risk in population studies.",
            note="Management and consistent care can meaningfully change outcomes.",
        ),

        # Aerobic
        ("aerobic", "none"): Insight(
            topic="Aerobic activity",
            fact="Low aerobic activity is associated with worse cardiometabolic outcomes in many studies.",
            note="Even light walking can be a meaningful starting point.",
        ),
        ("aerobic", "1_2"): Insight(
            topic="Aerobic activity",
            fact="Some aerobic activity is generally better than none for long term cardiovascular health.",
            note="Consistency tends to matter more than intensity early on.",
        ),
        ("aerobic", "3_4"): Insight(
            topic="Aerobic activity",
            fact="Regular aerobic activity is associated with lower all cause mortality in many long term studies.",
            note="Associations are population level and not a guarantee.",
        ),
        ("aerobic", "5_plus"): Insight(
            topic="Aerobic activity",
            fact="Higher levels of regular physical activity are associated with lower all cause mortality in many studies.",
            note="Recovery and overtraining should still be considered.",
        ),

        # Strength
        ("strength", "none"): Insight(
            topic="Strength training",
            fact="Strength training supports muscle, bone density, and functional capacity, which are linked to long term resilience.",
            note="Starting with one to two sessions per week can be enough to build consistency.",
        ),
        ("strength", "weekly"): Insight(
            topic="Strength training",
            fact="Some strength training can support functional health and metabolic resilience over time.",
            note="Progressive overload is less important than consistency at first.",
        ),
        ("strength", "twice"): Insight(
            topic="Strength training",
            fact="Strength training paired with aerobic activity is associated with strong overall health profiles in many studies.",
            note="This is informational and not medical advice.",
        ),
        ("strength", "frequent"): Insight(
            topic="Strength training",
            fact="Strength training combined with aerobic activity is associated with improved health outcomes in observational studies.",
            note="Adequate sleep and nutrition support recovery.",
        ),

        # Sitting
        ("sitting", "low"): Insight(
            topic="Sedentary time",
            fact="Lower sedentary time generally supports healthier cardiometabolic profiles.",
            note="Short movement breaks during the day are a practical lever.",
        ),
        ("sitting", "moderate"): Insight(
            topic="Sedentary time",
            fact="Moderate sedentary time is common and can often be improved with brief movement breaks.",
            note="A few minutes per hour can be meaningful.",
        ),
        ("sitting", "high"): Insight(
            topic="Sedentary time",
            fact="Higher sedentary time is associated with worse metabolic outcomes in many observational studies.",
            note="Breaking up sitting is a low friction improvement.",
        ),
        ("sitting", "very_high"): Insight(
            topic="Sedentary time",
            fact="Very high sedentary time can offset some benefits of exercise for cardiometabolic health.",
            note="Frequent breaks and walking meetings can help.",
        ),

        # Walking
        ("walking", "yes"): Insight(
            topic="Daily movement",
            fact="Frequent low intensity movement supports long term metabolic health and recovery.",
            note="Small daily habits compound over time.",
        ),
        ("walking", "sometimes"): Insight(
            topic="Daily movement",
            fact="Intermittent walking is helpful, and increasing consistency is often a high impact change.",
            note="Short walks after meals can be a simple strategy.",
        ),
        ("walking", "rarely"): Insight(
            topic="Daily movement",
            fact="Very low daily movement is associated with poorer metabolic health over time.",
            note="Start with five to ten minutes per day and build gradually.",
        ),

        # Diet quality
        ("diet_quality", "whole"): Insight(
            topic="Diet pattern",
            fact="Diet patterns emphasizing minimally processed foods are associated with better cardiometabolic outcomes.",
            note="Overall pattern matters more than perfection.",
        ),
        ("diet_quality", "mixed"): Insight(
            topic="Diet pattern",
            fact="A mixed diet can be improved by shifting more meals toward whole foods and fiber rich options.",
            note="Small consistent substitutions are effective.",
        ),
        ("diet_quality", "processed"): Insight(
            topic="Diet pattern",
            fact="Higher intake of highly processed foods is associated with worse cardiometabolic profiles in many studies.",
            note="Reducing ultra processed foods is a common high leverage change.",
        ),

        # Plants
        ("plants", "daily"): Insight(
            topic="Fruits and vegetables",
            fact="Higher fruit and vegetable intake is associated with better overall health outcomes in many studies.",
            note="Variety and fiber are key drivers.",
        ),
        ("plants", "some"): Insight(
            topic="Fruits and vegetables",
            fact="Increasing plants and fiber can improve long term metabolic health.",
            note="Adding one serving per day is a strong starting goal.",
        ),
        ("plants", "rarely"): Insight(
            topic="Fruits and vegetables",
            fact="Low fruit and vegetable intake can reduce fiber and micronutrients that support long term health.",
            note="Start with one daily addition you enjoy.",
        ),

        # Hydration
        ("hydration", "well"): Insight(
            topic="Hydration",
            fact="Adequate hydration supports circulation, kidney function, and physical performance.",
            note="Needs vary by body size, activity, and climate.",
        ),
        ("hydration", "variable"): Insight(
            topic="Hydration",
            fact="Variable hydration is common and can often be improved with simple routines.",
            note="A consistent morning water habit is a practical lever.",
        ),
        ("hydration", "poor"): Insight(
            topic="Hydration",
            fact="Lower hydration status has been linked with markers of health risk in population research.",
            note="Hydration needs vary; consult a clinician if you have kidney or heart conditions.",
        ),

        # Sugary drinks
        ("sugary_drinks", "rare"): Insight(
            topic="Sugary drinks",
            fact="Lower sugary drink intake supports healthier metabolic outcomes over time.",
            note="This includes sweetened coffees and teas when frequent.",
        ),
        ("sugary_drinks", "sometimes"): Insight(
            topic="Sugary drinks",
            fact="Occasional sugary drinks are common; reducing frequency can support metabolic health.",
            note="Swapping to unsweetened options is often easiest.",
        ),
        ("sugary_drinks", "often"): Insight(
            topic="Sugary drinks",
            fact="Frequent sugary drink intake is associated with worse metabolic outcomes over time.",
            note="Reducing liquid sugar is one of the most effective nutrition changes.",
        ),

        # Stress
        ("stress_level", "low"): Insight(
            topic="Stress",
            fact="Lower perceived stress is associated with better wellbeing and recovery over time.",
            note="This does not mean life is easy; it reflects coping and load.",
        ),
        ("stress_level", "moderate"): Insight(
            topic="Stress",
            fact="Moderate stress is common; recovery practices can improve resilience over time.",
            note="Consistency beats intensity for stress management.",
        ),
        ("stress_level", "high"): Insight(
            topic="Stress",
            fact="Chronic high stress is associated with higher allostatic load and worse long term outcomes in many studies.",
            note="Reducing load or improving recovery can be high leverage.",
        ),

        # Coping
        ("coping", "yes"): Insight(
            topic="Stress recovery",
            fact="Consistent stress management practices are associated with better emotional regulation and wellbeing.",
            note="Even short daily practices can help.",
        ),
        ("coping", "sometimes"): Insight(
            topic="Stress recovery",
            fact="Having occasional coping strategies is helpful; increasing consistency can improve resilience.",
            note="Choose one practice that is easy to repeat.",
        ),
        ("coping", "no"): Insight(
            topic="Stress recovery",
            fact="Without reliable recovery routines, stress can compound over time.",
            note="Start with a small practice you can do daily for two minutes.",
        ),

        # Optimism
        ("optimism", "yes"): Insight(
            topic="Optimism",
            fact="Optimism has been linked with longevity and wellbeing in multiple population studies.",
            note="This is association based and not a causal claim for any individual.",
        ),
        ("optimism", "neutral"): Insight(
            topic="Optimism",
            fact="Neutral outlook is common; strengthening positive expectations can improve coping for some people.",
            note="This is a wellbeing lever, not a moral trait.",
        ),
        ("optimism", "no"): Insight(
            topic="Optimism",
            fact="Lower optimism can be associated with higher stress load and reduced wellbeing in population research.",
            note="This can change with environment, support, and practice.",
        ),

        # Purpose
        ("purpose", "strong"): Insight(
            topic="Purpose",
            fact="A strong sense of purpose is associated with better wellbeing and stress resilience in many studies.",
            note="This does not imply causation for any individual.",
        ),
        ("purpose", "some"): Insight(
            topic="Purpose",
            fact="A moderate sense of purpose can be strengthened through goals, values, and community roles.",
            note="Purpose is often built, not found.",
        ),
        ("purpose", "low"): Insight(
            topic="Purpose",
            fact="Lower sense of purpose is associated with worse wellbeing in some studies.",
            note="This can improve with connection, therapy, and meaningful projects.",
        ),

        # Social
        ("support", "strong"): Insight(
            topic="Support",
            fact="Strong perceived support is associated with better stress resilience and wellbeing over time.",
            note="Quality often matters more than quantity.",
        ),
        ("support", "limited"): Insight(
            topic="Support",
            fact="Lower support is associated with higher stress load and worse long term outcomes across many studies.",
            note="Building one reliable connection can be a meaningful start.",
        ),

        ("belonging", "yes"): Insight(
            topic="Belonging",
            fact="A sense of belonging is associated with better mental wellbeing and healthier behavior patterns.",
            note="Belonging can come from small consistent groups.",
        ),
        ("belonging", "no"): Insight(
            topic="Belonging",
            fact="Low belonging can increase stress and isolation over time.",
            note="Community can be built intentionally through shared routines.",
        ),

        ("loneliness", "often"): Insight(
            topic="Loneliness",
            fact="Loneliness is associated with worse long term health outcomes in many studies.",
            note="This is common and changeable; it is not a personal failure.",
        ),
        ("loneliness", "rare"): Insight(
            topic="Loneliness",
            fact="Lower loneliness and strong connection patterns are associated with improved long term wellbeing.",
            note="Maintaining connection is a protective habit.",
        ),

        # Spiritual / reflection
        ("reflection", "regular"): Insight(
            topic="Reflective practice",
            fact="Reflective practice can support meaning making, emotional regulation, and stress recovery.",
            note="This can be spiritual, philosophical, or personal reflection.",
        ),
        ("reflection", "none"): Insight(
            topic="Reflective practice",
            fact="Without reflection, it can be harder to process stress and build long term clarity.",
            note="A short daily journaling practice can be enough.",
        ),

        ("community", "weekly"): Insight(
            topic="Community participation",
            fact="Regular community engagement is associated with better wellbeing and longevity patterns in population studies.",
            note="This can be religious or non religious community.",
        ),
        ("community", "none"): Insight(
            topic="Community participation",
            fact="Low community participation can reduce access to support and belonging over time.",
            note="Try one consistent group environment monthly as a starting point.",
        ),

        # Sexual wellbeing
        ("sexual_wellbeing", "good"): Insight(
            topic="Sexual wellbeing",
            fact="Positive sexual wellbeing is associated with improved wellbeing and relationship satisfaction for many people.",
            note="This is optional and personal; outcomes vary widely.",
        ),
        ("sexual_wellbeing", "poor"): Insight(
            topic="Sexual wellbeing",
            fact="Difficult sexual wellbeing can reflect stress, health, or relationship strain.",
            note="Support can include communication, therapy, or medical consultation.",
        ),

        ("intimacy", "strong"): Insight(
            topic="Intimacy",
            fact="Feeling supported in intimacy is associated with better wellbeing and stress buffering.",
            note="Emotional safety is a core driver.",
        ),
        ("intimacy", "limited"): Insight(
            topic="Intimacy",
            fact="Limited intimacy support can increase stress and reduce wellbeing over time.",
            note="This is a common area for growth through communication and support.",
        ),

        # Preparedness
        ("emergency_fund", "yes"): Insight(
            topic="Preparedness",
            fact="Financial buffer reduces vulnerability to unexpected events and can reduce stress load.",
            note="Preparedness is about stability, not fear.",
        ),
        ("emergency_fund", "no"): Insight(
            topic="Preparedness",
            fact="Limited financial buffer can increase vulnerability to disruption and stress.",
            note="Even small automated savings habits can help build resilience.",
        ),
        ("beneficiaries", "yes"): Insight(
            topic="Preparedness",
            fact="Naming beneficiaries can reduce delays and complexity for loved ones during difficult periods.",
            note="Reviewing beneficiaries periodically is a helpful habit.",
        ),
        ("beneficiaries", "no"): Insight(
            topic="Preparedness",
            fact="Not naming beneficiaries can create delays and friction for loved ones during difficult periods.",
            note="This varies by account type and jurisdiction.",
        ),
        ("planning_confidence", "confident"): Insight(
            topic="Preparedness",
            fact="Higher preparedness confidence often reflects clear systems, buffers, and communication.",
            note="Reviewing plans annually keeps them current.",
        ),
        ("planning_confidence", "not_confident"): Insight(
            topic="Preparedness",
            fact="Low preparedness confidence is common, and can improve quickly with a few foundational steps.",
            note="Start with beneficiaries, basic documents, and an emergency plan.",
        ),
    }

    # Section layout
    sections: Dict[str, Dict[str, Any]] = {
        "health": {"title": "Health Status", "qids": ["smoking", "alcohol", "sleep", "chronic"]},
        "movement": {"title": "Movement and Exercise", "qids": ["aerobic", "strength", "sitting", "walking"]},
        "nutrition": {"title": "Nutrition and Hydration", "qids": ["diet_quality", "plants", "hydration", "sugary_drinks"]},
        "mindset": {"title": "Stress, Optimism, and Purpose", "qids": ["stress_level", "coping", "optimism", "purpose"]},
        "social": {"title": "Social Connection", "qids": ["support", "belonging", "loneliness"]},
        "spiritual": {"title": "Reflective Practice and Community", "qids": ["reflection", "community"]},
        "sexual": {"title": "Sexual Wellbeing", "qids": ["sexual_wellbeing", "intimacy"]},
        "preparedness": {"title": "Preparedness and Planning", "qids": ["emergency_fund", "beneficiaries", "dependents", "planning_confidence"]},
    }

    # Fallback insight per section if nothing triggers
    section_fallback: Dict[str, Insight] = {
        "health": Insight(
            topic="Health status overview",
            fact="This section summarizes high impact health behaviors and baseline risk context.",
            note="For personal medical guidance, consult a licensed clinician.",
        ),
        "movement": Insight(
            topic="Movement overview",
            fact="Movement patterns are strongly linked with long term cardiovascular and metabolic health.",
            note="Small increases in weekly activity can compound over time.",
        ),
        "nutrition": Insight(
            topic="Nutrition overview",
            fact="Diet quality and hydration patterns influence metabolic health and resilience.",
            note="Incremental improvements are typically more sustainable than extremes.",
        ),
        "mindset": Insight(
            topic="Mindset overview",
            fact="Stress load and coping capacity influence recovery and long term wellbeing.",
            note="This tool is informational and not mental health care.",
        ),
        "social": Insight(
            topic="Connection overview",
            fact="Support and connection patterns are associated with stress buffering and wellbeing.",
            note="Building one reliable connection can be high leverage.",
        ),
        "spiritual": Insight(
            topic="Reflection overview",
            fact="Reflection and community can support meaning, regulation, and resilience.",
            note="Practice can be spiritual, philosophical, or personal.",
        ),
        "sexual": Insight(
            topic="Wellbeing overview",
            fact="Sexual wellbeing and intimacy are personal and can reflect stress, health, and connection.",
            note="This section is optional and not diagnostic.",
        ),
        "preparedness": Insight(
            topic="Preparedness overview",
            fact="Preparedness reduces uncertainty for you and the people who rely on you.",
            note="Preparedness is a stability practice, not fear based planning.",
        ),
    }

    section_results: List[Dict[str, Any]] = []
    total_score = 0
    total_min = 0
    total_max = 0

    for sec_id, sec in sections.items():
        sec_score = 0
        sec_min = 0
        sec_max = 0
        insights: List[Dict[str, str]] = []

        for qid in sec["qids"]:
            mapping = weights.get(qid, {})
            if mapping:
                sec_min += min(mapping.values())
                sec_max += max(mapping.values())

            val = answers.get(qid)
            if not val:
                continue

            sec_score += mapping.get(val, 0)

            ins = facts.get((qid, val))
            if ins:
                insights.append({"topic": ins.topic, "fact": ins.fact, "note": ins.note})

        # Ensure at least one insight per section
        if len(insights) == 0:
            fb = section_fallback.get(sec_id)
            if fb:
                insights.append({"topic": fb.topic, "fact": fb.fact, "note": fb.note})

        total_score += sec_score
        total_min += sec_min
        total_max += sec_max

        color = _color_for_score(sec_score)
        section_results.append(
            {
                "id": sec_id,
                "title": sec["title"],
                "color": color,
                "status": _status_for_color(color),
                "score": sec_score,
                "range": {"min": sec_min, "max": sec_max},
                "headline": {
                    "green": "More protective factors present in this section",
                    "yellow": "A mix of protective and risk associated factors in this section",
                    "red": "More risk associated factors present in this section",
                }[color],
                "insights": insights,
            }
        )

    # Normalize dot 0-100 for UI
    if total_max == total_min:
        dot = 50
    else:
        dot = int(round(100 * (total_score - total_min) / (total_max - total_min)))
        dot = int(_clamp(dot, 0, 100))

    if dot >= 80:
        band = "strong_protective"
        summary = "Your responses show a stronger concentration of protective factors."
    elif dot >= 60:
        band = "mostly_protective"
        summary = "Your responses lean protective overall, with some mixed areas."
    elif dot >= 40:
        band = "mixed"
        summary = "Your responses show a mix of protective and risk associated factors."
    elif dot >= 20:
        band = "elevated_risk"
        summary = "Your responses show more risk associated factors across multiple areas."
    else:
        band = "higher_risk"
        summary = "Your responses show a higher concentration of risk associated factors."

    return {
        "overall": {
            "band": band,
            "dot": dot,
            "summary": summary,
            "disclaimer": "Educational only. Not medical advice and not a prediction of lifespan or health outcomes.",
        },
        "sections": section_results,
        "pivot": {
            "text": "This assessment is designed to clarify where risk can be reduced and where preparation may be appropriate.",
            "cta_label": "Restart assessment",
        },
    }
