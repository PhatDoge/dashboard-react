import { Header } from "components";
import React from "react";

const AllUsers = () => {
  const user = {
    name: "John Doe",
    email: "7o5oN@example.com",
    imageUrl: "/assets/images/david.webp",
  };
  return (
    <main className="dashboard wrapper">
      <Header
        title="Todos los Viajes"
        description="Sigue a usuarios, y descubre nuevos viajes"
      />
      Contenido de pagina All users
    </main>
  );
};

export default AllUsers;
