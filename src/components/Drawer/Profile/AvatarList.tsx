import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import DoImage from "../../common/Image";
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

const ChangeAvatarModel = React.memo((props: any) => {
  const { handleAvatar, selectedAvatarId } = props;
  const { avatarStyle, iconStyle } = useStyles();
  return (
    <Box>
      <IconButton onClick={() => handleAvatar(1)}>
        <DoImage
          src={avatar1}
          className={`${avatarStyle} ${
            selectedAvatarId === 1 ? iconStyle : ""
          }`}
          placeholderImg={avatar1}
          errorImg={avatar1}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(2)}>
        <DoImage
          src={avatar2}
          className={`${avatarStyle} ${
            selectedAvatarId === 2 ? iconStyle : ""
          }`}
          placeholderImg={avatar2}
          errorImg={avatar2}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(3)}>
        <DoImage
          src={avatar3}
          className={`${avatarStyle} ${
            selectedAvatarId === 3 ? iconStyle : ""
          }`}
          placeholderImg={avatar3}
          errorImg={avatar3}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(4)}>
        <DoImage
          src={avatar4}
          className={`${avatarStyle} ${
            selectedAvatarId === 4 ? iconStyle : ""
          }`}
          placeholderImg={avatar4}
          errorImg={avatar4}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(5)}>
        <DoImage
          src={avatar5}
          className={`${avatarStyle} ${
            selectedAvatarId === 5 ? iconStyle : ""
          }`}
          placeholderImg={avatar5}
          errorImg={avatar5}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(6)}>
        <DoImage
          src={avatar6}
          className={`${avatarStyle} ${
            selectedAvatarId === 6 ? iconStyle : ""
          }`}
          placeholderImg={avatar6}
          errorImg={avatar6}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(7)}>
        <DoImage
          src={avatar7}
          className={`${avatarStyle} ${
            selectedAvatarId === 7 ? iconStyle : ""
          }`}
          placeholderImg={avatar7}
          errorImg={avatar7}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(8)}>
        <DoImage
          src={avatar8}
          className={`${avatarStyle} ${
            selectedAvatarId === 8 ? iconStyle : ""
          }`}
          placeholderImg={avatar8}
          errorImg={avatar8}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(9)}>
        <DoImage
          src={avatar9}
          className={`${avatarStyle} ${
            selectedAvatarId === 9 ? iconStyle : ""
          }`}
          placeholderImg={avatar9}
          errorImg={avatar9}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(10)}>
        <DoImage
          src={avatar10}
          className={`${avatarStyle} ${
            selectedAvatarId === 10 ? iconStyle : ""
          }`}
          placeholderImg={avatar10}
          errorImg={avatar10}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(11)}>
        <DoImage
          src={avatar11}
          className={`${avatarStyle} ${
            selectedAvatarId === 11 ? iconStyle : ""
          }`}
          placeholderImg={avatar11}
          errorImg={avatar11}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(12)}>
        <DoImage
          src={avatar12}
          className={`${avatarStyle} ${
            selectedAvatarId === 12 ? iconStyle : ""
          }`}
          placeholderImg={avatar12}
          errorImg={avatar12}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(13)}>
        <DoImage
          src={avatar13}
          className={`${avatarStyle} ${
            selectedAvatarId === 13 ? iconStyle : ""
          }`}
          placeholderImg={avatar13}
          errorImg={avatar13}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(14)}>
        <DoImage
          src={avatar14}
          className={`${avatarStyle} ${
            selectedAvatarId === 14 ? iconStyle : ""
          }`}
          placeholderImg={avatar14}
          errorImg={avatar14}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(15)}>
        <DoImage
          src={avatar15}
          className={`${avatarStyle} ${
            selectedAvatarId === 15 ? iconStyle : ""
          }`}
          placeholderImg={avatar15}
          errorImg={avatar15}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(16)}>
        <DoImage
          src={avatar16}
          className={`${avatarStyle} ${
            selectedAvatarId === 16 ? iconStyle : ""
          }`}
          placeholderImg={avatar16}
          errorImg={avatar16}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(17)}>
        <DoImage
          src={avatar17}
          className={`${avatarStyle} ${
            selectedAvatarId === 17 ? iconStyle : ""
          }`}
          placeholderImg={avatar17}
          errorImg={avatar17}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(18)}>
        <DoImage
          src={avatar18}
          className={`${avatarStyle} ${
            selectedAvatarId === 18 ? iconStyle : ""
          }`}
          placeholderImg={avatar18}
          errorImg={avatar18}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(19)}>
        <DoImage
          src={avatar19}
          className={`${avatarStyle} ${
            selectedAvatarId === 19 ? iconStyle : ""
          }`}
          placeholderImg={avatar19}
          errorImg={avatar19}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(20)}>
        <DoImage
          src={avatar20}
          className={`${avatarStyle} ${
            selectedAvatarId === 20 ? iconStyle : ""
          }`}
          placeholderImg={avatar20}
          errorImg={avatar20}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(21)}>
        <DoImage
          src={avatar21}
          className={`${avatarStyle} ${
            selectedAvatarId === 21 ? iconStyle : ""
          }`}
          placeholderImg={avatar21}
          errorImg={avatar21}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(22)}>
        <DoImage
          src={avatar22}
          className={`${avatarStyle} ${
            selectedAvatarId === 22 ? iconStyle : ""
          }`}
          placeholderImg={avatar22}
          errorImg={avatar22}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(23)}>
        <DoImage
          src={avatar23}
          className={`${avatarStyle} ${
            selectedAvatarId === 23 ? iconStyle : ""
          }`}
          placeholderImg={avatar23}
          errorImg={avatar23}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(24)}>
        <DoImage
          src={avatar24}
          className={`${avatarStyle} ${
            selectedAvatarId === 24 ? iconStyle : ""
          }`}
          placeholderImg={avatar24}
          errorImg={avatar24}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(25)}>
        <DoImage
          src={avatar25}
          className={`${avatarStyle} ${
            selectedAvatarId === 25 ? iconStyle : ""
          }`}
          placeholderImg={avatar25}
          errorImg={avatar25}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(26)}>
        <DoImage
          src={avatar26}
          className={`${avatarStyle} ${
            selectedAvatarId === 26 ? iconStyle : ""
          }`}
          placeholderImg={avatar26}
          errorImg={avatar26}
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(27)}>
        <DoImage
          src={avatar27}
          className={`${avatarStyle} ${
            selectedAvatarId === 27 ? iconStyle : ""
          }`}
          placeholderImg={avatar27}
          errorImg={avatar27}
        />
      </IconButton>
    </Box>
  );
});

export default ChangeAvatarModel;
