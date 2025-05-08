import { FrontendProject } from '../types';

export const projects: FrontendProject[] = [
  {
    id: "1",
    title: "Contacts App",
    description: "A simple contacts management application with CRUD operations and local storage support.",
    techStack: ["React", "TypeScript", "MUI"],
    liveDemoUrl: "https://hiringhood.vercel.app/",
    githubUrl: "https://github.com/chakri-14/HIRINGHOOD/tree/main/S1_02_APR_86cyetk20",
    features: [
      "A simple contacts management application", 
      "CRUD operations",
      "Local storage support",
      "Responsive design", 
      "Search and filter functionality"
    ],
    challenges: [
      "Faced issues  across multiple components",
      "Had issues with routing and navigation",
      "Issues with UI components and styling"
    ],
    solutions: [
      "Ensured proper imports and exports of components",
      "Used React Router for navigation and routing",
      "Used Simple UI components for better user experience"
    ],
    screenshots: [
      "https://unblast.com/wp-content/uploads/2020/06/Contacts-App-UI-Kit-Template-2.jpg", 
      "https://unblast.com/wp-content/uploads/2020/06/Contacts-App-UI-Kit-Template-1.jpg"
    ],
    thumbnail: "https://i.pinimg.com/1200x/0e/9b/72/0e9b72c1d8984470a0dd3019eb61fccd.jpg",
    featured: true
  },
  {
    id: "2",
    title: "Recipie Book",
    description: "A recipe book application with a user-friendly interface and a wide range of recipes.",
    techStack: ["React", "TypeScript", "MUI"],
    liveDemoUrl: "https://hiringhood-3b7b.vercel.app/",
    githubUrl: "https://github.com/chakri-14/HIRINGHOOD/tree/main/S1_03_APR_86cyetmhg",
    features: [
      "Interactive recipe book", 
      "Search and filter recipes", 
      "Simple and responsive design"
    ],
    challenges: [
      "Creating smooth animations without affecting performance",
      "Filtering issues",
      "Implementing responsive design that works across all devices"
    ],
    solutions: [
      "Took inspiration from popular recipe apps for UI",
      "Ensured correct API integration for fetching recipes",
      "Ensured screen sizes and resolutions were handled properly"
    ],
    screenshots: [
      "https://codingtorque.com/wp-content/uploads/2023/02/2-25-1024x576.png", 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkHM9WTZ82MNY07RNZs0t-0bovLuv2rfvbAjQTVTq46JgEHJUJrlcJahSFXmCKBRF32sI&usqp=CAU"
    ],
    thumbnail: "https://i.pinimg.com/736x/1d/60/04/1d6004a5226b4c1475f8b5be9ad8c05d.jpg",
    featured: false
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A weather forecasting application with interactive maps, real-time updates, and location-based services.",
    techStack: ["React", "TypeScript", "API"],
    liveDemoUrl: "https://example.com/weather-app",
    githubUrl: "https://github.com/chakri-14/HIRINGHOOD/tree/main/S1_04_APR_86cyfw8dq",
    features: [
      "5-day weather forecast", 
      "Interactive weather maps", 
      "Location-based services",
      "Severe weather alerts"
    ],
    challenges: [
      "Integrating with multiple weather APIs",
      "Fetching 5 day forecast data",
      "Responsive design for mobile and desktop"
    ],
    solutions: [
      "Built adapter pattern for handling multiple API sources",
      "Used open weather API for accurate data",
      "Ensured usage of proper styling"
    ],
    screenshots: [
      "https://miro.medium.com/v2/resize:fit:1400/1*fbLb3jkm3V_m4Mo5bmYJMg.png", 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtsagzBUeI_i-YRhUzvzXzYjiejDSGAOi3T_8r3lnur-rrRGXdFHsPmNrxT8XGyR80fc&usqp=CAU"
    ],
    thumbnail: "https://i.pinimg.com/736x/30/b1/1a/30b11a92a85361de088b6d668785f0aa.jpg",
    featured: true
  },
  {
    id: "4",
    title: "Finance Tracker",
    description: "A personal finance management tool with budgeting, expense tracking, and financial goal setting.",
    techStack: ["React", "TypeScript", "MUI","Express","MongoDB","Node.js"],
    liveDemoUrl: "https://hiringhood-xe19.vercel.app/",
    githubUrl: "https://github.com/chakri-14/HIRINGHOOD/tree/main/S1_08_APR_86cyg48jf",
    features: [
      "Budgeting tools",
      "Expense tracking",
      "Financial goal setting",
      "Interactive charts and graphs",
      "Data export options" 
    ],
    challenges: [
      "Handling input and validation for financial data",
      "Creating interactive charts and graphs",
      "Exporting data into CSV format"
    ],
    solutions: [
      "Used Formik for form handling and validation",
      "Implemented Chart.js for interactive charts",
      "Used libraries like PapaParse for CSV export"
    ],
    screenshots: [
      "https://images.ctfassets.net/lpvian6u6i39/6IYyJiDxqytCEH1RAyI0C6/0bfee6878c2f604927e404c6be894f1b/Project_expense_tracking_software.png", 
      "https://www.tillerhq.com/wp-content/uploads/2024/06/Personal-Budget-Tracker.png"
    ],
    thumbnail: "https://marketplace.canva.com/EAGQZhT83lg/1/0/1600w/canva-dark-green-modern-illustrative-finance-service-logo-GTKa2Yxea4Y.jpg",
    featured: true
  },
 
  {
    id: "5",
    title: "Task Manager",
    description: "A task management application with Kanban boards, task assignments, and deadline tracking.",
    techStack: ["React", "TypeScript", "MUI"],
    liveDemoUrl: "https://example.com/social-dashboard",
    githubUrl: "https://github.com/chakri-14/HIRINGHOOD/tree/main/S2_07_APR_86cygrakd",
    features: [
      "Task assignment and tracking", 
      "Deadline reminders", 
      "Responsive design",
      "Tracking progress"
    ],
    challenges: [
      "Responsive design for different screen sizes",
      "Proper state management for task updates",
      "Dark and light mode support"
    ],
    solutions: [
      "Used MUI for responsive design",
      "Implemented Redux for state management",
      "Simple toggle for dark and light mode"
    ],
    screenshots: [
      "data:image/png;base64,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", 
      "https://static.vecteezy.com/system/resources/previews/039/343/336/non_2x/planner-app-ui-task-manager-and-project-organizer-with-dashboard-and-infographic-elements-dark-web-application-interface-design-vector.jpg"
    ],
    thumbnail: "https://i.pinimg.com/736x/f8/98/bf/f898bfb34a80f0784e1417c86a096e13.jpg",
    featured: false
  },
  {
    id: "6",
    title: "JobBoardX",
    description: "A job board platform connecting job seekers with employers, featuring advanced search and filtering options.",
    techStack: ["React", "TypeScript", "MUI","Node.js", "Express", "MongoDB"],
    liveDemoUrl: "https://example.com/ecommerce-dashboard",
    githubUrl: "https://github.com/chakri-14/HIRINGHOOD/tree/main/S2_08_APR_86cygrb67",
    features: [
      "User authentication",
      "Job posting and application",
      "Advanced search and filtering",
      "Real-time notifications",
      "Responsive design" 
    ],
    challenges: [
      "Implementing real-time tracking of job applications",
      "Fetching and displaying job listings efficiently",
      "Fetching applicants data and displaying it in a user-friendly manner",
    ],
    solutions: [
      "Proper routing and state management",
      "Optimized API calls for fetching job listings",
      "Implemented pagination and lazy loading for better performance",
    ],
    screenshots: [
      "https://i.pinimg.com/736x/71/a1/7c/71a17cae02eb956f0331246e2b638ded.jpg", 
      "https://cdn.prod.website-files.com/5e8e816d43060db856099187/61088e7d1bd0c20d1fb1a9cc_job-portal-webflow-website-template.png"
    ],
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsQEZYewrE6fPGlyQcHZ84VGyg-C55cWgrWg&s",
    featured: true
  }
];