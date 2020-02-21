import Location from "../database/models/Location";

const getLocations = async () => {
  return Location.find({});
};

export default { getLocations };
