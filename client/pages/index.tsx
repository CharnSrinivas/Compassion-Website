import type { NextPage } from 'next';
import Banner from '../components/Banner';
const tagLines = [
  'Donate in crypto: Global donations made possible with Compassion',
  'Donate in crypto from around the world with compassion',
  'The first global crypto fundraiser platform in the world',
  'There is no small act of kindness',
  'Help is just a fundraiser away!',
  'Compassion is the greatest form of love humans have to offer'
]
const icon = <svg
  className="StartToday_start-today-arrow-desktop__zyt4_ hide-for-small-only"
  width={32}
  height={32}
  viewBox="0 0 32 32"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.869 8.9218C15.6224 9.16845 15.6224 9.56834 15.869 9.81499L21.4224 15.3684H9.06592C8.70968 15.3684 8.4209 15.6512 8.4209 16C8.4209 16.3488 8.70968 16.6316 9.06592 16.6316H21.4224L15.869 22.185C15.6224 22.4316 15.6224 22.8315 15.869 23.0781C16.1157 23.3248 16.5156 23.3248 16.7622 23.0781L23.3938 16.4466C23.5094 16.331 23.5708 16.1817 23.5781 16.0303C23.5786 16.0202 23.5788 16.0101 23.5788 16C23.5788 15.9898 23.5785 15.9795 23.5781 15.9693C23.5708 15.8181 23.5093 15.6689 23.3938 15.5534L16.7622 8.9218C16.5156 8.67515 16.1157 8.67515 15.869 8.9218Z"
    fill="#333333"
  />
  <circle cx={16} cy={16} r="15.5" stroke="#333333" />
</svg>

const Home: NextPage = () => {
  return (
    <div >
      <Banner />
      <section id='hero' className="text-gray-600 body-font min-h-screen w-full bg-center bg-cover relative" style={{
        backgroundImage: "url('/assets/bg-2.jpg')"
      }}>
        <div className='top-0 bottom-0 left-0 right-0 absolute bg-black bg-opacity-25'></div>
        <div
          className="container px-5 py-12 mx-auto  flex flex-col items-center justify-center min-h-screen"
        >
          <h3 className='  text-white z-20 text-2xl lg:text-5xl  ' style={{
            letterSpacing: "0.6px",
          }}>{tagLines[Math.floor(Math.random() * tagLines.length)]}</h3>
          <a href='/create/fundraiser/details' className='w-fit px-5 py-4   text-xl  mt-10 rounded-full text-white z-20 bg-[#32a95c]'>
            <p>
              Start a Fundraiser!
            </p>
          </a>
        </div>
      </section>
      <hr />
      <section className='w-[95%] lg:w-[60%] py-8 flex flex-col mx-auto my-8' >
        <h1 style={{ lineHeight: "3rem" }} className=' font-semibold text-gray-700 text-4xl lg:w-[60%] '>Fundraising on Compassion Is A Piece of Cake</h1>
        <div className="container px-0 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                  <p className='font-medium'>1</p>
                </div>
                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">Introduce Yourself</h2>
                <p className="leading-relaxed text-base">
                  Share your name, location, and some basic information about yourself.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                  <p className='font-medium'>2</p>
                </div>
                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">
                  Tell Your Story
                </h2>
                <p className="leading-relaxed text-base">
                  We’ll help you tell your story to the world with special tips and tricks to help you along the way.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                  <p className='font-medium'>3</p>
                </div>
                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">
                  Share Your Story
                </h2>
                <p className="leading-relaxed text-base">Share your fundraiser with your friends, family, and all the people in the world who want to help you. </p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <hr />
      <section className='w-[95%] lg:w-[60%] py-8 flex-col mx-auto gap-6 ' >
        <div className='mb-20 px-10 lg:px-0'>
          <h1 className='font-semibold text-4xl text-gray-600 my-3'>We are here for you</h1>
          <h2 className='font-medium text-2xl text-green-600 my-3'>Trust and Safety Is Our Responsibility</h2>
          <p className='text-gray-500'>Making donations in crypto is the safest way to strengthen others’ lives. It’s faster, safer, and a lot more trustworthy. With our whole global team committed to maintaining trust and safety, you’ve got nothing to worry about. </p>
        </div>
        <div className='flex-col  flex lg:flex-row my-8 items-center w-full'>
          <div>
            <p className='font-medium text-gray-500'>Make a difference</p>
            <h2 className='my-3 font-semibold text-4xl text-gray-600'> Fundraise for...</h2>
          </div>
          <div className='lg:flex-row  flex items-center gap-3 flex-col'>
            <a href='/create/fundraiser/details' className='bg-gray-100 rounded-lg px-12 py-6 ml-7 hover:shadow-lg flex flex-col items-center' >
              <img loading='lazy' className='w-[10rem]' src="/assets/start-yourself.png" alt="start yourself" />
              <h2 className='my-3 font-medium text-center'>Yourself</h2>
              {icon}
            </a>
            <a href='/create/fundraiser/details' className='bg-gray-100 rounded-lg px-12 py-6 ml-7 hover:shadow-lg flex flex-col items-center' >
              <img loading='lazy' className='w-[10rem]' src="/assets/start-friends-family.png" alt="start with friends and family" />
              <h2 className='my-3 font-medium text-center'>Friends & Family</h2>
              {icon}
            </a>
            <a href='/create/fundraiser/details' className='bg-gray-100 rounded-lg px-12 py-6 ml-7 hover:shadow-lg flex flex-col items-center' >
              <img loading='lazy' className='w-[10rem]' src="/assets/start-charity.png" alt="start charity" />
              <h2 className='my-3 font-medium text-center'>Charity</h2>
              {icon}
            </a>
          </div>
        </div>
      </section>
      <div className=' w-full bg-[#fbf8f6] py-10'>
        <h1 className='font-semibold  text-center text-3xl text-gray-700'>Get crypto donations from around the world. Start your fundraiser today!</h1>
        <div className='flex flex-col lg:flex-row  mx-auto justify-center gap-5 my-8 items-center'>
          <a href="/create/fundraiser/details"
            className="block px-4  ml-2 py-2 rounded text-white mt-4 lg:mt-0 bg-[#32a95c] ">
            Start a Fundraiser
          </a>
          <a href="/info/how-it-works" className='text-[#32a95c]'>
            How it works
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home;