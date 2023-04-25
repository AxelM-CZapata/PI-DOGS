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
      type: DataTypes.STRING,
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
    altura:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    peso:{
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
