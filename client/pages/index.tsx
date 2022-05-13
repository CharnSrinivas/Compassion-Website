import type { NextPage } from 'next'

const tag_lines = ['Be Their Happiness.', 'Share And Stay Blessed.', 'Your Time Can Move Mountains.', 'Come And Make Them Smile.']

const Home: NextPage = () => {
  return (
    <div >
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {tag_lines[Math.floor(Math.random() * tag_lines.length)]}
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam qui minus explicabo,
              porro itaque asperiores nam veritatis facilis accusamus recusandae. Aspernatur delectus magnam dolorem aperiam nemo neque blanditiis fugiat accusamus!
            </p>
            <div className="flex justify-center">
              <a href='/create/details' className="inline-flex text-white bg-primary text-[#ffff] border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded text-lg">
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
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
