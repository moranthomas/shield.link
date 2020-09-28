const Shields = artifacts.require("Shields");
const ShieldShipping = artifacts.require("ShieldShipping");
const ShieldLife = artifacts.require("ShieldLife");
const ShieldFlight = artifacts.require("ShieldFlight");

module.exports = function(deployer) {
  deployer.deploy(Shields);
  deployer.deploy(ShieldShipping, 0x91347d2dc5ffeB1f156d7c36814848Dd3fa74961, 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e, '4ce9b71a1ac94abcad1ff9198e760b8c');
  deployer.deploy(ShieldLife, 0x91347d2dc5ffeB1f156d7c36814848Dd3fa74961, 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e, '4ce9b71a1ac94abcad1ff9198e760b8c');
  deployer.deploy(ShieldFlight, 0x91347d2dc5ffeB1f156d7c36814848Dd3fa74961, 0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e, '4ce9b71a1ac94abcad1ff9198e760b8c');
};
