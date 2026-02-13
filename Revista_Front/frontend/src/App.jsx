import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import Portal from "./pages/Portal";
import Filosofia from "./pages/Filosofia";
import Revista from "./pages/Revista";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Article from "./pages/Article";
import ArticleDetail from "./pages/ArticleDetail";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import PhilosophyBackground from "./components/PhilosophyBackground";

function App() {
  return (
    <>
      <PhilosophyBackground />
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/filosofia" element={<Filosofia />} />
          <Route path="/revista" element={<Revista />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* User Protected Routes */}
          <Route
            path="/article/:id"
            element={
              <ProtectedRoute>
                <ArticleDetail />
              </ProtectedRoute>
            }
          />

          {/* Management Routes */}
          <Route
            path="/article"
            element={
              <ProtectedRoute requiredRole="admin">
                <Article />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
