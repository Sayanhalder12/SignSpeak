import { Link } from 'react-router-dom'
import TeamCard from '../components/TeamCard'

const teamMembers = [
  {
    name: 'Aarav Sharma',
    role: 'AI/ML Engineer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Meera Nair',
    role: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Rohan Iyer',
    role: 'Embedded Systems',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Kavya Rao',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Nikhil Verma',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=300&q=80',
  },
]

function Home() {
  return (
    <div className="page home-page">
      <section className="hero-section glass-card">
        <p className="kicker">Intelligent Sign Recognition</p>
        <h1>SIGNSPEAK - Bridging Silence with Intelligent Communication</h1>
        <p className="hero-subtitle">
          Transform hand gestures into meaningful speech and text with a clean, real-time interface
          designed for accessible communication.
        </p>
        <div className="hero-actions">
          <Link to="/flex" className="btn btn-primary">
            Try Flex
          </Link>
          <Link to="/camera" className="btn btn-primary">
            Try Camera
          </Link>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
