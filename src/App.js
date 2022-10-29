import React, {Component} from 'react';
import './App.css';
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Body from './components/body/body.component';

//Redux components
import {sendData, getData} from './actions/dashboardAction'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            response: '',
            post: '',
            responseToPost: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callApi = this.callApi.bind(this);
    }

    componentDidMount() {
        this.callApi();
    }

    callApi = () => {
        this.props.getData('/api/');
    };

    handleSubmit = () => {
        this.props.sendData('/api/clients', {post: this.state.post});
    };

    function

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Body/>
                {/*<Footer />*/}
            </React.Fragment>
        );
    }
}

//React Redux connecting code
function mapStateToProps(state) {
    return {
        dataFromBackend: state.dashboardReducer.dataFromBackend,
        getDataFromBackend: state.dashboardReducer.getDataFromBackend
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    sendData,
    getData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
