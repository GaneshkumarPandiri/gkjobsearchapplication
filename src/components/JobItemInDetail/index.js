import './index.css'
import SimilarJobItem from '../SimilarJobsItem'

const JobItemInDetail = props => {
  const {jobDetails, similarJobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    companyWebsiteUrl,
    skills,
    lifeAtCompany,
  } = jobDetails
  return (
    <div>
      <div className="job-item-card-details">
        <div className="title-top">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="company-rating">
            <h1 className="job-title">{title}</h1>
            <p>{rating}</p>
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
        <div className="link-container">
          <h1 className="job-description">Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <p>{jobDescription}</p>
        <h1 className="job-description">Skills</h1>
        <ul className="skills-container">
          {skills.map(item => (
            <li key={item.name} className="skills">
              <img src={item.image_url} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="job-description">Life at Company</h1>
        <div className="life-at-company">
          <p>{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.image_url}
            alt="life at company"
            className="life-at-image"
          />
        </div>
      </div>
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs">
        {similarJobs.map(item => (
          <SimilarJobItem similarJobItem={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

export default JobItemInDetail
