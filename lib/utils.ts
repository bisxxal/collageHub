import { Batch, Sem } from "@prisma/client";

const getLatestMonday = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const latestMonday = today;
    latestMonday.setDate(today.getDate() - daysSinceMonday);
    return latestMonday;
  };
  
export const adjustScheduleToCurrentWeek = (
    lessons: { title: string; start: Date; end: Date }[]
  ): { title: string; start: Date; end: Date }[] => {
    const latestMonday = getLatestMonday();
  
    return lessons.map((lesson) => {
      const lessonDayOfWeek = lesson.start.getDay();
  
      const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
  
      const adjustedStartDate = new Date(latestMonday);
  
      adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
      adjustedStartDate.setHours(
        lesson.start.getHours(),
        lesson.start.getMinutes(),
        lesson.start.getSeconds()
      );
      const adjustedEndDate = new Date(adjustedStartDate);
      adjustedEndDate.setHours(
        lesson.end.getHours(),
        lesson.end.getMinutes(),
        lesson.end.getSeconds()
      );
  
      return {
        title: lesson.title,
        start: adjustedStartDate,
        end: adjustedEndDate,
      };
    });
  };

  
export const formatAmount = (amount: number) => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}k`;
  }
  return amount.toString();
};


interface fullNameProps{
  collage: string,
  fname: string,
  link: string,
  gmap: string
}
export   const fullname :fullNameProps[] =[
  {collage: 'tact', fname:'Trident acadamy of creative teachnology' , link:'https://www.trident.ac.in/' , gmap:'https://www.google.com/maps/place/Trident+Academy+of+Technology/@20.3403539,85.8051789,17z/data=!3m1!4b1!4m6!3m5!1s0x3a190902b2a59ce5:0xdfb554a4e0bafffb!8m2!3d20.3403489!4d85.8077538!16s%2Fg%2F1vn9mhqv?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D' },
  {collage: 'tat', fname:'Trident acadamy of teachnology' , link:'https://www.trident.ac.in/' , gmap:'https://www.google.com/maps/place/Trident+Academy+of+Technology/@20.3403539,85.8051789,17z/data=!3m1!4b1!4m6!3m5!1s0x3a190902b2a59ce5:0xdfb554a4e0bafffb!8m2!3d20.3403489!4d85.8077538!16s%2Fg%2F1vn9mhqv?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D' },
  {collage: 'iter', fname:'Institute of Technical Education and Research' , link:"https://www.soa.ac.in/iter" , gmap:"https://www.google.com/maps/place/ITER,+Siksha+'O'+Anusandhan/@20.2498759,85.7976558,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19a7a3b9692fff:0x87cd0a356bbc39ce!8m2!3d20.2498709!4d85.8002307!16s%2Fg%2F11bv2l8r52?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D"},
  {collage: 'kiit', fname:'Kalinga Institute of Industrial Technology'  , link:'https://kiit.ac.in/' , gmap:'https://www.google.com/maps/place/Kalinga+Institute+of+Industrial+Technology/@20.3555516,85.813526,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19091813dab8d5:0xa033051ccddbbcbc!8m2!3d20.3555466!4d85.8161009!16zL20vMGdmaDVt?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D' }, 
  {collage: 'silicon', fname:'Silicon Institute of Technology'  , link:'https://silicon.ac.in/' , gmap:'https://www.google.com/maps/place/Silicon+University/@20.3506823,85.8037611,17z/data=!3m1!4b1!4m6!3m5!1s0x3a1908e064769e73:0x9288172f3a98c7a4!8m2!3d20.3506773!4d85.806336!16s%2Fm%2F03qkxqw?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D' }, 
]

export const subjects =[
  {id:1, name:'CSE', code:'CSE101'},
  {id:2, name:'CIVIL', code:'CIVIL101'},
  {id:3, name:'MECH', code:'MECH101'},
  {id:4, name:'MATH', code:'MATH101'},
  {id:5, name:'CHEMISTRY', code:'CHEM101'},
  {id:6, name:'PHYSICS', code:'PHYS101'},
]




  export const setFeeAmount = (batch: Batch): number => {
    switch (batch) {
      case "BCA": return 100000;
      case "BTECH": return 180000;
      case "MTECH": return 190000;
      case "MCA": return 180000;
      case "BBA": return 90000;
      case "BSC": return 90000; 
      case "MSC": return 170000;
      default: return 0; 
    }
  };  
  
  export const setSEM = (sem: Sem) => {
    switch (sem) {
      case "FIRST": return '1ST';
      case "SECOND": return '2nd';
      case "THIRD": return '3rd';
      case "FOURTH": return '4th';
      case "FIFTH": return '5th';
      case "SIXTH": return '6th'; 
      case "SEVENTH": return '7th';
      default: return '8th'; 
    }
  };   