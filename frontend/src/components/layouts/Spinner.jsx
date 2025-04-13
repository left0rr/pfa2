import { HashLoader } from "react-spinners";
import React from "react";

export default function Spinner() {
    return (
        <div className="row mt-4">
            <div className="col-md-8 mx-auto">
                <div className="alert d-flex align-items-center justify-content-center">
                    <HashLoader color="#ff00ff" size={30} />
                </div>
            </div>
        </div>
    );
}
