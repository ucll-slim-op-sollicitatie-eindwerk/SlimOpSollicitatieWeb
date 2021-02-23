import React, {Component, useState} from 'react';
import {useHistory} from "react-router-dom";
import {addJobdb, getJobs} from "./apiUser";
import {connect} from "react-redux";
import {useDispatch} from 'react-redux'
import { Helmet } from 'react-helmet';


function AddJob(props){
    const history = useHistory();
    const dispatch = useDispatch();

    const [titel, setTitel] = useState('');
    const [inter, setInter] = useState('');
    const [tech, setTech] = useState('');
    const [tech2, setTech2] = useState('');
    const [email, setEmail] = useState(props.email);


        return (
            <div className="centerPage">
            <Helmet>
                <title>SOS - Add Job</title>
            </Helmet>

                <div>
                    <h1>Maak een nieuwe job aan</h1>
                    <form onSubmit={handleSubmit} className="wite">
                        <label htmlFor="titel">Functie die je wil inoefenen</label>
                        <input type="text" placeholder="titel" id="titel" onChange={(e) =>setTitel(e.target.value)}/>
                        <p id="titelerror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <label htmlFor="inter">Interpersoonlijke vaardigheid</label>
                        <input type="text" placeholder="inter" id="inter" onChange={(e) => setInter(e.target.value)}/>
                        <p id="intererror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <label htmlFor="tech">Technische vaardigheid 1</label>
                        <input type="text" placeholder="Technische vaardigheid 1" id="tech" onChange={(e) => setTech(e.target.value)}/>
                        <p id="techerror" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <label htmlFor="tech2">Technische vaardigheid 2</label>
                        <input type="text" placeholder="Technische vaardigheid 2" id="tech2" onChange={(e) => setTech2(e.target.value)}/>
                        <p id="tech2error" style={{display: "none"}}>Mag niet leeg zijn</p>

                        <button>Voeg job toe</button>
                    </form>
                </div>
            </div>
        )

    async function handleSubmit(e)
    {
        e.preventDefault();

        if(ifEmpty("titel", titel) && ifEmpty("inter", inter)  && ifEmpty("tech", tech) && ifEmpty("tech2", tech2) ){
            const result = await addJobdb(titel, inter, tech, tech2, email)
            console.log(result === true)
            if(result === true){
                var jobs = await getJobs(email)
                props.updateUser(jobs)
                history.push("/profile");
            }
        }   
    }

    function ifEmpty(field, elem){
        if(elem === ""){
            var el = document.getElementById(field + "error")
            el.style.display = "block";
            return false
        }
        return true

    }

}

const mapStateToProps = (state) => {
    return{
        email: state.users.email,
        jobs: state.users.jobs
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateUser: (jobs) => {
            dispatch({type: 'UPDATE_USER_JOBS', payload: {jobs}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddJob);
