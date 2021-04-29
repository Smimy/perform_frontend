import Loading from "../components/Loading";
import React from "react";
import {MDBBtn, MDBCard, MDBCol, MDBInput, MDBRow, MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import AxiosCenter from "../../services/AxiosCenter";
import UserService from "../../services/UserService";
import moment from "moment";
import NotificationService from "../../services/NotificationService";
import ConfirmationModal from "../components/ConfirmationModal";

const entityName = "Séance";

const WorkoutSchema = Yup.object().shape({
    name: Yup.string().required("Veuillez renseigner un nom de séance"),
    date: Yup.date().required("Veuillez renseigner la date de la séance"),
    workoutGoalId: Yup.string().required("Veuillez choisir l'objectif de la séance'")
});

const ComponentSelect = ({field, ...props}) => (
    <div>
        <label style={{fontSize: "0.8rem", color: "#757575",}}> {props.label} </label>
        <select className="form-control browser-default custom-select"
                name={props.name} {...props} {...field}
        >
            {props.list.map((object) => (
                <option key={object.id} value={object.id}>{object.name}</option>))}
        </select>
    </div>
);

const ComponentInputText = ({field, ...props}) => (
    <MDBInput
        outline
        type="text"
        {...props}
        {...field}
    />
);

const ComponentDate = ({field, ...props}) => (
    <div>
        <MDBInput
            label={props.label}
            outline
            type="date"
            {...field}
        />
    </div>
);

const ComponentError = (props) => (
    <div className="text-danger">{props.children}</div>
);

class WorkoutDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workoutGoalList: [],
            exerciseTypesList: [],
            wrapperWorkout: null,
            wrapperExerciseList: [],
            exercisesIdToRemove: [],
            exercisesToAdd: [],
            newWorkout: true,
            loaded: false
        };
    }

    componentDidMount() {
        // Get workoutId from URL, need to secure that.
        const workoutId = this.props.match.params.workoutId;
        let wrapperWorkout;
        // Need to correct triple ".then".
        AxiosCenter.getAllWorkoutGoals().then((response) => {
            const workoutGoalList = response.data;
            AxiosCenter.getAllExerciseTypes().then((response) => {
                const exerciseTypesList = response.data;

                // If this is an existing workout
                if (workoutId !== "new") {
                    AxiosCenter.getWrapperWorkoutById(workoutId).then((response) => {
                        wrapperWorkout = response.data;
                        const wrapperExerciseList = wrapperWorkout.wrapperExerciseList;

                        this.setState({
                            workoutGoalList,
                            exerciseTypesList,
                            wrapperWorkout,
                            wrapperExerciseList,
                            newWorkout: false,
                            loaded: true
                        })
                    })
                } else { // If this is a new workout

                    wrapperWorkout = {
                        comment: "",
                        date: moment().format("YYYY-MM-DD"),
                        id: null,
                        name: "Nouvelle séance",
                        userId: UserService.getUserId(),
                        workoutGoalId: workoutGoalList[0].id,
                        workoutGoalName: "",
                        wrapperExerciseList: []
                    }
                    this.setState({
                        workoutGoalList,
                        exerciseTypesList,
                        wrapperWorkout,
                        newWorkout: true,
                        loaded: true
                    })
                }
            })
        });
    }

    changeExerciseName(index) {

        const wrapperExerciseList = this.state.wrapperExerciseList;
        const exerciseTypesList = this.state.exerciseTypesList;
        const exerciseType = exerciseTypesList.find(exerciseType => exerciseType.id === wrapperExerciseList[index].exerciseTypeId);
        wrapperExerciseList[index].name = exerciseType.name;
        console.log(wrapperExerciseList[index].name)
        this.setState({
            wrapperExerciseList
        })
    }

    addExercise() {
        let newNumber = 1;
        this.state.wrapperExerciseList.forEach((exercise) => {
            if (newNumber <= exercise.number) {
                newNumber = (exercise.number + 1);
            }
        })
        const exercise = {
            id: null,
            name: "Nouvel exercice", //this.state.exerciseTypesList[0].name,
            number: newNumber,
            comment: "",
            exerciseTypeId: this.state.exerciseTypesList[0].id,
            workoutId: this.state.wrapperWorkout.id
        }
        const wrapperExerciseList = this.state.wrapperExerciseList;
        wrapperExerciseList.push(exercise);

        const exercisesToAdd = this.state.exercisesToAdd;
        exercisesToAdd.push(exercise);

        this.setState({
            wrapperExerciseList,
            exercisesToAdd
        })
    }

    deleteExercise(id, index) {
        const newWrapperExerciseList = this.state.wrapperExerciseList;
        newWrapperExerciseList.splice(index, 1);
        let exercisesIdToRemove = this.state.exercisesIdToRemove;
        if (id !== null) {
            exercisesIdToRemove.push(id);
        }
        this.setState({
            exercisesIdToRemove,
            wrapperExerciseList: newWrapperExerciseList
        })
    }

    deleteWorkout(id) {
        if (id !== null) {
            AxiosCenter.deleteWorkout(id).then(() => {
                NotificationService.successDeletion(entityName);
                this.props.history.push("/");
            }).catch((error) => {
                console.log(error);
                NotificationService.failedDeletion(entityName);
            });
        } else {
            this.props.history.push("/");
        }
    }

    submit = (values) => {
        if (values.id === null) {
            AxiosCenter.createWorkout(values).then((response) => {
                const workoutId = response.data.id;
                this.state.exercisesToAdd.forEach((exercise) => {
                    exercise.workoutId = workoutId;
                    AxiosCenter.createExercise(exercise)
                });
                NotificationService.successRegistration(entityName);
                this.props.history.push("/");
            }).catch((error) => {
                console.log(error);
                NotificationService.failedRegistration(entityName);
            });
        } else {
            this.state.exercisesIdToRemove.forEach(id => AxiosCenter.deleteExercise(id));
            this.state.wrapperExerciseList.forEach((exercise) => {
                if (exercise.id !== null) {
                    const exerciseToUpdate = {
                        id: exercise.id,
                        name: exercise.name, //this.state.exerciseTypesList[0].name,
                        number: exercise.number,
                        comment: exercise.comment,
                        exerciseTypeId: exercise.exerciseTypeId,
                        workoutId: this.state.wrapperWorkout.id
                    }
                    AxiosCenter.updateExercise(exerciseToUpdate);
                }
            });
            this.state.exercisesToAdd.forEach(exercise => AxiosCenter.createExercise(exercise));

            AxiosCenter.updateWorkout(values).then(() => {
                NotificationService.successModification(entityName);
                this.props.history.push("/");
            }).catch((error) => {
                console.log(error);
                NotificationService.failedModification(entityName);
            });
        }

    }

    render() {
        if (!this.state.loaded) return <Loading/>
        return (
            <div className="d-flex justify-content-center">
                <Formik initialValues={{
                    comment: this.state.wrapperWorkout.comment,
                    date: this.state.wrapperWorkout.date,
                    id: this.state.wrapperWorkout.id,
                    name: this.state.wrapperWorkout.name,
                    userId: this.state.wrapperWorkout.userId,
                    workoutGoalId: this.state.wrapperWorkout.workoutGoalId,
                    workoutGoalName: this.state.wrapperWorkout.workoutGoalName,
                    wrapperExerciseList: this.state.wrapperExerciseList
                }}
                        onSubmit={this.submit}
                        validationSchema={WorkoutSchema}
                >
                    {({
                          dirty,
                          handleSubmit,
                          isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit}
                              className="w-100">
                            <MDBCard>
                                {/* Workout datas */}
                                <MDBRow between around className="mt-3">
                                    <MDBCol md="4">
                                        <Field
                                            name="workoutGoalId"
                                            label="Objectif de la séance* :"
                                            component={ComponentSelect}
                                            list={this.state.workoutGoalList}/>
                                        <ErrorMessage name="goal" component={ComponentError}/>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <Field
                                            name="name"
                                            label="Nom de la séance* :"
                                            component={ComponentInputText}/>
                                        <ErrorMessage name="name" component={ComponentError}/>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <Field
                                            name="date"
                                            label="Date de la séance* :"
                                            component={ComponentDate}/>
                                        <ErrorMessage name="date" component={ComponentError}/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBTable striped={true} hover={true} small={true} responsive={true}>
                                    <MDBTableHead>
                                        <tr>
                                            <th className={"bold"}>#</th>
                                            <th className={"bold"}>Nom</th>
                                            <th className={"bold"}>Type d'exercice</th>
                                        </tr>
                                    </MDBTableHead>

                                    {/* Exercises datas */}
                                    {this.state.wrapperExerciseList.length ? (
                                        <MDBTableBody>
                                            {this.state.wrapperExerciseList.map((exercise, index) => (

                                                <tr key={exercise.number}>
                                                    <td>{exercise.number}</td>
                                                    {/* Need to be able to change exercise order (up/down 1 => 2 / 2 => 1) */}
                                                    <td>
                                                        <Field
                                                            name={"wrapperExerciseList[" + index + "].name"}
                                                            component={ComponentInputText}/>
                                                        <ErrorMessage
                                                            name={"wrapperExerciseList[" + index + "].name"}
                                                            component={ComponentError}/>
                                                    </td>

                                                    <td>
                                                        <Field
                                                            name={"wrapperExerciseList[" + index + "].exerciseTypeId"}
                                                            component={ComponentSelect}
                                                            //onInput={() => this.changeExerciseName(index)}
                                                            list={this.state.exerciseTypesList}/>
                                                        <ErrorMessage
                                                            name={"wrapperExerciseList[" + index + "].exerciseTypeId"}
                                                            component={ComponentError}/>
                                                    </td>

                                                    <td>
                                                        <MDBBtn rounded size="sm" color="red"
                                                                onClick={() => this.deleteExercise(exercise.id, index)}>SUPPRIMER</MDBBtn>
                                                    </td>
                                                </tr>

                                            ))}
                                        </MDBTableBody>
                                    ) : (
                                        <MDBTableBody>
                                            <tr>
                                                <td>Pas d'exercice</td>
                                            </tr>
                                        </MDBTableBody>
                                    )}
                                </MDBTable>
                                <div className="addBtn">
                                    <MDBBtn rounded disabled={(isSubmitting)} onClick={() => this.addExercise()}>Ajouter
                                        un exercice</MDBBtn>
                                </div>
                            </MDBCard>

                            <MDBRow between around className="mt-3">
                                <MDBBtn
                                    rounded
                                    disabled={(isSubmitting)}
                                    type={"submit"}
                                >Enregistrer
                                </MDBBtn>

                                <ConfirmationModal
                                    title={"Confirmation de suppression"}
                                    text={"Etes-vous sûr(e) de vouloir supprimer " + (this.state.wrapperWorkout.name) + " ?"}
                                    name="SUPPRIMER"
                                    rounded={true}
                                    color="red"
                                    action={() => this.deleteWorkout(this.state.wrapperWorkout.id)}
                                    disabled={(this.state.newWorkout || isSubmitting)}
                                />

                                <MDBBtn
                                    rounded
                                    disabled={(isSubmitting)}
                                    onClick={() => this.props.history.push("/")}
                                >Retour
                                </MDBBtn>
                            </MDBRow>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default WorkoutDetails;