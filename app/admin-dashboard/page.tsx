"use client";

import { useState } from "react";
import Form from "./_components/form";

const AdminDashboard = () => {
  const [accessGranted, setAccessGranted] = useState(false);

  const handleAccess = async () => {
    const password = prompt("Digite a senha de acesso:");
    if (!password) {
      alert("Senha não fornecida.");
      return;
    }

    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      console.log(response);

      if (response.ok) {
        setAccessGranted(true);
      } else {
        alert("Senha incorreta.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Erro ao validar acesso. Tente novamente.");
    }
  };

  if (!accessGranted) {
    return (
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <button
          onClick={handleAccess}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Entrar no Painel de Admin
        </button>
      </div>
    );
  }

  return (
    <div className="text-center text-xl mt-10">
      Bem-vindo à Admin Dashboard!
      <div className="flex items-center justify-center w-full mt-10">
        <Form />
      </div>
    </div>
  );
};

export default AdminDashboard;
