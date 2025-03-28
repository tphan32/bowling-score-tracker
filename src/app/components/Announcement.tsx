import { Player } from "../types";
import { getPlayerById } from "../utils/findWinner";

interface AnnouncementProps {
  winners: Player["id"][];
  players: Player[];
}

const Announcement: React.FC<AnnouncementProps> = ({ winners, players }) => {
  if (winners.length === 0) {
    return null;
  }

  if (winners.length === 1) {
    return (
      <div className="text-center text-2xl font-semibold text-gray-700">
        {getPlayerById(players, winners[0]).name} wins!
      </div>
    );
  }

  return (
    <div className="text-center text-2xl font-semibold text-gray-700">
      There is a tie!
    </div>
  );
};

export default Announcement;
