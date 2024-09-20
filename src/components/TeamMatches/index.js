import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesDetails: {},
    teamBannerUrl: '',
    teamRecentMatchesDetails: {},
    isLoading: true,
    classId: '',
  }

  componentDidMount() {
    this.getTeamMatchesDetails()
  }

  getTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({classId: id})

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    this.setState({teamBannerUrl: data.team_banner_url})

    const latestMatchDetails = data.latest_match_details || {}

    const fetchedTeamMatchesDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    console.log('Fetched Team Matches Details:', fetchedTeamMatchesDetails)

    const fetchedTeamRecentMatchesDetails = Array.isArray(data.recent_matches)
      ? data.recent_matches.map(each => ({
          umpires: each.umpires,
          result: each.result,
          manOfTheMatch: each.man_of_the_match,
          id: each.id,
          date: each.date,
          venue: each.venue,
          competingTeam: each.competing_team,
          competingTeamLogo: each.competing_team_logo,
          firstInnings: each.first_innnigs,
          secondInnings: each.second_innings,
          matchStatus: each.match_status,
        }))
      : []

    this.setState({
      teamMatchesDetails: fetchedTeamMatchesDetails,
      teamRecentMatchesDetails: fetchedTeamRecentMatchesDetails,
      isLoading: false,
    })
  }

  render() {
    const {
      isLoading,
      teamMatchesDetails,
      teamRecentMatchesDetails,
      teamBannerUrl,
      classId,
    } = this.state

    if (isLoading) {
      return <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    }

    return (
      <div className={classId}>
        <div>
          <img src={teamBannerUrl} alt="Team Banner" className="team-banner" />
          <div className="latest-matches-card">
            <p className="latest-matches-heading">Latest Matches</p>
            <div className="teamMatches-container">
              <div className="teamMatches-container-leftContent">
                <h1>{teamMatchesDetails.competingTeam}</h1>
                <p>{teamMatchesDetails.date}</p>
                <p>{teamMatchesDetails.venue}</p>
                <p>{teamMatchesDetails.result}</p>
              </div>
              <div>
                <img
                  src={teamMatchesDetails.competingTeamLogo}
                  alt={`${teamMatchesDetails.competingTeam} logo`}
                />
              </div>
              <div className="teamMatches-container-rightContent">
                <h3>First Innings</h3>
                <p>{teamMatchesDetails.firstInnings}</p>
                <h3>Second Innings</h3>
                <p>{teamMatchesDetails.secondInnings}</p>
                <h2>Man Of The Match</h2>
                <p>{teamMatchesDetails.manOfTheMatch}</p>
                <h3>Umpires</h3>
                <p>{teamMatchesDetails.umpires}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="team-recent-matches">
          {teamRecentMatchesDetails.map(each => (
            <div key={each.id} className="team-recent-matches-card">
              <img
                src={each.competingTeamLogo}
                alt={`${each.competingTeam} logo`}
                className="team-recent-matches-img"
              />
              <div className="team-recent-matches-content">
                <h2>{each.competingTeam}</h2>
                <p>{each.result}</p>
                {each.matchStatus === 'Won' ? (
                  <p className="green">{each.matchStatus}</p>
                ) : (
                  <p className="red">{each.matchStatus}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default TeamMatches
