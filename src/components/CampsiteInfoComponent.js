import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, Button, Breadcrumb, BreadcrumbItem,
        Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//Input Validation Methods
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                     <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                     <CardBody>
                         <CardText>{campsite.description}</CardText>
                     </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments, addComment, campsiteId}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map( comment => {
                    return (
                        <p key={comment.id}>
                            {comment.text}<br/>-- {comment.author}, {new Intl.DateTimeFormat(
                                'en-US', { year: 'numeric', month: 'short', day: '2-digit'})
                                .format(new Date(Date.parse(comment.date)))}
                        </p> 
                        );
                })
            }
            
            <br />
            <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    }

    //else
    return (<div></div>);
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
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
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
                
            </div>
        );
    }
    //else
    return (<div></div>);

}

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {  // only set state of local methods defined in the component
            isModalOpen: false
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
        this.toggleModal();

        // To make the ADD_COMMENT action work, we can now pass in
        // the comment form input values that are collected when the
        // user clicks the submit button. This action will display the new
        // comment on the page (temporarily for now) by appending it to the
        // COMMENTS array
        
        // Why does "this" refer to an object {campsiteId, addComment} ???
        // console.log("in handleSubmit: ", this.props);
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);

    }

    render() {
        return (
            <React.Fragment> {/* Use React.Fragment instead of wrapping multiple elements in a <div> to avoid adding an extra, unecessary node */}

                <Button outline onClick={this.toggleModal}><i className="fa fa-lg fa-pencil"/> Submit Comment</Button>

                {/* Open the comment form modal when "Submit Comment" is clicked */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> {/* isOpen and toggle are built-in attributes of <Modal> in reactstrap */}
                    
                    <ModalHeader toggle={this.toggleModal}> {/* adding toggle here allows user to close modal when it is open */}
                        Submit Comment
                    </ModalHeader> 

                    <ModalBody>
                        
                        <LocalForm onSubmit={values => this.handleSubmit(values)}> {/* Redux forms handle submit events here */}

                            {/* Select rating 1-5 */}
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

                            {/* Author Name */}
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators = {{
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                />
                                <Errors 
                                    model=".author"
                                    className="text-danger"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>

                            {/* Comment Textarea */}
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

            </React.Fragment>
        );
    }
}


export default CampsiteInfo;