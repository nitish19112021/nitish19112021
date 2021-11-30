
const studentRoutes = require('./student');
const adminRoutes = require('./admin');
const broadcastRoutes = require('./broadcasts');
const teacherRoutes = require('./teacher');
const commonRoutes = require('./common');
const courseRoutes = require('./course');
const subjectCourseRoutes = require('./subjectCourse');

module.exports = {
studentRoutes: studentRoutes,
adminRoutes: adminRoutes,
broadcastRoutes: broadcastRoutes,
teacherRoutes: teacherRoutes,
commonRoutes: commonRoutes,
courseRoutes: courseRoutes,
subjectCourseRoutes: subjectCourseRoutes
}
