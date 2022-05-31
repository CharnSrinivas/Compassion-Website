import type { NextPage } from 'next'

const tag_lines = ['Be Their Happiness.', 'Share And Stay Blessed.', 'Your Time Can Move Mountains.', 'Come And Make Them Smile.']

const Home: NextPage = () => {
  return (
    <div >
      <section className="text-gray-600 body-font min-h-screen w-full bg-center bg-cover relative" style={{
        backgroundImage: "url('/assets/bg-2.jpg')"
      }}>
        <div className='top-0 bottom-0 left-0 right-0 absolute bg-black bg-opacity-25'></div>
        <div className="container px-5 py-12 mx-auto  flex flex-col items-center justify-center min-h-screen bg"
        >
          <h3 className='  text-white z-20 text-2xl lg:text-5xl  ' style={{
            letterSpacing: "0.6px",
          }}>Compassion is the greatest form of love humans have to offer</h3>
          {/* <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {tag_lines[Math.floor(Math.random() * tag_lines.length)]}
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam qui minus explicabo,
              porro itaque asperiores nam veritatis facilis accusamus recusandae. Aspernatur delectus magnam dolorem aperiam nemo neque blanditiis fugiat accusamus!
            </p>
            <div className="flex justify-center">
              <a href='/create/fundraiser/details' className="inline-flex text-white bg-primary text-[#ffff] border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded text-lg">
                Start Fundraising
              </a>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-contain object-center rounded-md"
              alt="hero"
              src={`/assets/${Math.floor((Math.random() * (4 - 1) + 1))}.jpg`}
            />
          </div> */}
          <a href='/create/fundraiser/details' className='w-fit px-5 py-4   text-xl  mt-10 rounded-full text-white z-20 bg-[#32a95c]'>
            <p>
              Start a Fundraiser!
            </p>
          </a>

        </div>
      </section>
      <hr />
    </div>
  )
}

export default Home;