import React from 'react';
import Modal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';
import HydroLeaf from '~components/HydroLeaf';
import Image from '~components/Image';

class OfficerPlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      point: null,
    };
  }

  handleOpen(index) {
    this.setState({ point: index });
  }

  handleClose() {
    this.setState({ point: null });
  }

  render() {
    const props = this.props;
    return (
      <div
        className="AnnualPlan__slide"
        style={{
          padding: 15,
          minHeight: 100,
        }}
      >
        <div className="AnnualPlan__content">
          <ul className="AnnualPlan__points">
            {props.points.map((pointPair, index) => (
              <li>
                <h2 style={{ color: props.accent }}>
                  {pointPair[0]}

                  <button
                    onClick={this.handleOpen.bind(this, index)}
                    type="button"
                  >
                    More
                  </button>
                </h2>
              </li>
            ))}
          </ul>
          <div
            className="AnnualPlan__footer"
            style={{ backgroundColor: props.accentBackground }}
          >
            <Image
              className="AnnualPlan__footer-image"
              type="bg"
              src={props.image}
              customParams={{ sat: -100 }}
            />
            <div>
              <div>{props.name}</div>
              <div>{props.position}</div>
              <div style={{ color: props.accent }}>
                Run by students, for students
              </div>
            </div>
          </div>
        </div>
        <Image
          className="AnnualPlan__image"
          type="bg"
          src={props.image}
          customParams={{ sat: -100 }}
        />

        {this.state.point !== null ? (
          <Modal
            isOpen={this.state.point !== null}
            onRequestClose={this.handleClose.bind(this)}
            style={{ overlay: { zIndex: 400 } }}
          >
            <h2 style={{ color: props.accent }}>
              {props.points[this.state.point][0]}
            </h2>
            {props.points[this.state.point][1].map((p) => <p>{p}</p>)}

            <button
              className="Button"
              onClick={this.handleClose.bind(this)}
              type="button"
            >
              Close
            </button>
          </Modal>
        ) : null}
      </div>
    );
  }
}

function AnnualPlan() {
  return (
    <div className="AnnualPlan">
      <h1
        style={{ textTransform: 'uppercase' }}
      >{`Students' Union Annual Priorities`}</h1>
      <em>Swipe right to view the officers annual priorities</em>
      <SwipeableViews enableMouseEvents>
        <OfficerPlan
          name="Frida"
          position="President"
          points={[
            [
              'Books',
              [
                `We understand that the extra cost of education, including buying textbooks, is often too much for many students. That’s why we plan to set up an online platform for students to buy and sell second-hand textbooks, helping the environment, saving you money and meaning that your old textbooks don’t go to waste.`,
                `We are hoping to set up our new book resale website in the spring term, marking the launch with a literary event, and keep it active throughout the year.`,
              ],
            ],
            [
              'Buses',
              [
                `Getting to and from campus is a constant battle for students, with buses often packed full of people and with massive queues. The cost of travel has also continued to increase, adding on the increased pressure on students.`,
                `To improve services for students, we aim to lobby Brighton and Hove Buses by creating Union policy to make commuting easier and cheaper. We also plan to lobby the University to ensure there are more bike racks on campus and restart and support the Union’s Re:Cycle student groups, to encourage more people to cycle to and from university.`,
              ],
            ],
            [
              'Better union',
              [
                `We want to be more transparent about the work we do and reach out more to better represent the views of students. In the past, we have not been as clear about how our successes and achievements will benefit you so we want to make sure all students feel invested in the work we do.`,
                `We plan to introduce our new student feedback system, The Loop, into our work and enhance our ability to speak on behalf of students. We also aim to strengthen the connection and communication between our Student Reps and our Full-Time Officers, and make Union Council more accessible for the student community.`,
              ],
            ],
          ]}
          accent="#00509a"
          accentBackground="#99b9d7"
          image="/original_images/16664de397694b5ea5e194b0a1fa73dc"
        />
        <OfficerPlan
          name="Sarah"
          position="Posgraduate Education Officer"
          points={[
            [
              'Protestival',
              [
                `Sussex University has a long and proud history of protest and speaking out against injustice and, to celebrate 50 years of student activism, we plan on organising a three day event to enthuse both students and staff around the power of student activism.`,
                `As part of ‘Protestival’, we aim to organise an academic conference centred around student activism over the ages, book speakers and arrange gigs, and hold an alumni event for previous generations to reminisce about their time protesting injustice.`,
              ],
            ],
            [
              'Free Education',
              [
                `Increases in tuition fees over the last few years have put increasing pressure on students, with many concerned about how much they will have to pay back. The Students’ Union has long been a supporter of free education and we aim to take that commitment further by supporting the Degrees, Not Fees campaign.`,
                `As part of this, we plan to mobilise a student-led campaign around free education at Sussex, research different models where the abolition of tuition fees can work or has worked in the past, and build a national network of officers from different student unions to work towards the creation of a unified campaign to lobby the government.`,
              ],
            ],
            [
              'Postgrad Mental Health Support',
              [
                `Mental health is a major crisis facing those at university, with one in four students suffering from a mental health condition. Whilst undergraduates have access to a range of help and support, the help received by the postgraduate community is significantly more limited.`,
                `To address this, the Students’ Union aims to ensure postgraduates feel more emotionally supported and engaged at university by expanding the recruitment of postgraduate students in the Buddy Scheme and making sure mental health awareness training is provided to all frontline staff, with priority given to PhD supervisors and academics on misconduct panels.`,
              ],
            ],
          ]}
          accent="#d91b5c"
          accentBackground="#f0a4be"
          image="/original_images/f07caf2bb1114cb8a18dd49a6e9e1045"
        />
        <OfficerPlan
          name="Lulah"
          position="Undergraduate Education Officer"
          points={[
            [
              'Equality',
              [
                `The Union believes that everyone should have equal opportunities and equal access to services at Sussex. That’s why we want to make sure that the University’s policies, procedures and practices are based in law and best practice.`,
                `We plan to do this by implementing a Union Access Policy and lobby the University to create an Equality and Diversity unit and commit to long-term funding to cover costs previously met by the Disabled Students’ Allowance.`,
              ],
            ],
            [
              'Fair Assessment',
              [
                `We believe the University can go much further to ensure that students who suffer from difficulties during assessment periods are not disadvantaged as a result. The Union intends to campaign for an equitable assessment system that doesn’t punish students for circumstances affecting their capability to engage in academia.`,
                `To do this, we plan to lobby the University to put a disability expert on the Reasonable Adjustments Panel, to review the procedures used by students who require adjustments for their assessments or suffer exceptional circumstances, and to conduct a review of the automatic resit mode.`,
              ],
            ],
            [
              'International Student Support',
              [
                `Starting life at university can be difficult at the best of times, let alone for students who travel from across the world to study at Sussex. International students often experience issues not faced by students who have spent their life in the UK. That’s why we plan to identify these barriers to success and address them, to allow their time at Sussex to be as rewarding as possible.`,
                `To do this, we plan to secure funding for a part-time Mandarin translator for the Students’ Union, provide greater support for international students on housing and lobby the University to introduce better language support for international students.`,
              ],
            ],
          ]}
          accent="#f05d5a"
          accentBackground="#f9bebd"
          image="/original_images/241b436e49524d8da68faf1f1f83c4b6"
        />
        <OfficerPlan
          name="Aisling"
          position="Society and Citizenship Officer"
          points={[
            [
              "Brighton Tenant's Union",
              [
                `We want to make sure that students have the power to stand up for their rights in private housing and hold their landlords and lettings agents to account when things go wrong. That’s why we are creating a collective body of students from both Brighton and Sussex Universities, as well as members of the wider community in Brighton, to act as a tenants’ union and campaign on housing issues.`,
                `We plan to mobilise housing campaign groups in Brighton, Brighton Students’ Union, students at Sussex and tenants in Brighton to bring people together to form a tenants’ union, hold a workshop with ACORN (a national tenants’ union) to help set it up, and encourage students and tenants to sign up to empower them to stand up to their landlords and lettings agents.`,
              ],
            ],
            [
              'Food waste cafe',
              [
                `Our Food Waste Cafe that we launched last year was a great success and this year we want to make it even better. We plan to make the Food Waste Cafe into a permanent feature on campus that turns food waste into healthy meals served on a pay as you feel basis.`,
                `We aim to do this by identifying a permanent location where we can cook, store and serve food, find a sustainable model for it to operate and set up a food collection point on campus where people can donate food that would otherwise go to waste.`,
              ],
            ],
            [
              'Increase Community Volunteering opportunities',
              [
                `We want to make students feel empowered to get involved and volunteer in their local communities. Students have a lot to offer and we would like to challenge the negative perceptions some have around those who come to study at Sussex.`,
                `That’s why we plan to expand our volunteering schemes by learning more about what our current volunteers do for their communities, encourage other students to follow their example, and look at the opportunities in neighbourhoods in Brighton that volunteers from Sussex could help in.`,
              ],
            ],
          ]}
          accent="#f3b94f"
          accentBackground="#fae3b9"
          image="/original_images/8da8156f2e0e40b4878dcbea569ce2b5"
        />
        <OfficerPlan
          name="Lucy"
          position="Activities Officer"
          points={[
            [
              'Sports',
              [
                `We love that many of our students get involved with sport while at University, from representing Sussex at BUCS to taking part in activities with Active US. Because we want to make sure all our events are accessible to all, we want to do more to make sport at Sussex more accessible for students with disabilities. That’s why we want to create community wide partnerships with sporting groups across Brighton and Hove for disabled sport provision, as well as working towards making all activities at Sussex accessible for all.`,
                `We also want to make sure that our students have a number of opportunities to participate in competition. To make this happen, we will work closely with appropriate parties to build relationships and trust, give students the opportunities to take part at BUCS and host a Varsity-styled weekend, where alumni compete against current students. We hope that this will result in Varsity returning for students to enjoy in future years.`,
              ],
            ],
            [
              'Representation',
              [
                `We understand that some students don’t know how the work that we do is relevant to their life at University and feel that the Union doesn’t represent them or their views. We do great things and welcome everyone to get involved, which is why we want to make sure Sussex is a place for everyone!`,
                `To do this, we’re changing the way referenda on position statements - that is, the stance the Union takes on something - work, to ensure that they need a minimum turnout of 10% of students for decisions to be binding. This means that when the Union adopts a position on something like Trident, it will be more representative of the whole student body.
`,
                `In addition, Full-Time Officers will spend as much time as possible talking to students and attending events, and do a better job in letting you know about the activities and support that we offer here at the Students’ Union.`,
              ],
            ],
            [
              'Student-led Union',
              [
                `At the Students’ Union, we are passionate about empowering and training students to have the power and confidence to lead and host events for their sports clubs and societies, with skills that might be useful in later life.`,
                `That’s why we will ensure we champion student led events and empower students to host events themselves by providing them with the resources and the training to do so. We will also champion lively and respectful debate both in the classroom and on campus by reviewing our external speakers policy.`,
              ],
            ],
          ]}
          accent="#0ab9a4"
          accentBackground="#9de3db"
          image="/original_images/4759cccd3b3f4ed4813a260cc0d4833f"
        />
        <OfficerPlan
          name="Grainne"
          position="Welfare Officer"
          points={[
            [
              'Welfare',
              [
                `Our Student Reps do great work to make students’ academic life better and ensure that they can reach their full potential at university. We want to make sure that they are able to achieve even more to improve the student experience, which is why we are creating a Welfare Forum - a space where Student Reps can flag up welfare issues and discuss ideas to better promote welfare within their schools.`,
                `Over the year ahead, we plan to consult with our Student Reps on how they would like the forum to run, organise forums at least once per term and establish a system for ensuring issues flagged at forums are acted upon.`,
              ],
            ],
            [
              'Scrapped caps',
              [
                `Students can sometimes face difficulty during completion of their assessments and they are unable to achieve their full potential when they then have to resit capped at 40% for undergraduates and 50% for postgraduates.`,
                `At the Students’ Union, we believe that these students deserve a second chance and we plan to fight to scrap the cap on resits and replace it with a fairer system. This year, we intend to run a Scrap the Cap campaign, undertake research to better understand issues and identify alternatives to the cap and submit a paper to the University, proposing the removal of the cap.`,
              ],
            ],
            [
              'Good night out scheme',
              [
                `We care about the safety of all of our students and we want to make sure that when they go to town for a night out that they feel safe and protected. That’s why we are launching our Good Night Owls scheme, to provide students out in town on Wednesday evenings with a friendly point of contact and signposting to welfare-related information.`,
                `Over the next year, we plan to secure funding and training for resources, recruit and train volunteers, and promote our scheme to students.`,
              ],
            ],
          ]}
          accent="#cf77b0"
          accentBackground="#ecc9df"
          image="/original_images/f774e88f695344fd957a46e4dfefc3bc"
        />
      </SwipeableViews>
    </div>
  );
}

export default HydroLeaf({ disableSSR: true, name: 'AnnualPlan' })(AnnualPlan);
