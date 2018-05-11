import { Grooves } from '~libs/groovesLib';

interface WebsiteEvents {
  // Events
  'Event Viewed': {
    eventId: number;
    eventTitle: string;
  };
  'Event Ticket Interaction': {
    eventId: number;
  };

  // Search
  'Search Performed': {
    term: string;
  };

  'Search Exit': {
    term: string;
  };

  // SG
  'Student Group Search': {
    term: string;
  };

  // Book Market
  'Book Listing Created': {
    bookId: number;
  };
  'Book Listing Details Requested': {
    bookId: number;
  };
  'Book Listing Unlisted': {
    bookId: number;
  }
  'Book Listing Listed': {
    bookId: number;
  }
  'Book Listing Completed': {
    bookId: number;
  }
  'Freshers Signup Email Added': {}
  'Freshers Signup Name Added': {}
  'Freshers Signup Status Added': {}


  // perf
  'Performance Timed': {
    dnsTiming: number;
    tcpTiming: number;
    requestTiming: number;
    responseTiming: number;
    processingTiming: number;
    onLoadTiming: number;
    totalPageLoadTime: number;
  };
}

export const grooves = new Grooves<WebsiteEvents>({
  endpoint:
    process.env.NODE_ENV === 'production'
      ? 'https://m.sussexstudent.com'
      : 'http://localhost:6789',
  sessionProperties: () => ({ userId: 999 }),
  disable: window.location.hash === '#communication',
});
