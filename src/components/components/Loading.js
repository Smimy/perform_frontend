import React, {useEffect, useState} from "react";
import {MDBAlert} from "mdbreact";
import {useStateIfMounted} from "use-state-if-mounted";


const Spinners = () => (
    <>
        <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </>
)

const Alert = () => (
    <MDBAlert color="warning">
        Un problème est survenu ! Veuillez <b>recharger</b> la page ou <b>revenir</b> plus tard.
    </MDBAlert>
)

const Loading = () => {
    const [outOfTime, setOutOfTime] = useStateIfMounted(false);

    useEffect(() => {
        setTimeout(function () {
            setOutOfTime(true)
        }, 20000);
    });

    return (
        <div className="d-flex flex-row justify-content-center align-items-center w-100">
            <section className='my-4 '>
                {
                    !outOfTime ? <Spinners/> : <Alert/>
                }
            </section>
        </div>
    );
}

export default Loading;
