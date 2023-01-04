import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const responseStatusProfile = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    isLoading: true,
    profileDetails: '',
    profileStatus: responseStatusProfile.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedProfileDetails = [data.profile_details].map(item => ({
        name: item.name,
        profileImageUrl: item.profile_image_url,
        shortBoi: item.short_bio,
      }))
      this.setState({
        isLoading: false,
        profileDetails: convertedProfileDetails[0],
        profileStatus: responseStatusProfile.success,
      })
    } else {
      this.setState({
        isLoading: false,
        profileStatus: responseStatusProfile.failure,
      })
    }
  }

  onRetryFailureProfile = () => {
    this.setState({isLoading: true})
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="failure-card-profile">
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryFailureProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileCardSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBoi} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h2 className="profile-name">{name}</h2>
        <p className="profile-designation">{shortBoi}</p>
      </div>
    )
  }

  renderProfileCard = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case responseStatusProfile.success:
        return this.renderProfileCardSuccessView()
      case responseStatusProfile.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container-profile">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderProfileCard()}</div>
    )
  }
}

export default Profile
