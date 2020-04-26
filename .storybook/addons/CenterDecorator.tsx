import React from 'react'
export default function (stoireFn: Function) {
  const styles: React.CSSProperties = {
    textAlign: 'center'
  }
  return <div style={styles}>{stoireFn()}</div>
}