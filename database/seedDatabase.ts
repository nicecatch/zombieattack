import Location from "./models/Location";

const locations = ["Hospital", "School", "Warehouse"];

const findAndPopulate = async (name: string) => {
  const found = await Location.findOne({ name: name }).exec();
  if (!found) {
    console.log(`Location ${name} not found. Seeding it`);
    await new Location({
      name: name,
      zombiesCount: Math.floor(Math.random() * 1000)
    }).save();
  }
};

const populate = async () => {
  const promises = locations.map(loc => findAndPopulate(loc));
  await Promise.all(promises);
};

export default populate;
