import { useState } from 'react'
import GlassCard from '../components/GlassCard'

const initialMappings = [
  { id: 1, pattern: '01000', message: 'Hello' },
  { id: 2, pattern: '11100', message: 'I need water' },
  { id: 3, pattern: '00111', message: 'Thank you' },
]

function EditGesture() {
  const [mappings, setMappings] = useState(initialMappings)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ pattern: '', message: '' })

  const startEdit = (row) => {
    setEditingId(row.id)
    setDraft({ pattern: row.pattern, message: row.message })
  }

  const saveEdit = (id) => {
    setMappings((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, pattern: draft.pattern.trim(), message: draft.message.trim() } : row,
      ),
    )
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft({ pattern: '', message: '' })
  }

  return (
    <div className="page edit-page">
      <h1>Edit Gesture Mappings</h1>
      <GlassCard className="edit-table-wrap">
        <div className="edit-table">
          <div className="table-head">Flex Sensor Pattern</div>
          <div className="table-head">Message</div>
          <div className="table-head">Actions</div>

          {mappings.map((row) => {
            const isEditing = editingId === row.id
            return (
              <div key={row.id} className="table-row">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={draft.pattern}
                      onChange={(e) => setDraft((prev) => ({ ...prev, pattern: e.target.value }))}
                    />
                  ) : (
                    <code>{row.pattern}</code>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={draft.message}
                      onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  ) : (
                    <span>{row.message}</span>
                  )}
                </div>
                <div className="table-actions">
                  {isEditing ? (
                    <>
                      <button type="button" className="btn btn-save" onClick={() => saveEdit(row.id)}>
                        Save
                      </button>
                      <button type="button" className="btn btn-cancel" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-secondary" onClick={() => startEdit(row)}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>
    </div>
  )
}

export default EditGesture
