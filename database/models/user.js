const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init(
        {
            name: { type: DataTypes.STRING(50), allowNull: false },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: { type: DataTypes.STRING(255), allowNull: false },
            is_admin: { type: DataTypes.BOOLEAN, defaultValue: 0 },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        },
        {
            sequelize,
            modelName: 'user',
            underscored: true,
            timestamps: false,
        }
    );
    return user;
};
