
  const userNames = [
    'Nebula',
    'Navigator',
    'Quantum',
    'Quokka',
    'Pixel',
    'Pioneer',
    'Serene',
    'Sphinx',
    'Galactic',
    'Glimmer',
    'Mystic',
    'Mariner',
    'Zenith',
    'Zebra',
    'Echoing',
    'Eclipse',
    'Whimsical',
    'Willow',
    'Raven',
    'Radiant'
  ];
  
  
  const thoughts = [
"Morning coffee vibes! Ready to conquer the day.",
"Just finished an amazing book. Highly recommend 'The Midnight Library' by Matt Haig!",
"Nature walk therapy today. Sometimes, you just need to disconnect to reconnect.",
"Cooked a new recipe tonight—spaghetti carbonara! So delicious and easy to make.",
"Feeling grateful for the little things in life. Take a moment to appreciate your blessings.",
"Started a new workout routine and already feeling stronger. Consistency is key!",
"Throwback to an unforgettable trip to Paris. Can't wait to travel again!",
"Binge-watching the latest season of 'Stranger Things.' Who else is obsessed?",
"Supporting small businesses this weekend. Let's keep our local economy thriving!",
"Trying out some meditation and it's been a game changer. Inner peace is everything.",
"Just adopted the cutest puppy ever! Meet Max, the newest member of the family.",
"Made a vision board for 2024. Manifesting all my dreams and goals.",
"Had an epic game night with friends. Nothing beats a good laugh and some friendly competition.",
"Listening to the new album by Taylor Swift on repeat. What's your favorite track?",
"Decorated my space with some cozy fairy lights. It's all about the ambiance!",
"Went for a run at sunrise and it was breathtaking. Starting the day with a fresh perspective.",
"Experimenting with some DIY crafts today. Creativity is the best outlet.",
"Celebrating a major milestone at work! Hard work truly pays off.",
"Planning a weekend getaway to the mountains. Time to recharge and enjoy nature.",
"Just finished a yoga session and feeling zen. Finding balance in every breath."
  ];
  
  const thoughtReactions = [
    "Like",
    "Dislike",
  ];

  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random username
  const getUsername = () =>
    `${getRandomArrItem(userNames)}${getRandomArrItem(userNames)}`;
  
  
  // Function to generate random thoughts that we can add to the database. Includes reactions.
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        reactions: [...getThoughtReactions(2)],
      });
    }
    return results;
  };
  
  // Create the reaction that will be added to each thought
  const getThoughtReactions = (int) => {
    if (int === 1) {
      return getRandomArrItem(thoughtReactions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(thoughtReactions),
        username: getUsername(),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getUsername, getRandomThoughts,getRandomArrItem };