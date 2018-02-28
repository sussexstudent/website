import React from 'react';
import { compose } from 'recompose';
import { Form, Field } from 'react-final-form';
import {
  composeValidators,
  maxLength,
  required,
} from '~libs/finalFormValidators';
import { graphql, ChildProps, QueryProps } from 'react-apollo';
import GetCategories from './GetCategories.graphql';
import CreateListingMutation from './CreateListingMutation.graphql';
import { MarketListing, MarketSection } from '../../../types/market';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link } from 'react-router-dom';

interface OwnProps {}

interface Result {
  createMarketListing: {
    listing: MarketListing;
  };
}

type IProps = OwnProps &
  ChildProps<{}, Result> & {
    categoryQuery: QueryProps & Partial<{ allMarketSections: MarketSection[] }>;
  };

const CreateListingComponent: React.SFC<IProps> = (props) => {
  const onSubmit = (formData: any) => {
    props.mutate &&
      props
        .mutate({
          variables: {
            listingData: {
              ...formData,
              price: parseFloat(formData.price),
              sectionId: parseInt(formData.sectionId, 10),
            },
          },
        })
        .then((response) => {
          console.log(response);
          (props as any).history.push(
            `/book-market/listing/${
              response.data.createMarketListing.listing.pk
            }`,
          );
        });
  };

  return (
    <div>
      <BreadcrumbBar>
        <Link to="/book-market/">Book Market</Link>
        <Link to={`/book-market/list/`}>Add a listing</Link>
      </BreadcrumbBar>

      <h1>Add a listing</h1>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form className="BasicForm" onSubmit={handleSubmit}>
            <Field
              name="bookTitle"
              validate={composeValidators(required, maxLength(255))}
            >
              {({ input, meta }) => (
                <div className="BasicForm__field">
                  <label htmlFor="bookTitle">
                    Book Title{' '}
                    {meta.error &&
                      meta.touched && (
                        <span className="BasicForm__requirement">
                          {meta.error}
                        </span>
                      )}
                  </label>
                  <input
                    {...input}
                    id="bookTitle"
                    type="text"
                    placeholder="Title of book"
                    required
                  />
                </div>
              )}
            </Field>

            <Field
              name="bookAuthor"
              validate={composeValidators(required, maxLength(255))}
            >
              {({ input, meta }) => (
                <div className="BasicForm__field">
                  <label htmlFor="bookAuthor">
                    Book Author(s){' '}
                    {meta.error &&
                      meta.touched && (
                        <span className="BasicForm__requirement">
                          {meta.error}
                        </span>
                      )}
                  </label>
                  <input
                    {...input}
                    id="bookAuthor"
                    type="text"
                    placeholder="Book's author"
                    required
                  />
                </div>
              )}
            </Field>

            <Field name="description" validate={required}>
              {({ input, meta }) => (
                <div className="BasicForm__field">
                  <label htmlFor="description">
                    Description{' '}
                    {meta.error &&
                      meta.touched && (
                        <span className="BasicForm__requirement">
                          {meta.error}
                        </span>
                      )}
                  </label>
                  <textarea
                    {...input}
                    id="description"
                    placeholder="Any details on the book, wear etc"
                    required
                  />
                </div>
              )}
            </Field>

            <Field name="price" validate={required}>
              {({ input, meta }) => (
                <div className="BasicForm__field">
                  <label htmlFor="price">
                    List price{' '}
                    {meta.error &&
                      meta.touched && (
                        <span className="BasicForm__requirement">
                          {meta.error}
                        </span>
                      )}
                  </label>
                  <span className="BasicForm__input-prefix">£</span>
                  <input
                    {...input}
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="3.50"
                    required
                  />
                </div>
              )}
            </Field>

            <Field name="sectionId" validate={required}>
              {({ input, meta }) => (
                <div className="BasicForm__field">
                  <label htmlFor="sectionId">
                    Section{' '}
                    {meta.error &&
                      meta.touched && (
                        <span className="BasicForm__requirement">
                          {meta.error}
                        </span>
                      )}
                  </label>
                  <select {...input} id="sectionId">
                    {props.categoryQuery &&
                      props.categoryQuery.allMarketSections &&
                      props.categoryQuery.allMarketSections.map((section) => (
                        <option key={section.pk} value={section.pk}>
                          {section.title}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </Field>

            <input className="Button" type="submit" value="Create listing" />
          </form>
        )}
      />
    </div>
  );
};

const CreateListing = compose<IProps, OwnProps>(
  graphql(CreateListingMutation),
  graphql(GetCategories, {
    name: 'categoryQuery',
  }),
)(CreateListingComponent);

export { CreateListing };
