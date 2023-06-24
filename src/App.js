import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./App.css";
import FormDatas from "./component/FormDatas";

// validation using formik and yup 
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

const App = () => {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    // submit function
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers];
          updatedUsers[editIndex] = values;
          return updatedUsers;
        });
        setEditIndex(null);
      } else {
        setUsers((prevUsers) => [...prevUsers, values]);
      }
      resetForm();
    },
  });
  // delete function
  const handleDelete = (index) => {
    let data = users.filter((item, id) => {
      return index !== id;
    });
    setUsers(data);
  };
  // edit function
  const handleEdit = (index) => {
    const user = users[index];
    formik.setValues(user);
    setEditIndex(index);
  };

  return (
    <>
    {/* send the data to formdatas component using props  */}
      <FormDatas
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        formik={formik}
        editIndex={editIndex}
        users={users}
      />
    </>
  );
};

export default App;
