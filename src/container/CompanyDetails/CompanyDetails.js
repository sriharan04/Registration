import React, { Component } from "react";
import classes from "./CompanyDetails.module.css";
import Input from "../../components/Input/Input";
import DBtn from "../../components/DoubleButton/DoubleButton";
class CompanyDetails extends Component {
  state = {
    orderForm: {
      companylogo: {
        elementType: "upload",
        elementConfig: {
          type: "file",
          placeholder: "",
        },
        value: "https://png.pngtree.com/svg/20170307/c02483909c.png",
        validation: {},
        valid: false,
        touched: false,
      },
      companyname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Company Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-Mail id",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      jobtitile: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Job Title",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      yoe: {
        elementType: "input",
        elementConfig: {
          type: "integer",
          placeholder: "Year of Experience",
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true,
          minLength: 1,
          maxLength: 2,
        },
        valid: false,
        touched: false,
      },
      terms: {
        elementType: "checkbox",
        elementConfig: {
          type: "boolean",
          placeholder: "",
          children: "I accepts the",
          link: "Terms and Conditions",
        },
        value: false,
        validation: {
          isTrue: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    companylogo: "",
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
    if (rules.isTrue) {
      isValid = value && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    let logo = "";
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    if (inputIdentifier === "terms") {
      updatedFormElement.value = !updatedFormElement.value;
    } else if (inputIdentifier === "companylogo") {
      const [file] = event.target.files;
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updatedFormElement.value = event.target.result;
          logo = event.target.result;
          console.log(logo);
        };
        reader.readAsDataURL(file);
      }
    } else updatedFormElement.value = event.target.value;
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
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
      companylogo: logo,
    });
    this.forceUpdate();
  };
  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    localStorage.setItem("companydetails", JSON.stringify(this.state));
    this.props.history.push("/emailverification");
  };
  goback = (event) => {
    event.preventDefault();
    //window.history.back();
    this.props.history.goBack();
  };
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem("companydetails"));

    if (localStorage.getItem("companydetails")) {
      this.setState({
        orderForm: this.documentData.orderForm,
        formIsValid: this.documentData.formIsValid,
      });
    }
  }
  render() {
    let form = "";
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <div key={formElement.id} className={classes.input_container}>
            <Input
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
          back={"Back"}
          content={"Send OTP"}
          valid={!this.state.formIsValid}
        />
      </form>
    );
    return (
      <div className={classes.form_structure}>
        <div className={classes.form}>
          <div className={classes.form_head}>
            <h1>Add Your Company Details</h1>
            <p>
              Lorem ipsum is simply dummy text of tyhe printing and type setting
              industry
            </p>
          </div>
          {form}
        </div>
      </div>
    );
  }
}
export default CompanyDetails;
