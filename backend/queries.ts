import Location from "../database/models/Location";

const getLocations = () => {
  return Location.find({});
};

export default { getLocations };
