import {Link} from 'react-router-dom'

import {FcRating} from 'react-icons/fc'
import './index.css'

const JobItem = props => {
  const {jobsListItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsListItem
  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <li className="job-item-card">
        <div className="title-top">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="company-rating">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FcRating />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-content">
          <div className="location-content">
            <div className="location-item-content">
              <p>{location}</p>
            </div>
            <div>
              <p>{employmentType}</p>
            </div>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h1 className="job-description">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
