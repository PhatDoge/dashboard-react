import { Header } from "components";
import React from "react";

const trips = () => {
  return (
    <main className="all-users wrapper">
      <Header
        ctaUrl="/trips/create"
        ctaText="Crear Viaje"
        title="Viajes"
        description="Mira y edita tus viajes con el poder de la IA"
      />
    </main>
  );
};

export default trips;
