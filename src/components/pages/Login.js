import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBMask, MDBRow, MDBView} from 'mdbreact';
import './Login.css';
import {Formik} from 'formik';
import * as Yup from "yup";
import ErrorMessForm from "../components/ErrorMessForm";
import {Link} from "react-router-dom";
import AxiosCenter from "../../services/AxiosCenter";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Veuillez renseigner votre Login"),

  password: Yup.string().required("Veuillez renseigner votre Mot de passe"),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connexionMessage: "",
    };
  }

  login = (values) => {
    AxiosCenter.authenticate(values)
        .then((response) => {
          if (response.status === 200) {
            TokenService.connect(response.data.id_token); //pour le token
            AxiosCenter.getCurrentUser().then((response) => {
              UserService.setUserId(response.data.id);
              UserService.setUserLogin(response.data.login);
              this.props.history.push("/");
            });
          }
        })
        .catch((error) => {
          this.setState({
            connexionMessage: "Login et/ou Mot de passe incorrect",
          });
        });
  }

  render() {
    return (
      <div className='classic-form-page' id='login'>
        <MDBView>
          <MDBMask
            className='d-flex justify-content-center align-items-center'
          >
            <MDBContainer>
              <MDBRow>
                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    <MDBCardBody>
                      <div className='form-header purple-gradient'>
                        <h3>
                          Bienvenue sur PerForm !
                        </h3>
                      </div>
                      <Formik
                          onSubmit={this.login}
                          initialValues={{username: "", password: ""}}
                          validationSchema={SignupSchema}
                      >
                        {({
                            values,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            errors,
                            touched,
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <MDBInput
                                  label="Votre login"
                                  name="username"
                                  group
                                  type="text"
                                  icon="envelope"
                                  validate
                                  error="wrong"
                                  success="right"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.username}
                              >
                                <ErrorMessForm
                                    error={errors.username}
                                    touched={touched.username}
                                    right
                                />
                              </MDBInput>
                              <MDBInput
                                  label="Votre mot de passe"
                                  name="password"
                                  group
                                  type="password"
                                  icon="lock"
                                  validate
                                  containerClass="mb-0"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                              >
                                <ErrorMessForm
                                    error={errors.password}
                                    touched={touched.password}
                                    right
                                />
                              </MDBInput>
                              <p className="font-small blue-text d-flex justify-content-end">
                                <Link to="/forgot/password">
                                  Mot de passe oublié ?
                                </Link>
                              </p>
                              <div className="text-center mb-3">
                                <MDBBtn
                                    type="submit"
                                    gradient="aqua"
                                    rounded
                                    className="btn-block z-depth-1a"
                                >
                                  Se connecter
                                </MDBBtn>
                                <strong style={{color: "red"}}>
                                  {this.state.connexionMessage}
                                </strong>
                              </div>
                            </form>)
                        }
                      </Formik>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default Login;
