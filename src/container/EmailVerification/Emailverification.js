import React, { Component } from "react";
import classes from "./Emailverification.module.css";
import Input from "../../components/Input/Input";
import DBtn from "../../components/DoubleButton/DoubleButton";
class EmailVerification extends Component {
  state = {
    orderForm: {
      otp1: {
        us: 1,
        elementType: "input",
        elementConfig: {
          type: "integer",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 1,
        },
        valid: false,
        touched: false,
      },
      otp2: {
        us: 2,
        elementType: "input",
        elementConfig: {
          type: "integer",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 1,
        },
        valid: false,
        touched: false,
      },
      otp3: {
        us: 3,
        elementType: "input",
        elementConfig: {
          type: "integer",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 1,
        },
        valid: false,
        touched: false,
      },
      otp4: {
        us: 4,
        elementType: "input",
        elementConfig: {
          type: "integer",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 1,
        },
        valid: false,
        touched: false,
      },
      otp5: {
        us: 5,
        elementType: "input",
        elementConfig: {
          type: "integer",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 1,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    email: "",
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    let companydata = JSON.parse(localStorage.getItem("companydetails"));
    let persondata = JSON.parse(localStorage.getItem("personaldetails"));

    const formElementsArray = [];
    for (let key in companydata.orderForm) {
      formElementsArray.push({
        id: key,
        value: companydata.orderForm[key].value,
      });
    }
    for (let key in persondata.orderForm) {
      formElementsArray.push({
        id: key,
        value: persondata.orderForm[key].value,
      });
    }
    let fulldetails = JSON.stringify(formElementsArray);
    localStorage.setItem("fulldetails", fulldetails);
    localStorage.removeItem("companydetails");
    localStorage.removeItem("personaldetails");
    this.props.history.push("/success");
  };
  goback = (event) => {
    event.preventDefault();
    this.props.history.goBack();
  };
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("companydetails"));

    if (localStorage.getItem("companydetails")) {
      this.setState({
        email: this.documentData.orderForm.email.value,
      });
    }
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler} className={classes.form_data}>
        {formElementsArray.map((formElement) => (
          <div key={formElement.config.us} className={classes.input_container}>
            <Input
              style={{
                textAlign: "center",
                height: "3rem",
                width: "3rem",
              }}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              label={formElement.config.elementConfig.placeholder}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
            />
          </div>
        ))}

        <DBtn
          click={(event) => this.goback(event)}
          valid={!this.state.formIsValid}
          back={"Back"}
          content={"Verify OTP"}
        />
      </form>
    );
    return (
      <div className={classes.form_structure}>
        <div className={classes.form}>
          <div className={classes.form_head}>
            <h1>EmailVerification</h1>
            <p>
              For your security reasons we have send you a 5 digit code to
              <a href="!#"> {this.state.email}</a>.<br></br>Please enter it
              below,
            </p>
          </div>
          {form}
          <div className={classes.spam}>
            <p>
              Didn't recive the email? check your spam filter for an email from
              <br></br>
              <a href="!#"> {this.state.email}</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default EmailVerification;
