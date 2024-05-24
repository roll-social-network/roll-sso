const TraceError = ({ error }: { error: Object }) => {
  return (
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}

export default TraceError
