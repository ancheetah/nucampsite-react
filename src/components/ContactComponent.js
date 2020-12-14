import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {  //set inital states here
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: '',
            agree: false, //Does user want to be contacted?
            contactType: 'By Phone',
            feedback: '',
            touched: {  
                //nested object that keeps track of whether or not user has entered anything in the form field
                //if the field hasnt been touched then no need to validate that field yet
                //use the blur event handler to know if a user has touched the field yet
                firstName: false,
                lastName: false,
                phoneNum: false,
                email: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //handleBlur() is bound using an arrow function instead
    }

    validate(firstName, lastName, phoneNum, email) {    //called at beginning of render()

        const errors = {    //holds error messages
            firstName: '',
            lastName: '',
            phoneNum: '',
            email: ''
        };

        if (this.state.touched.firstName) {
            if (firstName.length < 2) {
                errors.firstName = 'First name must be at least 2 characters.';
            } else if (firstName.length > 15) {
                errors.firstName = 'First name must be 15 or less characters.';
            }
        }

        if (this.state.touched.lastName) {
            if (lastName.length < 2) {
                errors.lastName = 'Last name must be at least 2 characters.';
            } else if (lastName.length > 15) {
                errors.lastName = 'Last name must be 15 or less characters.';
            }
        }

        const reg = /^\d+$/;
        if (this.state.touched.phoneNum && !reg.test(phoneNum)) {
            errors.phoneNum = 'The phone number should contain only numbers.';
        }

        if (this.state.touched.email && !email.includes('@')) {
            errors.email = 'Email should contain a @';
        }

        return errors;
    }

    //This event handler is fired when a user enters an input field then leaves it (loses focus)
    //When hadle blur is triggered it will change the field's "touched" state to true
    //Add this event handler to every form field (i.e. <input>) you want to track
    //The "field" parameter accepts a string with the name of the field (i.e. value of "name" attribute of the <input> element)
    //Binding using arrow function syntax. Why? We're not passing an event object here but rather a string
    handleBlur = (field) => {
        return () => { 
            this.setState({
                touched: {...this.state.touched, [field]: true} //changes only one of the properties in "touched"
            });
        }
    }


    //Update the state of the form field 
    handleInputChange(event) {
        const target = event.target;    //the <input> element
        const name = target.name;       //the value of <input>'s "name" attribute    

        //Is <input> a checkbox? If yes, then return <input>'s checked attribute (boolean) to get the user's choice
        //If no then use <input>'s value attribute to get the text that the user entered
        const value = target.type === 'checkbox' ? target.checked : target.value;   //target.type is the value of <input>'s "type" attribute (i.e. "button", "checkbox", "color", "month", etc.)
    
        //Create an object with a computed property name using the value of <input>'s name attribute
        //Update the state with the user's input -> sets firstName, lastName, phoneNum, email, agree, contactType, or feedback to the user's input value
        this.setState({
            [name]: value
        });
    }

    //Log current state to the console
    handleSubmit(event) {
        console.log('Current state is: ' + JSON.stringify(this.state));
        alert('Current state is: ' + JSON.stringify(this.state));
        event.preventDefault(); //Prevents page from refreshing after this event
    }

    render() {

        //Initialize the errors array (will be blank at this point because fields have not yet been touched)
        const errors = this.validate(this.state.firstName, this.state.lastName, this.state.phoneNum, this.state.email);

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
    
                <div className="row row-content align-items-center">
                    <div className="col-sm-4">
                        <h5>Our Address</h5>
                        <address>
                            1 Nucamp Way<br />
                            Seattle, WA 98001<br />
                            U.S.A.
                        </address>
                    </div>
                    <div className="col">
                        <a role="button" className="btn btn-link" href="tel:+12065551234"><i className="fa fa-phone" /> 1-206-555-1234</a><br />
                        <a role="button" className="btn btn-link" href="mailto:fakeemail@fakeemail.co"><i className="fa fa-envelope-o" /> campsites@nucamp.co</a>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h2>Send us your Feedback</h2>
                        <hr />
                    </div>
                    <div className="col-md-10">
                        <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                                <Label htmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstName" name="firstName"
                                        placeholder="First Name"
                                        value={this.state.firstName}
                                        invalid={errors.firstName}  //a boolean bootstrap attribute
                                        onBlur={this.handleBlur("firstName")}   //tracks if user has touched form field
                                        onChange={this.handleInputChange} //Update the state of the form field
                                    />
                                    {/* Form Feedback is a reactstrap component used when valid/invalid are set in an 
                                    <input> element. Displays invalid feedback message in red and valid feedback in green below form field.
                                    Only displays if invalid === true in this case */}
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName"
                                        placeholder="Last Name"
                                        value={this.state.lastName}
                                        invalid={errors.lastName}
                                        onBlur={this.handleBlur("lastName")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="phoneNum" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input type="tel" id="phoneNum" name="phoneNum"
                                        placeholder="Phone number"
                                        value={this.state.phoneNum}
                                        invalid={errors.phoneNum}
                                        onBlur={this.handleBlur("phoneNum")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.phoneNum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        invalid={errors.email}
                                        onBlur={this.handleBlur("email")}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 4, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>By Phone</option>
                                        <option>By Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="feedback" name="feedback"
                                        rows="12"
                                        value={this.state.feedback}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

            </div>
        );
    }
}


export default Contact;