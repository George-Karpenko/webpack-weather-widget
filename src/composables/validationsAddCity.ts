import { City } from "../@types";

export default function validationsAddCity(cities: City[]) {
  return [
    {
      text: "The location is too precise",
      cb: (name: string) => {
        const VALUES = 3;
        return name.split(",").length >= VALUES;
      },
    },
    {
      text: "You have already entered something similar",
      cb: (name: string) => {
        const [city, codeCountry] = name.split(",");
        return !!~cities.findIndex((element) => {
          const location = element.location.split(",");
          if (codeCountry && !location[1]) return false;
          if (location[1]) {
            return (
              location[0].trim().toUpperCase() === city.trim().toUpperCase() &&
              (codeCountry
                ? location[1].trim().toUpperCase() ===
                  codeCountry.trim().toUpperCase()
                : true)
            );
          }
          return location[0].trim().toUpperCase() === city.trim().toUpperCase();
        });
      },
    },
    {
      text: "Such a city already exists",
      cb: (name: string) => {
        const [city, codeCountry] = name.split(",");
        return !!~cities.findIndex((element) => {
          if (element.api) {
            if (codeCountry && !element.api.sys.country) return false;
            if (element.api.sys.country) {
              return (
                element.api.name.toUpperCase() === city.trim().toUpperCase() &&
                (codeCountry
                  ? element.api.sys.country.toUpperCase() ===
                    codeCountry.trim().toUpperCase()
                  : true)
              );
            }
            return element.api.name.toUpperCase() === city.trim().toUpperCase();
          }
        });
      },
    },
    {
      text: "Fill in the field",
      cb: (name: string) => name === "",
    },
  ];
}
