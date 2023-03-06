import { useEffect, useState } from 'react'
import mermaid from 'mermaid'

const mermaidText = `
graph TD 
A[Client] --> B[Load Balancer] 
B --> C[Server01] 
B --> D[Server02]
`

const App = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
  }, [])

  return (
    <div className='App'>
      <div>
        <a href='https://reactjs.org' target='_blank' />
        <pre className='mermaid'>{mermaidText}</pre>
      </div>
    </div>
  )
}

export default App
