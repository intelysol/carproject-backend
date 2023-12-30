module.exports = (sequelize, DataTypes) => {
  const CarFeatures = sequelize.define(
    "CarFeatures",
    {
      carFeature: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isActive: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );

  return CarFeatures;
};
