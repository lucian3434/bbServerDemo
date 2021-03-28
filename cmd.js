const itemList = ["Rifle", "Pistol", "Cannon", "Bow", "Blowpipe", "Bullet", "Cannonball", "Arrow", "Dart", "Sword", "Knife", "Rock", "Potion"];

// bog standard ping command
exports.ping = function(msg) {
  msg.channel.createMessage("pong!");
}

// generate a random inventory for the user
exports.geninv = function(msg, db) {
  let inv = {};

  // add some random items
  for (let i = 0; i < itemList.length; i++) {
    let randItem = Math.floor(Math.random() * itemList.length);
    if (inv.hasOwnProperty(itemList[randItem])) {
      inv[itemList[randItem]]++;
    }
    else {
      inv[itemList[randItem]] = 1;
    }
  }

  // somehow store inv in the database

  msg.channel.createMessage("WIP");
  return getItemList(inv);
}

// show the players inventory
exports.showinv = function(msg, db) {
  msg.channel.createMessage("WIP");
}

// formatting stuff
const getItemList = function(inv) {
  let content = "";
  Object.keys(inv).forEach((item) => { content += `${item} x${inv[item]}\n`; });
  return content;
}
