import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import DoImage from "../../common/Image";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

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
          src="avatars/1.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 1 ? iconStyle : ""
          }`}
          placeholderImg="avatars/1.svg"
          errorImg="avatars/1.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(2)}>
        <DoImage
          src="avatars/2.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 2 ? iconStyle : ""
          }`}
          placeholderImg="avatars/2.svg"
          errorImg="avatars/2.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(3)}>
        <DoImage
          src="avatars/3.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 3 ? iconStyle : ""
          }`}
          placeholderImg="avatars/3.svg"
          errorImg="avatars/3.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(4)}>
        <DoImage
          src="avatars/4.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 4 ? iconStyle : ""
          }`}
          placeholderImg="avatars/4.svg"
          errorImg="avatars/4.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(5)}>
        <DoImage
          src="avatars/5.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 5 ? iconStyle : ""
          }`}
          placeholderImg="avatars/5.svg"
          errorImg="avatars/5.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(6)}>
        <DoImage
          src="avatars/6.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 6 ? iconStyle : ""
          }`}
          placeholderImg="avatars/6.svg"
          errorImg="avatars/6.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(7)}>
        <DoImage
          src="avatars/7.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 7 ? iconStyle : ""
          }`}
          placeholderImg="avatars/7.svg"
          errorImg="avatars/7.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(8)}>
        <DoImage
          src="avatars/8.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 8 ? iconStyle : ""
          }`}
          placeholderImg="avatars/8.svg"
          errorImg="avatars/8.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(9)}>
        <DoImage
          src="avatars/9.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 9 ? iconStyle : ""
          }`}
          placeholderImg="avatars/9.svg"
          errorImg="avatars/9.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(10)}>
        <DoImage
          src="avatars/10.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 10 ? iconStyle : ""
          }`}
          placeholderImg="avatars/10.svg"
          errorImg="avatars/10.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(11)}>
        <DoImage
          src="avatars/11.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 11 ? iconStyle : ""
          }`}
          placeholderImg="avatars/11.svg"
          errorImg="avatars/11.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(12)}>
        <DoImage
          src="avatars/12.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 12 ? iconStyle : ""
          }`}
          placeholderImg="avatars/12.svg"
          errorImg="avatars/12.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(13)}>
        <DoImage
          src="avatars/13.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 13 ? iconStyle : ""
          }`}
          placeholderImg="avatars/13.svg"
          errorImg="avatars/13.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(14)}>
        <DoImage
          src="avatars/14.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 14 ? iconStyle : ""
          }`}
          placeholderImg="avatars/14.svg"
          errorImg="avatars/14.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(15)}>
        <DoImage
          src="avatars/15.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 15 ? iconStyle : ""
          }`}
          placeholderImg="avatars/15.svg"
          errorImg="avatars/15.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(16)}>
        <DoImage
          src="avatars/16.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 16 ? iconStyle : ""
          }`}
          placeholderImg="avatars/16.svg"
          errorImg="avatars/16.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(17)}>
        <DoImage
          src="avatars/17.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 17 ? iconStyle : ""
          }`}
          placeholderImg="avatars/17.svg"
          errorImg="avatars/17.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(18)}>
        <DoImage
          src="avatars/18.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 18 ? iconStyle : ""
          }`}
          placeholderImg="avatars/18.svg"
          errorImg="avatars/18.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(19)}>
        <DoImage
          src="avatars/19.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 19 ? iconStyle : ""
          }`}
          placeholderImg="avatars/19.svg"
          errorImg="avatars/19.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(20)}>
        <DoImage
          src="avatars/20.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 20 ? iconStyle : ""
          }`}
          placeholderImg="avatars/20.svg"
          errorImg="avatars/20.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(21)}>
        <DoImage
          src="avatars/21.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 21 ? iconStyle : ""
          }`}
          placeholderImg="avatars/21.svg"
          errorImg="avatars/21.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(22)}>
        <DoImage
          src="avatars/22.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 22 ? iconStyle : ""
          }`}
          placeholderImg="avatars/22.svg"
          errorImg="avatars/22.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(23)}>
        <DoImage
          src="avatars/23.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 23 ? iconStyle : ""
          }`}
          placeholderImg="avatars/23.svg"
          errorImg="avatars/23.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(24)}>
        <DoImage
          src="avatars/24.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 24 ? iconStyle : ""
          }`}
          placeholderImg="avatars/24.svg"
          errorImg="avatars/24.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(25)}>
        <DoImage
          src="avatars/25.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 25 ? iconStyle : ""
          }`}
          placeholderImg="avatars/25.svg"
          errorImg="avatars/25.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(26)}>
        <DoImage
          src="avatars/26.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 26 ? iconStyle : ""
          }`}
          placeholderImg="avatars/26.svg"
          errorImg="avatars/26.svg"
        />
      </IconButton>
      <IconButton onClick={() => handleAvatar(27)}>
        <DoImage
          src="avatars/27.svg"
          className={`${avatarStyle} ${
            selectedAvatarId === 27 ? iconStyle : ""
          }`}
          placeholderImg="avatars/27.svg"
          errorImg="avatars/27.svg"
        />
      </IconButton>
    </Box>
  );
});

export default ChangeAvatarModel;
