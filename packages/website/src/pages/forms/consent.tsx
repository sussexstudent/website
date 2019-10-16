import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ErrorState } from '../../components/ErrorState';
import { Loader } from '../../components/Loader';
import getConsentForm from '../../queries/forms/getConsentForm.graphql';
import acceptConsentMutation from '../../mutations/forms/acceptConsent.graphql';
import { RouteComponentProps } from 'react-router-dom';
import { useViewer } from '../bookmarket/currentUserData';
import { ContentCard } from '../../components/ContentCard';

export type ConsentCodeProps = RouteComponentProps<{ slug: string }>;

export const ConsentCode: React.FC<ConsentCodeProps> = (props) => {
  const user = useViewer();
  const { data, loading, error } = useQuery(getConsentForm, {
    variables: {
      slug: props.match.params.slug,
    },
  });

  const [acceptConsent, mut] = useMutation(acceptConsentMutation);

  if (loading || user.loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div
      css={{
        maxWidth: 560,
        margin: '0 auto',
      }}
    >
      <ContentCard>
        <h2>Consent Code</h2>
        <h1>{data.consentForm.title}</h1>

        {mut.called ? (
          mut.loading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <h3>Thanks!</h3>
              <p>Your consent code is:</p>
              <input
                readOnly={true}
                value={mut.data.acceptConsent.authorisation.code}
              />
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            <div>
              <ReactMarkdown source={data.consentForm.body} />
            </div>

            <div>
              {user.isAuthenticated ? (
                <button
                  onClick={() => {
                    if (window) window.scroll({ top: 0, behavior: 'smooth' });

                    acceptConsent({
                      variables: {
                        slug: props.match.params.slug,
                      },
                    });
                  }}
                  className="Button Button--color-green"
                >
                  Accept
                </button>
              ) : (
                <em>You need to be logged in to accept.</em>
              )}
            </div>
          </React.Fragment>
        )}
      </ContentCard>
    </div>
  );
};
