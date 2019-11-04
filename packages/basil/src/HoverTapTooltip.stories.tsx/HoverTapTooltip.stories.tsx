import { HoverTapTooltip } from '../../../website/src/components/HoverTapToolTip/index';

export default { title: 'HoverTapTooltip' };

export const Default = () => (
  <div>
    <h1>Tooltip demo</h1>

    <HoverTapTooltip content={() => <span>This is a tooltip</span>}>
      {({ handleOpen, handleClose, ref }) => (
        <button
          className="Button"
          ref={ref}
          onMouseLeave={handleClose}
          onMouseEnter={handleOpen}
        >
          An amazing button
        </button>
      )}
    </HoverTapTooltip>
  </div>
);
