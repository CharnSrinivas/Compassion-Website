import type { NextPage } from 'next'



const Home: NextPage = () => {
  return (
    <div >
      <section id='hero' className="text-gray-600 body-font min-h-screen w-full bg-center bg-cover relative" style={{
        backgroundImage: "url('/assets/bg-2.jpg')"
      }}>
        <div className='top-0 bottom-0 left-0 right-0 absolute bg-black bg-opacity-25'></div>
        <div
          className="container px-5 py-12 mx-auto  flex flex-col items-center justify-center min-h-screen"
        >
          <h3 className='  text-white z-20 text-2xl lg:text-5xl  ' style={{
            letterSpacing: "0.6px",
          }}>Compassion is the greatest form of love humans have to offer</h3>
          <a href='/create/fundraiser/details' className='w-fit px-5 py-4   text-xl  mt-10 rounded-full text-white z-20 bg-[#32a95c]'>
            <p>
              Start a Fundraiser!
            </p>
          </a>
        </div>
      </section>
      <hr />
      <section className='w-[95%] lg:w-[60%] py-8 flex flex-col mx-auto my-8' >
        <h1 style={{ lineHeight: "3rem" }} className=' font-semibold text-gray-700 text-4xl lg:w-[60%] '>Fundraising on Compassion takes just a few minutes</h1>
        <div className="container px-0 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                  <p className='font-medium'>1</p>
                </div>
                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">Start with the basics</h2>
                <p className="leading-relaxed text-base">
                  Kick things off with your name and location.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                  <p className='font-medium'>2</p>
                </div>
                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">
                  Craft your story
                </h2>
                <p className="leading-relaxed text-base">We'll guide you with tips along the way.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                  <p className='font-medium'>3</p>
                </div>
                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">
                  Share with friends and family
                </h2>
                <p className="leading-relaxed text-base">People out there want to help you.</p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <hr />
      <section className='w-[95%] lg:w-[60%] py-8 flex gap-6 flex-col  lg:flex-row mx-auto my-8 items-center' >
        <header>
          <p className='font-medium text-gray-500'>Make a difference</p>
          <h2 className='my-3 font-semibold text-4xl text-gray-600'> Fundraise for...</h2>
        </header>
        <div className='lg:flex-row  flex items-center gap-3 flex-col'>
          <a href='/create/fundraiser/details' className='bg-gray-100 rounded-lg p-5 ml-7 hover:shadow-lg' >
            <img loading='lazy' src="/assets/start-yourself.png" alt="start yourself" />
            <h2 className='my-3 font-medium text-center'>Yourself</h2>
          </a>
          <a href='/create/fundraiser/details' className='bg-gray-100 rounded-lg p-5 ml-7 hover:shadow-lg' >
            <img loading='lazy' src="/assets/start-friends-family.png" alt="start with friends and family" />
            <h2 className='my-3 font-medium text-center'>Friends & Family</h2>
          </a>
          <a href='/create/fundraiser/details' className='bg-gray-100 rounded-lg p-5 ml-7 hover:shadow-lg' >
            <img loading='lazy' src="/assets/start-charity.png" alt="start charity" />
            <h2 className='my-3 font-medium text-center'>Yourself</h2>
          </a>
        </div>
      </section>

    </div>
  )
}

export default Home;