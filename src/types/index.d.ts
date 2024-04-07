export type Output = {
  heading: string;
  body: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type IPAddressData = {
  status: "empty" | "loaded" | "loading" | "error";
  details: Output[];
  location: Location;
};
