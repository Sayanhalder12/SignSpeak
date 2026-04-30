import GlassCard from './GlassCard'

function TeamCard({ member }) {
  return (
    <GlassCard className="team-card">
      <img className="team-image" src={member.image} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </GlassCard>
  )
}

export default TeamCard
