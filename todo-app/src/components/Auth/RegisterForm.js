import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ConfirmationModal from '../modal/ConfirmationModal'
import {useFormik} from 'formik';
import { useTranslation } from 'react-i18next';


const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { t, i18n } = useTranslation();

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

    const formik = useFormik(
      {initialValues: {email:"", password:""},
        validate,
        onSubmit: async (values) => {
          console.log(values);
          try{
            const response = await register(values.email, values.password);
            console.log('status code: '+response.status);
            console.log('response data: '+response.data);
            setShowModal(true);
            setModalMessage('User registration successful!');
          }catch(error){
              console.error('register failed.');
              if(error.response){
                console.error('status code: '+error.response.status);
                console.error('response data: '+error.response.data);
                setShowModal(true);
                setModalMessage(error.response.data);
              }else{
                setShowModal(true);
                setModalMessage(error);
              }
          }
          formik.values.email='';
          formik.values.password='';
        },
     }
    );

  
    const handleClose = (e) => {
      setShowModal(false);
    };


    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
          <table>
            <tbody>
            <tr>
              <td><input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder={t('label.enterEmailToRegister')} /></td>
              <td><input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder={t('label.enterPassword')} /></td>
              <td><button type="submit">{t('label.register')}</button></td>
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
