import { Header, StatsCard, TripCard } from "components";

const dashboard = () => {
  const user = {
    name: "John Doe",
    email: "7o5oN@example.com",
    imageUrl: "/assets/images/david.webp",
  };
  const dashboardStats = {
    totalUsers: 123333,
    usersJoined: {
      currentMonth: 218,
      lastMonth: 176,
    },
    totalTrips: 3210,
    tripsCreated: {
      currentMonth: 150,
      lastMonth: 250,
    },
    userRole: {
      total: 62,
      currentMonth: 25,
      lastMonth: 15,
    },
  };

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } =
    dashboardStats;
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Bienvenido ${user?.name ?? "John Doe"} 👋 `}
        description="Administra tu cuenta y tus viajes"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Usuarios Totales"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Viajes Totales"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Usuarios Activos"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>
      <TripCard />
    </main>
  );
};

export default dashboard;
