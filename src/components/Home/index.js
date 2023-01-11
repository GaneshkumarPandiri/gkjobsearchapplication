import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="home-paragraph">
            Millions of people are searching for jobs, salary
            <br />
            information, company reviews. Find the jobs that fits your
            <br />
            abilities and potential.
          </p>
          <Link to="/jobs" className="link-style">
            <button
              type="button"
              className="find-jobs-button"
              onClick={this.onFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
