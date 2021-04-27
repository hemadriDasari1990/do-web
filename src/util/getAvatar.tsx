import avatar1 from "../assets/avatars/1.svg";
import avatar10 from "../assets/avatars/10.svg";
import avatar11 from "../assets/avatars/11.svg";
import avatar12 from "../assets/avatars/12.svg";
import avatar13 from "../assets/avatars/13.svg";
import avatar14 from "../assets/avatars/14.svg";
import avatar15 from "../assets/avatars/15.svg";
import avatar16 from "../assets/avatars/16.svg";
import avatar17 from "../assets/avatars/17.svg";
import avatar18 from "../assets/avatars/18.svg";
import avatar19 from "../assets/avatars/19.svg";
import avatar2 from "../assets/avatars/2.svg";
import avatar20 from "../assets/avatars/20.svg";
import avatar21 from "../assets/avatars/21.svg";
import avatar22 from "../assets/avatars/22.svg";
import avatar23 from "../assets/avatars/23.svg";
import avatar24 from "../assets/avatars/24.svg";
import avatar25 from "../assets/avatars/25.svg";
import avatar26 from "../assets/avatars/26.svg";
import avatar27 from "../assets/avatars/27.svg";
import avatar3 from "../assets/avatars/3.svg";
import avatar4 from "../assets/avatars/4.svg";
import avatar5 from "../assets/avatars/5.svg";
import avatar6 from "../assets/avatars/6.svg";
import avatar7 from "../assets/avatars/7.svg";
import avatar8 from "../assets/avatars/8.svg";
import avatar9 from "../assets/avatars/9.svg";

export const getAvatar = (id: number) => {
  if (!id) {
    return "";
  }
  let avatar = "";
  switch (id) {
    case 1:
      avatar = avatar1;
      break;
    case 2:
      avatar = avatar2;
      break;
    case 3:
      avatar = avatar3;
      break;
    case 4:
      avatar = avatar4;
      break;
    case 5:
      avatar = avatar5;
      break;
    case 6:
      avatar = avatar6;
      break;
    case 7:
      avatar = avatar7;
      break;
    case 8:
      avatar = avatar8;
      break;
    case 9:
      avatar = avatar9;
      break;
    case 10:
      avatar = avatar10;
      break;
    case 11:
      avatar = avatar11;
      break;
    case 12:
      avatar = avatar12;
      break;
    case 13:
      avatar = avatar13;
      break;
    case 14:
      avatar = avatar14;
      break;
    case 15:
      avatar = avatar15;
      break;
    case 16:
      avatar = avatar16;
      break;
    case 17:
      avatar = avatar17;
      break;
    case 18:
      avatar = avatar18;
      break;
    case 19:
      avatar = avatar19;
      break;
    case 20:
      avatar = avatar20;
      break;
    case 21:
      avatar = avatar21;
      break;
    case 22:
      avatar = avatar22;
      break;
    case 23:
      avatar = avatar23;
      break;
    case 24:
      avatar = avatar24;
      break;
    case 25:
      avatar = avatar25;
      break;
    case 26:
      avatar = avatar26;
      break;
    case 27:
      avatar = avatar27;
      break;
    default:
      break;
  }
  return avatar;
};
