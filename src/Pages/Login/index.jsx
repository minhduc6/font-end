import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import logo from '../../images/banner.jpg'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'antd';
import { httpClient } from '../../service/httpClient';
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';


export const Login = () => {
  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const sessinId = useSelector((state) => state.app.sessinId);
  // const userToken = useSelector((state) => state.app.token);
  // const navigate = useNavigate();

  // const Confirm = () => {
  //   userToken &&
  //     window
  //       .open(`https://www.themoviedb.org/authenticate/${userToken}`)
  //       .focus();
  //   if (
  //     window.confirm("Please authenticate the user for authorization !") == true
  //   ) {
  //     httpClient
  //       .post("/authentication/session/new", {
  //         request_token: userToken,
  //       })
  //       .then((response) => {
  //         dispatch(setSessin_id(response.data.session_id));
  //         navigate("/");
  //       })
  //       .catch(() =>
  //         alert("Can not login. Please check your account and password !")
  //       );
  //   } else {
  //     navigate("/register");
  //   }
  // };

  // useEffect(() => {
  //   httpClient.get("authentication/token/new").then((response) => {
  //     localStorage.setItem("userToken", response.data.request_token);
  //     dispatch(setToken(response.data.request_token));
  //   });
  // }, []);

  // const LoginAccount = (e) => {
  //   e.preventDefault();
  //   Confirm();
  // };


  const ref = useRef()
  const [formValues, setFormValues] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });


  const someFuncton = () => {
    if (Object.keys(ref.current.errors).length === 0) {
      console.log(ref.current.values)
      console.log("Valid")
      httpClient
        .post(`/auth/login`,
          {
            email: ref.current.values.email,
            password: ref.current.values.password
          }
        )
        .then((response) => {
          message.success('Login Success')
          localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
          console.log("Res", response)
          navigate({
            pathname: '/profile',
          });
          
        })
        .catch(() =>
          message.error('Kiểm tra lại email/password')
        );

    }
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <section>
        <div class="container">
          <div class="row" style={{ backgroundColor: '#202020' }}>
            <div class="col">
              <div class="card shadow-lg">
                <div class="row" style={{ backgroundColor: '#202020' }} >
                  <div class="col-lg-6 image-wrapper " >
                    <img class="" style={{ width: '500px', height: '500px', marginTop: '100px' }} src={logo} alt="" />
                  </div>
                  <div class="col-lg-6">
                    <h2 class="text-start" style={{ color: 'gray', marginTop: '15px', marginLeft: '20px' }}>Login to My Event</h2>

                    <Formik
                      innerRef={ref}
                      initialValues={formValues || initialValues} enableReinitialize validationSchema={validationSchema}
                      onSubmit={(values, actions) => {
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          actions.setSubmitting(false);
                        }, 1000);
                      }}>
                      {({ errors, touched }) => {
                        return (
                          <Form>
                            <div style={{ marginTop: '50px' }} className="container">
                              <div style={{ marginTop: '20px' }} className="form-row">
                                <div className="form-group col-8">
                                  <label>Email : </label>
                                  <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                              </div>
                              <div style={{ marginTop: '20px' }} className="form-row">
                                <div className="form-group col-8">
                                  <label>Password : </label>
                                  <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                              </div>
                            </div>
                            <Button style={{ marginTop: '10px', marginLeft: '20px' }} onClick={someFuncton} >Login</Button>
                          </Form>
                        );
                      }}
                    </Formik>
                    <p class="mb-0">Already have an account? <a href="signin2.html" class="hover">Login</a></p>
                    <div class="divider-icon my-4"></div>
                    <nav style={{ marginTop: '50px' }} class="nav social justify-content-center text-center">
                      <a href={GOOGLE_AUTH_URL} class="btn btn-circle btn-sm btn-google"><i class="uil uil-google"></i></a>
                      <a href="#" class="btn btn-circle btn-sm btn-facebook-f"><i class="uil uil-facebook-f"></i></a>
                      <a href="#" class="btn btn-circle btn-sm btn-twitter"><i class="uil uil-twitter"></i></a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
