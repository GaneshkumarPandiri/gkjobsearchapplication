import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Profile from '../Profile'
import EmploymentTypes from '../EmploymentTypes'
import SalaryRanges from '../SalaryRanges'
import JobItems from '../JobItems'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const fetchResponseStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    isLoading: true,
    jobsList: '',
    employmentType: [],
    minimumPackage: '',
    searchJob: '',
    responseStatus: fetchResponseStatus.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {employmentType, minimumPackage, searchJob} = this.state
    const type = employmentType.join(',')
    const jobsListAPI = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${minimumPackage}&search=${searchJob}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(jobsListAPI, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedData = data.jobs.map(item => ({
        id: item.id,
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({
        jobsList: convertedData,
        isLoading: false,
        responseStatus: fetchResponseStatus.success,
      })
    } else {
      this.setState({
        isLoading: false,
        responseStatus: fetchResponseStatus.failure,
      })
    }
  }

  onEmploymentType = value => {
    this.setState({isLoading: true})
    const {employmentType} = this.state

    if (employmentType.includes(value)) {
      const updatedEmploymentList = employmentType.filter(
        item => item !== value,
      )
      this.setState({employmentType: updatedEmploymentList}, this.getJobsList)
    } else {
      const employmentTypeList = [...employmentType, value]
      this.setState({employmentType: employmentTypeList}, this.getJobsList)
    }
  }

  onSalaryRange = value => {
    this.setState({minimumPackage: value, isLoading: true}, this.getJobsList)
  }

  onSearchIconClick = () => {
    this.setState({isLoading: true}, this.getJobsList)
  }

  onSearchJob = event => {
    this.setState({searchJob: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsFoundView = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(jobsListItem => (
          <JobItems jobsListItem={jobsListItem} key={jobsListItem.id} />
        ))}
      </ul>
    )
  }

  noJobsFoundView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-view"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  onResponseSuccess = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.noJobsFoundView()
    }
    return this.jobsFoundView()
  }

  onRetryFailureJobs = () => {
    this.setState({isLoading: false})
    this.getJobsList()
  }

  onResponseFailure = () => (
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
        onClick={this.onRetryFailureJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case fetchResponseStatus.success:
        return this.onResponseSuccess()
      case fetchResponseStatus.failure:
        return this.onResponseFailure()
      default:
        return null
    }
  }

  render() {
    const {isLoading, searchJob} = this.state
    return (
      <div className="jobs-container">
        <div className="profile-and-filters">
          <Profile />
          <hr />
          <h1 className="filter-heading">Type of Employment</h1>
          <ul>
            {employmentTypesList.map(item => (
              <EmploymentTypes
                employmentType={item}
                onEmploymentType={this.onEmploymentType}
                key={item.employmentTypeId}
              />
            ))}
          </ul>
          <hr />
          <h1 className="filter-heading">Salary Range</h1>
          <ul>
            {salaryRangesList.map(item => (
              <SalaryRanges
                salaryRange={item}
                onSalaryRange={this.onSalaryRange}
                key={item.salaryRangeId}
              />
            ))}
          </ul>
        </div>
        <div>
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="input-search"
              value={searchJob}
              onChange={this.onSearchJob}
            />
            <button
              type="button"
              className="search-button"
              onClick={this.onSearchIconClick}
              testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div>{isLoading ? this.renderLoader() : this.renderJobs()}</div>
        </div>
      </div>
    )
  }
}

export default Jobs
