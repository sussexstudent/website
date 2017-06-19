import React from 'react';
import ContentAPIComposer from '@ussu/components/ContentAPIComposer';

const StaffPage = () => (
  <div>
    <div className="Legacy">
      <div className="row">
        <div className="col-md-6">
          <h2>GENERAL ENQUIRIES</h2>

          <p>
            <a href="mailto:reception@sussexstudent.com">
              reception@sussexstudent.com
            </a>
          </p>

          <p>01273 67 8152</p>

          <p>
            {"University of Sussex Students' Union"}<br />
            Falmer House<br />
            Falmer<br />
            East Sussex<br />
            BN1 9QF
          </p>

          <p>
            <iframe
              className="twitter-mention-button twitter-mention-button-rendered twitter-tweet-button"
              frameBorder="0"
              id="twitter-widget-1"
              scrolling="no"
              src="https://platform.twitter.com/widgets/tweet_button.e00c464da75b252cb1a028400793cadc.en.html#_=1447341966132&amp;count=none&amp;dnt=true&amp;id=twitter-widget-1&amp;lang=en&amp;original_referer=http%3A%2F%2Fwww.sussexstudent.com%2Fabout-us%2Fcontact-us%2F&amp;related=USSU&amp;screen_name=USSU&amp;size=m&amp;type=mention"
              style={{
                position: 'static',
                visibility: 'visible',
                width: '114px',
                height: '20px',
              }}
              title="Twitter Tweet Button"
            />
          </p>

          <h2>&nbsp;</h2>

          <h2>SPECIFIC ENQUIRIES</h2>

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
                01273 87 2636<br />
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
                01273 87 2636<br />
                &nbsp;
              </p>
            </div>

            <div className="col-sm-4">
              <h3>Advertising and Sponsorship</h3>
              <a href="http://marketingsponsorship@sussexstudent.com">
                marketingsponsorship<br />
                @sussexstudent.com
              </a>

              <p>01273 87 3874</p>
            </div>

            <div className="col-sm-4 col-sm-offset-2">
              <h3>
                Finance Office<br />
                &nbsp;
              </h3>

              <p>
                (For payment and invoice queries)<br />
                01273 67 8150<br />
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
                  welcometeam@<br />
                  ussu.sussex.ac.uk
                </a><br />
                &nbsp;
              </p>
            </div>

            <div className="col-sm-4">
              <h3>The Union Shop</h3>

              <p>01273 67 8147</p>
            </div>

            <div className="col-sm-4 col-sm-offset-2">
              <h3>Falmer Bar</h3>

              <p>01273 678351</p>
            </div>

            <div className="col-sm-4">
              <h3>East Slope Bar</h3>

              <p>
                <br />
                01273 68 9453&nbsp;
              </p>

              <p>&nbsp;</p>
            </div>

            <div className="col-sm-4 col-sm-offset-2">
              <h3>The Globe</h3>

              <p>
                <a href="mailto:hello@globe.pub">hello@globe.pub</a>01273 770685
              </p>

              <p>&nbsp;</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h2>VISIT US</h2>

          <p>
            Our building,&nbsp;
            <span style={{ fontWeight: 700 }}>Falmer House</span>
            &nbsp;is the first building you come to as you turn off the A27 from Brighton or walk from Falmer train station.
          </p>

          <p>
            <span style={{ fontWeight: 700 }}>Falmer Bar</span>
            &nbsp;is in Falmer House,&nbsp;
            <span style={{ fontWeight: 700 }}>East Slope Bar</span>
            &nbsp;is at the other end of the campus by the East Slope residences.&nbsp;
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
            You can click on the map below and insert your postcode in order to find directions to campus travelling on foot and by bicycle.
          </p>

          <p>
            You can also&nbsp;
            <a href="https://www.google.co.uk/maps/@50.837418,-0.1061897,13z/data=!5m1!1e3">
              view local cycle routes on this map.
            </a>
          </p>

          <p>
            <iframe
              frameBorder="0"
              title="map"
              height="450"
              marginHeight="0"
              scrolling="no"
              src="https://maps.google.co.uk/maps?hl=en&amp;georestrict=input_srcid:cc3e5f7fdb1e4975&amp;ie=UTF8&amp;view=map&amp;cid=10645094759241715238&amp;q=University+of+Sussex+Student%27s+Union+%28USSU%29&amp;ved=0CFQQpQY&amp;ei=KMp3TNK2HaDMjAflu6DZDw&amp;hq=University+of+Sussex+Student%27s+Union&amp;hnear=&amp;ll=50.870599,-0.087204&amp;spn=0.024374,0.05064&amp;z=14&amp;iwloc=A&amp;output=embed"
              style={{ width: '540px' }}
            />
          </p>

          <p style={{ marginLeft: '40px' }}>
            <small>
              <a href="https://maps.google.co.uk/maps?hl=en&amp;georestrict=input_srcid:cc3e5f7fdb1e4975&amp;ie=UTF8&amp;view=map&amp;cid=10645094759241715238&amp;q=University+of+Sussex+Student%27s+Union+(USSU)&amp;ved=0CFQQpQY&amp;ei=KMp3TNK2HaDMjAflu6DZDw&amp;hq=University+of+Sussex+Student%27s+Union&amp;hnear=&amp;ll=50.870599,-0.087204&amp;spn=0.024374,0.05064&amp;z=14&amp;iwloc=A&amp;source=embed">
                View Larger Map
              </a>
            </small>
          </p>

          <p style={{ marginLeft: '40px' }}>&nbsp;</p>

          <h3>Make a complaint</h3>

          <p>
            If you wish to make a complaint you can report this to any member of Union staff or full-time elected officer who can raise this formal complaint on your behalf. Alternatively, you can submit details of your complaint via
            {' '}
            <a
              href="https://sussexstudent.com/complain"
              target="_blank"
              rel="noopener noreferrer"
            >
              our online complaints form
            </a>
            .
          </p>

          <p>
            <a
              className="btn btn-default"
              href="https://www.sussexstudent.com/about-us/contact-us/make-a-complaint/"
            >
              More about the complaints procedure
            </a>
          </p>

          <p>&nbsp;</p>
        </div>
      </div>
    </div>
    <div className="Layout">
      <div>
        <ContentAPIComposer pageId={6} />
      </div>
    </div>
  </div>
);

export default StaffPage;
