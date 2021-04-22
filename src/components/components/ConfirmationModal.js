import React, {useState} from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon} from 'mdbreact';

/**
 * ConfirmationModal is used to confirm an action through a popup.
 *
 * @param title : modal title
 * @param action : what is done after confirmation
 * @param name : button name
 * @param color : button color
 * @param rounded : rounded button
 * @param size : modal size
 * @param text : text inside the ModalBody
 * @param icon : name of the icon on font awesome
 * @param disabled : is the button clickable
 * @constructor
 */

const ConfirmationModal =
    ({title,action, name, color, rounded, size , text, icon, disabled }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <MDBBtn onClick={() => setIsOpen(true)}
                        color={color}
                        rounded={rounded}
                        size={size}
                        disabled={disabled}>
                    {name}
                    <MDBIcon icon={icon}/>
                </MDBBtn>

                <MDBModal isOpen={isOpen}>
                    <MDBModalHeader>{title}</MDBModalHeader>
                    <MDBModalBody>
                        {text}
                    </MDBModalBody>
                    <MDBModalFooter>

                            <MDBBtn
                                rounded
                                color={"red"}
                                onClick={() => {action(); setIsOpen(false)}}
                            >Confirmer
                            </MDBBtn>

                            <MDBBtn
                                rounded
                                onClick={() => setIsOpen(false)}
                            >Annuler
                            </MDBBtn>

                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }


export default ConfirmationModal;