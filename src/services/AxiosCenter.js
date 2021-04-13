import ApiBackEnd from "./../config/ApiBackEnd";

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
    }
};

export default AxiosCenter;