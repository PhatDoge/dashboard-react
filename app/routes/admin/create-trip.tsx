import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/create-trip";
import { comboBoxItems, selectItems } from "~/constants";
import { formatKey } from "lib/utils";

export const loader = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countryData = await response.json();
  return countryData.map((country: any) => ({
    name: country.flag + country.name.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
  }));
};

const Createtrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  console.log(countries);

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const handleChange = (key: keyof TripFormData, value: string | number) => {};

  const handleSubmit = async () => {};
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
        </form>
      </section>
    </main>
  );
};

export default Createtrip;
