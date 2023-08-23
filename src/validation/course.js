import * as Yup from "yup";

export const courseSchema = Yup.object({
  title: Yup.string().required("Please Enter title"),
  description: Yup.string().required("Please Enter description"),
  tuition: Yup.number()
    .typeError("Tuition cost must be a number")
    .required("Please Enter tuition cost"),
  weeks: Yup.number()
    .typeError("Weeks must be a number")
    .required("Please Enter no of weeks"),
  minimumSkill: Yup.string().required("Please Enter Skill level"),
});
