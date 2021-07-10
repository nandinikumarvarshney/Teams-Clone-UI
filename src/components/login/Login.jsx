import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import loginUser from "../../actions/authActions";

console.warn = () => { }

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> Below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>

            <form onSubmit={this.onSubmit} className="form">

              <div className="input-field col s12">
                <input
                  placeholder="Enter your Email"
                  onChange={this.onEmailChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                  required={this.state.email}
                />{this.state.emailError && (
                  <span style={{ color: "red" }}>
                    {this.state.emailError}
                  </span>)}
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Enter your password"
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                  required={this.state.password}
                /> {this.state.passwordError && (
                  <span style={{ color: "red" }}>
                    {this.state.passwordError}
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
                >Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
