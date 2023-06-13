import {Tooltip} from "antd";

const NarucilacTooltip = (naziv, email, broj, ulicaIBroj, mjesto) => {

  return (
    <Tooltip title={naziv}>
      <button>{email}</button>
    </Tooltip>
  );
};

export default NarucilacTooltip;