# Hypothesis Testing Framework

## 1. The Core Hypothesis
**Null Hypothesis ($H_0$):** There is no statistically significant correlation between a student's CareerPilot Career Readiness Score (derived from AI mock interviews) and their real-world probability of receiving a technical job offer.
**Alternative Hypothesis ($H_1$):** Students who consistently achieve higher Career Readiness Scores have a statistically significant higher probability of receiving job offers.

*Note: This relationship is currently a hypothesis. The platform's objective is to collect the data necessary to evaluate it.*

## 2. Statistical Analysis Methodology
Once the outcome data (Job Offer: Yes/No) is collected alongside the independent variable (Average Career Readiness Score):
- **Biserial Correlation:** Used to measure the relationship between the continuous variable (Score: 0-10) and the dichotomous variable (Placement: Yes/No).
- **Logistic Regression:** Used to model the probability of a student getting placed based on their score. E.g., "Does a score of 8.0 imply an 85% chance of placement?"

## 3. Disclaimers for Academic Honesty
Until $H_0$ is statistically rejected with a $p < 0.05$ threshold across a substantial sample size, CareerPilot makes **no guarantees** that high mock interview scores will result in actual placements. All marketing and academic literature must present this as a hypothesis undergoing active testing.
