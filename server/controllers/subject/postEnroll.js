const Subject = require("../../models/subject");
const User = require("../../models/user");

const postEnroll = async ({ studentId, subjectId }) => {
  console.log(`studentId: ${studentId}`);
  const subject = await Subject.findById(subjectId);
  console.log(subject);

  console.log(`subjectId: ${subjectId}`);
  const student = await User.findById(studentId);
  console.log(student);

  student.subjects.push(subject._id);
  subject.students.push(student._id);

  await student.save();
  await subject.save();

  console.log("\nsubject: ", subject);
  console.log("student: ", student);
};

module.exports = postEnroll;
