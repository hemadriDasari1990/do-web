import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import avatar1 from "../../../assets/avatars/1.svg";
import avatar10 from "../../../assets/avatars/10.svg";
import avatar11 from "../../../assets/avatars/11.svg";
import avatar12 from "../../../assets/avatars/12.svg";
import avatar13 from "../../../assets/avatars/13.svg";
import avatar14 from "../../../assets/avatars/14.svg";
import avatar15 from "../../../assets/avatars/15.svg";
import avatar16 from "../../../assets/avatars/16.svg";
import avatar17 from "../../../assets/avatars/17.svg";
import avatar18 from "../../../assets/avatars/18.svg";
import avatar19 from "../../../assets/avatars/19.svg";
import avatar2 from "../../../assets/avatars/2.svg";
import avatar20 from "../../../assets/avatars/20.svg";
import avatar21 from "../../../assets/avatars/21.svg";
import avatar22 from "../../../assets/avatars/22.svg";
import avatar23 from "../../../assets/avatars/23.svg";
import avatar24 from "../../../assets/avatars/24.svg";
import avatar25 from "../../../assets/avatars/25.svg";
import avatar26 from "../../../assets/avatars/26.svg";
import avatar27 from "../../../assets/avatars/27.svg";
import avatar3 from "../../../assets/avatars/3.svg";
import avatar4 from "../../../assets/avatars/4.svg";
import avatar5 from "../../../assets/avatars/5.svg";
import avatar6 from "../../../assets/avatars/6.svg";
import avatar7 from "../../../assets/avatars/7.svg";
import avatar8 from "../../../assets/avatars/8.svg";
import avatar9 from "../../../assets/avatars/9.svg";

const useStyles = makeStyles((theme: Theme) => ({
  avatarStyle: {
    width: 45,
    height: 45,
  },
  iconStyle: {
    border: "5px solid #3333",
    borderRadius: "50%",
  },
}));

const ChangeAvatarModel = (props: any) => {
  const { handleAvatar, selectedAvatarId } = props;
  const { avatarStyle, iconStyle } = useStyles();
  return (
    <Box>
      <IconButton onClick={() => handleAvatar(1)}>
        <img
          src={avatar1}
          className={`${avatarStyle} ${
            selectedAvatarId === 1 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(2)}>
        <img
          src={avatar2}
          className={`${avatarStyle} ${
            selectedAvatarId === 2 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(3)}>
        <img
          src={avatar3}
          className={`${avatarStyle} ${
            selectedAvatarId === 3 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(4)}>
        <img
          src={avatar4}
          className={`${avatarStyle} ${
            selectedAvatarId === 4 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(5)}>
        <img
          src={avatar5}
          className={`${avatarStyle} ${
            selectedAvatarId === 5 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(6)}>
        <img
          src={avatar6}
          className={`${avatarStyle} ${
            selectedAvatarId === 6 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(7)}>
        <img
          src={avatar7}
          className={`${avatarStyle} ${
            selectedAvatarId === 7 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(8)}>
        <img
          src={avatar8}
          className={`${avatarStyle} ${
            selectedAvatarId === 8 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(9)}>
        <img
          src={avatar9}
          className={`${avatarStyle} ${
            selectedAvatarId === 9 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(10)}>
        <img
          src={avatar10}
          className={`${avatarStyle} ${
            selectedAvatarId === 10 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(11)}>
        <img
          src={avatar11}
          className={`${avatarStyle} ${
            selectedAvatarId === 11 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(12)}>
        <img
          src={avatar12}
          className={`${avatarStyle} ${
            selectedAvatarId === 12 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(13)}>
        <img
          src={avatar13}
          className={`${avatarStyle} ${
            selectedAvatarId === 13 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(14)}>
        <img
          src={avatar14}
          className={`${avatarStyle} ${
            selectedAvatarId === 14 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(15)}>
        <img
          src={avatar15}
          className={`${avatarStyle} ${
            selectedAvatarId === 15 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(16)}>
        <img
          src={avatar16}
          className={`${avatarStyle} ${
            selectedAvatarId === 16 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(17)}>
        <img
          src={avatar17}
          className={`${avatarStyle} ${
            selectedAvatarId === 17 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(18)}>
        <img
          src={avatar18}
          className={`${avatarStyle} ${
            selectedAvatarId === 18 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(19)}>
        <img
          src={avatar19}
          className={`${avatarStyle} ${
            selectedAvatarId === 19 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(20)}>
        <img
          src={avatar20}
          className={`${avatarStyle} ${
            selectedAvatarId === 20 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(21)}>
        <img
          src={avatar21}
          className={`${avatarStyle} ${
            selectedAvatarId === 21 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(22)}>
        <img
          src={avatar22}
          className={`${avatarStyle} ${
            selectedAvatarId === 22 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(23)}>
        <img
          src={avatar23}
          className={`${avatarStyle} ${
            selectedAvatarId === 23 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(24)}>
        <img
          src={avatar24}
          className={`${avatarStyle} ${
            selectedAvatarId === 24 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(25)}>
        <img
          src={avatar25}
          className={`${avatarStyle} ${
            selectedAvatarId === 25 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(26)}>
        <img
          src={avatar26}
          className={`${avatarStyle} ${
            selectedAvatarId === 26 ? iconStyle : ""
          }`}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(27)}>
        <img
          src={avatar27}
          className={`${avatarStyle} ${
            selectedAvatarId === 27 ? iconStyle : ""
          }`}
        />
      </IconButton>
    </Box>
  );
};

export default ChangeAvatarModel;
