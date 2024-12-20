import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MenuPage() {
  const [user, setUser] = useState(null); // État pour stocker l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(`/doCheck-auth`, {
          withCredentials: true, // Inclus les cookies pour la session
        });
        if (response.data.authenticated) {
          setUser(response.data.user);
        } else {
          navigate("/login"); // Redirige si non authentifié
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        navigate("/login"); // Redirige en cas d'erreur
      }
    };

    fetchAuthStatus();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`/doLogout`, {}, { withCredentials: true });
      setUser(null); // Réinitialise l'utilisateur
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div
      className="flex min-h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to left, #092033, #113a55, #1c4978, #28589c, #356abf)`,
        backgroundSize: "100% 100%",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Boîte gauche avec image */}
      <div
        className="hidden md:flex flex-1 min-h-full items-center justify-center"
        style={{
          backgroundImage: `url('/login-illustration.svg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Boîte droite sans image */}
      <div className="flex-1 h-full flex flex-col items-center justify-center text-gray-200 bg-transparent p-4">
        <h1 className="text-2xl md:text-5xl font-extrabold text-blue-300 mb-8 z-10 text-center">
          Bienvenue {user ? user.username : "Invité"} !
        </h1>
        <p className="text-base md:text-xl text-gray-300 mb-6 z-10 text-center">
          Sélectionnez un chatbot pour commencer !
        </p>
        <div className="flex flex-col gap-4 items-center w-full z-10">
          {[
            { path: "/Maximus", logo: "logo_maximus.webp", text: "Maximus" },
            { path: "/Merlin", logo: "logo_merlin.webp", text: "Merlin" },
            { path: "/Colbert", logo: "logo_colbert.webp", text: "Colbert" },
            { path: "/Thready", logo: "logo_thready.webp", text: "Thready" },
            { path: "/Supermid", logo: "logo_supermid.webp", text: "SuperMid" },
          ].map((button, index) => (
            <Link key={index} to={button.path}>
              <button
                className="w-[230px] bg-gray-300 bg-opacity-90 hover:bg-opacity-40 hover:text-gray-800 text-gray-600 font-bold py-4 md:py-6 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-start hover:border hover:border-white"
              >
                <img
                  src={button.logo}
                  alt="logo"
                  className="w-8 md:w-10 h-8 md:h-10 ml-6 flex-shrink-0"
                />
                <span className="ml-6 text-gray-800 text-xl">{button.text}</span>
              </button>
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
            >
              Se déconnecter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
