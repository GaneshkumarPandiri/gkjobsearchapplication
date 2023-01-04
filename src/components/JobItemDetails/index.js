import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobItemInDetail from '../JobItemInDetail'
import './index.css'

const jobDetailsResponseStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    isLoading: true,
    jobDetailsResponse: jobDetailsResponseStatus.initial,
    jobDetails: '',
    similarJobs: '',
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobItemDetailsAPIUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobItemDetailsAPIUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.job_details
      const convertedJobDetails = {
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        lifeAtCompany: jobDetails.life_at_company,
        skills: jobDetails.skills,
      }
      const similarJobs = data.similar_jobs
      const convertedSimilarJobs = similarJobs.map(item => ({
        id: item.id,
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        rating: item.rating,
        title: item.title,
        jobDescription: item.job_description,
        location: item.location,
      }))
      this.setState({
        isLoading: false,
        jobDetailsResponse: jobDetailsResponseStatus.success,
        jobDetails: convertedJobDetails,
        similarJobs: convertedSimilarJobs,
      })
    } else {
      this.setState({
        isLoading: false,
        jobDetailsResponse: jobDetailsResponseStatus.failure,
      })
    }
  }

  onRetryFailureJobsDetails = () => {
    this.setState({isLoading: true})
    this.getJobItemDetails()
  }

  onResponseSuccessJobDetails = () => {
    const {similarJobs, jobDetails} = this.state
    return (
      <div>
        <JobItemInDetail jobDetails={jobDetails} similarJobs={similarJobs} />
      </div>
    )
  }

  onResponseFailureJobDetails = () => (
    <div className="failure-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-jobs-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryFailureJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetailsResponse} = this.state
    switch (jobDetailsResponse) {
      case jobDetailsResponseStatus.success:
        return this.onResponseSuccessJobDetails()
      case jobDetailsResponseStatus.failure:
        return this.onResponseFailureJobDetails()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="job-details-container">
        {isLoading ? this.renderLoader() : this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
