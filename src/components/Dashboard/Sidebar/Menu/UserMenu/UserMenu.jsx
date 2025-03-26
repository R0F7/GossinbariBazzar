import {
  MdOutlineAccountTree,
  MdOutlinePayments,
  MdSupportAgent,
} from "react-icons/md";
import MenuItem from "../MenuItem";
import { GrNotes } from "react-icons/gr";

const UserMenu = () => {
  return (
    <>
      <MenuItem
        address={"my-account"}
        label={"My Account"}
        icon={MdOutlineAccountTree}
      ></MenuItem>

      <MenuItem
        address={"my-orders"}
        label={"My Orders"}
        icon={GrNotes}
      ></MenuItem>

      <MenuItem
        address={"payment"}
        label={"Payment"}
        icon={MdOutlinePayments}
      ></MenuItem>

      <MenuItem
        address={"support"}
        label={"Support"}
        icon={MdSupportAgent}
      ></MenuItem>
    </>
  );
};

export default UserMenu;
