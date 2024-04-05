export default async (req, res) => {
  await setPFP()
  res.send("Started changing your PFP!")
}
