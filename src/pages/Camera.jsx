import { useEffect, useRef, useState } from 'react'
import GlassCard from '../components/GlassCard'

function Camera() {
  const videoRef = useRef(null)
  const [cameraError, setCameraError] = useState('')
  const [corrected, setCorrected] = useState(false)

  useEffect(() => {
    let stream

    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch {
        setCameraError('Unable to access webcam. Please allow camera permission.')
      }
    }

    initCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="page camera-page">
      <GlassCard className="camera-card">
        <h2>Live Camera Feed</h2>
        <div className="camera-frame">
          <video ref={videoRef} autoPlay playsInline muted />
          {cameraError ? <p className="camera-error">{cameraError}</p> : null}
        </div>
        <p className="camera-result">Detected: bello</p>
        {corrected ? <p className="camera-result corrected">Corrected: hello</p> : null}
        <div className="camera-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setCorrected(true)}>
            Correct using AI
          </button>
          <button type="button" className="btn btn-primary">
            Speak Output
          </button>
        </div>
      </GlassCard>
    </div>
  )
}

export default Camera
