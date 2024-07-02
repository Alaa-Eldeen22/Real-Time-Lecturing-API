const Subject = require("../../models/subject");
const User = require("../../models/user");

const postEnroll = async ({ studentId, subjectId }) => {
  const subject = await Subject.findById(subjectId);

  const student = await User.findById(studentId);

  student.subjects.push(subject._id);
  subject.students.push(student._id);

  await student.save();
  await subject.save();
};

module.exports = postEnroll;
