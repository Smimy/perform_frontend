import ApiBackEnd from "./../config/ApiBackEnd";

/**
 * @author Schrotzenberger Jérémy
 *
 * AxiosCenter is used to group all requests to the API.
 */
const AxiosCenter = {
    authenticate(values) {
        return ApiBackEnd({
            method: "post",
            url: "/authenticate",
            data: values,
        });
    },

    // GET

    getCurrentUser() {
        return ApiBackEnd({
            method: "get",
            url: "/account",
        });
    },

    getWorkoutsByUserId(userId) {
        return ApiBackEnd({
            method: "get",
            url: `/workouts/user/${userId}`
        });
    },

    getAllWorkoutGoals() {
        return ApiBackEnd({
            method: "get",
            url: "/workout-goals"
        });
    },

    getAllExerciseTypes() {
        return ApiBackEnd({
            method: "get",
            url: "/exercise-types"
        })
    },

    getWrapperWorkoutById(workoutId) {
        return ApiBackEnd({
            method: "get",
            url: `/wrapperworkout/workout/${workoutId}`,
        })
    },

    // POST

    createWorkout(values) {
        return ApiBackEnd({
            method: "post",
            url: "/workouts",
            data : values
        })
    },

    // DELETE

    deleteWorkout(id) {
        return ApiBackEnd({
            method: "delete",
            url: `/workouts/${id}`,
        })
    },

    deleteWorkoutInCascade(id, idExercises, idSeries) {
        return ApiBackEnd({
            method: "delete",
            url: `"/wrapperworkout/workout/${id}/exercices/${idExercises}/series/${idSeries}"`
        })
    },

    deleteExercise(id) {
        return ApiBackEnd({
            method: "delete",
            url: `/exercises/${id}`,
        })
    },

    deleteSerie(id) {
        return ApiBackEnd({
            method: "delete",
            url: `/series/${id}`,
        })
    },

    // PUT

    updateWorkout(values) {
        return ApiBackEnd({
            method: "put",
            url: `/workouts`,
            data: values,
        })
    }
};

export default AxiosCenter;