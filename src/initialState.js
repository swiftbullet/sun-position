import language from "./intl/language";

const defaultLongitude = 107.6;
const defaultLatitude = 51.84;

const initialState = {
  selectedDate: new Date(),
  langData: language.RU,
  theme: { dark: false },
  latitude: defaultLatitude,
  longitude: defaultLongitude,
};

export default initialState;
