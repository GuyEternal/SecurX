import React from "react";
import { useParams } from "react-router-dom";

function Main(){
    const { id } = useParams();
    return(
        <h1>This is Main page</h1>

    )
}

export default Main;