export default function reportError(error) {
  let errorReport = {
    error,
    reportedAt: new Date()
      .toLocaleTimeString()
  }

  if (error.trace)
    errorReport.trace = error.trace

  console.error(error)
  console.trace(
    "ERROR!", JSON.stringify(errorReport, null, 2)
  )
}
