import { useEffect, useRef, useState } from 'react'
import GlassCard from '../components/GlassCard'

function Camera() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [cameraError, setCameraError] = useState('')
  const [detectedText, setDetectedText] = useState('No gesture')

  const [word, setWord] = useState('')
  const [isCameraOn, setIsCameraOn] = useState(false)

  // 🔥 useRef for stable logic (no async bugs)
  const lastGestureRef = useRef('')
  const stableCountRef = useRef(0)
  const lastAddedRef = useRef('')
  const lastAddTimeRef = useRef(0)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraError('')
      setIsCameraOn(true)
    } catch {
      setCameraError('Camera permission denied')
      setIsCameraOn(false)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setIsCameraOn(false)
  }

  useEffect(() => {
    return () => stopCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 🔁 Loop
  useEffect(() => {
    if (!isCameraOn) return

    const interval = setInterval(() => {
      captureAndSend()
    }, 500)

    return () => clearInterval(interval)
  }, [isCameraOn])

  const captureAndSend = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas || video.videoWidth === 0) return

    const ctx = canvas.getContext('2d')

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    const image = canvas.toDataURL('image/jpeg')

    fetch('http://localhost:5001/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image }),
    })
      .then((res) => res.json())
      .then((data) => {
        const gesture = data.gesture
        setDetectedText(gesture)

        // stability
        if (gesture === lastGestureRef.current) {
          stableCountRef.current++
        } else {
          lastGestureRef.current = gesture
          stableCountRef.current = 1
        }

        const now = Date.now()

        // 🔥 AUTO ADD (fixed)
        if (
          stableCountRef.current >= 1 &&
          gesture !== 'No gesture' &&
          gesture !== lastAddedRef.current &&
          now - lastAddTimeRef.current > 1000
        ) {
          setWord((prev) => prev + gesture)
          lastAddedRef.current = gesture
          lastAddTimeRef.current = now
        }
      })
      .catch(console.error)
  }

  // ➕ Add same letter
  const addLetter = () => {
    if (detectedText !== 'No gesture') {
      setWord((prev) => prev + detectedText)
      lastAddedRef.current = detectedText
      lastAddTimeRef.current = Date.now()
    }
  }

  // 🔙 Backspace
  const backspace = () => {
    setWord((prev) => prev.slice(0, -1))
    lastAddedRef.current = ''
  }

  // ❌ Clear
  const clearWord = () => {
    setWord('')
    lastAddedRef.current = ''
  }

  // 🔊 Speak
  const speakWord = () => {
    if (!word) return
    speechSynthesis.speak(new SpeechSynthesisUtterance(word))
  }

  return (
    <div className="page camera-page">
      <GlassCard className="camera-wrapper">
        <h2 className="camera-title">Live Camera Feed</h2>

        <div className="camera-controls">
          <button className="btn btn-primary" onClick={startCamera}>
            Start Camera
          </button>
          <button className="btn btn-secondary" onClick={stopCamera}>
            Stop Camera
          </button>
        </div>

        <div className="camera-frame">
          <video ref={videoRef} autoPlay playsInline muted />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {cameraError && <p className="camera-error">{cameraError}</p>}
        </div>

        <GlassCard className="camera-result-card">
          <p className="camera-result">Detected: {detectedText}</p>
        </GlassCard>

        <GlassCard className="camera-result-card">
          <p className="camera-result">Word: {word || '...'}</p>
        </GlassCard>

        <div className="camera-actions-row">
          <button className="btn btn-primary" onClick={addLetter}>
            Add Letter
          </button>
          <button className="btn btn-primary" onClick={backspace}>
            Backspace
          </button>
          <button className="btn btn-primary" onClick={speakWord}>
            Speak Word
          </button>
          <button className="btn btn-primary" onClick={clearWord}>
            Clear
          </button>
        </div>

        <div className="camera-ai-row">
          <button className="btn btn-primary camera-ai-btn">Correct using AI</button>
        </div>
      </GlassCard>
    </div>
  )
}

export default Camera