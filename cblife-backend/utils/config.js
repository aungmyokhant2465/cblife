require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.host,
  USERNAME: process.env.user,
  PASSWORD: process.env.password,
  DATABASE_NAME: process.env.database,
  DIALECT: process.env.dialect,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET || "",
  DIGITAL_OCEAN_ACCESS_KEYID: process.env.DIGITAL_OCEAN_ACCESS_KEYID,
  DIGITAL_OCEAN_SECRET_ACCESS_KEY: process.env.DIGITAL_OCEAN_SECRET_ACCESS_KEY,
};

/*
    *** Onboarding ***
    attribute -> image, title, paragraph
    process -> add, list, update, remove

    *** News ***
    attribute -> image, header, description
    process -> add, list, update(offset and limit parameters for pagination, search by header), remove

    *** Knowledge hub ***
    attribute -> image, header, description
    process -> add, list, update(offset and limit parameters for pagination, search by header), remove

    *** Promotions ***
    attribute -> image, header, description
    process -> add, list, update(offset and limit parameters for pagination, search by header), remove

    *** Partnership hospital ***
    attribute -> image, hospital name, address, phones, phone note, link
    process -> add, list, update(offset and limit parameters for pagination, search by hospital name), remove

    *** Private hospital ***
    attribute -> image, hospital name, address, phones, opening hour
    process -> add, list, update(offset and limit parameters for pagination, search by hospital name), remove

    *** Product ***
    attribute -> image, title, description
    process -> add, list, update(offset and limit parameters for pagination, search by title), remove

    *** User (for authentication) ***
    attribute -> username, password
    process -> login, update password
*/
