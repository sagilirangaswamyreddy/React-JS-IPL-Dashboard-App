import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const backgroundColors = [
  '#1e293b',
  '#a4261d',
  '#5755a7',
  '#d91c1f',
  '#f7db00',
  '#da237b',
  '#13418b',
  '#f26d22',
  '#4f5db0',
]

const background =
  backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
console.log(background)

class TeamMatches extends Component {
  state = {
    listOfRecentMatches: [],
    latestMatchDetails: [],
    isLoading: true,
    teamBannerUrl: '',
  }

  componentDidMount() {
    this.getListOfIPLTeams()
  }

  getListOfIPLTeams = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const updatedTeamBannerUrl = data.team_banner_url
    const updatedRecentTeamsList = data.recent_matches.map(eachTeam => ({
      id: eachTeam.id,
      competingTeam: eachTeam.competing_team,
      competingTeamLogo: eachTeam.competing_team_logo,
      date: eachTeam.date,
      firstInnings: eachTeam.first_innings,
      manOfTheMatch: eachTeam.man_of_the_match,
      matchStatus: eachTeam.match_status,
      result: eachTeam.result,
      secondInnings: eachTeam.second_innings,
      umpires: eachTeam.umpires,
      venue: eachTeam.venue,
    }))
    const updatedLatestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      id: data.latest_match_details.id,
      firstInnings: data.latest_match_details.first_innings,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpire,
      venue: data.latest_match_details.venue,
    }
    this.setState({
      listOfRecentMatches: updatedRecentTeamsList,
      latestMatchDetails: updatedLatestMatchDetails,
      isLoading: false,
      teamBannerUrl: updatedTeamBannerUrl,
    })
  }

  render() {
    const {
      listOfRecentMatches,
      isLoading,
      teamBannerUrl,
      latestMatchDetails,
    } = this.state
    console.log(listOfRecentMatches)
    console.log(isLoading)
    console.log(latestMatchDetails)
    return (
      <>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div
            className="bg-ipl-team-container"
            style={{backgroundColor: `${background}`}}
          >
            <img
              className="banner-logo"
              src={teamBannerUrl}
              alt="team banner"
            />
            <h3 className="latest-match-para">Latest Matches</h3>
            <ul>
              <LatestMatch
                key={latestMatchDetails.id}
                latestMatchDetails={latestMatchDetails}
              />
            </ul>

            <ul className="recent-matches-container">
              {listOfRecentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} eachMatch={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default TeamMatches
