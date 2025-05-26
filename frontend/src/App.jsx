import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AttemptQuiz from './pages/AttemptQuiz'
import Result from './pages/Result'
import CreateQuiz from './pages/CreateQuiz'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtuctedRoute';
import Managequiz from './pages/Managequiz';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <main className="p-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <AttemptQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/manage" element={<ProtectedRoute><Managequiz /></ProtectedRoute>} />

        </Routes>
      </main>
    </div>
  )
}

export default App

