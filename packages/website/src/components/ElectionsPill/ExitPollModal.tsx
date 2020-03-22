import React from 'react';
import {Modal} from '../Modal';
import {COLORS} from "@ussu/basil/src/style";
import {type, TypeSize} from "@ussu/basil/src/style/type";
import exitPollAnswer from "./exitPollAnswer.graphql";
import { useMutation } from '@apollo/react-hooks';
import {
  ExitPollAnswerMutation
} from "../../generated/graphql";

const responses = [
  [1, "Voting is important"],
  [2, "To have a say in how the SU is run"],
  [3, "Good manifesto/candidate"],
  [4, "Good candidate publicity"],
  [5, "I know a candidate"],
  [6, "Procrastinating!"],
  [7, "SU Social Media"],
  [8, "Sports/Society encouragement"],
  [9, "Friends encouragement"],
  [10, "For the gift"],
];

export const ElectionsModal: React.FC<ReactModal.Props & { onFinish: () => void}> = ({onFinish, ...props}) => {
  const [mut] = useMutation<ExitPollAnswerMutation>(exitPollAnswer);


  return (
    <Modal size="normal" {...props}>
      <div css={{ textAlign: 'center' }}>
        <div css={[type(TypeSize.Brevier), { textTransform: 'uppercase', color: COLORS.GREY_WINTER, fontWeight: 700 }]}>One more thing…</div>
        <h2 css={{ marginTop: '0.5rem' }}>Why did you vote in the Students' Union's election today? </h2>
      </div>

      <div css={{ paddingTop: '1rem' }}>
        <div css={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gridGap: '2rem', }}>
          {responses.map(([id, text]) => (
            <button onClick={() => mut({ variables: { response: id, additionalInfo: '' }}).then(onFinish)} key={id} css={{ textAlign: 'center', fontSize: 'inherit', border: `2px solid ${COLORS.BRAND_RED}`, borderRadius: 6, padding: '0.5rem 0.25rem', '&:hover': { background: COLORS.BRAND_RED, color: '#fff' } }}>{text}</button>
          ))}
        </div>
      </div>

    </Modal>
  )
}
