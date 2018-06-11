import React from 'react';
import ContentCard from '~components/ContentCard';
import Button from '~components/Button';
import Stepper from 'react-stepper-primitive';
import { formatPrice } from '~libs/money';

interface IProps {
  msl: any;
}

interface IState {
  ticketSelection: {
    [id: string]: number;
  };
}

export class MSLTickets extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ticketSelection: {},
    };
  }

  render() {
    const { msl } = this.props;

    const hasLoaded = msl !== null;

    return (
      <ContentCard>
        <h3>Tickets</h3>
        {hasLoaded ? (
          <div className="TicketOutlet">
            <ul className="List List--reset">
              {msl.tickets.map((ticketOption: any) => (
                <li
                  className="TicketOutlet__item"
                  key={ticketOption.msl.hidden}
                >
                  <span className="TicketOutlet__name">
                    {ticketOption.ticketName}
                  </span>
                  <span className="TicketOutlet__price">
                    {ticketOption.value > 0 ? `${ticketOption.currencySymbol}${formatPrice(ticketOption.value)}` : 'Free!'}
                  </span>
                  <div className="TicketOutlet__rocker-container">
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
                    <button className="Button">Add</button>
                  </div>
                </li>
              ))}
              {msl.tickets.length <= 0 ? (
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
      </ContentCard>
    );
  }
}
