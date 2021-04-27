import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getAvatar } from "../../../util/getAvatar";
import getRandomBGColor from "../../../util/getRandomColor";
import useStyles from "../../styles/table";

const AvatarGroupList = (props: any) => {
  const { dataList, keyName, noDataMessage } = props;
  const { avatarStyle, avatarGroupStyle } = useStyles();

  return (
    <>
      {dataList?.length ? (
        <AvatarGroup
          max={4}
          classes={{ avatar: `${avatarStyle} ${avatarGroupStyle}` }}
        >
          {dataList?.map((data: { [Key: string]: any }, index: number) => (
            <Zoom key={data._id} in={true} timeout={2000 + index++}>
              {data?.avatarId ? (
                <Tooltip arrow title={keyName ? data?.[keyName] : data["name"]}>
                  <Avatar
                    src={getAvatar(data?.avatarId)}
                    className={avatarStyle}
                  ></Avatar>
                </Tooltip>
              ) : (
                <Avatar
                  alt={keyName ? data?.[keyName] : data["name"]}
                  className={avatarStyle}
                  style={{
                    background:
                      index < 6 ? getRandomBGColor(index) : getRandomBGColor(0),
                  }}
                >
                  <Tooltip
                    arrow
                    title={keyName ? data?.[keyName] : data["name"]}
                  >
                    <Typography variant="h6" color="secondary">
                      {keyName
                        ? data?.[keyName]?.substring(0, 1)
                        : data?.name?.substring(0, 1) || ""}
                    </Typography>
                  </Tooltip>
                </Avatar>
              )}
            </Zoom>
          ))}
        </AvatarGroup>
      ) : (
        noDataMessage && <Typography variant="h6">{noDataMessage}</Typography>
      )}
    </>
  );
};

export default AvatarGroupList;
