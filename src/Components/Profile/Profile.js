import React, { useState } from 'react'
import './Profile.scss'
import dummyProfile from '../../../src/assets/download.png'
import { getExistingUserNamesService } from '../../service/codechef.service'

import DialogBox from '../DialogBox/DialogBox'

function Profile(props) {
  const { username, userinfo, updateUserData, getUserData } = props
  const [showDialog, setShowDialog] = useState(false)
  const [inputBar, setInputBar] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [userNameOptions, setUserNameOptions] = useState([]);
  function updateFunction() {
    updateUserData(username)
  }
  function toggleDialogBox() {
    // showDialog ? setShowDialog(false) : setShowDialog(true)
    // setShowDialog(true)
  }
  const photo = username.Profile

  const handleInputChange = async (e) => {
    setInputValue(e.target.value);
    setUserNameOptions((await getExistingUserNamesService(e.target.value)).data);
  };


  function fetchData(e) {
    if (e.key == "Enter") {
      getUserData(inputValue)
      setInputValue("")
      setInputBar(false)
    }
  }
  const getStarColor = (stars) => {
    //console.log(stars[0])
    if (stars[0] == 1) {
      return 'var(--one-star)';
    }
    else if (stars[0] == 2) {
      return 'var(--two-star)';
    }
    else if (stars[0] == 3) {
      return 'var(--three-star)';
    }
    else if (stars[0] == 4) {
      return 'var(--four-star)';
    }
    else if (stars[0] == 5) {
      return 'var(--five-star)';
    }
    else if (stars[0] == 6) {
      return 'var(--six-star)';
    }
    else {
      return 'var(--seven-star)';
    }

  };


  return (<>
    <div className='profile-container common-container'>
      <div className="profile-photo">
        <img src={userinfo.profile} loading='lazy' />
        {/* <img src={dummyProfile} loading='lazy' /> */}
      </div>
      <div className="user-info">
        <div className="name-star-rating">
          <div className="name-ranking">
            <h3>Name : </h3>{userinfo.name}
          </div>
          <div className="stars" style={{ color: getStarColor(userinfo.stars) }}>
            {userinfo.stars}
          </div>
        </div>

        <div className="name-ranking">
          <h3>
            Global Rank :
          </h3>
          {(userinfo.globalRank) ? userinfo.globalRank : "Inactive"}
        </div>
        <div className="name-ranking">
          <h3>
            Country Rank :
          </h3>
          {(userinfo.countryRank) ? userinfo.countryRank : "Inactive"}
        </div>

        <div className="name-star-rating">

          <div className="name-ranking">
            <h3>
              Highest Rating :
            </h3>
            {(userinfo.highestRating) ? userinfo.highestRating : "--"}
          </div>

          <div className="name-ranking">
            <h3>
              Current Rating :
            </h3>
            {(userinfo.currentRating) ? userinfo.currentRating : "--"}
          </div>
        </div>


        <div className="profile-footer">
          <div>
            <h3>
              <button>
                {/* <a href={`https://www.codechef.com/users/${username}`} target='_blank'>CodeChef Profile</a> */}
                CodeChef Profile
              </button>
            </h3>
          </div>

          <div className="change-handle-user">
            {inputBar ?
              (<div className='search-dropdown'>
                <input type="text" value={inputValue} onChange={handleInputChange} onKeyUp={fetchData} />
                <div className='options-container'>
                  {
                    userNameOptions.map(user =>
                      <div className='single-option-container'>
                        <p>{user}</p>
                      </div>
                    )
                  }
                </div>
              </div>)
              : <h3>
                <button onClick={() => {
                  setInputBar(true)
                }}>
                  Change handle User
                </button>
                {/* {showDialog ? <DialogBox clickClose={() => { setShowDialog(false) }} /> : null} */}
              </h3>}
          </div>

          <div className="">
            <h3>
              <button onClick={async () => {
                await updateUserData(username)
              }}>
                Refresh Data
              </button>

            </h3>
          </div>
        </div>
      </div>
    </div >
  </>
  )
}

export default Profile