import { useMemo, useState } from 'react'
import GlassCard from '../components/GlassCard'

const fingerReadings = [
  { name: 'Thumb', value: 78 },
  { name: 'Index', value: 64 },
  { name: 'Middle', value: 59 },
  { name: 'Ring', value: 41 },
  { name: 'Little', value: 36 },
]

function Flex() {
  const [liveText] = useState('I need water')
  const [rawOutput] = useState(27841)

  const averageReading = useMemo(
    () => Math.round(fingerReadings.reduce((sum, finger) => sum + finger.value, 0) / fingerReadings.length),
    [],
  )

  return (
    <div className="page flex-page">
      <section className="flex-section">
        <h1>Finger Readings</h1>
        <div className="finger-cards">
          {fingerReadings.map((finger) => (
            <GlassCard key={finger.name} className="finger-card">
              <p>{finger.name}</p>
              <strong>{finger.value}</strong>
            </GlassCard>
          ))}
        </div>
      </section>

      <GlassCard className="live-gesture-panel">
        <h2>Live Gesture</h2>
        <p className="detected-text">{liveText}</p>
      </GlassCard>

      <GlassCard className="raw-output-bar">
        <p>Raw Output</p>
        <strong>{rawOutput + averageReading}</strong>
      </GlassCard>

      <div className="speak-wrap">
        <button type="button" className="btn btn-primary speak-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zm0-9v2a7 7 0 0 1 0 14v2a9 9 0 0 0 0-18z" />
          </svg>
          Speak
        </button>
      </div>
    </div>
  )
}

export default Flex
