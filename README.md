# Claude-Generated-Dashboard

# Corporate Governance & Financial Performance Dashboard 📊

**Live Interactive Demo:** https://rupeshpawar2203.github.io/Claude-Generated-Dashboard/

## Project Overview
This project is an exploration into rapid dashboard prototyping using AI. The goal was to visualize the correlation between Executive Compensation (Corporate Governance) and fundamental financial performance (Net Income, ROE) for top US tech companies over a 5-year period.

Instead of using traditional BI tools like Power BI or Tableau, I structured a raw CSV dataset and utilized **Claude 3.5 Sonnet** to generate the complete React-based UI/UX from a single prompt. 

## The Data Structure
The underlying data is a mock dataset joining two core financial concepts:
1. **Dim_Executive_Comp:** Base Salary, Cash Bonus, Stock Awards, and Median Employee Pay.
2. **Fact_Financials:** Total Revenue, Net Income, and Return on Equity (ROE).

## Key Analytical Insights 
The dashboard is designed to quickly spot "Governance Red Flags"—scenarios where executive pay heavily misaligns with company profitability. 
* *Example in data:* In 2022, Amazon's Net Income dropped into the negative (-$2.72B), yet Total CEO Compensation increased to $42.25M. The dual-axis combo chart and efficiency scatter plot instantly highlight these discrepancies.

## Tech Stack
* **Data Engineering:** Raw CSV formatting & structuring
* **UI/UX Generation:** Claude 3.5 Sonnet (AI)
* **Front-End:** React.js, Recharts, Tailwind CSS
* **Deployment:** GitHub Pages

## How to Run Locally
1. Clone the repository: `git clone [Insert your repo link here]`
2. Install dependencies: `npm install`
3. Start the local server: `npm start`
