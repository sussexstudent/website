import React from 'react';
import { Event } from '../../types/events';
import { normaliseContentLink } from '~components/content/utils';
import ContentCard from '~components/ContentCard';
import Button from '~components/Button';
import Stepper from 'react-stepper-primitive';
import { formatPrice } from '~libs/money';

interface IProps {
  event: Event;
}

interface IState {
  tickets: null | any;
  ticketSelection: {
    [id: string]: number;
  };
}

export class MSLTickets extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      tickets: null,
      ticketSelection: {},
    };
  }

  componentDidMount() {
    window.onmessage = (e) => {
      const data = e.data;
      if (data.source === 'ussu-ticket-frame-initial-data') {
        this.setState({ tickets: data.payload });
      }
    };
  }

  render() {
    const { event } = this.props;

    return (
      <ContentCard>
        <h3>Tickets</h3>
        {this.state.tickets !== null ? (
          <div className="TicketOutlet">
            <ul className="List List--reset">
              {this.state.tickets.map((ticketOption: any) => (
                <li
                  className="TicketOutlet__item"
                  key={ticketOption.msl.hidden}
                >
                  <span className="TicketOutlet__name">
                    {ticketOption.ticketName}
                  </span>
                  <span className="TicketOutlet__price">
                    {ticketOption.currencySymbol}
                    {formatPrice(ticketOption.value)}
                  </span>
                  <Stepper
                    min={0}
                    max={ticketOption.maxQuantity}
                    onChange={(val) =>
                      this.setState((state) => ({
                        ...state,
                        ticketSelection: {
                          ...state.ticketSelection,
                          [ticketOption.msl.hidden]: val,
                        },
                      }))
                    }
                    render={({
                      getFormProps,
                      getInputProps,
                      getIncrementProps,
                      getDecrementProps,
                    }) => (
                      <form
                        className="TicketOutlet__rocker"
                        {...getFormProps()}
                      >
                        <button
                          className="TicketOutlet__rocker-button"
                          {...getDecrementProps()}
                          disabled={
                            (this.state.ticketSelection[
                              ticketOption.msl.hidden
                            ] || 0) <= 0
                          }
                        >
                          -
                        </button>
                        <input
                          className="TicketOutlet__rocker-input"
                          {...getInputProps()}
                        />
                        <button
                          className="TicketOutlet__rocker-button"
                          {...getIncrementProps()}
                          disabled={
                            this.state.ticketSelection[
                              ticketOption.msl.hidden
                            ] >= ticketOption.maxQuantity
                          }
                        >
                          +
                        </button>
                      </form>
                    )}
                  />
                </li>
              ))}
              {this.state.tickets.length <= 0 ? (
                <em>No tickets are current on sale</em>
              ) : null}
            </ul>
            <Button href="/basket" endOfCard>
              View Basket
            </Button>
          </div>
        ) : (
          <em>Loading</em>
        )}
        <iframe
          style={{ display: 'none' }}
          src={`${normaliseContentLink(event.ticketData)}#ticketData`}
          frameBorder="0"
        />
      </ContentCard>
    );
  }
}
