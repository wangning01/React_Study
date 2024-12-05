import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ConfirmationModal from '../modal/ConfirmationModal'
import {useFormik} from 'formik';


const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const validate = (values) => {
      const errors = {};
      if(!values.email){
        errors.email = 'Required';
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = "Invalid email address";
      }
      if(!values.password){
        errors.password = 'Required';
      }else if(values.password.length < 5){
        errors.password = 'At least 5 characters.';
      }
      return errors;
    };
    const handleSubmit = async (values) => {
      //e.preventDefault();
      // const regResponse = await register(formik.values.email, formik.values.password);
      const regResponse = await register(values.email, values.password);
      if('isAxiosError' in regResponse){
        console.error('register failed.');
        if(regResponse.response){
          console.error('status code: '+regResponse.response.status);
          console.error('response data: '+regResponse.response.data);
          setShowModal(true);
          setModalMessage(regResponse.message);
        }
      }else if('status' in regResponse){
        console.log('status code: '+regResponse.status);
        console.log('response data: '+regResponse.data);
        setShowModal(true);
        setModalMessage('User registration successful!');
      }
      // setEmail('');
      // setPassword('');
      formik.values.email='';
      formik.values.password='';
    };

    const formik = useFormik(
      {initialValues: {email:"", password:""},
        validate,
        onSubmit: (values) => {
          console.log(values);
          handleSubmit(values);
        },
     }
    );

  
    const handleClose = (e) => {
      setShowModal(false);
    }

    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
          <table>
            <tbody>
            <tr>
              <td><input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='Enter email to register' /></td>
              <td><input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='password' /></td>
              <td><button type="submit">Register</button></td>
            </tr>
            <tr>
              <td>{formik.touched.email && formik.errors.email ? (<p style={{color: 'red'}}>{formik.errors.email}</p>) : null}</td>
              <td>{formik.touched.password && formik.errors.password ? (<p style={{color: 'red'}}>{formik.errors.password}</p>) : null}</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </form>
        <ConfirmationModal show={showModal} handleClose={handleClose} message={modalMessage}>
        </ConfirmationModal>
      </div>
    );
};

export default RegisterForm;
