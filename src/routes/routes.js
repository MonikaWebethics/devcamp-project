import { comp } from "routes/components";

export const routes = [
  {
    path: "/login",
    Component: comp.Login,
    isProtected: false,
  },
  {
    path: "/signup",
    Component: comp.Signup,
    isProtected: false,
  },
  {
    path: "/",
    Component: comp.BootCamp,
    isProtected: true,
  },
  {
    path: "/addbootcamp",
    Component: comp.AddBootCamp,
    isProtected: true,
  },
  {
    path: "/editbootcamp/:id",
    Component: comp.EditBootCamp,
    isProtected: true,
  },
  {
    path: "/courses/:bootCampId/:user",
    Component: comp.Courses,
    isProtected: true,
  },
  {
    path: "/addcourse/:bootCampId",
    Component: comp.AddCourse,
    isProtected: true,
  },
  {
    path: "/editcourse/:id",
    Component: comp.EditCourse,
    isProtected: true,
  },
  {
    path: "*",
    Component: comp.NotFound,
  },
];
