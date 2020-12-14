import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, Button, Breadcrumb, BreadcrumbItem,
        Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                     <CardImg top src={campsite.image} alt={campsite.name} />
                     <CardBody>
                         <CardText>{campsite.description}</CardText>
                     </CardBody>
                </Card>
            </div>
        );
    }

//Note: see render() in directorycomponent.js. Should we render components in the render() method instead?
function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map( comment => <p key={comment.id}>{comment.text}<br/>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p> )}
            <br />
            <CommentForm/>
            </div>
        );
    }

    //else
    return (<div></div>);
}

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {  //set inital states here
            rating: '',
            name: '',
            comment: ''
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><i className="fa fa-lg fa-pencil"/> Submit Comment</Button>
    
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> {/* isOpen and toggle are built-in attributes of <Modal> in reactstrap */}
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader> {/* adding toggle here allows user to close modal when it is open */}
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                            className="form-control"
                                >
                                    {/* Reference: https://davidkpiano.github.io/react-redux-form/docs/api/Control.html */}
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea model=".text" id="text" name="text"
                                            className="form-control"
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function CampsiteInfo(props) {

    if (props.campsite) {
        return (
            <div class="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
                
            </div>
        );
    }
    //else
    return (<div></div>);

}


export default CampsiteInfo;