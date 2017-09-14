const Required = type =>
({
  type,
  allowNull: false
})

const Enum = (DataTypes, values, defaultValue) =>
({
  type: DataTypes.ENUM,
  values,
  defaultValue
})

const DateNow = DataTypes =>
({
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
})

const UniqueString = DataTypes =>
({
  type: DataTypes.STRING,
  unique: true
})

const False = DataTypes =>
({
  type: DataTypes.BOOLEAN,
  defaultValue: false
})

const Zero = DataTypes =>
({
  type: DataTypes.INTEGER,
  defaultValue: 0
})

module.exports = {
  Required,
  Enum,
  DateNow,
  UniqueString,
  False,
  Zero
}
