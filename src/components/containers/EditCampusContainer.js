import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { editCampusThunk, fetchCampusThunk} from "../../store/thunks";

import { CampusView, EditCampusView } from "../views";
import { editCampus } from '../../store/actions/actionCreators';

class EditCampusContainer extends Component {

    componentDidMount() {
        this.props.fetchCampus(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <Header />
                <EditCampusView campus={this.props.campus} />
            </div>
        );
    }

}

const mapState = (state) => {
    return {
        campus: state.campus,  // Get the State object from Reducer "campus"
    };
};

const mapDispatch = (dispatch) => {
    return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (id) => dispatch(editCampusThunk(id))
    };
};


export default connect(mapState, mapDispatch)(EditCampusContainer);