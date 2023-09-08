import React from 'react'

const ChartsBody = ({ ChartQuery }) => {
    console.log(ChartQuery.data)
  return (
    ChartQuery.isLoading ? 'Loading'
     : <div>
        
     </div>
  )
}
export default ChartsBody;