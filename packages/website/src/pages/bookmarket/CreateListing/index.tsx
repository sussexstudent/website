import React from 'react';
import { Field, Form } from 'react-final-form';
import {
  composeValidators,
  maxLength,
  required,
} from '@ussu/common/src/libs/finalFormValidators';
import GET_ALL_MARKET_SECTIONS_QUERY from '../getAllMarketSections.graphql';
import CREATE_LISTING_MUTATION from './CreateListingMutation.graphql';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import { Helmet } from 'react-helmet-async';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  CreateListingMutation,
  GetAllMarketSectionsQuery,
} from '../../../generated/graphql';

const CreateListing: React.FC = (props) => {
  const [createListing] = useMutation<CreateListingMutation>(
    CREATE_LISTING_MUTATION,
  );
  const { data } = useQuery<GetAllMarketSectionsQuery>(
    GET_ALL_MARKET_SECTIONS_QUERY,
  );

  const onSubmit = (formData: any) => {
    createListing({
      variables: {
        listingData: {
          ...formData,
          price: parseFloat(formData.price),
          sectionId: parseInt(formData.sectionId, 10),
        },
      },
    }).then((response) => {
      if (response?.data?.createMarketListing?.listing?.pk) {
        (props as any).history.push(
          `/book-market/listing/${response.data.createMarketListing.listing.pk}`,
        );
      }
    });
  };

  return (
    <div>
      <Helmet title="Add a listing" />

      <BreadcrumbBar>
        <InternalAppLink to="/book-market/">Book Market</InternalAppLink>
        <InternalAppLink to={`/book-market/list/`}>
          Add a listing
        </InternalAppLink>
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
                    {meta.error && meta.touched && (
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
                    {meta.error && meta.touched && (
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
                    {meta.error && meta.touched && (
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

            <Field name="contactDetails" validate={required}>
              {({ input, meta }) => (
                <div className="BasicForm__field">
                  <label htmlFor="contactDetails">
                    Contact Details{' '}
                    {meta.error && meta.touched && (
                      <span className="BasicForm__requirement">
                        {meta.error}
                      </span>
                    )}
                  </label>
                  <textarea
                    {...input}
                    id="contactDetails"
                    placeholder="How should a buyer get in touch? Please do not post personal information, as these details are public to any logged in user."
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
                    {meta.error && meta.touched && (
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
                    School{' '}
                    {meta.error && meta.touched && (
                      <span className="BasicForm__requirement">
                        {meta.error}
                      </span>
                    )}
                  </label>
                  <select {...input} id="sectionId">
                    <option selected hidden>
                      Select a school
                    </option>
                    {data?.allMarketSections?.map((section) => (
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

export { CreateListing };
