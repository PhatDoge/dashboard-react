import { Header, StatsCard, TripCard } from "components";
import { useLoaderData } from "react-router";
import { getUser } from "~/appwrite/auth";
import { dashboardStats, user, allTrips } from "~/constants";
import type { Route } from "./+types/dashboard";

const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } =
  dashboardStats;

export const clientLoader = async () => await getUser();

const dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User | null;
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
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Viajes Creados</h1>
        <div className="trip-grid">
          {allTrips
            .slice(0, 4)
            .map(
              ({
                id,
                name,
                imageUrls,
                itinerary,
                tags,
                travelStyle,
                estimatedPrice,
              }) => (
                <TripCard
                  key={id}
                  id={id.toString()}
                  name={name}
                  imageUrl={imageUrls[0]}
                  location={itinerary?.[0]?.location ?? ""}
                  tags={tags}
                  price={estimatedPrice}
                />
              )
            )}
        </div>
      </section>
    </main>
  );
};

export default dashboard;
