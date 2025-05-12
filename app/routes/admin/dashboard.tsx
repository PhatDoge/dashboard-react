import { Header } from "components";

const dashboard = () => {
  const user = {
    name: "John Doe",
    email: "7o5oN@example.com",
    imageUrl: "/assets/images/david.webp",
  };
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Bienvenido ${user?.name ?? "John Doe"} 👋 `}
        description="Administra tu cuenta y tus viajes"
      />
      dashboard page contenido
    </main>
  );
};

export default dashboard;
