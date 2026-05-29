# Datafolio - Data Science & ML Portfolio

A modern Next.js 15 portfolio showcasing machine learning projects, data science work, and API development. Built with TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Next.js 15** - Latest version with improved performance and features
- **React 19** - Latest React version with enhanced capabilities
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Machine Learning Showcase** - Featured ML projects with metrics and GitHub links
- **Interactive Dashboard** - Real-time stats, featured projects, and skill visualization
- **Data Science Timeline** - Learning path, milestones, and skill proficiency tracking
- **API Portfolio** - FastAPI and Docker containerization examples
- **Responsive Design** - Mobile-first approach with smooth animations

## 🎯 Featured Projects

### 🤖 Motor Failure Prediction API
- **Model**: XGBoost with hyperparameter tuning
- **Performance**: 96.5% ROC-AUC, 79% recall
- **Tech**: Python, XGBoost, FastAPI, Docker, Scikit-learn
- **Repository**: [Model-failure-prediction-API](https://github.com/mgboh-freddie/Model-failure-prediction-API)

### 📊 Customer Churn Prediction API
- **Model**: Ensemble approach (Logistic Regression, Random Forest, XGBoost)
- **Performance**: 96.5% ROC-AUC with probability calibration
- **Tech**: Python, XGBoost, FastAPI, Pandas, Docker
- **Repository**: [TELECO-CHURN](https://github.com/mgboh-freddie/TELECO-CHURN)

## 🛠️ Tech Stack

**Core**:
- Python 3.x
- XGBoost, Scikit-learn
- FastAPI, Pydantic
- Docker

**Data**:
- Pandas, NumPy
- SQL, PostgreSQL
- Excel (Power Query, Pivot Tables)

**Frontend**:
- React 19, Next.js 15
- Tailwind CSS
- Framer Motion
- Recharts (data visualization)

**DevOps**:
- Docker & containerization
- Git/GitHub
- REST API design

## 📁 Project Structure

```
datafolio/
├── public/                    # Static assets & images
├── src/
│   ├── app/                   # Next.js app router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home (redirects to dashboard)
│   │   ├── home-dashboard/    # Main dashboard with featured projects
│   │   ├── projects-portfolio/ # All projects with filtering
│   │   ├── data-science/      # Data science learning path
│   │   ├── skills-technologies/ # Skills proficiency & tech stack
│   │   ├── about-experience/  # Timeline, experience, education
│   │   ├── contact-resume/    # Contact & resume download
│   │   └── work-samples/      # Work samples & case studies
│   ├── components/            # Reusable React components
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── ui/
│   └── styles/                # Global styles & Tailwind
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies & scripts
```

## 🧠 Key Skills Showcased

- **Machine Learning**: XGBoost, model tuning, probability calibration, evaluation metrics
- **Data Science**: Data cleaning, feature engineering, exploratory analysis
- **API Development**: FastAPI, REST design, async endpoints, validation
- **DevOps**: Docker containerization, reproducible deployments
- **Data Tools**: Python, Pandas, NumPy, SQL, Excel
- **Visualization**: Data dashboards, interactive charts, metrics display

## 🎨 Design Highlights

- **Dark theme** optimized for code/data visualization
- **Smooth animations** with Framer Motion
- **Interactive components** with hover effects & transitions
- **Performance metrics** prominently displayed
- **GitHub integration** for repository links
- **Responsive grid layouts** for mobile & desktop

## 🚀 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

## 📊 Portfolio Sections

| Section | Purpose |
|---------|---------|
| **Home Dashboard** | Hero banner, featured projects, quick stats |
| **Projects Portfolio** | Searchable, filterable project showcase with ML APIs |
| **Data Science** | Learning roadmap, milestones, proficiency tracker |
| **Skills & Technologies** | Radar charts, proficiency levels, tool showcase |
| **About & Experience** | Timeline, education, experience, interests |
| **Contact & Resume** | Contact information, resume download |

## 🔧 Customization

### Add New Projects
Edit `src/app/projects-portfolio/components/ProjectsContent.tsx` and add to the `projects` array.

### Update Skills
Modify `src/app/skills-technologies/components/SkillsContent.tsx` `skillCategories` array.

### Change Colors
Update Tailwind color classes in component files or modify `tailwind.config.js`.

### Update Content
Edit component files directly - all content is centralized in component data structures.

## 📈 Performance Features

- Static generation for fast page loads
- Image optimization
- Code splitting
- Lazy loading components
- Smooth CSS animations

## 🎓 Learning Resources Used

- XGBoost documentation
- FastAPI best practices
- Docker for ML workflows
- Next.js 15 documentation
- Tailwind CSS utilities

## 📝 License

This portfolio is open source and available under the MIT License.

## 🤝 Connect

- **GitHub**: [mgboh-freddie](https://github.com/mgboh-freddie)
- **Email**: Contact via portfolio
- **Location**: Nigeria

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

This project uses Tailwind CSS for styling with the following features:
- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## 📱 Deployment

Build the application for production:

  ```bash
  npm run build
  ```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🙏 Acknowledgments

- Powered by Next.js and React
- Styled with Tailwind CSS