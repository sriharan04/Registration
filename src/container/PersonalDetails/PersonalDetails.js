import React, { Component } from "react";
import classes from "./PersonalDetails.module.css";
import Input from "../../components/Input/Input";
import Btn from "../../components/Button/Button";
class PersonalDetails extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Full Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      gender: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Male", displayValue: "Male" },
            { value: "Female", displayValue: "Female" },
            { value: "Other", displayValue: "Other" },
          ],
          placeholder: "Gender",
        },
        value: "Male",
        validation: {},
        valid: true,
      },
      country: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "India", displayValue: "India" }],
          placeholder: "Country",
        },
        value: "India",
        validation: {},
        valid: true,
      },
      state: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Tamilnadu", displayValue: "Tamilnadu" },
            { value: "Delhi", displayValue: "Delhi" },
          ],
          placeholder: "State",
        },
        value: "India",
        validation: {},
        valid: true,
      },
      phone: {
        elementType: "phone",
        elementConfig: {
          type: "integer",
          placeholder: "Phone Number",
        },
        value: "",
        validation: {
          required: true,
          minLength: 10,
          maxLength: 12,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isPhone) {
      const pattern = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
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
    if (inputIdentifier !== "phone")
      updatedFormElement.value = event.target.value;
    else updatedFormElement.value = event;
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
    localStorage.setItem("personaldetails", JSON.stringify(this.state));
    this.props.history.push("/companydetails");
  };
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("personaldetails"));

    if (localStorage.getItem("personaldetails")) {
      this.setState({
        orderForm: this.documentData.orderForm,
        formIsValid: this.documentData.formIsValid,
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
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <div key={formElement.config.elementConfig.placeholder}className={classes.input_container}>
            <Input
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
        <Btn disabled={!this.state.formIsValid}>Next</Btn>
      </form>
    );
    return (
      <div className={classes.form_structure}>
        <div className={classes.form}>
          <div className={classes.form_head}>
            <h1>Add Your Personal Details</h1>
            <p>
              Lorem ipsum is simply dummy text of tyhe printing and type setting
              industry
            </p>
          </div>
          {form}
          <div className={classes.footer}>
            <p className={classes.exsit}>Already have an account?</p>
            <p className={classes.login}> Login</p>
          </div>
        </div>
      </div>
    );
  }
}
export default PersonalDetails;
