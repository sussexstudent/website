import React, { useState, useEffect, useCallback } from 'react';
import {COLORS} from "@ussu/basil/src/style";
import { useLocation } from 'react-router-dom';
import {ElectionsModal} from "./ExitPollModal";
import {WebsiteRootState} from "../../types/website";
import { useMappedState } from 'redux-react-hook';


enum PillMode {
  NA,
  Vote,
  Exit,
  Hide,

}

export const ElectionsPill = () => {
  const location = useLocation();
  const [mode, setMode] = useState(PillMode.NA);
  const [exitPollModal, setExitPollModal] = useState(false);
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      user: state.user,
    }),
    [],
  );
  const { user } = useMappedState(mapState);
  let pill = null;

  useEffect(() => {
    if (localStorage.getItem('su2020ExitPoll') !== 'true') {

      if (location.pathname.startsWith('/whats-on') || location.pathname === '/elections/') {
        setMode(PillMode.Hide)
      } else if (location.pathname.startsWith('/elections/posts/209')) {
        if (user.isLoggedIn) {
          setMode(PillMode.Exit);
        } else {
          setMode(PillMode.Hide);
        }
      } else {
        setMode(PillMode.Vote)
      }
    }
  }, [location.pathname]);

  if (mode === PillMode.Vote) {
    pill = (
      <div css={{ position: 'fixed', left: 0, right: 0, bottom: 0, padding: '0 1rem 1rem 1rem', pointerEvents: 'none'  }}>
        <a href="/elections/" css={{ display: 'block', background: COLORS.BRAND_RED, borderRadius: 30, maxWidth: 400, margin: '0 auto', padding: '1rem', color: '#fff', boxShadow: '0 3px 6px 2px rgba(30, 30, 30, 0.1)', pointerEvents: 'visible', textDecoration: 'none' }}>
          <div css={{ fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>SU Elections: Vote now »</div>
        </a>
      </div>
    )
  }

  if (mode === PillMode.Exit) {
    pill = (
      <div css={{ position: 'fixed', left: 0, right: 0, bottom: 0, padding: '0 1rem 1rem 1rem', pointerEvents: 'none'  }}>
        <div onClick={() =>  setExitPollModal(true)} role="button" css={{ display: 'block', background: COLORS.BRAND_RED, borderRadius: 30, maxWidth: 400, margin: '0 auto', padding: '1rem', color: '#fff', boxShadow: '0 3px 6px 2px rgba(30, 30, 30, 0.1)', pointerEvents: 'visible', textDecoration: 'none' }}>
          <div css={{ fontWeight: 700, textTransform: 'uppercase', textAlign: 'center' }}>Finished voting?</div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      {pill}
      <ElectionsModal isOpen={exitPollModal} onRequestClose={() => {setExitPollModal(false)}} onFinish={() => {setExitPollModal(false); localStorage.setItem('su2020ExitPoll', 'true'); setMode(PillMode.Hide) }} />
    </React.Fragment>
  );
}
