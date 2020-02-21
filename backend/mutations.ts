import Location from "../database/models/Location";

const moveZombies = async (
  _: any,
  { from, to, amount }: { from: string; to: string; amount: number }
) => {
  const fromLocation = await Location.findById(from).exec();
  const toLocation = await Location.findById(to).exec();

  if (!fromLocation || !toLocation) {
    throw new Error("Locations not found");
  }

  if (fromLocation.zombiesCount < amount) {
    throw new Error("Not enough zombies");
  }

  fromLocation.zombiesCount = fromLocation.zombiesCount - amount;
  await fromLocation.save();
  toLocation.zombiesCount = toLocation.zombiesCount + amount;
  await toLocation.save();

  return Location.find({});
};

export default { moveZombies };
