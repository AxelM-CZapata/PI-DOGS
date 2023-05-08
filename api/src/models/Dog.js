const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (db) => {
  // defino el modelo
  db.define('Dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate:{
        isUrl: true
      }
    },
    name:{
      type: DataTypes.STRING,
      unique:true,
      allowNull:false,
    },
    height:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    weight:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    years:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  },
   { timestamps: false,}
  );
};
