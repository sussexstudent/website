import React from 'react';
import { Link } from 'react-router-dom';
import LogoContentPage from '../LogoContentPage.svg';

function FreshersWhatsOn() {
  return (
    <div>
      <Link to="/">
        <img
          className="FreshersLogoHeader"
          src={LogoContentPage}
          alt="Freshers Week 2017"
        />
      </Link>
      <h1 className="FreshersHeading">{`Guides`}</h1>
      <h2 className="FreshersHeading">{`13 Top Tips for Being a Student at Sussex`}</h2>
      <div className="FreshersGrid--1">
        <div className="FreshersBox">
          <h2>1. Manage your money</h2>
          <p
          >{`Ideally, you want to avoid spending your entire term’s student loan in the first week, so it’s a good idea to keep a budget. Work out how much money you will get from student loans and any university grants and then plan out what you can spend each week.`}</p>
          <p>
            The{' '}
            <a href="http://www.sussex.ac.uk/studentlifecentre/">
              Student Life Centre
            </a>{' '}
            has has tools and tips on budgeting and you can find part-time jobs
            through the Careers and Employability Centre. We are also{' '}
            <a href="https://www.sussexstudent.com/about-us/jobs/">
              recruiting staff for our shops and bars
            </a>
            {` - if
            you're interested`}{' '}
            in joining our team, you can apply online from September 5th.
          </p>
          <p
          >{`If you do decide to start a job while at university, it’s advised that you don’t do more than 15 hours of work per week. Any more than this and you may find it difficult to keep on top of your academic commitments.`}</p>
        </div>
        <div className="FreshersBox">
          <h2>2. Decide what to bring</h2>
          <p
          >{`Before you raid the shelves of your local shops for things to bring, find out what your accommodation provides for you. Most on-campus accommodation will have a kettle, toaster and vacuum for the whole flat, so you won’t need to buy your own!`}</p>
          <p
          >{`You can also save yourself some money and the environment by visiting the Free Shop once you arrive, where you can find lots of useful items like kitchenware, second-hand textbooks and stationery you can have for free.
`}</p>
        </div>
        <div className="FreshersBox">
          <h2>3. Stay safe and healthy</h2>
          <p>
            It may be your first time living away from home, so it is important
            to make sure that you keep yourself healthy. Keep active by getting
            involved with sport at Sussex, such as the{' '}
            <a href="http://www.sussex.ac.uk/sport/facilities/falmersportscomplex">
              on-campus gym
            </a>, the{' '}
            <a href="https://www.sussexstudent.com/sport-societies-media/sports-club-societies-list/">
              various different sports clubs
            </a>{' '}
            in the{` Students’ Union `}and regular events by{' '}
            <a href="http://www.sussex.ac.uk/sport/students/activeus">
              Active US
            </a>.
          </p>
          <p>
            Before you come down with the dreaded{` Freshers’ flu`}, it’s a good
            idea to sign up at{' '}
            <a href="http://www.unisussexhc.nhs.uk/">
              on-campus Health Centre
            </a>{' '}
            near East Slope Bar as soon as possible. You can{' '}
            <a href="https://www-unisussexhc-nhs-uk.cgi-data.com/webform/6271453.cgi">
              register online
            </a>{' '}
            - it only takes five minutes. If you need medical advice but the
            surgery is closed, call 111 or check the NHS symptom checker.
          </p>
        </div>{' '}
        <div className="FreshersBox">
          <h2>4. Know your limits</h2>
          <p>
            If you are going out drinking, know your limits. Always drink in
            moderation and don’t binge. Alternate between alcoholic and
            non-alcoholic beverages throughout the night. For more information,
            visit drinkaware.
          </p>
          <p>
            Do not leave your drink unattended. Do not drink any drinks that
            have been left unattended or that you didn’t see poured. Cover the
            top of a bottle with your thumb when it is away from your mouth.
          </p>
        </div>{' '}
        <div className="FreshersBox">
          <h2>5. Keep yourself and your stuff safe</h2>
          <p>
            Make sure you keep your valuables, such as your phone and wallet,
            secure by keeping them with you or using the cloakroom when you go
            out.
          </p>
          <p>
            Make sure you and your new friends stick together and look out for
            each other - do not travel home alone. Night buses run regularly to
            and from campus. Taxi services also run - make sure you use a
            licensed taxi. We recommend City Cabs (01273 205205).
          </p>
          <p>
            The {`Students’ Union`} also runs a{' '}
            <a href="https://www.sussexstudent.com/news/article/support/taxi-scheme-launched/">
              Take Care Taxi Scheme
            </a>{' '}
            with City Cabs to make sure everyone gets home safe. If you have
            lost your debit card, don’t have cash or feel unsafe heading home,
            call 01273 555555 to book a taxi home, quoting the ‘Sussex Students’
            Union Take Care scheme’. Show the driver your student card, take
            your receipt at the end of the journey and pay the fare at the
            Reception in Falmer House the following day.
          </p>
          <p>
            If you have sex, make sure you use protection to prevent pregnancy
            and catching STIs. For information about drugs and local support
            services, visit sussedaboutdrugs.com
          </p>
        </div>
        <div className="FreshersBox">
          <h2>6. Put important numbers in your phone</h2>
          <p>
            In an emergency on campus, call the University’s Security team on
            01273 873333 or visit York House. In an emergency off-campus, call
            the emergency services on 999.
          </p>
          <p>
            If you wish to report a non-emergency incident to Sussex Police,
            call 0845 6070 999.
          </p>
        </div>
        <div className="FreshersBox">
          <h2>7. Register with the Student Support Unit</h2>
          <p>
            If you are a current or prospective student with a long-term
            physical or mental health condition, the Student Support Unit can
            provide help, advice and arrange dedicated support.
          </p>
          <p>
            The Student Support Unit have specialist staff to advise you and are
            experts in their field. Everything you tell them is completely
            confidential and they can help provide reasonable adjustments to
            your course.
          </p>
          <p>
            Signing up with the Student Support Unit will help you get the most
            out of your education - 80%* of students with a registered
            disability achieved at least a 2:i in their degree last year.
          </p>
        </div>
        <div className="FreshersBox">
          <h2>8. Work out how to get around Brighton</h2>
          <p>
            Public transport is a great way to get way to travel in and around
            Brighton, with links by bus and train to and from campus, as well as
            many cycle lanes.
          </p>
          <p>
            Cycling is an easy way to get around in Brighton, but there are many
            hills, so test your brakes. It’s also worth getting a decent lock
            for your two-wheeled friend
          </p>
          <p>
            Brighton and Hove Buses run regular services to town from campus;
            the 23 goes to Brighton Marina and the 25 to central Brighton. They
            also run the N25 night bus. Student tickets are available and you
            can buy saver tickets from most newsagents and the Union shop. There
            is also an app where you can purchase tickets, which are often
            cheaper than paper tickets. A bus from Falmer station to Old Steine
            (central Brighton) takes about 20-25 minutes.
          </p>
          <p>
            Campus is a short walk away from Falmer station (near Stanmer
            Court). Tickets, especially for travel further afield, is often
            cheaper with a 16-25 Railcard, but it can’t be used before 10am. You
            can also by a Unizone ticket for unlimited travel in and around
            Brighton. Trains run four times an hour in both directions and a
            trip from Falmer station to Brighton takes nine minutes. There is no
            night service for travelling by train.
          </p>
          <p>
            Taxis operate across Brighton. Several taxi ranks are present in
            town, including at Brighton station and also in the city centre.
            City Cabs (01273 205205) offer a student ‘fare deal’ discount, with
            a trip from the seafront to campus costing £12. Just remember to say
            you are student when booking the taxi.
          </p>
          <p>
            Driving in Brighton can often be more hassle than it’s worth, with
            limited parking at many places, so ditch the car and use public
            transport instead!
          </p>
        </div>
        <div className="FreshersBox">
          <h2>9. Get set up for student discounts</h2>
          <p>
            One of the perks of being a student (other than coming away with a
            degree at the end) is the student discounts, so start making the
            most of them now! Your student card will grant you access to lots of
            them, but you can take advantage of many more with an NUS Extra card
            for only £12. You can buy these online or from Falmer House.
          </p>
        </div>
        <div className="FreshersBox">
          <h2>10. Join sports clubs and societies</h2>
          <p>
            There’s lots of opportunities to get involved at Sussex, whether you
            want to try something new or get involved in something you are
            already into. From Pokemon Go to Poker, Hockey to Harry Potter,
            there is bound to be something for you! Visit the Freshers’ Fair and
            you’ll discover all the clubs and societies available. If you don’t
            find what you’re looking for, it is really easy to set up your own
            society with the Union’s help.
          </p>
        </div>
        <div className="FreshersBox">
          <h2>11. Get to know the University and the local area</h2>
          <p>
            You are going to be living in and around University for your degree,
            so why not explore what Brighton and Sussex has to offer?!
          </p>
          <p>
            A good way to get to know the University is the Buddy Scheme. Once
            you sign up, the Union will match you with a current student with
            similar interests and they will be your guide to living and studying
            here.
          </p>
          <p>
            On arrival, one of your first tasks will be to get food.
            Fortunately, there is a Co-operative supermarket on campus, co-run
            by the Students’ Union, and also a weekly market every Tuesday by
            Falmer House for you to buy fresh fruit and vegetables.
          </p>
          <p>
            There are also many other places in town to shop for food:
            <ul>
              <li>
                Brighton Open Market (local food - off London Road, by The
                Level)
              </li>
              <li>Infinity Foods (vegetarian, organic - 25 North Road)</li>
              <li>
                ASDA (supermarket - Carden Avenue, Hollingbury and Brighton
                Marina)
              </li>
              <li>Sainsburys (supermarket - Vogue Gyratory, Lewes Road)</li>
              <li>Aldi (discount supermarket - 1-4 London Road)</li>
              <li>Waitrose (supermarket - 130-134 Western Road)</li>
            </ul>
          </p>
          <p>
            And if you don’t fancy a trip to the shops, almost all supermarkets
            have a delivery service, where you can order your groceries online
            and get them sent to your door.
          </p>
        </div>
        <div className="FreshersBox">
          <h2>{`12. Buy your Freshers’ tickets`}</h2>
          <p>
            Buy your tickets for all the great events for Freshers’ Week before
            they sell out and so you can have more time for fun when you arrive!
            Click here for more information.
          </p>
        </div>
        <div className="FreshersBox">
          <h2>13. Register to vote</h2>
          <p>
            Following a change to voter registration in 2015, students who live
            on-campus are not automatically registered to vote in elections.
            Make sure that you are ready by registering to vote at Sussex - it
            only takes five minutes!
          </p>
        </div>
      </div>
    </div>
  );
}

FreshersWhatsOn.propTypes = {};

export default FreshersWhatsOn;
