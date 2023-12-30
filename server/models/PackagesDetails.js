module.exports = (sequelize, DataTypes) => {
  const PackagesDetails = sequelize.define(
    "PackagesDetails",
    {
      packageType: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      packageFeature: {
        type: DataTypes.TEXT,
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
  return PackagesDetails;
};
