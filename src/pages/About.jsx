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

function About() {
  return (
    <div className="page about-page">
      <section className="glass-card about-card">
        <div className="about-content">
          <h1>About SIGNSPEAK</h1>
          <p>
            SIGNSPEAK is a communication-first interface that turns sign and finger gestures into text
            and voice outputs. The goal is to make conversations more inclusive by giving users an
            intuitive and elegant way to bridge communication gaps.
          </p>
          <h2>Tech Stack</h2>
          <ul className="tech-list">
            <li>React + Vite</li>
            <li>React Router</li>
            <li>Web APIs (getUserMedia)</li>
            <li>Responsive glassmorphism UI with CSS</li>
          </ul>
        </div>
      </section>

      <section className="team-section">
        <h2>Core Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
