import { isBefore, addHours } from 'date-fns';

interface GroovesEvent {}

interface GroovesOptions {
  endpoint: string;
  pageTracking?: boolean;
  sessionProperties: () => object;
  disable?: boolean;
}

function sessionHasExpired(date: Date) {
  return isBefore(addHours(date, 4), new Date());
}

function getExistingIds() {
  const stored = localStorage.getItem('grooves');

  if (stored === null) {
    return false;
  }

  try {
    const parsed = JSON.parse(stored);

    if (
      parsed.hasOwnProperty('sessionId') &&
      parsed.hasOwnProperty('sessionCreated')
    ) {
      const { sessionId, sessionCreated } = parsed;

      const sessionCreatedDate = new Date(sessionCreated);

      if (sessionHasExpired(sessionCreatedDate)) {
        return false;
      }

      return { sessionId };
    }
  } catch (e) {
    return false;
  }

  return false;
}

function log(name: string, ...args: any[]) {
  process.env.NODE_ENV === 'development' &&
    console.log(`[grooves] ${name}`, ...args);
}

export class Grooves<EventMap> {
  private readonly options: GroovesOptions;
  private isReady: boolean = false;
  private sessionId: string | null = null;
  private eventQueue: GroovesEvent[] = [];

  constructor(options: GroovesOptions) {
    this.options = options;

    this.setup().then(() => {
      log('setup complete');
      this.transportQueue();

      this.page();
    });
  }

  private setup(): Promise<void> {
    const clientIds = getExistingIds();

    if (clientIds === false) {
      return this.createSession()
        .then(sessionId => {
          this.sessionId = sessionId;
          log('created new session');
          this.isReady = true;
        });
    }

    return new Promise((resolve) => {
      log('restoring current session');
      this.sessionId = clientIds.sessionId;
      this.isReady = true;
      resolve();
    });
  }

  private createSession() {
    return this.performRequest('session')
      .then(response => {
        localStorage.setItem(
          'grooves',
          JSON.stringify({
            sessionId: response.id,
            sessionCreated: new Date().toISOString(),
          }),
        );

        return response.id;
      })
  }

  public page() {
    this.processEvent({
      event: '$page',
      properties: {
        title: document.title,
        path: window.location.pathname,
        url: window.location.href,
        referer: document.referrer,
        search: window.location.search,
      },
    });
  }

  public track<N extends keyof EventMap>(
    event: N,
    properties: EventMap[N],
  ): void {
    this.processEvent({
      event,
      properties,
    });
  }

  private processEvent(event: GroovesEvent) {
    log('event added', event);
    this.eventQueue.push(event);

    this.transportQueue();
  }

  private transportQueue() {
    if (!this.isReady) {
      return false;
    }

    if (this.eventQueue.length <= 0) {
      return false;
    }

    if (this.options.disable === true) {
      return;
    }

    log('transporting queue', this.eventQueue);

    this.eventQueue.map((event) => this.performRequest('track', event));

    this.eventQueue = [];
  }

  private getContext() {
    return {
      library: {
        name: 'grooves.js',
        version: '0.0.1',
      },
      page: {
        title: document.title,
        path: window.location.pathname,
        url: window.location.href,
        referer: document.referrer,
        search: window.location.search,
      },
    };
  }

  private performRequest(type: 'track' | 'session', data?: any) {
    return fetch(`${this.options.endpoint}/${type}`, {
      method: 'post',
      body: JSON.stringify({
        ...data,
        context: this.getContext(),
        sessionId: this.sessionId,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => (type === 'track' ? res.arrayBuffer() : res.json()));
  }
}
