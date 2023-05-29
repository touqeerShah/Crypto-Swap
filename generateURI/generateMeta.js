const fs = require("fs");
const imageDir = fs.readdirSync("./folder");
imageDir.forEach((img) => {
  const metadata = {
    name: `PharamTrace ${img.split(".")[0]}`,
    description: "A PharamTrace in the Limited PharamTrace Family Collection",
    image: `https://gateway.pinata.cloud/ipfs/${env.process.ipfsPath}/${
      img.split(".")[0]
    }.png`,
    attributes: [],
  };
  console.log(img.split(".")[0] === "");
  if (img.split(".")[0] !== "") {
    fs.writeFileSync(
      `./metadata/${img.split(".")[0]}`,
      JSON.stringify(metadata)
    );
  }
});
