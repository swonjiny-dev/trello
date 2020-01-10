module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        email : {
            type : DataTypes.STRING(50),
            allowNull : false,
            unique : true
        } ,
        nickname : {
            type : DataTypes.STRING(50),
            allowNull : false,
        },
        password : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        level : {
            type : DataTypes.STRING(1),
            allowNull : false
        }
    },{
        charset : 'utf8',
        collate: 'utf8_general_ci'
    });

    return User;
};