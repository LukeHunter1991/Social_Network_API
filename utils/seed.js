const connection = require("../config/connection");

const { User, Thought, reactionSchema } = require("../models");
const { getUsername, getRandomThoughts, getRandomArrItem } = require("./data");

connection.on("error", (err) => err);
connection.once("open", async () => {
  console.log("connected");

  let checkThought = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();

  if (checkThought.length) {
    await connection.dropCollection("thoughts");
  }

  let checkUser = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (checkUser.length) {
    await connection.dropCollection("users");
  }

  const users = [];

  const thoughts = getRandomThoughts(10);

  for (let i = 0; i < 20; i++) {
    const username = getUsername();
    const email = (`${username}@gmail.com`).toLowerCase();

    users.push({
      username,
      email,
    });
  }

  const userData = await User.insertMany(users);
  const updatedThoughts = [];
  for (let index = 0; index < thoughts.length; index++) {
    const element = thoughts[index];
    element.username = userData[Math.floor(Math.random() * 20)]._id;
    for (let i = 0; i < element.reactions.length; i++) {
      element.reactions[i].username =
        userData[Math.floor(Math.random() * 20)]._id;
    }
    updatedThoughts.push(element);
  }

  const thoughtData = await Thought.insertMany(updatedThoughts);

  for (let jindex = 0; jindex < thoughtData.length; jindex++) {
    for (let index = 0; index < userData.length; index++) {
      if (
        thoughtData[jindex].username.toString() ===
        userData[index]._id.toString()
      ) {
        await User.findByIdAndUpdate(userData[index]._id, {
          $push: {
            thoughts: thoughtData[jindex],
            friends: userData[Math.floor(Math.random() * 20)],
          },
        });
        break;
      }
    }
  }

  console.info("Seeding complete! 🌱");
  process.exit(0);
});