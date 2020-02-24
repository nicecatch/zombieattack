import Location from "../database/models/Location";

const moveZombies = async (
  _: any,
  { from, to, amount }: { from: string; to: string; amount: number }
) => {
  const [fromLocation, toLocation] = await Promise.all([
    Location.findById(from).exec(),
    Location.findById(to).exec()
  ]);

  if (!fromLocation || !toLocation) {
    throw new Error("Locations not found");
  }

  if (fromLocation.zombiesCount < amount) {
    throw new Error("Not enough zombies");
  }

  fromLocation.zombiesCount = fromLocation.zombiesCount - amount;
  toLocation.zombiesCount = toLocation.zombiesCount + amount;
  await Promise.all([
    fromLocation.save(),
    toLocation.save()
  ]);

  return Location.find({});
};

export default { moveZombies };
