# Revolut Finance Dashboard

A personal finance dashboard that connects to your Revolut online banking account to provide insights into your spending, savings, and overall financial health.

![Finance Dashboard Preview](https://via.placeholder.com/800x450.png?text=Finance+Dashboard+Preview)

## Features

- **Account Overview**: View all your Revolut accounts in one place with current balances
- **Transaction History**: See your recent transactions with detailed information
- **Spending Analysis**: Visualize your spending patterns by category
- **Financial Insights**: Get personalized insights to improve your financial health
- **Secure Connection**: Connect securely to your Revolut account
- **Responsive Design**: Access your dashboard on any device

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Data Visualization**: Chart.js, React-ChartJS-2, Tremor
- **UI Components**: Headless UI, Heroicons
- **API Integration**: Axios for API requests
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- A Revolut account (for real data integration)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/finance-dashboard.git
   cd finance-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
finance-dashboard/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── page.tsx          # Landing page
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   └── dashboard/        # Dashboard-specific components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
└── ...config files
```

## Connecting to Revolut

This project includes a mock API that simulates Revolut data for demonstration purposes. To connect to a real Revolut account, you would need to:

1. Register for Revolut's API access
2. Obtain API credentials
3. Update the API integration in `src/app/api/revolut/route.ts`

## Customization

- **Theme**: Modify the Tailwind configuration in `tailwind.config.js`
- **Data Sources**: Add additional financial data sources in the API routes
- **Components**: Extend or modify dashboard components in `src/components/dashboard/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Chart.js](https://www.chartjs.org/) - For data visualization
- [Revolut API](https://developer.revolut.com/) - For banking data integration
