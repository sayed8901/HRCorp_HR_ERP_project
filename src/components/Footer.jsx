const Footer = () => {
    return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Need support ? Call <span className="text-red-500">16427</span> to
                get in touch.
              </h2>
              <p className="mt-4 text-md leading-8 text-gray-300">
                Our Contact Centre is available from 9 am to 8 pm (Saturday to
                Thursday).
              </p>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <dt className="font-semibold text-white">Job Seeker</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Job seeker can find their next suitable jobs by applying
                  through our site.
                </dd>
                <dd className="mt-2 leading-7 text-gray-400">Good luck !</dd>
              </div>
              <div className="flex flex-col items-start">
                <dt className="font-semibold text-white">Employer</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Employer can search & select perfect candidate for their
                  organization.
                </dd>
                <dd className="mt-2 leading-7 text-gray-400">
                  Thanks for being with us !
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
};

export default Footer;