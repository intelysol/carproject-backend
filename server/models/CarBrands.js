module.exports = (sequelize, DataTypes) => {
  const CarBrands = sequelize.define(
    "CarBrands",
    {
      brandName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      isActive: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      // createdBy: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      // },
      // updatedBy: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      // },
      // createdAt: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      // },
      // updatedAt: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   validate: {
      //     notEmpty: true,
      //   },
      // },
    },
    {
      timestamps: false,
    }
  );

  return CarBrands;
};
