
type RouteAccessMap = {
    [key: string]: string[];
  };
  
  export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/super(.*)": ["super"],
    "/super/admins(.*)": ["super"],
    "/super/collages(.*)": ["super"],
    "/admins(.*)": ["super"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"], 
    "/list/teachers": ["admin", "teacher"],
    "/list/students": ["admin", "teacher"], 
    "/list/subjects": ["admin"],
    "/list/classes": ["admin", "teacher"],
    "/list/exams": ["admin", "teacher", "student"],
    "/list/assignments": ["admin", "teacher", "student"],
    "/list/results": ["admin", "teacher", "student"],
    "/list/attendance": ["admin", "teacher", "student"],
    "/list/events": ["admin", "teacher", "student"],
    "/list/announcements": ["admin", "teacher", "student"],
  };