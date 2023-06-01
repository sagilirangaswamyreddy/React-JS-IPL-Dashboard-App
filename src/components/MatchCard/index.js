import './index.css'

const MatchCard = props => {
  const {eachMatch} = props
  console.log(eachMatch)
  const {competingTeam, result, competingTeamLogo, matchStatus} = eachMatch
  return (
    <li className="recent-match-container">
      <img
        className="recent-match-img"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="team-heading">{competingTeam}</p>
      <p>{result}</p>
      {matchStatus === 'Won' ? (
        <p className="green">{matchStatus}</p>
      ) : (
        <p className="red">{matchStatus}</p>
      )}
    </li>
  )
}

export default MatchCard
