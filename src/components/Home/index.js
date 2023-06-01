import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {listOfTeams: [], isLoading: true}

  componentDidMount() {
    this.getListOfIPLTeams()
  }

  getListOfIPLTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedTeamsList = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({listOfTeams: updatedTeamsList, isLoading: false})
  }

  renderTeamsList = () => {
    const {listOfTeams} = this.state

    return (
      <ul className="team-cards-container">
        {listOfTeams.map(eachTeam => (
          <TeamCard key={eachTeam.id} eachTeam={eachTeam} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
    </div>
  )

  render() {
    const {listOfTeams, isLoading} = this.state
    console.log(listOfTeams)
    console.log(isLoading)
    return (
      <div className="bg-container">
        <div className="logo-and-title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo-img"
          />
          <h1 className="title-heading">IPL Dashboard</h1>
        </div>
        <div>{isLoading ? this.renderLoader() : this.renderTeamsList()}</div>
      </div>
    )
  }
}

export default Home
