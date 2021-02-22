import React, { Component } from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { connect } from 'react-redux';
import { addComment, fetchCampsites } from '../redux/ActionCreators';

// Move this data to reducer.js
// import { CAMPSITES } from '../shared/campsites';
// import { COMMENTS } from '../shared/comments';
// import { PARTNERS } from '../shared/partners';
// import { PROMOTIONS } from '../shared/promotions';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

// Implement the ADD_COMMENT action with mapDispatchToProps then pass it to connect() at end of module
const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => { // give the property the same name as the action creator
        return addComment(campsiteId, rating, author, text); // The addComment action creator
    },   // returns and object
    fetchCampsites: () => (fetchCampsites())
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
    }

    // No constructor needed to hold state. Redux will hold state in the store
    render() {
        const HomePage = () => {
            console.log("Home Page Props: ", this.props);
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        };

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                />
            );
        }; 

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

// Pass mapStateToProps to connect() so that the action creator function called
// addComment is available inside the Main component as a prop
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));