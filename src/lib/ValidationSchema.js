import * as yup from "yup"

export const signInSchema = yup
.object({
    email: yup.string().required('Email is required').email("invalid email format"),
    password: yup.string().required('Password is required').min(8, "min lenght of password should be at least 8 charcters"),
  })
  .required() 

export const forgotpasswordSchema = yup
.object({
    email: yup.string().required('Email is required').email("invalid email format"),
  })
  .required() 

  export const passwordSchema = yup
  .object({
      password: yup.string().required('Password is required').min(8, "min lenght of password should be at least 8 characters"),
      confirmpassword: yup.string().required('Confirm password').min(8, "min lenght of password should be at least 8 characters").oneOf([yup.ref("password")], "password do not match")
    })
    .required() 

  export const personalinfoSchema = yup
  .object().shape({
    firstName: yup.string().required("Firstname cannot be empty"),
    lastName: yup.string().required("Lastname cannot be empty"),
    mobileNumber: yup.string().required('Phone Number is required').max(10, 'Must be a valid phone number (10 digits)'), 
    email: yup.string().required('Email is required').email("invalid email format"),
    dateofBirth: yup.date().nullable().required('Date of Birth must be a valid date').typeError(' Date of Birth is required'),
    maritalStatus: yup.string().required("pick an option").oneOf(["single", "married"], "You must select an option!"),
    gender: yup.string().required("pick an option").oneOf(["male", "female"], 'You must select an option!'),
    address: yup.string().required("Address cannot be empty"),
    profileImage: yup.mixed().required("Profile Image is required ").nullable(),
  })
  .required()

  export const professionalSchema = yup 
  .object().shape({
    officeOfEmployment: yup.string().required("Office of Employment is required"),
    jobTitle: yup.string().oneOf(["Product Designer","Front-end","Back-end","Cyber Security", "Customer Rep", "Data Analyst"], "Job Title is required"),
    department: yup.string().required("Department is required"),
    // department: yup.string().required("Department is required"),
    employmentStatus: yup.string().required("pick an option").oneOf(["on-site", "remote", "hybrid"], 'You must select an option!'),
  
  })
  .required()

  export const salarySchema = yup
  .object().shape({
    salary: yup.number().positive("Amount must be positive").required("This field is required").nullable().typeError("Amount must be positive"),
    startDate: yup.string().required("start date is required"),
  })
  .required()

  export const userSchema = yup
  .object({
    password: yup.string().required('Password is required').min(8, "min lenght of password should be at least 8 characters"),
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref("password"), null], "passwords must match"),
  })
  .required()


  export const newteamSchema = yup
  .object({
    team: yup.string().required("team name is required"),
    manager: yup.string().required("pick an option").oneOf(["Aisha Akinwunmi", "Badmus John", "Layo Duran", "Blessing John"], "You must select an option!"),
    members: yup.string().required("pick an option").oneOf(["Kingley Ifijie", "Kekere-Ekun Tolani", "Oluwatobi Damilola", "Sanusi Ajibola", "Aisha Olamide", "Peace Bassey" ], "You must select an option!"),
  })
  .required()


  export const newTaskSchema = yup 
  .object ({
    tasktitle: yup.string().required("task title is required"),
    taskdescription: yup.string().required("task description is required"),
    assignedpersons: yup.string().required("pick an option").oneOf(["Aisha Akinwunmi", "Kingsley ifijie", "Badmus John"], "You must select an option!"),
    startDate: yup.date().required("start date is required"),
    endDate: yup.date().required("end start is required").min( yup.ref("startDate"), "end date cannot be earlier than start date"),
    taskstatus: yup.string().required("pick an option").oneOf([" "], "You must select an option!"),

  })



  export const settingsSchema = yup
  .object ({
    Username: yup.string().required("Username is required"),
    Email: yup.string().required('Email is required').email("invalid email format"),
    Password: yup.string().required('Password is required').min(8, "min lenght of password should be at least 8 characters"),
  })

  export const leaveSchema = yup 
  .object ({
    leaveType: yup.string().required("pick an option").oneOf(["casual", "sick", "annual"], 'You must select an option!'),
    startDate: yup.date().nullable().required("start date is required"),
    endDate: yup.date().required("end start is required").min( yup.ref("startDate"), "end date cannot be earlier than start date"),
    description: yup.string().required("leave description is required"),

  })
  .required()



// for personal info

export const personalInformation = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  mobileNumber: yup.string().required("Mobile Number is required").max(10, "max lenght of phone number should be at least 10")
  ,
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: yup.date().nullable() 
  .required("Date of Birth is required")
  .typeError("Date of Birth must be a valid date"),
  maritalStatus: yup.string().oneOf(["married", "single"], "Marital Status is required")
  .required("Marital Status is required"),
  gender: yup.string().oneOf(["male", "female"], "Gender is required")
  .required("Gender is required"),
  address: yup.string().required("Address is required"),
  // profileImage: yup.mixed().required("Profile Image is required").nullable(),
});

export const professional = yup.object().shape({
  officeOfEmployment: yup.string().required("Office of Employment is required"),
  jobTitle: yup.string().required("Job Title is required"),
  department: yup.string().required("Department is required"),
  employmentStatus: yup.string().oneOf(["on-site",  "remote","hybrid"], "Employment Status is required"),
});

export const salary = yup.object().shape({
  salary: yup.number().required("Amount is required").positive("Amount must be positive").nullable() 
  .typeError("Amount must be positive"),
  startDate: yup.string().required("Start date is required"),
});

export const userAccount = yup.object().shape({
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
});