# Task 2 EDA Report

## Problem/Data Overview
The dataset used for this assignment is the UCI Adult Census Income dataset. It contains 48,842 records and 14 variables describing demographic, job, and income information. The objective is to perform exploratory data analysis, identify data quality issues, clean the data, and explain how income relates to factors such as age, education, work hours, occupation, and capital gain.

## Dataset Description
The dataset includes fields such as age, workclass, education, marital-status, occupation, relationship, race, sex, capital-gain, capital-loss, hours-per-week, native-country, and income. The income target is a binary classification variable showing whether an individual earns more than $50K per year.

## Data Cleaning
The following cleaning steps were applied:
- Duplicate rows were removed to avoid repeated observations.
- Missing values represented as '?' were treated as NaN.
- Categorical missing values were imputed with the mode for each field.
- Numeric columns were converted to numeric types.
- Remaining missing numeric values were filled with column medians.
- Income was converted to a binary label for analysis and modeling readiness.

These steps were necessary because missing data and inconsistent values can bias statistical summaries and reduce the quality of visualizations and machine learning models.

## Exploratory Analysis
The numeric variables were summarized using descriptive statistics such as mean, median, standard deviation, minimum, and maximum. Boxplots and histograms were used to inspect the distribution of age, work hours, and income. Categorical variables were examined using count plots to reveal education and income patterns.

## Visualizations
The notebook includes at least five meaningful visualizations, including:
- Age distribution histogram
- Income distribution bar chart
- Education distribution count plot
- Income by age box plot
- Income by hours-per-week box plot
- Correlation heatmap

## Findings
- The dataset is mainly composed of working-age adults, with a modest right skew in age.
- High-income earners are a minority relative to the overall population.
- Higher education levels are associated with greater probability of earning more than $50K.
- Individuals working more hours per week tend to be in the higher-income category.
- Capital gain shows unusual skew and outliers, reflecting large earnings differences.
- Education and age have the strongest practical relationship with income status.
- Missing values were concentrated in categorical fields, requiring imputation rather than deletion.

## Final Conclusions
The cleaned Adult dataset is well suited for EDA and later predictive modeling. The analysis shows that education, work hours, and age are important drivers of income level, while data quality issues such as missing values and duplicates must be controlled before building statistical or machine learning models.

## Submission Summary
The full analysis is documented in the notebook `task_2_eda.ipynb`, and this report is provided in PDF format for submission.
