import React from 'react';
import FC from '@ussu/components/FigureCollection';
import HydroLeaf from '@ussu/components/HydroLeaf';
import TweetList from '@ussu/components/TweetList';
import HomepageEventsList from '../components/HomepageEventsList';
import { Hydro as HeadingHero } from '../../src/js/components/HeadingHero/index';
import AdvertBar from '../components/AdvertBar';

const FigureCollection = HydroLeaf()(FC);

const Homepage = () =>
  <div>
    <AdvertBar className="AdvertBar--mobile-home" position="TopBanner" />
    <div className="Trail">
      <div className="Trail__row  u-container-bleed-2">
        <a
          className="HeadingImage--link"
          href="https://www.sussexstudent.com/our-campus-services/"
        >
          <HeadingHero
            imageURL="/images/ec00cc188009492f868d14ac9a228b97.original.jpg"
            title={'Last chance: The Horrors tickets on sale now'}
          />
        </a>
      </div>
      <div className="Trail__row Trail__row--211">
        <div className="ContentBlock">
          <div className="ContentBlock__heading">News</div>
          <div className="u-h">
            {'{unionnewslist}'}
          </div>
          <div className="app__news" />
          <a className="NewsViewMore" href="/news">
            Read more news stories
          </a>
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">
            {"What's on"}
          </div>
          <HomepageEventsList />
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">Twitter</div>
          <TweetList
            query="list/ussu,ussu"
            signature="f1b9176fddbe7114295eb4bfc65070c5a130a94d"
          />
        </div>
      </div>

      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your full-time officers</div>
        <FigureCollection
          items={[
            {
              imageResource:
                'images/4759cccd3b3f4ed4813a260cc0d4833f.original.jpg',
              title: 'Lucy Williams',
              sub: 'Activities Officer',
              link: '/about-us/full-time-elected-officers/activities',
            },
            {
              imageResource:
                'images/8da8156f2e0e40b4878dcbea569ce2b5.original.jpg',
              title: 'Aisling Murray',
              sub: 'Society and Citizenship Officer',
              link: '/about-us/full-time-elected-officers/society-citizenship',
            },
            {
              imageResource:
                'images/241b436e49524d8da68faf1f1f83c4b6.original.jpg',
              title: 'Lulah Stratheran Brady',
              sub: 'Undergraduate Education Officer',
              link:
                '/about-us/full-time-elected-officers/undergraduate-education',
            },
            {
              imageResource:
                'images/f07caf2bb1114cb8a18dd49a6e9e1045.original.jpg',
              title: 'Sarah McIntosh',
              sub: 'Postgraduate Education Officer',
              link:
                '/about-us/full-time-elected-officers/postgraduate-education',
            },
            {
              imageResource:
                'images/16664de397694b5ea5e194b0a1fa73dc.original.jpg',
              title: 'Frida Gustafsson',
              sub: 'President',
              link: '/about-us/full-time-elected-officers/president',
            },
            {
              imageResource:
                'images/d05f369bcabc47ed83ecaac0e36a9adb.original.jpg',
              title: 'Grainne Gahan',
              sub: 'Welfare Officer',
              link: '/about-us/full-time-elected-officers/welfare',
            },
          ]}
        />
      </div>

      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your part-time officers</div>
        <FigureCollection
          items={[
            {
              imageResource:
                'images/4759cccd3b3f4ed4813a260cc0d4833f.original.jpg',
              title: 'Simin Wadiwala',
              sub: 'Ethnic Minority Students Officer',
              link: '/democracy/part-time-officer-elections/',
            },
            {
              imageResource:
                'images/8da8156f2e0e40b4878dcbea569ce2b5.original.jpg',
              title: 'Liz Gladden',
              sub: 'Women Students Officer',
              link: '/democracy/part-time-officer-elections/',
            },
            {
              imageResource:
                'images/241b436e49524d8da68faf1f1f83c4b6.original.jpg',
              title: 'Chris Lewis',
              sub: 'LGBTQ+ Students Officer',
              link: '/democracy/part-time-officer-elections/',
            },
            {
              imageResource:
                'images/f07caf2bb1114cb8a18dd49a6e9e1045.original.jpg',
              title: 'Fi Halfacre',
              sub: 'Students with Disabilities Officer',
              link: '/democracy/part-time-officer-elections/',
            },
            {
              imageResource:
                'images/16664de397694b5ea5e194b0a1fa73dc.original.jpg',
              title: 'Henry Tee',
              sub: 'Trans and Non-Binary Students Officer',
              link: '/democracy/part-time-officer-elections/',
            },
          ]}
        />
      </div>
    </div>
  </div>;

export default Homepage;
