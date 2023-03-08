import React from "react";

export const Modal = () => {

    const handleClick = () => {
        window.location.reload();
    }

    return (
        <div className="modal">
            <div className="modal-box">
                <div className="modal-cpntent">
                    <h1>You Won!</h1>
                    <button className="replay" onClick={handleClick}>Play Again?</button>
                </div>
            </div>
        </div>
    )
}