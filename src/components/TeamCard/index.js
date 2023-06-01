import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam
  return (
    <li className="team-card-container">
      <Link className="team-card-link" to={`/team-matches/${id}`}>
        <img className="team-card-img" src={teamImageUrl} alt={name} />
        <p className="team-card-name">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard
