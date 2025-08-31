Vayuu – College Management System

Vayuu is a flexible, modern, and minimalist college management system built to streamline campus operations.
It provides a seamless way for Admins, Faculty, and Students to interact with college data through a clean, intuitive interface.

🚀 Features

🔑 Authentication & Authorization (role-based: Admin, Faculty, Student)

🏫 College Information Management (college profile, contact, address, etc.)

👨‍🎓 User Roles & Access Control

📊 Dashboard for Each Role with personalized information

🌓 Minimal, Modern UI with dark theme

🔄 Persistent Sessions (Redux + Supabase auth)

📱 Responsive Design (works across desktop and mobile)

🛠️ Tech Stack

Frontend: React, Redux Toolkit, Redux Persist, React Router

UI: TailwindCSS, shadcn/ui, Framer Motion, Lucide Icons

Backend / Auth: Supabase (Postgres + Auth)

State Management: Redux Toolkit

Notifications: Sonner

📂 Project Structure
vayuu/
├── src/
│   ├── components/     # UI components
│   ├── store/          # Redux slices & persist config
│   ├── supabase/       # Supabase auth & db utilities
│   ├── pages/          # Page components (Login, Dashboard, Info, etc.)
│   ├── App.jsx         # Root app with routing & toasts
│   └── main.jsx        # Entry point
├── public/             # Static assets (logo, favicon, etc.)
└── package.json

⚡ Getting Started
1. Clone the repo
git clone https://github.com/your-username/vayuu.git
cd vayuu

2. Install dependencies
npm install

3. Setup environment variables

Create a .env.local file in the project root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start the development server
npm run dev


The app will be running at:
👉 http://localhost:5173

🎯 Roadmap

 Student course registration

 Faculty class management

 Attendance system

 Exam & results module

 Notifications / Announcements

 Multi-language support

📸 Screenshots

(Add some UI screenshots here for Login, Dashboard, Info page, etc.)

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature/your-feature)

Commit changes

Open a Pull Request

📄 License

MIT License © 2025 — Built with ❤️ for modern colleges.
