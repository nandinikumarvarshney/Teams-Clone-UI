import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

console.warn = () => { }

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      firstNameError: "",
      middlename: "",
      middleNameError: "",
      lastname: "",
      lastNameError: "",
      location: "",
      locationError: "",
      organisation: "",
      organisationError: "",
      position: "",
      positionError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      password2: "",
      password2Error: "",
      phone: "",
      phoneError: ""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  // Adding valiations for the Form Fields 
  onFirstNameChange = e => {
    const firstname = e.target.value;
     //eslint-disable-next-line
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (firstname === '' || !firstname.match(nameRegex)) {
      this.setState({ firstNameError: "enter a valid firstname" });
    }
    else this.setState({ firstNameError: null });
    this.setState({ firstname: firstname });
  };

  onmiddleNameChange = e => {
    const middlename = e.target.value;
     //eslint-disable-next-line
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (middlename === '' || !middlename.match(nameRegex)) {
      this.setState({ middleNameError: "Enter a Valid middleName" });
    }
    else this.setState({ middleNameError: null });
    this.setState({ middlename: middlename });
  };

  onlastNameChange = e => {
    const lastname = e.target.value;
     //eslint-disable-next-line
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (lastname === '' || !lastname.match(nameRegex)) {
      this.setState({ lastNameError: "Enter a Valid lastName" });
    }
    else this.setState({ lastNameError: null });
    this.setState({ lastname: lastname });
  };

  onOrganisationChange = e => {
    const organisation = e.target.value;
     //eslint-disable-next-line
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (organisation === '' || !organisation.match(nameRegex)) {
      this.setState({ organisationError: "Enter a valid Organisation Name" });
    }
    else this.setState({ organisationError: null });
    this.setState({ organisation: organisation });
  };

  onPositionChange = e => {
    const position = e.target.value;
     //eslint-disable-next-line
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (position === '' || !position.match(nameRegex)) {
      this.setState({ positionError: "Enter the valid role name" });
    }
    else this.setState({ positionError: null })
    this.setState({ position: position });
  };

  onlocationChange = e => {
    const location = e.target.value;
     //eslint-disable-next-line
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (location === '' || !location.match(nameRegex)) {
      this.setState({ locationError: "Enter a valid location" });
    }
    else this.setState({ locationError: null });
    this.setState({ location: location });
  };

  onPhoneChange = e => {
    const phone = e.target.value;
     //eslint-disable-next-line
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (phone === '' || !phone.match(phoneRegex)) {

      this.setState({ phoneError: "Enter a valid phone number" });
    }

    else this.setState({ phoneError: null });
    this.setState({ phone: phone });
  }
  onEmailChange = e => {
    const email = e.target.value;
     //eslint-disable-next-line
    const Emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === '' || !email.match(Emailregex)) {
      this.setState({ emailError: "Enter a valid email" });
    }
    else this.setState({ emailError: null });
    this.setState({ email: email });

  };
  onPasswordChange = e => {
    const password = e.target.value;
    //eslint-disable-next-line
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password === '' || !password.match(passwordRegex)) { this.setState({ passwordError: "Enter a valid password" }); }
    else { this.setState({ passwordError: null }); }
    this.setState({ password: password });

  };
  onPassword2Change = e => {
    const password2 = e.target.value;
    //eslint-disable-next-line
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password2 === '' || !password2.match(passwordRegex)) { this.setState({ password2Error: "Enter a valid password" }); }
    else { this.setState({ password2Error: null }); }
    this.setState({ password2: password2 });

  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      alert("Passwords don't match");
    }
    else {
      const newUser = {
        firstname: this.state.firstname,
        middlename: this.state.middlename,
        lastname: this.state.lastname,
        organisation: this.state.organisation,
        location: this.state.location,
        position: this.state.position,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        phone: this.state.phone
      };

      this.props.registerUser(newUser, this.props.history);
    }
  };

  render() {

    return (

      <div className="container">
        <div className="row">

          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>

            <form onSubmit={this.onSubmit} autoComplete="off" className="form">

              <div className="input-field col s12">
                <input
                  placeholder="Enter your First Name"
                  onChange={this.onFirstNameChange}
                  value={this.state.firstname}
                  id="firstname"
                  type="text"
                  required={this.state.firstname}
                />
                {this.state.firstNameError && (
                  <span style={{ color: "red" }}>
                    {this.state.firstNameError}
                  </span>
                )}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Middle Name"
                  onChange={this.onmiddleNameChange}
                  value={this.state.middlename}
                  id="middlename"
                  type="text"
                />
                {this.state.middleNameError && (
                  <span style={{ color: "red" }}>
                    {this.state.middleNameError}
                  </span>
                )}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Last Name"
                  onChange={this.onlastNameChange}
                  value={this.state.lastname}
                  id="lastname"
                  type="text"
                  required={this.state.lastname}
                />
                {this.state.lastNameError && (
                  <span style={{ color: "red" }}>
                    {this.state.lastNameError}
                  </span>
                )}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your organisation"
                  onChange={this.onOrganisationChange}
                  value={this.state.organisation}
                  id="organisation"
                  type="text"
                  required={this.state.organisation}
                />
                {this.state.organisationError && (
                  <span style={{ color: "red" }}>
                    {this.state.organisationError}
                  </span>)}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Location of work"
                  onChange={this.onlocationChange}
                  value={this.state.location}
                  id="location"
                  type="text"
                  required={this.state.location}
                />

                {this.state.locationError && (
                  <span style={{ color: "red" }}>
                    {this.state.locationErrorca}
                  </span>)}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your position at work"
                  onChange={this.onPositionChange}
                  value={this.state.position}
                  id="position"
                  type="text"
                  required={this.state.position}
                />

                {this.state.positionError && (
                  <span style={{ color: "red" }}>
                    {this.state.positionError}
                  </span>)}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Phone"
                  onChange={this.onPhoneChange}
                  value={this.state.phone}
                  id="phone"
                  type="text"
                  required={this.state.phone}
                />

                {this.state.phoneError && (
                  <span style={{ color: "red" }}>
                    {this.state.phoneError}
                  </span>)}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Email"
                  onChange={this.onEmailChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                  required={this.state.email}
                />
                {this.state.emailError && (
                  <span style={{ color: "red" }}>
                    {this.state.emailError}
                  </span>)}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Password"
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                  required={this.state.password}
                />
                {this.state.passwordError && (
                  <span style={{ color: "red" }}>
                    {this.state.passwordError}
                  </span>
                )}
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Renter your Password "
                  onChange={this.onPassword2Change}
                  value={this.state.password2}
                  id="password2"
                  type="password"
                  required={this.state.password2}
                />
                {this.state.password2Error && (
                  <span style={{ color: "red" }}>
                    {this.state.password2Error}
                  </span>
                )}
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
