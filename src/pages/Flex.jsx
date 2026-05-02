import { useEffect, useMemo, useState } from 'react'
import GlassCard from '../components/GlassCard'

const fingerNames = ['Thumb', 'Index', 'Middle', 'Ring', 'Little']

function Flex() {
  const [fingerValues, setFingerValues] = useState([0, 0, 0, 0, 0])
  const [outputText, setOutputText] = useState('No gesture detected')
  const [gestures, setGestures] = useState([])
  const [matchedGesture, setMatchedGesture] = useState(null)

  const fingerReadings = useMemo(
    () => fingerNames.map((name, index) => ({ name, value: Number(fingerValues[index] ?? 0) })),
    [fingerValues],
  )

  useEffect(() => {
    const fetchGestures = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/gesture')
        const data = await res.json()
        setGestures(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching gestures:', error)
        setGestures([])
      }
    }

    fetchGestures()
  }, [])

  function findMatch(currentValues) {
    const threshold = 0

    return gestures.find(
      (gesture) =>
        Array.isArray(gesture.fingerValues) &&
        gesture.fingerValues.every((val, index) => Math.abs(val - currentValues[index]) <= threshold),
    )
  }

  useEffect(() => {
    const match = findMatch(fingerValues)
    if (match) {
      setOutputText(match.outputText)
      setMatchedGesture(match)
    } else {
      setOutputText('No gesture detected')
      setMatchedGesture(null)
    }
  }, [fingerValues, gestures])

  function speakText(text) {
    if (!text || text === 'No gesture detected') return

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)
  }

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
        <p
          className="detected-text"
          style={
            matchedGesture
              ? undefined
              : {
                  opacity: 0.75,
                  color: '#ffb37a',
                }
          }
        >
          {outputText}
        </p>
      </GlassCard>

      <GlassCard className="live-gesture-panel">
        {matchedGesture ? (
          <>
            <h3>Matched Gesture</h3>
            <p>
              Pattern: <strong>{matchedGesture.fingerValues.join('')}</strong>
            </p>
            <p>
              Message: <strong>{matchedGesture.outputText}</strong>
            </p>
          </>
        ) : (
          <>
            <h3>Matched Gesture</h3>
            <p style={{ opacity: 0.75, color: '#ffb37a' }}>No matching gesture found</p>
          </>
        )}
      </GlassCard>

      <div className="speak-wrap">
        <button type="button" className="btn btn-primary speak-btn" onClick={() => speakText(outputText)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10v4h4l5 4V6L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zm0-9v2a7 7 0 0 1 0 14v2a9 9 0 0 0 0-18z" />
          </svg>
          Speak
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setFingerValues([1, 0, 1, 0, 0])}>
          Simulate 10100
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setFingerValues([0, 1, 0, 0, 0])}>
          Simulate 01000
        </button>
      </div>
    </div>
  )
}

export default Flex
