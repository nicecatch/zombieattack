import Location from "./models/Location";

const locations = ["Hospital", "School", "Warehouse"];

const populate = async () => {
  for (const locName of locations) {
    const found = await Location.findOne({ name: locName }).exec();
    if (!found) {
      console.log(`Location ${locName} not found. Seeding it`);
      await new Location({
        name: locName,
        zombiesCount: Math.floor(Math.random() * 1000)
      }).save();
    }
  }
};

export default populate;
