import {toast} from "react-toastify";
import React from "react";

/**
 * @author Schrotzenberger Jérémy
 *
 * NotificationService to inform the user if everything went well or not.
 */

const NotificationService = {

    /**
     * @param entityName is the name of the entity created in database,
     * to show in the notification to the user.
     */
    successRegistration(entityName) {
        return (
            toast.success(
                <div className="text-center">
                    <strong>{entityName} créé(e) !</strong>
                </div>,
            )
        )
    },

    failedRegistration(entityName) {
        return (
            toast.error(
                <div className="text-center">
                    <strong>Erreur, {entityName} non créé(e) !</strong>
                </div>,
            )
        )
    },

    successModification(entityName) {
        return (
            toast.success(
                <div className="text-center">
                    <strong>{entityName} modifié(e) !</strong>
                </div>,
            )
        )
    },

    failedModification(entityName) {
        return (
            toast.error(
                <div className="text-center">
                    <strong>Erreur, {entityName} non modifié(e) !</strong>
                </div>,
            )
        )
    },

    successDeletion(entityName) {
        toast.success(
            <div className="text-center">
                <strong>{entityName} supprimé(e) !</strong>
            </div>,
        );
    },

    failedDeletion(entityName) {
        toast.error(
            <div className="text-center">
                <strong>Erreur, {entityName} non supprimée !</strong>
            </div>,
        );
    }
}

export default NotificationService;