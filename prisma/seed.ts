
import { Day, PrismaClient, Usergender, Sem, Batch } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  // await prisma.admin.create({
  //   data: {
  //     userName: "admin1123",
  //   },
  // });

  // // GRADE
  // for (let i = 1; i <= 6; i++) {
  //   await prisma.grade.create({
  //     data: {
  //       level: i,
  //     },
  //   });
  // }

  // // CLASS
  // for (let i = 1; i <= 6; i++) {
  //   await prisma.class.create({
  //     data: {
  //       name: `${i}A`, 
  //       gradeId: i, 
  //       capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
  //     },
  //   });
  // }

  // // SUBJECT
  // const subjectData = [
  //   { name: "C++" },
  //   { name: "C" },
  //   { name: "Java" },
  //   { name: "DSA" },
  //   { name: "UNIX Prog." },
  //   { name: "Web Development" },
  //   { name: "Python" },
  //   { name: "Android Development" },
  //   { name: "JavaScript" },
  //   { name: "PHP" },
  // ];

  // for (const subject of subjectData) {
  //   await prisma.subject.create({ data: subject });
  // }

  // // TEACHER
  // for (let i = 1; i <= 15; i++) {
  //   await prisma.teacher.create({
  //     data: {
  //       id: `teacher${i}`, 
  //       username: `teacher${i}`,
  //       name: `TName${i}`,
  //       surname: `TSurname${i}`,
  //       email: `teacher${i}@example.com`,
  //       phone: `123-456-789${i}`,
  //       createdAt: new Date(),
  //       gender: i % 2 === 0 ? Usergender.MALE : Usergender.FEMALE,
  //       subjects: { connect: [{ id: (i % 10) + 1 }] }, 
  //       classes: { connect: [{ id: (i % 6) + 1 }] }, 
  //     },
  //   });
  // }

  // // LESSON
  // for (let i = 1; i <= 30; i++) {
  //   await prisma.lesson.create({
  //     data: {
  //       name: `Lesson${i}`, 
  //       day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day], 
  //       startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
  //       endTime: new Date(new Date().setHours(new Date().getHours() + 3)), 
  //       subjectId: (i % 10) + 1, 
  //       classId: (i % 6) + 1, 
  //       teacherId: `teacher${(i % 15) + 1}`, 
  //     },
  //   });
  // }

  // // STUDENT and FEE
  // const batchFees = {
  //   BCA: 100000,
  //   BTECH: 90000,
  //   BBA: 85000,
  //   MCA: 105000,
  //   MTECH: 95000,
  //   BSC: 80000,
  //   MSC: 88000,
  // };

  // for (let i = 1; i <= 50; i++) {
  //   const batch = Object.keys(batchFees)[i % Object.keys(batchFees).length] as keyof typeof batchFees;
  //   await prisma.student.create({
  //     data: {
  //       id: `student${i}`, 
  //       username: `student${i}`, 
  //       name: `SName${i}`,
  //       surname: `SSurname ${i}`,
  //       email: `student${i}@example.com`,
  //       phone: `987-654-321${i}`,
  //       address: `Address${i}`,
  //       gender: i % 2 === 0 ? Usergender.MALE : Usergender.FEMALE,
  //       gradeId: (i % 6) + 1, 
  //       classId: (i % 6) + 1, 
  //       batch: batch as Batch,
  //       fee: {
  //         create: {
  //           amount: batchFees[batch],
  //           semesterName: Sem.FIRST,
  //         },
  //       },
  //     },
  //   });
  // }

  // // EXAM
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.exam.create({
  //     data: {
  //       title: `Exam ${i}`, 
  //       startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
  //       endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
  //       lessonId: (i % 30) + 1, 
  //     },
  //   });
  // }

  // // ASSIGNMENT
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.assignment.create({
  //     data: {
  //       title: `Assignment ${i}`, 
  //       startDate: new Date(new Date().setHours(new Date().getHours() + 1)), 
  //       dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), 
  //       lessonId: (i % 30) + 1, 
  //     },
  //   });
  // }

  // // RESULT
  // for (let i = 1; i <= 10; i++) {
  //   await prisma.result.create({
  //     data: {
  //       score: 90, 
  //       studentId: `student${i}`, 
  //       ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }), 
  //     },
  //   });
  // }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(), 
        present: true, 
        studentId: `student${i}`, 
        lessonId: (i % 30) + 1,
      },
    });
  }

  // EVENT with CLASS associations
  // for (let i = 1; i <= 5; i++) {
  //   await prisma.event.create({
  //     data: {
  //       title: `Event ${i}`, 
  //       description: `Description for Event ${i}`, 
  //       startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
  //       endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
  //       class: {
  //         connect: [{ id: (i % 6) + 1 }],
  //       },
  //     },
  //   });
  // }

  // SEMESTER
  // const semesterData = [
  //   { name: "Semester 1", startDate: new Date("2024-01-01"), endDate: new Date("2024-06-01") },
  //   { name: "Semester 2", startDate: new Date("2024-07-01"), endDate: new Date("2024-12-01") },
  // ];

  // for (const semester of semesterData) {
  //   await prisma.semester.create({ data: semester });
  // }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });