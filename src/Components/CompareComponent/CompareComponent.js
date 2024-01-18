import React, { useState,useEffect } from 'react'
import './CompareComponent.css'
import Profile from '../Profile/Profile'
import ContestInfo from '../ContestInfo/ContestInfo'
import ProblemsSolved from '../ProblemsSolved/ProblemsSolved'
import { getUserData } from '../../service/codechef.service'

function CompareComponent() {

    const [userData, setUserData] = useState(undefined)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        getUserData().then((res) => {
            let response = res.data
            response.ppreviousContests = response.previousContests.reverse()
            setUserData(response)

            console.log(userData, res.data)
        })
            .catch(err => {
                console.log("err", err)
            })
    }, [])

    useEffect(() => {
        if (userData != undefined)
            setLoading(false)
    }, [userData])
    console.log("userData=", userData)

    return (
        <>
            {!loading ?
                <div className="container-left">
                    <Profile username={userData.user.username} userinfo={userData.user.userInfo} />
                    <ContestInfo contestData={userData} />
                    <ProblemsSolved heatArray={userData.user.heatMap} />
                </div>
                : <div></div>
            }
        </>
    )
}

export default CompareComponent