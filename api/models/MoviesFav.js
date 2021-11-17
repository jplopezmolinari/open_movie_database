const S = require('sequelize');
const db = require('../db');

class MoviesFav extends S.Model {}

MoviesFav.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    urlID: {
      type: S.STRING,
      allowNull: false,
    },
    route: {
      type: S.VIRTUAL,
      get() {
        return `/movies/${this.getDataValue('urlID')}`;
      },
    },
  },
  { sequelize: db, modelName: 'moviesfav' }
);

module.exports = MoviesFav;
