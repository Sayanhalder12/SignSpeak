import { useEffect, useState } from 'react'
import GlassCard from '../components/GlassCard'

const API_URL = 'http://localhost:5000/api/gesture'

function convertPattern(pattern) {
  return pattern.split('').map((num) => Number(num))
}

function EditGesture() {
  const [pattern, setPattern] = useState('')
  const [message, setMessage] = useState('')
  const [gestures, setGestures] = useState([])

  const fetchGestures = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setGestures(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching gestures:', error)
      setGestures([])
    }
  }

  useEffect(() => {
    fetchGestures()
  }, [])

  const handleSave = async () => {
    const trimmedPattern = pattern.trim()
    const trimmedMessage = message.trim()

    if (!/^[01]{5}$/.test(trimmedPattern)) {
      alert('Pattern must be exactly 5 characters and contain only 0 or 1')
      return
    }

    if (!trimmedMessage) {
      alert('Message is required')
      return
    }

    const converted = convertPattern(trimmedPattern)
    console.log(trimmedPattern)
    console.log(converted)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fingerValues: converted,
          outputText: trimmedMessage,
        }),
      })

      let responseData = null
      try {
        responseData = await response.json()
      } catch {
        responseData = null
      }
      console.log(responseData)

      if (!response.ok) {
        throw new Error(responseData?.message || 'Failed to save gesture')
      }

      alert('Gesture saved')
      setPattern('')
      setMessage('')
      await fetchGestures()
    } catch (error) {
      console.error('Error saving gesture:', error)
    }
  }

  return (
    <div className="page edit-page">
      <div className="edit-page-head">
        <h1>Edit Gesture Mappings</h1>
      </div>

      <GlassCard className="edit-table-wrap">
        <h2>Add Mapping</h2>
        <div className="table-row" style={{ marginTop: '0.75rem' }}>
          <div>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Pattern (e.g. 01000)"
              maxLength={5}
            />
          </div>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
            />
          </div>
          <div className="table-actions">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="edit-table-wrap">
        <div className="edit-table">
          <div className="table-head">Pattern</div>
          <div className="table-head">Message</div>
          <div className="table-head">Created At</div>

          {gestures.map((gesture) => (
            <div key={gesture._id || `${gesture.fingerValues?.join('')}-${gesture.outputText}`} className="table-row">
              <div>
                <code>{Array.isArray(gesture.fingerValues) ? gesture.fingerValues.join('') : ''}</code>
              </div>
              <div>
                <span>{gesture.outputText}</span>
              </div>
              <div>
                <span>
                  {gesture.createdAt ? new Date(gesture.createdAt).toLocaleString() : '-'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export default EditGesture
