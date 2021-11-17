const Users = require('./Users');
const MoviesFav = require('./MoviesFav');

MoviesFav.belongsTo(Users, { as: 'favs' });

module.exports = { Users, MoviesFav };
