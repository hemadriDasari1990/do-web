import React, { useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import DoPagination from "../../common/Pagination";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { MEMBERS_PER_PAGE } from "../../../util/constants";
import NoRecords from "../../NoRecords";
import { Suspense } from "react";
import Typography from "@material-ui/core/Typography";
import { getActivities } from "../../../redux/actions/board";
import { getAvatar } from "../../../util/getAvatar";
import { getInitials } from "../../../util";
import getPastTime from "../../../util/getPastTime";
import { useDispatch } from "react-redux";
import { useInvitedMembers } from "../../../redux/state/invite";
import { useParams } from "react-router-dom";
import useStyles from "../../styles";

const InvitedMembersList = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const { members, totalMembers } = useInvitedMembers();
  const { avatarStyle, breakText, nameStyle, cursor } = useStyles();

  useEffect(() => {}, []);

  const loadInvitedMembers = (pageNo: number) => {
    dispatch(getActivities(boardId, "", pageNo, MEMBERS_PER_PAGE));
  };

  const handlePage = (page: number) => {
    loadInvitedMembers(page);
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <List>
          {members?.length ? (
            members.map((member: { [Key: string]: any }) => (
              <ListItem
                key={member._id}
                alignItems="flex-start"
                className={cursor}
                disableGutters
              >
                <ListItemAvatar style={{ minWidth: 40 }}>
                  {member?.avatarId ? (
                    <Avatar
                      className={`${avatarStyle}`}
                      src={getAvatar(member?.avatarId)}
                    ></Avatar>
                  ) : (
                    <Avatar className={`${avatarStyle}`}>
                      <Typography variant="subtitle1" className={nameStyle}>
                        {getInitials(member?.name) || "TM"}
                      </Typography>
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box className={`${breakText}`}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        className={nameStyle}
                      >
                        {member?.name}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="subtitle2">
                      {getPastTime(member?.createdAt)}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Box>
              <NoRecords message="No records found" hideImage={true} />
            </Box>
          )}
        </List>
      </Box>
      <Box mt={2} bottom="0" position="fixed">
        <DoPagination
          type="modal"
          handlePage={handlePage}
          totalCount={totalMembers}
          pageCount={MEMBERS_PER_PAGE}
        />
      </Box>
    </Suspense>
  );
};

export default InvitedMembersList;
