import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamCard extends Component {
  state = {teamDetails: [], isLoading: true}

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)

    const fetchedTeamDetails = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({teamDetails: fetchedTeamDetails, isLoading: false})
  }

  render() {
    const {teamDetails, isLoading} = this.state

    if (isLoading) {
      return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    }

    return (
      <div className="main-container">
        <div className="heading">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <div className="teams-container">
          {teamDetails.map(each => (
            <Link
              key={each.id}
              to={`/TeamMatches/${each.id}`}
              className="teams-details"
            >
              <div className="team-cards">
                <img
                  src={each.teamImageUrl}
                  alt={each.name}
                  className="team-img"
                />
                <p className="team-name">{each.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default TeamCard
