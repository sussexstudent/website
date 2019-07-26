import React from 'react';
import slugify from '@ussu/common/src/libs/slugify';
import flatStreamToLevels from '@ussu/common/src/libs/flatStreamToLevels';
import { ContentCard } from '../../../components/ContentCard';
import StreamField from '../../content/StreamField';
import { Page } from '../types';
import ContentNavigation from '../../../components/ContentNavigation';
import { Heading, HeadingLevel } from '../../../components/Heading';
import { TypeSize } from '@ussu/common/src/libs/style/type';

const fromText = (text: string) => ({ name: text, anchor: slugify(text) });

export function generateTitlesFromStream(list: any[]) {
  // todo
  const headings: (any | null)[] = list.map((block) => {
    switch (block.value.type) {
      case 'heading':
        return {
          ...fromText(block.value.value),
          children: generateTitlesFromStream(block.children),
        };
      case 'staff_list':
        return {
          ...fromText(block.value.value.heading),
          children: generateTitlesFromStream(block.children),
        };
      default:
        return null;
    }
  });

  return headings.filter((item) => item !== null);
}

const levelMap = {
  heading: 0,
  staff_list: 1,
};

interface IStaffPage extends Page {
  body: any;
}

export interface StaffPageProps {
  page: IStaffPage; // todo
}

export const StaffPage: React.FC<StaffPageProps> = ({
  page: { body },
  page,
}) => {
  const levels = flatStreamToLevels(
    (item) => (levelMap as any)[item.type],
    body,
  );

  const menuItems = levels.map((level) => ({
    name: level.value,
    anchor: slugify(level.value),
    children: level._children
      ? level._children.map((l) => ({
          name: l.value.heading,
          anchor: slugify(l.value.heading),
          children: [],
        }))
      : [],
  }));

  return (
    <div className="LokiContainer">
      <div className="Legacy">
        <div className="row">
          <div className="col-md-6">
            <ContentCard>
              <Heading level={HeadingLevel.h2} size={TypeSize.GreatPrimer}>
                General Enquiries
              </Heading>

              <p>
                <a href="mailto:reception@sussexstudent.com">
                  info@sussexstudent.com
                </a>
              </p>

              <p>01273 67 8152</p>

              <p>
                {"University of Sussex Students' Union"}
                <br />
                Falmer House
                <br />
                Falmer
                <br />
                East Sussex
                <br />
                BN1 9QF
              </p>
            </ContentCard>
            <ContentCard>
              <h2>Specific Enquiries</h2>
              <div className="row no-gutter" id="enquiries">
                <div className="col-sm-4">
                  <h3>Societies</h3>

                  <p>
                    <a href="mailto:societies@ussu.sussex.ac.uk">
                      societies@ussu.sussex.ac.uk
                    </a>
                    <br />
                    01273 87 3415
                  </p>
                </div>

                <div className="col-sm-4 col-sm-offset-2">
                  <h3>Sports clubs</h3>

                  <p>
                    <a href="mailto:sport@ussu.sussex.ac.uk">
                      sport@ussu.sussex.ac.uk
                    </a>
                    <br />
                    01273 87 7322
                  </p>

                  <p>&nbsp;</p>
                </div>

                <div className="col-sm-4">
                  <h3>Press</h3>

                  <p>
                    <a href="mailto:press@sussexstudent.com">
                      press@sussexstudent.com&nbsp;
                    </a>
                    <br />
                    01273 87 2636
                    <br />
                    07738 40 6823
                  </p>
                </div>

                <div className="col-sm-4 col-sm-offset-2">
                  <h3>Website</h3>

                  <p>
                    <a href="mailto:support@sussexstudent.com">
                      support@sussexstudent.com
                    </a>
                    <br />
                    01273 87 2636
                    <br />
                    &nbsp;
                  </p>
                </div>

                <div className="col-sm-4">
                  <h3>Advertising and Sponsorship</h3>
                  <a href="http://marketingsponsorship@sussexstudent.com">
                    marketingsponsorship
                    <br />
                    @sussexstudent.com
                  </a>

                  <p>01273 87 3874</p>
                </div>

                <div className="col-sm-4 col-sm-offset-2">
                  <h3>
                    Finance Office
                    <br />
                    &nbsp;
                  </h3>

                  <p>
                    (For payment and invoice queries)
                    <br />
                    01273 67 8150
                    <br />
                    &nbsp;
                  </p>
                </div>

                <div className="col-sm-4">
                  <h3>Events</h3>

                  <p>
                    <a href="mailto:press@sussexstudent.com">
                      events@sussexstudent.com
                    </a>
                    <br />
                    01273 87 3874
                  </p>
                </div>

                <div className="col-sm-4 col-sm-offset-2">
                  <h3>Freshers Week</h3>

                  <p>
                    <a href="mailto:welcometeam@ussu.sussex.ac.uk">
                      welcometeam@ussu.sussex.ac.uk
                    </a>
                  </p>
                </div>

                <div className="col-sm-4">
                  <h3>The Union Shop</h3>
                  <p>01273 67 8147</p>
                </div>

                <div className="col-sm-4 col-sm-offset-2">
                  <h3>Falmer Bar</h3>
                  <p>01273 678148</p>
                  <p>thebars@sussexstudent.com</p>
                </div>
                <div className="col-sm-4">
                  <h3>Room 76</h3>
                  <p>01273 678148</p>
                  <p>thebars@sussexstudent.com</p>
                </div>
                <div className="col-sm-4">
                  <h3>The Clubhouse</h3>
                  <p>01273 678148</p>
                  <p>thebars@sussexstudent.com</p>
                </div>
                <div className="col-sm-4">
                  <h3>Northfield Bar</h3>
                  <p>01273 877294</p>
                  <p>thebars@sussexstudent.com</p>
                </div>
              </div>
            </ContentCard>
          </div>

          <div className="col-md-6">
            <h2>Visit Us</h2>

            <p>
              Our building,&nbsp;
              <span style={{ fontWeight: 700 }}>Falmer House</span>
              &nbsp;is the first building you come to as you turn off the A27
              from Brighton or walk from Falmer train station.
            </p>

            <p>
              <span style={{ fontWeight: 700 }}>Falmer Bar</span>
              &nbsp;is in Falmer House,&nbsp;
              <span style={{ fontWeight: 700 }}>East Slope Bar</span>
              &nbsp;is at the other end of the campus by the East Slope
              residences.&nbsp;
              <span style={{ fontWeight: 700 }}>The Globe</span>
              &nbsp;is in central Brighton.
            </p>

            <p>
              The University of Sussex has further information on&nbsp;
              <a href="http://www.sussex.ac.uk/aboutus/findus/uktravel.php">
                how to get to the campus
              </a>
              &nbsp;as well as&nbsp;
              <a href="http://www.sussex.ac.uk/aboutus/findus/campusmaps.php">
                campus maps
              </a>
              .
            </p>

            <p>
              You can click on the map below and insert your postcode in order
              to find directions to campus travelling on foot and by bicycle.
            </p>

            <p>
              You can also&nbsp;
              <a href="https://www.google.co.uk/maps/@50.837418,-0.1061897,13z/data=!5m1!1e3">
                view local cycle routes on this map.
              </a>
            </p>

            <p>
              <a
                className="Button"
                href="https://www.google.co.uk/maps/place/University+of+Sussex+Students'+Union+(USSU)/@50.864669,-0.0908267,17z/data=!4m13!1m7!3m6!1s0x487588b5af4d36fd:0xfad5320028813073!2sFalmer+House,+Falmer,+Brighton+BN1+9QF!3b1!8m2!3d50.864289!4d-0.0888388!3m4!1s0x0:0x93baf9488cf98e26!8m2!3d50.8646692!4d-0.0886383?hl=en"
              >
                See Falmer House on Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="Layout">
        <div>
          <div className="Layout Layout--sidebar-left Layout--sidebar-thin">
            <div>
              <aside>
                <ContentNavigation
                  title="Departments"
                  items={menuItems}
                  activeKey="x"
                  onlyShowSubMenuWhenChildActive
                />
              </aside>
            </div>
            <div>
              {levels.map((
                { value, _children = null }: { value: any; _children?: any }, // todo
              ) => (
                <ContentCard anchor={slugify(value)}>
                  <h1>{value}</h1>
                  {_children !== null ? (
                    <StreamField page={page} items={_children} />
                  ) : null}
                </ContentCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
