# Quizze 🧠

An interactive quiz platform built with modern web technologies. Challenge yourself with multiple-choice questions across various categories and difficulty levels!

## ✨ Features

- 📚 **Multiple Categories**: Choose from various quiz categories and subcategories
- 🎯 **Difficulty Levels**: Easy, Medium, and Hard difficulty options
- 🏆 **Leaderboards**: Compete with others and climb the rankings
- 📊 **Progress Tracking**: Monitor your performance and improvement over time
- ⏱️ **Timed Quizzes**: Test your knowledge under time pressure
- 📈 **Detailed Results**: Review your answers and learn from mistakes
- 🔒 **User Authentication**: Secure sign-up and sign-in system
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- CORS

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/oracularzebra/quiz-api.git
   cd quizze
   ```

2. **Install frontend dependencies**
   ```bash
   cd quiz-webapp-typescript
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../quiz-api
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` file in the `quiz-api` directory:
   ```
   DATABASE_URL="your_postgresql_connection_string"
   ```

   Create `.env.local` file in the `quiz-webapp-typescript` directory:
   ```
   VITE_backend_url='http://localhost:9001'
   ```

5. **Start the development servers**

   Backend:
   ```bash
   cd quiz-api
   npm start
   ```

   Frontend:
   ```bash
   cd quiz-webapp-typescript
   npm run dev
   ```

## 📁 Project Structure

```

  quiz-webapp-typescript/      # Frontend application
  ├── src/
  │   ├── routes/             # React components/pages
  │   ├── utils/              # Utility functions
  │   ├── App.tsx             # Main app component
  │   └── main.tsx            # Entry point
  ├── index.html
  └── package.json
```

## 🎮 How to Use

1. **Sign Up/Sign In**: Create an account or log in to access quizzes
2. **Choose Category**: Select from available quiz categories
3. **Select Difficulty**: Pick your preferred difficulty level (Easy/Medium/Hard)
4. **Take Quiz**: Answer multiple-choice questions within the time limit
5. **View Results**: Review your score, correct answers, and detailed explanations
6. **Check Leaderboard**: See how you rank against other users
7. **Track Progress**: View your previous attempts and improvement over time

## 🌐 Deployment

The application is deployed and accessible at: [https://quiz-app-6701.onrender.com](https://quiz-app-6701.onrender.com)