const Subject = require("../../models/subject");
const User = require("../../models/user");

const postEnroll = async ({ studentEmail, subjectCode }) => {
  const subject = await Subject.findOne({ code: subjectCode });
  const student = await User.findOne({ mail: studentEmail });
  console.log("email: ", studentEmail);
  console.log("code: ", subjectCode);
  console.log("subject: ", subject);
  console.log("student: ", student);
  student.subjects = [...student.subjects, subject._id];
  subject.students = [...subject.students, student._id];

  await student.save();
  await subject.save();
  console.log("\nsubject: ", subject);
  console.log("student: ", student);
};

module.exports = postEnroll;
