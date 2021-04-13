import React from "react";
import Loading from "../components/Loading";
import {MDBCard} from "mdbreact";
import TableWorkouts from "./TableWorkouts";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            loaded: true
        });
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        else {
            return (
                <div style={{display: "flex", flexDirection: "column"}}>

                    <MDBCard>
                        <TableWorkouts/>
                    </MDBCard>
                </div>
            )
        }
    }
}

export default Dashboard;