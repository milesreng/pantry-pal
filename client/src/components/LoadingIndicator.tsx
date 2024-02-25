/* eslint-disable react/react-in-jsx-scope */

const LoadingIndicator = () => {
  return (
    <div className='w-full h-screen flex mt-[-24px]'>
      <div
        className="inline-block mx-auto my-auto h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
    </div>
  )
}

export default LoadingIndicator