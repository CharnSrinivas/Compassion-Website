import React from 'react'


export default function WebsiteAccessibility() {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className=" w-full lg:pr-28 lg:py-6 mb-6 lg:mb-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                        Compassion
                    </h2>
                    <h1 className="text-gray-800 text-3xl title-font font-medium mb-4">
                        Website Accessibility
                    </h1>
                    <div className='flex flex-col items-start gap-6 text-gray-600 text-md'>
                        <p>
                            Everyone should have access to and enjoyment of the internet, and we're committed to making that a reality.
                        </p>
                        <p>
                            Compassion Crypto Pty Ltd is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                        </p>
                        <p>
                            The <b>Web Content Accessibility Guidelines (WCAG)</b> defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. COMPASSION CRYPTO PTY LTD is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
                        </p>
                        <p>
                            How we meet WCAG standards
                            <br />
                            To make sure that our website is compliant with accessibility standards, our templates:
                        </p>
                        <ul className='mt-3 list-disc  ml-10'>
                            <li> Use valid HTML and CSS.</li>
                            <li> Let users change aspects of the site's appearance to improve their own experience.</li>
                            <li> Are easy to navigate no matter the input device or method.</li>
                            <li> Have a logical content structure and a clear information hierarchy.</li>
                            <li> Have layouts that adapt to different screen sizes without loss of functionality or usability.</li>
                            <li> Provide sufficient color contrast between background and foreground items.</li>
                            <li> Provide alternative text descriptions for non-text elements such as images.</li>
                        </ul>
                        <p>
                            Most of our content meets WCAG 2.1 AA guidelines. We have, however, identified some instances where this is not the case.
                        </p>
                        <p>
                            We welcome your feedback on the accessibility of website. Please let us know if you encounter accessibility barriers on website.
                        </p>
                    </div>
                    <div className='flex flex-col items-start  mt-8 '>
                        <h2 className="text-gray-700 text-xl title-font font-medium mb-4">
                            Contacting us
                        </h2>
                        <p>
                            If you would like to contact us to understand more about website accessibility, you may do so via the contact us or email us.
                        </p>
                        <p>
                            This document was last updated on August 3, 2022
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}