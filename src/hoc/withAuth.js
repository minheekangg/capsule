import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { fetchCurrentUser } from "../actions/userActions";
import { Loader } from "semantic-ui-react";

const withAuth = (WrappedComponent) => {
    class AuthorizedComponent extends React.Component {
        componentDidMount() {
            console.log('%c INSIDE COMPONENT DID MOUNT FOR AUTH HOC', 'color: purple')
            if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
        }

        render() {
            console.log('%c INSIDE RENDER FOR HOC', 'color: green')
            if (localStorage.getItem('jwt') && this.props.loggedIn) {
                //i have a token and i'm logged in
                // wrapped component in our case is Profile
                return <WrappedComponent />
            } else if (localStorage.getItem('jwt') && (this.props.authenticatingUser || !this.props.loggedIn)) {
                //we're currently fetching, show a loading spinner
                return <Loader active inline="centered" />
            } else {
                //user is not AUTHORIZED to see this component
                return <Redirect to="/login" />
            }
        }
    }

    const mapStateToProps = (state) => {
        return {
            loggedIn: state.user.isLoggedIn,
            authenticatingUser: state.user.authenticatingUser
        }
    }

    const mapDispatchToProps = { fetchCurrentUser: fetchCurrentUser }

return connect(mapStateToProps, mapDispatchToProps)(AuthorizedComponent)
}

export default withAuth
