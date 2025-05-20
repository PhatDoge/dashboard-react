import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";

export async function loader() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flag + country.name.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
  })) as Country[];
}

const Createtrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError("Por favor, selecciona valores para todos los campos");
      setLoading(false);
      return;
    }
    if (formData.duration < 1 || formData.duration > 10) {
      setError("La duracion debe ser entre 1 y 10 dias");
      setLoading(false);
      return;
    }
    const user = await account.get();
    if (!user.$id) {
      console.log("Usuario no autenticado");
      setLoading(false);
      return;
    }
    try {
      console.log("user", user);
      console.log("formData", formData);
    } catch (error) {
      console.error("Error al crear el viaje", error);
    } finally {
      setLoading(false);
    }
  };

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        description="Mira y edita tus viajes con el poder de la IA"
        title="Agregar Viaje"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">
              <ComboBoxComponent
                id="country"
                dataSource={countryData}
                fields={{ text: "text", value: "value" }}
                placeholder="Seleccione un pais"
                className="combo-box"
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange("country", e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    countries
                      .filter((country) =>
                        country.name.toLowerCase().includes(query)
                      )
                      .map((country) => ({
                        text: country.name,
                        value: country.value,
                      }))
                  );
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="duration">Duracion</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Ingrese un numero de dias"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", e.target.value)}
            />
          </div>
          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Seleccione ${formatKey(key)}`}
                className="combo-box"
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
              />
            </div>
          ))}
          <div>
            <label htmlFor="location">Ubicacion de partida</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{
                    colorValuePath: "color",
                    fill: "#e5e5e5",
                  }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className="bg-gray-200 h-px w-full" />
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                className={cn("size-5", {
                  "animate-spin": loading,
                })}
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
              />
              <span className="text-white p-16-semibold">
                {loading ? (
                  <span className="flex items-center gap-1">
                    Generando
                    <span className="loading-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </span>
                ) : (
                  "Generar Viaje"
                )}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default Createtrip;
