import React from 'react';
import HeadingImage from '~components/HeadingImage';

function Environment() {
  return (
    <div>
      <div className="Layout Layout--sidebar-left">
        <div>
          <aside>
            <div className="ContentCard">
              If you would like to find out more about the Students' Union's
              ethical and environmental work, or if you have any suggestions or
              information that might be useful please contact our Environmental
              Assistant at{' '}
              <a href="environment@sussexstudent.com">
                environment@sussexstudent.com
              </a>
              .
              <p>
                See what we are doing about feedback:{' '}
                <a
                  className="Button"
                  href="/about-us/ethics-environment/feedback/"
                >
                  Student Feedback
                </a>
              </p>
            </div>
          </aside>
        </div>
        <div>
          <HeadingImage
            title="Environment"
            imageURL="/pageassets/about-us/ethics-environment/planter.jpg"
          />
          <div className="ContentCard">
            <h2 className="Heading Heading--highlight">
              Sussex SU Sustainability Hub
            </h2>
            <p>
              Many students within the University of Sussex are concerned about
              environmental issues, whether it is about energy usage, food
              and/or clothing waste, recycling, ethical consumption or
              protecting the biodiversity on campus.
            </p>
            <p>
              Do you have an idea for planning, running and leading a project,
              initiative or campaign on environmental sustainability? Or maybe
              you would just like to be involved? The Students’ Union are always
              keen to hear from students so that we can support you to drive
              positive change.
            </p>
            <p>
              Here, you can find out how, as a Sussex student, you can get
              involved with a range of sustainability projects which are
              currently running across campus and how the SU are also
              championing Environmental issues.
            </p>
          </div>
          <div className="ContentCard">
            <h2 className="Heading Heading--highlight">Green Impact</h2>
            <p>
              Each year we take part in the NUS Green Impact scheme in order to
              help monitor and reduce our negative and increase our positive
              environmental impact. The Green Impact ‘toolkit’ provides
              Students’ Union’s with a set of criteria to work towards which is
              ensuring operations are maintained and improved, Environmental
              Sustainability is embedded in the Union’s ethos and helping to
              engage and bring together students and staff to collaborate on
              bringing about a just and sustainable future.
            </p>
            <p>
              Some of the things we have been, and are focusing on include:
              monitoring our carbon footprint, reducing food waste in our bars,
              identifying sustainability within the curriculum, referencing
              sustainability in the job descriptions of all new staff and
              encouraging ethical and environmental purchase choices.
            </p>
            <p>
              Union staff and officers are encouraging students to be more
              involved in this process so if you have any opinions, input and/or
              campaign suggestions to include in the process please contact our
              Environmental Assistant{' '}
              <a href="mailto:sian.w@sussexstudent.com">
                sian.w@sussexstudent.com
              </a>
            </p>
          </div>
          <div className="ContentCard">
            <h2 className="Heading Heading--highlight">The Free Shop</h2>
            <p>
              At the end of the summer term when students move out of on-campus
              University managed accommodation, we work with{' '}
              <a href="http://www.sussex.ac.uk/sef/">Sussex Estates</a> and
              Facilities to collect unwanted items. Some items, including food
              are distributed to local charities such as{' '}
              <a href="http://faresharesussex.org.uk/about-us/">
                Farshare Sussex
              </a>{' '}
              and{' '}
              <a href="https://www.bht.org.uk/services/first-base-day-centre/">
                First Base
              </a>
              . The rest of the items are sorted and cleaned for students to
              collect in Freshers Week, helping you to kit-out your kitchen and
              organise your bedroom. This helps to avoid many good items being
              sent to landfill.
            </p>
            <p>
              The Free Shop is open all year around, located outside of Meeting
              Room 1 in Falmer House so if you have any items you would like to
              pass on or want to see if there is anything that might take your
              fancy then do drop-by and take a look.
            </p>
            <p>
              For the year-round Free Shop: Accepted items include books,
              stationery, household items, clean kitchenware (no sharp knives)
              and clothing We cannot accept electrical items and food.
            </p>
          </div>
          <div className="ContentCard">
            <h2 className="Heading Heading--highlight">
              Food Waste Cafe on Campus
            </h2>
            <p>
              Sarah, the Students’ Union’s Society & Citizenship Officer as part
              of her manifesto is setting-up and running a Food Waste Cafe on
              campus along with students.
            </p>
            <p>
              The aim of the project is to use food collected from around our
              campus, and with the help of the{' '}
              <a href="http://www.realjunkfoodbrighton.co.uk/">
                Real Junk Food Project
              </a>
              , to create a delicious menu for everyone to enjoy. For a while
              you’ll find the café in a pop up van on campus, so keep your eyes
              peeled!
            </p>
            <p>
              Reasons for the cafe: Around a third of the food produced globally
              is wasted. At the same time, it is estimated that there are 795
              million people who do not get enough to eat. In the UK alone,
              there are 2 million people estimated to be malnourished, and yet
              there is 15 million tonnes of food waste each year.
            </p>
            <p>
              Keep updated and get involved on the{' '}
              <a href="https://www.facebook.com/groups/1768297243430232/">
                Facebook Group
              </a>
            </p>
            <p>
              You can get directly contact Sarah @{' '}
              <a href="mailto:soccit@sussexstudent.com">
                soccit@sussexstudent.com
              </a>
            </p>
            <p>
              You can also read Sarah’s{' '}
              <a href="/about-us/full-time-elected-officers/society-citizenship/">
                manifesto
              </a>{' '}
              to find about her other environmental ideas and initiatives across
              the University.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Environment;
