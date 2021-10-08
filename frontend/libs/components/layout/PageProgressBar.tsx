import NextNProgress from 'nextjs-progressbar'

export const PageProgressBar: React.FC = () => {
  return (
    <NextNProgress
      options={{
        showSpinner: false,
      }}
    />
  )
}
