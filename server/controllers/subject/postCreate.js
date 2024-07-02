const Subject = require("../../models/subject");

const postCreate = async ({ code, name }) => {
  try {
    const sub = await Subject.create({
      code: code,
      name: name,
    });
    // console.log("subject created", sub);
  } catch (err) {
    console.log(err);
  }
};

module.exports = postCreate;
