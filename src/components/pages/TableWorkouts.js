import React from "react";
import "./TableWorkouts.css"
import Loading from "../components/Loading";
import {MDBBtn, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import AxiosCenter from "../../services/AxiosCenter";
import UserService from "../../services/UserService";
import {withRouter} from "react-router-dom";

class TableWorkouts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            workoutList: []
        };
    }

    componentDidMount() {
        AxiosCenter.getWorkoutsByUserId(UserService.getUserId()).then((response) => {
            const workoutList = response.data;
            this.setState({
                workoutList,
                loaded: true
            })
        });
    }

    showWorkout(workoutId) {
        this.props.history.push("/details/" + workoutId);
    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return (
            <div>
                <h2 className={"bold"}>Séances</h2>
                <MDBTable striped={true} hover={true} small={true} responsive={true}>
                    <MDBTableHead>
                        <tr>
                            <th className={"bold"}>Date</th>
                            <th className={"bold"}>Nom</th>
                        </tr>
                    </MDBTableHead>

                    {this.state.workoutList.length ? (
                        <MDBTableBody>
                            {this.state.workoutList.map((workout, index) => (
                                    <tr key={index}>
                                        <td>{new Date(workout.date).toLocaleDateString("fr-FR")}</td>
                                        <td>{workout.name}</td>
                                        <td><MDBBtn rounded size="sm" color="red"
                                                    onClick={() => this.showWorkout(workout.id)}>VOIR</MDBBtn></td>
                                    </tr>
                                )
                            )}
                        </MDBTableBody>
                    ) : (
                        <MDBTableBody>
                            Pas de séance enregistrée
                        </MDBTableBody>
                    )}
                </MDBTable>
                <div className="addBtn">
                    <MDBBtn rounded onClick={() => this.showWorkout("new")}>Ajouter une séance</MDBBtn>
                </div>
            </div>
        )
    }
}

export default withRouter(TableWorkouts);